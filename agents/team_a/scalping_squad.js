const fs = require('fs');
const path = require('path');

// File paths
const workspaceFile = path.resolve(__dirname, 'team_a_workspace.md');
const pnlFile = path.resolve(__dirname, 'team_a_pnl.json');
const masterFile = path.resolve(__dirname, '..', '..', 'master_trading_battle.json');

let tradeCount = 0;
let winCount = 0;
let cumulativePnL = 0;
let virtualBalance = 500;

function readWorkspace() {
  try { return fs.readFileSync(workspaceFile, 'utf8').trim().split('\n').filter(Boolean); }
  catch (e) { return []; }
}

function writeWorkspace(line) {
  fs.appendFileSync(workspaceFile, line + '\n');
}

function readPNL() {
  try { return JSON.parse(fs.readFileSync(pnlFile, 'utf8')); }
  catch (e) { return []; }
}

function writePNL(data) {
  fs.writeFileSync(pnlFile, JSON.stringify(data, null, 2), 'utf8');
}
function writeMaster(entry) {
  let data = [];
  try { data = JSON.parse(fs.readFileSync(masterFile, 'utf8')); } catch(e) {}
  data.push(entry);
  fs.writeFileSync(masterFile, JSON.stringify(data, null, 2), 'utf8');
}function writeMaster(entry) {
  let data = [];
  try { data = JSON.parse(fs.readFileSync(masterFile, 'utf8')); } catch(e) {}
  data.push(entry);
  fs.writeFileSync(masterFile, JSON.stringify(data, null, 2), 'utf8');
}
// --- SCOUT ---
function scout() {
  // Fetch current price from CoinDCX public API (e.g., BTCINR)
  let price = 0;
  try {
    const resp = require('child_process').execSync('curl -s https://public.coindcx.com/market_data/current_prices');
    const data = JSON.parse(resp.toString());
    // Use BTCINR price if available, fallback to first entry
    if (data['BTCINR'] && data['BTCINR'].price) {
      price = parseFloat(data['BTCINR'].price);
    } else {
      const firstKey = Object.keys(data)[0];
      price = parseFloat(data[firstKey].price);
    }
  } catch (e) {
    price = 0;
  }
  // Simulate RSI and Volume triggers randomly
  const signal = Math.random() < 0.4 ? (Math.random() < 0.5 ? 'BUY' : 'SELL') : null;
  if (signal && price > 0) {
    writeWorkspace(`SIGNAL: ${signal} @ $${price.toFixed(2)}`);
    return {signal, price};
  }
  return null;
}

// --- SNIPER ---
function sniper(lastSignal) {
  if (!lastSignal) return null;
  // Approve if signal present (simplified)
  writeWorkspace(`EXECUTE: ${lastSignal.signal}`);
  return {action: 'EXECUTE', signal: lastSignal.signal, price: lastSignal.price};
}

// --- SCRIBE ---
function scribe(exec) {
  if (!exec) return null;
  const entryPrice = parseFloat(exec.price);
  // Use virtual balance $500 per team
  let virtualBalance = 500;
  // Compute profit/loss based on fixed percentages
  const profitLoss = exec.signal === 'BUY' ? virtualBalance * 0.005 : -virtualBalance * 0.003; // BUY profit 0.5%, SELL loss 0.3%
  const pnl = parseFloat(profitLoss.toFixed(2));
  // Update cumulative PnL and virtual balance
  cumulativePnL += pnl;
  virtualBalance += pnl;
  const trade = {
    team: 'Scalper',
    entry: entryPrice,
    exit: entryPrice, // virtual trade, no real exit price
    pnl: pnl,
    status: pnl >= 0 ? 'CLOSED_PROFIT' : 'CLOSED_LOSS'
  };
  const data = readPNL();
  data.push(trade);
  writePNL(data);
  // Update counters
  tradeCount++;
  if (pnl > 0) winCount++;
  // Log summary to workspace
  writeWorkspace(`TRADE_DONE: ${exec.signal} entry=$${entryPrice.toFixed(2)} pnl=$${pnl.toFixed(2)}`);
}

// --- STRATEGIST ---
function strategist() {
  if (tradeCount > 0 && tradeCount % 5 === 0) {
    const winRate = (winCount / tradeCount) * 100;
    if (winRate < 40) {
      writeWorkspace('COOLDOWN: Adjust RSI thresholds or wait 10 mins');
    }
  }
}

function runCycle() {
  // Clear previous lines for this cycle (optional) – just proceed
  const signal = scout();
  const exec = sniper(signal);
  scribe(exec);
  strategist();
  // Summary
  const status = exec ? 'IN_TRADE' : 'SCANNING';
  const currentPnl = cumulativePnL.toFixed(2);
  writeWorkspace(`TEAM_A_STATUS: ${status} | CURRENT_PNL: $${currentPnl}`);
}

// Run every 20 seconds
setInterval(runCycle, 20 * 1000);

// Periodic master entry every 30 seconds
setInterval(() => {
  const entry = {
    timestamp: new Date().toISOString().split('T')[1].split('Z')[0].slice(0,8),
    team: 'Team_A',
    strategy: 'Scalping',
    cumulative_pnl: parseFloat(cumulativePnL.toFixed(2)),
    status: 'ACTIVE'
  };
  writeMaster(entry);
}, 30 * 1000);

console.log('Scalping Squad (Team A) started');
// Keep process alive
setInterval(()=>{}, 1e9);
