import sys, time
sys.path.append(r'D:\OpenClaw\workspace\second-brain')
from skills.desktop_control import DesktopController

dc = DesktopController(failsafe=False, require_approval=False)
url = 'https://www.youtube.com/results?search_query=Maharani+Arpit+Bala'
# Open URL using preferred browser (Comet fallback Chrome)
if not dc.open_url(url):
    print('Failed to open URL')
    sys.exit(1)
# Wait for page to load
time.sleep(5)
# Tab to first video (approx 5 tabs)
for _ in range(5):
    dc.press('tab')
    time.sleep(0.2)
# Open video
dc.press('enter')
# Wait for video page
time.sleep(3)
# Start playback (k toggles play/pause)
dc.press('k')
print('Played Maharani by Arpit Bala')
