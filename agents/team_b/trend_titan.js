const fs = require('fs');
const path = require('path');

// File paths
const workspaceFile = path.resolve(__dirname, 'team_b_workspace.md');
const masterFile = path.resolve(__dirname, '..', '..', 'master_trading_battle.json');


let cumulativePnL = 0;
let virtualBalance = 500;
let active = false;
let tradeEntry = null;

function writeWorkspace(line) {
  fs.appendFileSync(workspaceFile, line + '\n');
}

function readMaster() {
  try { return JSON.parse(fs.readFileSync(masterFile, 'utf8')); } catch(e) { return []; }
}

function getTimestamp(){
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  const hh = String(d.getHours()).padStart(2,'0');
  const min = String(d.getMinutes()).padStart(2,'0');
  const ss = String(d.getSeconds()).padStart(2,'0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}
function writeMaster(entry) {
  // Append entry as JSONL line with standardized fields
  entry.timestamp = getTimestamp();
  entry.team = 'Team_B';
  entry.strategy = 'Trend';
  const line = JSON.stringify(entry);
  fs.appendFileSync(masterFile, line + '\n', 'utf8');
}

// --- SCOUT: simulate a trend signal randomly ---
function scout() {
  // 30% chance of a trend signal
  if (Math.random() < 0.3) {
    const dir = Math.random() < 0.5 ? 'BULLISH' : 'BEARISH';
    const level = (Math.random() * 1000 + 10).toFixed(2);
    writeWorkspace(`TREND_SIGNAL: ${dir} @ $${level}`);
    return {dir, level: parseFloat(level)};
  }
  return null;
}

// --- SNIPER: confirm signal (simplified) ---
function sniper(signal) {
  if (!signal) return null;
  // Simple confirmation: 70% chance to approve
  if (Math.random() < 0.7) {
    const exec = signal.dir === 'BULLISH' ? 'BUY' : 'SELL';
    writeWorkspace(`EXECUTE_TREND: ${exec}`);
    return {exec, price: signal.level};
  }
  return null;
}

// --- SCRIBE: execute paper trade and track P&L ---
function scribe(exec) {
  if (!exec) return;
  active = true;
  tradeEntry = {price: exec.price, direction: exec.exec, entryTime: new Date().toISOString()};
  // log start in master file
  writeMaster({
    timestamp: new Date().toISOString(),
    team: 'Team_B',
    strategy: 'TrendFollowing',
    cumulative_pnl: cumulativePnL,
    status: 'IN_TRADE'
  });
}

// Simulate trade outcome after a few minutes (here simplified to immediate)
function evaluateTrade() {
  if (!active) return;
  // Simulate a profit/loss between -2% and +5% of virtual balance
  const changePct = (Math.random() * 7 - 2) / 100; // -2%..+5%
  const pnl = parseFloat((virtualBalance * changePct).toFixed(2));
  cumulativePnL += pnl;
  virtualBalance += pnl;
  active = false;
  // log closure in master file
  writeMaster({
    timestamp: new Date().toISOString(),
    team: 'Team_B',
    strategy: 'TrendFollowing',
    cumulative_pnl: parseFloat(cumulativePnL.toFixed(2)),
    status: 'IDLE'
  });
  // write summary to workspace
  writeWorkspace(`TRADE_DONE: ${tradeEntry.direction} entry=$${tradeEntry.price.toFixed(2)} pnl=$${pnl.toFixed(2)}`);
  tradeEntry = null;
}

function strategist() {
  // For simplicity, just note if cumulativePnl is negative after a trade
  if (!active && cumulativePnL < 0) {
    writeWorkspace('STRATEGIST: Consider trailing stop or adjust thresholds');
  }
}

function runCycle() {
  if (!active) {
    const signal = scout();
    const exec = sniper(signal);
    scribe(exec);
  } else {
    // evaluate after some time (here every cycle for demo)
    evaluateTrade();
  }
  strategist();

  const status = active ? 'TRENDING' : 'HUNTING';
  const pnlStr = cumulativePnL.toFixed(2);
  const activePos = active ? `${tradeEntry.direction} @ $${tradeEntry.price.toFixed(2)}` : 'None';
  writeWorkspace(`TEAM_B_STATUS: ${status} | TOTAL_TREND_PROFIT: $${pnlStr} | ACTIVE_POSITION: ${activePos}`);
}

// Run every 45 seconds
setInterval(runCycle, 45 * 1000);
// API key for NVIDIA-NIM dedicated model
const apiKey = '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';
const modelInfo = 'NVIDIA-NIM-Dedicated';

function testNvidiaNim() {
  try {
    const resp = require('child_process').execSync(`curl -s -H "Authorization: Bearer ${apiKey}" https://integrate.api.nvidia.com/v1/models`);
  } catch (e) {
    writeWorkspace('NVIDIA-NIM connectivity test failed for Team B');
  }
}
// Run connectivity test once at startup
testNvidiaNim();


console.log('Trend Titan (Team B) started');
// Keep alive
setInterval(()=>{}, 1e9);
