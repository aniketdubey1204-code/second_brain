// trade_loop.js – placeholder 24‑x‑7 trading agent
// ---------------------------------------------------------------
// This script runs indefinitely, simulating a trading bot.
// It periodically (every 60 seconds) writes a heartbeat entry to
// the trader's log files and pushes a minimal dashboard update
// to the local Mission Control server (http://localhost:8899).
// Replace the internals with your real trading logic when ready.

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
        // keep the same target as the dashboard expects
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
    // Silently ignore – the server may be down during boot
    console.error('Failed to push dashboard data', e);
  }
}

// Main heartbeat – runs every minute
setInterval(() => {
  // Simulate a tiny profit/loss change for demo purposes
  const delta = Math.floor(Math.random() * 20) - 10; // -10 … +9
  state.earned = Math.max(0, state.earned + delta);
  state.tasksToday += 1;
  // Log & write state
  appendLog(`Heartbeat – earned: ₹${state.earned}`);
  writeState();
  // Push to Mission Control so UI updates live
  pushDashboard();
}, 60 * 1000); // 60 000 ms = 1 min

// Keep the process alive – initial log entry
appendLog('Trader loop started – running 24/7');
writeState();
pushDashboard();

// Prevent Node from exiting (in case setInterval is cleared elsewhere)
process.stdin.resume();
