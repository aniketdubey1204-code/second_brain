---
name: desktop_control
description: Advanced desktop automation with mouse, keyboard, screen, window, and clipboard control
user-invocable: true
metadata:
  { "openclaw": { "requires": { "bins": ["python"] }, "primaryEnv": "PYTHONPATH" } }
---

# Desktop Control Skill

Provides pixel‑perfect mouse movement, lightning‑fast keyboard input, screen capture, window management, and clipboard operations. Built on **pyautogui**, **pygetwindow**, **pyperclip**, and **opencv** for image recognition.

## Quick Usage (from any OpenClaw skill)
```python
from skills.desktop_control import DesktopController

dc = DesktopController(failsafe=True, require_approval=False)
# Move mouse and click

dc.move_mouse(500, 300, duration=0.2)
dc.click()
# Type text

dc.type_text("Hello from OpenClaw!", wpm=80)
# Screenshot

img = dc.screenshot(filename="screenshot.png")
```

All methods are documented in the full API reference (see the original package).