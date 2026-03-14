import re, sys
path = r'D:\OpenClaw\workspace\second-brain\agents\trader\TRADE_LOG.md'
total = 0
with open(path, 'r', errors='ignore') as f:
    for line in f:
        m = re.search(r'earned:\s*[^0-9]*([0-9,]+)', line)
        if m:
            total += int(m.group(1).replace(',', ''))
print(total)
