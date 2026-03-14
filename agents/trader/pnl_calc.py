#!/usr/bin/env python3
# pnl_calc.py – incremental P&L calculator for TRADE_LOG.md
# ---------------------------------------------------------
# It remembers the last byte offset it processed in a tiny state file
# (pnl_state.txt) so each run only scans the *new* lines that were appended
# since the previous run. This keeps the job cheap even for a multi‑MB log.
# ---------------------------------------------------------

import os, re, json
from pathlib import Path

LOG_PATH   = Path(r'D:\OpenClaw\workspace\second-brain\agents\trader\TRADE_LOG.md')
STATE_PATH = LOG_PATH.parent / 'pnl_state.txt'   # stores last offset & total

def load_state():
    if STATE_PATH.is_file():
        with STATE_PATH.open('r') as f:
            data = json.load(f)
            return data.get('offset', 0), data.get('total', 0)
    return 0, 0

def save_state(offset, total):
    with STATE_PATH.open('w') as f:
        json.dump({'offset': offset, 'total': total}, f)

def main():
    offset, total = load_state()
    earned_pat = re.compile(r'earned:\s*₹?\s*([0-9,]+)')

    with LOG_PATH.open('r', encoding='utf-8', errors='ignore') as f:
        f.seek(offset)
        new_data = f.read()
        new_offset = f.tell()

    for line in new_data.splitlines():
        m = earned_pat.search(line)
        if m:
            total += int(m.group(1).replace(',', ''))

    # Update state file
    save_state(new_offset, total)

    # Optional: write a human‑readable summary file (you can also send via Telegram)
    summary_path = LOG_PATH.parent / 'pnl_summary.txt'
    with summary_path.open('w') as out:
        out.write(f'Total earned so far: ₹{total:,}\n')
    print(f'P&L updated – total = ₹{total:,}')

if __name__ == '__main__':
    main()
