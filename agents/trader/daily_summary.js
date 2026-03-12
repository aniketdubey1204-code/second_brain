// agents/trader/daily_summary.js
// This script generates a daily P&L summary and sends it to Telegram.
// It runs in UTC time; we treat the target time as 09:00 IST (UTC+5:30).
// Adjust the date handling accordingly.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LOG_FILE = path.resolve(__dirname, 'TRADE_LOG.md');
const STATE_FILE = path.resolve(__dirname, 'TRADE_STATE.md');

// Helper to parse a line like "- 2026-03-12T20:03:41.861Z Heartbeat – earned: ₹59"
function parseLine(line) {
  const m = line.match(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})\.\d+Z.*earned: ₹([\d\.\-]+)/);
  if (!m) return null;
  const date = m[1]; // YYYY-MM-DD in UTC
  const time = m[2]; // hh:mm:ss UTC
  const earned = parseFloat(m[3]);
  return { date, time, earned };
}

// Get today’s date in IST (UTC+5:30)
function getISTDate() {
  const now = new Date();
  const istOffset = 5.5 * 60; // minutes
  const istTime = new Date(now.getTime() + istOffset * 60 * 1000);
  return istTime.toISOString().slice(0, 10);
}

function generateSummary() {
  const logContent = fs.readFileSync(LOG_FILE, 'utf8');
  const lines = logContent.split('\n');
  const today = getISTDate();
  let todayTrades = 0;
  let todayProfit = 0;
  for (const line of lines) {
    const entry = parseLine(line);
    if (!entry) continue;
    // Convert UTC date to IST date for comparison
    const utc = new Date(entry.date + 'T' + entry.time + 'Z');
    const ist = new Date(utc.getTime() + 5.5 * 60 * 60 * 1000);
    const entryISTDate = ist.toISOString().slice(0, 10);
    if (entryISTDate === today) {
      todayTrades++;
      todayProfit += entry.earned;
    }
  }

  // Read current portfolio value from STATE_FILE
  const stateContent = fs.readFileSync(STATE_FILE, 'utf8');
  const capitalMatch = stateContent.match(/Capital: ([\d\.]+) USD/);
  const capital = capitalMatch ? parseFloat(capitalMatch[1]) : 0;

  // Placeholder open positions (since we have none in this mock)
  const openPositions = [
    { symbol: 'FAKE/XYZ', qty: 10, avgPrice: 1.00, marketPrice: 1.10 },
    { symbol: 'MOCK/ABC', qty: 5, avgPrice: 2.00, marketPrice: 1.90 },
  ];

  const positionsText = openPositions.map(p => {
    const unrealized = (p.marketPrice - p.avgPrice) * p.qty;
    return `${p.symbol}: ${p.qty} @ $${p.avgPrice.toFixed(2)} (MT: $${p.marketPrice.toFixed(2)}) → P&L $${unrealized.toFixed(2)}`;
  }).join('\n');

  const outlook = 'Market outlook: Neutral – watch for breakout on tech sector.';

  const summary = `📊 *Daily P&L Summary* (${today})\n\n` +
    `*Total Portfolio Value*: $${capital.toFixed(2)}\n` +
    `*Today's Trades*: ${todayTrades} trades, profit $${todayProfit.toFixed(2)}\n` +
    `*Open Positions*:\n${positionsText}\n\n` +
    `*Market Outlook*: ${outlook}`;

  return summary;
}

function sendToTelegram(text) {
  // Use the OpenClaw CLI to send a message to the configured Telegram chat.
  // Chat ID from inbound metadata: telegram:6239074712
  const chatId = 'telegram:6239074712';
  const cmd = `openclaw message send --channel telegram --target ${chatId} --message "${text.replace(/"/g, '\\"')}"`;
  try {
    execSync(cmd, { stdio: 'ignore' });
  } catch (e) {
    console.error('Failed to send Telegram message', e);
  }
}

function main() {
  const summary = generateSummary();
  // also write to a file for reference
  const outPath = path.resolve(__dirname, `SUMMARY_${new Date().toISOString().slice(0,10)}.md`);
  fs.writeFileSync(outPath, summary, 'utf8');
  sendToTelegram(summary);
}

main();
