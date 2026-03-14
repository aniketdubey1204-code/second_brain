"""Main trading agent.
Coordinates market data fetching, indicator computation, regime detection,
strategy evaluation, risk checks, execution and logging.
"""
import yaml
import time
from datetime import datetime
from pathlib import Path

from .market_data import get_price, get_ohlcv
from .indicators import calculate_indicators
from .regime_detector import detect_regime
from .risk_manager import RiskManager
from .portfolio_manager import PortfolioManager
from .execution_engine import ExecutionEngine
from .trade_logger import log_trade
from .strategy_engine import build_strategy

CONFIG_PATH = Path(__file__).parent / "config.yaml"

class TradingAgent:
    def __init__(self):
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            self.config = yaml.safe_load(f)
        self.risk_manager = RiskManager(self.config)
        self.portfolio = PortfolioManager(initial_balance=self.config.get('initial_balance', 10000.0))
        self.execution = ExecutionEngine(self.config)
        # Load strategy parameters (if any)
        params_path = Path(__file__).parent / "strategy_params.json"
        if params_path.is_file():
            with open(params_path, "r", encoding="utf-8") as f:
                self.strategy_params = yaml.safe_load(f)
        else:
            self.strategy_params = {'type': 'trend'}  # default
        self.strategy = build_strategy(self.strategy_params)
        # System monitor for self‑diagnosis & self‑healing
        from .system_monitor import SystemMonitor
        self.monitor = SystemMonitor(self.config)

    def run_cycle(self):
        """Execute a trading cycle in **test** mode (or normal mode).
        - In *test* mode: ignore session, regime and volatility filters.
        - Uses a simple momentum strategy (EMA9/EMA21 + RSI).
        - Trade limit: max 2 trades per hour per symbol.
        - Risk: 1% of balance, stop‑loss 1.5 %, take‑profit 3 %.
        - Logs detailed debug info and performance summary.
        """
        import os
        from datetime import datetime, timezone
        # ------------------------------------------------------------------
        # Helpers
        def get_market_session():
            utc_hour = datetime.utcnow().hour
            if 0 <= utc_hour < 7:
                return 'Asia'
            if 7 <= utc_hour < 13:
                return 'London'
            if 13 <= utc_hour < 22:
                return 'NewYork'
            return 'OffHours'

        def simple_momentum(ind):
            ema9 = ind.get('ema9')
            ema21 = ind.get('ema21')
            rsi = ind.get('rsi')
            if ema9 is None or ema21 is None or rsi is None:
                return None
            if ema9 > ema21 and rsi > 50:
                return 'buy'
            if ema9 < ema21 and rsi < 50:
                return 'sell'
            return None

        # Initialise trade‑limit tracker if missing
        if not hasattr(self, '_trade_history'):
            self._trade_history = {sym: [] for sym in self.config.get('symbols', [])}
        max_trades_per_hour = self.config.get('max_trades_per_hour', 2)
        strategy_mode = self.config.get('strategy_mode', 'normal')
        session = get_market_session()
        last_trade_result = None
        # ------------------------------------------------------------------
        for symbol in self.config.get('symbols', []):
            price = get_price(symbol)
            ohlcv = get_ohlcv(symbol, timeframe='1m', limit=30)
            ind = calculate_indicators(ohlcv)
            if strategy_mode == 'test':
                signal = simple_momentum(ind)
                regime = 'any'
            else:
                regime = detect_regime(ind['price'], ind['ema50'], ind['atr'], self.config.get('volatility_threshold', 0.05))
                signal = self.strategy(ind, regime)
            # Trade‑limit enforcement
            now_ts = datetime.utcnow().timestamp()
            self._trade_history[symbol] = [t for t in self._trade_history[symbol] if now_ts - t < 3600]
            if len(self._trade_history[symbol]) >= max_trades_per_hour:
                signal = None
                limit_exceeded = True
            else:
                limit_exceeded = False
            # Risk & execution
            if signal and self.risk_manager.can_open_position():
                sl = price * (1 - 0.015) if signal == 'buy' else price * (1 + 0.015)
                tp = price * (1 + 0.03) if signal == 'buy' else price * (1 - 0.03)
                if not self.risk_manager.evaluate_trade(price, sl, tp, ind.get('atr', 0)):
                    signal = None
                else:
                    size = self.risk_manager.position_size(abs(price - sl))
                    exec_res = self.execution.execute_order(symbol, signal, price, size)
                    trade_record = {
                        'timestamp': datetime.utcnow().isoformat() + 'Z',
                        'symbol': symbol,
                        'side': signal,
                        'entry_price': price,
                        'size': size,
                        'stop_loss': sl,
                        'take_profit': tp,
                        'fee': exec_res.get('fee'),
                        'reason': f'test_{signal}' if strategy_mode == 'test' else 'strategy_signal',
                    }
                    exit_price = tp if signal == 'buy' else sl
                    pnl = (exit_price - price) * size if signal == 'buy' else (price - exit_price) * size
                    pnl -= exec_res.get('fee')
                    trade_record['exit_price'] = exit_price
                    trade_record['pnl'] = pnl
                    log_trade(trade_record)
                    self.portfolio.add_position(None)
                    self.risk_manager.record_trade_outcome(pnl)
                    self._trade_history[symbol].append(now_ts)
                    last_trade_result = {'symbol': symbol, 'side': signal, 'pnl': pnl}
            # Debug logging
            debug_line = f"{datetime.utcnow().isoformat()}Z | {symbol} | price:{price:.2f} | ema9:{ind.get('ema9',0):.2f} | ema21:{ind.get('ema21',0):.2f} | rsi:{ind.get('rsi',0):.1f} | decision:{signal or 'none'}\n"
            debug_path = os.path.join(os.path.dirname(__file__), 'logs', 'strategy_debug.log')
            with open(debug_path, 'a', encoding='utf-8') as dbg:
                dbg.write(debug_line)
        # ------------------------------------------------------------------
        # Performance summary
        perf_path = os.path.join(os.path.dirname(__file__), '..', 'logs', 'PERFORMANCE_STATUS.md')
        summary = self.portfolio.summary()
        with open(perf_path, 'w', encoding='utf-8') as pf:
            pf.write(f"## Performance Status {datetime.utcnow().isoformat()}Z\n")
            pf.write(f"- Account balance: {summary['account_balance']:.2f}\n")
            pf.write(f"- Realized PnL: {summary['realized_pnl']:.2f}\n")
            pf.write(f"- Total trades: {summary['trade_count']}\n")
            pf.write(f"- Win rate: {summary['win_rate']:.2f}%\n")
            if last_trade_result:
                pf.write(f"- Last trade: {last_trade_result['symbol']} {last_trade_result['side']} PnL {last_trade_result['pnl']:.2f}\n")
            else:
                pf.write("- No trades this cycle\n")
        # End of cycle

    def start(self):
        poll_interval = self.config.get('poll_interval', 60)
        while True:
            self.run_cycle()
            time.sleep(poll_interval)

if __name__ == '__main__':
    agent = TradingAgent()
    agent.start()
