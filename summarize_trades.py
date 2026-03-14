import json, sys, collections, os
path=os.path.join('trading_bot','logs','trades.json')
with open(path) as f:
    data=json.load(f)
total=len(data)
total_pnl=sum(item.get('pnl',0) for item in data)
reason_counts=collections.Counter(item.get('reason') for item in data)
sym_counts=collections.Counter(item.get('symbol') for item in data)
print('Total trades:', total)
print('Total P&L:', total_pnl)
print('Reason breakdown:')
for r,c in reason_counts.items():
    print(f'  {r}: {c}')
print('Symbol breakdown:')
for s,c in sym_counts.items():
    print(f'  {s}: {c}')
