const fs = require('fs');
const path = require('path');
const masterFile = path.resolve(__dirname, '..', '..', 'master_trading_battle.json');

// Simple in‑memory P&L tracking per team
const teams = {
  Scalper: {cumulative: 0},
  Trend: {cumulative: 0},
  MeanReversion: {cumulative: 0},
};

function randomTrade(team) {
  // Simulate profit/loss: small random +/-
  const delta = (Math.random() * 2 - 1) * (team === 'Scalper' ? 0.5 : team === 'Trend' ? 2 : 1);
  teams[team].cumulative += delta;
  return {
    timestamp: new Date().toISOString(),
    team,
    strategy: team,
    cumulative_pnl: parseFloat(teams[team].cumulative.toFixed(2)),
    status: 'ACTIVE'
  };
}

function appendEntry(entry) {
  // Append entry as a single JSON line (JSONL)
  const line = JSON.stringify(entry);
  fs.appendFileSync(masterFile, line + '\n', 'utf8');
}

function runCycle() {
  for (const team of Object.keys(teams)) {
    const entry = randomTrade(team);
    appendEntry(entry);
  }
}

// Run every minute
setInterval(runCycle, 60 * 1000);
console.log('Battle of Strategies started');
// Keep process alive
setInterval(()=>{}, 1e9);
