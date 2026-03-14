import json,sys
with open(r'D:\OpenClaw\workspace\second-brain\trading_bot\logs\trades.json') as f:
    trades=json.load(f)
print('count',len(trades))
print('total_pnl',sum(t['pnl'] for t in trades))
