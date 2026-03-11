const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'TRADE_LOG.md');
const STATE_FILE = path.join(__dirname, 'TRADE_STATE.md');

function parseLog() {
  if (!fs.existsSync(LOG_FILE)) return {trades:0, profit:0, wins:0};
  const lines = fs.readFileSync(LOG_FILE, 'utf8').split('\n');
  // Expect lines like "- 2023-... Trade – BUY BTC @ 30000 – profit: 150"
  let trades=0, profit=0, wins=0;
  lines.forEach(l => {
    const m = l.match(/profit:\s*([+-]?\d+(?:\.\d+)?)/i);
    if (m) {
      trades++;
      const val = parseFloat(m[1]);
      profit += val;
      if (val > 0) wins++;
    }
  });
  return {trades, profit, wins};
}

function readState() {
  if (!fs.existsSync(STATE_FILE)) return {};
  const content = fs.readFileSync(STATE_FILE, 'utf8');
  const capitalMatch = content.match(/Capital:\s*(\d+)/i);
  return {capital: capitalMatch ? parseInt(capitalMatch[1]) : 0};
}

function writeSummary() {
  const {trades, profit, wins} = parseLog();
  const winRate = trades ? (wins/trades*100).toFixed(2) : 0;
  const date = new Date().toISOString().split('T')[0];
  const summary = `# Daily Trading Summary - ${date}\n\n` +
    `**Trades executed:** ${trades}\n` +
    `**Total P&L:** ${profit.toFixed(2)} USD\n` +
    `**Win rate:** ${winRate}%\n`;
  const outPath = path.join(__dirname, `SUMMARY_${date}.md`);
  fs.writeFileSync(outPath, summary, 'utf8');
  console.log('Daily summary generated:', outPath);
}

writeSummary();
