// trade_loop.js – placeholder 24‑x‑7 trading agent
// ---------------------------------------------------------------
// This script runs indefinitely, simulating a trading bot.
// It periodically (every 60 seconds) writes a heartbeat entry to
// the trader's log files and pushes a minimal dashboard update
// to the local Mission Control server (http://localhost:8899).
// Additionally, it generates a daily performance summary at 09:00 AM
// (Asia/Kolkata) and logs it.

const fs = require('fs');
const path = require('path');
const fetch = global.fetch || require('node-fetch'); // Node ≥18 has global fetch

// Paths inside the trader workspace
const BASE = path.resolve(__dirname);
const LOG_FILE = path.join(BASE, 'TRADE_LOG.md');
const STATE_FILE = path.join(BASE, 'TRADE_STATE.md');

// Simple state – you can expand as needed
let state = {
  earned: 0,
  activeProjects: 0,
  tasksToday: 0,
};

let lastSummaryDate = null; // track if daily summary already generated

// Helper: append a line to the trade log
function appendLog(line) {
  const entry = `- ${new Date().toISOString()} ${line}\n`;
  fs.appendFileSync(LOG_FILE, entry, 'utf8');
}

// Helper: write (or overwrite) the state file with current numbers
function writeState() {
  const content = `# TRADE_STATE.md\n\nCapital: ${state.earned} USD (simulated)\nProjects: ${state.activeProjects}\nTasks Today: ${state.tasksToday}\n`;
  fs.writeFileSync(STATE_FILE, content, 'utf8');
}

// Helper: push minimal data to Mission Control via its REST API
async function pushDashboard() {
  try {
    const payload = {
      metrics: {
        earned: state.earned,
        activeProjects: state.activeProjects,
        tasksToday: state.tasksToday,
        target: 100000,
        startDate: new Date().toISOString()
      }
    };
    await fetch('http://localhost:8899/mc/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.error('Failed to push dashboard data', e);
  }
}

// Helper: generate daily summary (runs at 09:00 Asia/Kolkata)
function generateDailySummary() {
  const lines = fs.readFileSync(LOG_FILE, 'utf8').split('\n');
  let trades = 0, profit = 0, wins = 0;
  lines.forEach(l => {
    const m = l.match(/profit:\s*([+-]?\d+(?:\.\d+)?)/i);
    if (m) {
      trades++;
      const val = parseFloat(m[1]);
      profit += val;
      if (val > 0) wins++;
    }
  });
  const winRate = trades ? (wins / trades * 100).toFixed(2) : 0;
  const date = new Date().toISOString().split('T')[0];
  const summary = `# Daily Trading Summary - ${date}\n\n` +
    `**Trades executed:** ${trades}\n` +
    `**Total P&L:** ${profit.toFixed(2)} USD\n` +
    `**Win rate:** ${winRate}%\n`;
  const outPath = path.join(BASE, `SUMMARY_${date}.md`);
  fs.writeFileSync(outPath, summary, 'utf8');
  appendLog('Daily summary generated');
  console.log('Daily summary written to', outPath);
}

// Main heartbeat – runs every minute
setInterval(() => {
  const delta = Math.floor(Math.random() * 20) - 10; // -10 … +9 simulated P/L
  state.earned = Math.max(0, state.earned + delta);
  state.tasksToday += 1;
  appendLog(`Heartbeat – earned: ₹${state.earned}`);
  writeState();
  pushDashboard();

  // Check for daily summary time (09:00 Asia/Kolkata)
  const now = new Date();
  const istHour = now.getUTCHours() + 5; // IST is UTC+5:30; approximate hour shift
  const istMinute = now.getUTCMinutes() + 30;
  // Adjust overflow minutes
  let hour = istHour + Math.floor(istMinute / 60);
  let minute = istMinute % 60;
  if (hour >= 24) hour -= 24;
  const today = now.toISOString().split('T')[0];
  if (hour === 9 && minute === 0 && lastSummaryDate !== today) {
    generateDailySummary();
    lastSummaryDate = today;
  }
}, 60 * 1000);

// Initial startup entries
appendLog('Trader loop started – running 24/7');
writeState();
pushDashboard();
process.stdin.resume();
