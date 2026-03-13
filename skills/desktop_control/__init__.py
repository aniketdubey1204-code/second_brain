"""
Desktop Control – Revised version
Provides reliable window activation, app launching, URL opening, and WhatsApp messaging.
"""

import os
import sys
import time
import subprocess
import logging
from typing import List, Optional

import pyautogui
import pygetwindow as gw

# Basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure pyautogui for instant actions
pyautogui.MINIMUM_DURATION = 0
pyautogui.MINIMUM_SLEEP = 0
pyautogui.PAUSE = 0

class DesktopController:
    """High‑level desktop automation wrapper.
    
    All methods are safe‑guarded with optional failsafe and user‑approval flags.
    The default instance is used throughout OpenClaw for tasks like opening apps,
    navigating URLs, and sending WhatsApp messages.
    """
    def __init__(self, failsafe: bool = True, require_approval: bool = False):
        self.failsafe = failsafe
        self.require_approval = require_approval
        pyautogui.FAILSAFE = failsafe
        # Cache screen size once
        self.screen_width, self.screen_height = pyautogui.size()
        logger.info(f"DesktopController init – screen {self.screen_width}x{self.screen_height}, failsafe={failsafe}")

    # ==================== Utility ====================
    def _check_approval(self, action: str) -> bool:
        if not self.require_approval:
            return True
        resp = input(f"Allow: {action}? [y/N]: ").strip().lower()
        approved = resp == "y" or resp == "yes"
        if not approved:
            logger.warning(f"User rejected action: {action}")
        return approved

    # ==================== Window handling ====================
    def get_all_windows(self) -> List[str]:
        """Return a list of all top‑level window titles."""
        try:
            titles = gw.getAllTitles()
            return [t for t in titles if t.strip()]
        except Exception as e:
            logger.error(f"Failed to get window titles: {e}")
            return []

    def activate_window(self, title_substring: str) -> bool:
        """Activate the first window whose title contains *title_substring* (case‑insensitive)."""
        try:
            windows = [w for w in gw.getAllWindows() if title_substring.lower() in w.title.lower()]
            if not windows:
                logger.info(f"No window found matching '{title_substring}'")
                return False
            win = windows[0]
            win.activate()
            logger.info(f"Activated window: '{win.title}'")
            return True
        except Exception as e:
            logger.error(f"activate_window error: {e}")
            return False

    # ==================== App launching ====================
    def launch_app(self, exe_path: str, args: Optional[List[str]] = None) -> bool:
        """Launch an executable given by *exe_path*.
        Returns True on success.
        """
        if not os.path.isfile(exe_path):
            logger.error(f"Executable not found: {exe_path}")
            return False
        try:
            cmd = [exe_path] + (args or [])
            subprocess.Popen(cmd, shell=False)
            logger.info(f"Launched app: {cmd}")
            return True
        except Exception as e:
            logger.error(f"Failed to launch {exe_path}: {e}")
            return False

    def launch_whatsapp(self) -> bool:
        """Try to start the WhatsApp desktop client.
        Checks common install locations and falls back to Run dialog.
        """
        # Common locations
        candidates = []
        local = os.getenv('LOCALAPPDATA')
        prog = os.getenv('ProgramFiles')
        prog_x86 = os.getenv('ProgramFiles(x86)')
        if local:
            candidates.append(os.path.join(local, 'WhatsApp', 'WhatsApp.exe'))
        if prog:
            candidates.append(os.path.join(prog, 'WhatsApp', 'WhatsApp.exe'))
        if prog_x86:
            candidates.append(os.path.join(prog_x86, 'WhatsApp', 'WhatsApp.exe'))
        # Try each candidate
        for path in candidates:
            if self.launch_app(path):
                return True
        # Fallback: use Run dialog (Win+R)
        logger.info("WhatsApp not found in standard paths – using Run dialog")
        self.hotkey('win')
        time.sleep(0.5)
        self.type_text('whatsapp')
        self.press('enter')
        return True

    # ==================== Keyboard / Mouse ====================
    def hotkey(self, *keys: str, interval: float = 0.05):
        if not self._check_approval(f"hotkey {'+'.join(keys)}"):
            return
        pyautogui.hotkey(*keys, interval=interval)
        logger.debug(f"Hotkey pressed: {'+'.join(keys)}")

    def press(self, key: str, presses: int = 1, interval: float = 0.1):
        if not self._check_approval(f"press {key} x{presses}"):
            return
        pyautogui.press(key, presses=presses, interval=interval)
        logger.debug(f"Key pressed: {key} x{presses}")

    def type_text(self, text: str, interval: float = 0.0):
        if not self._check_approval(f"type text: {text[:30]}"):
            return
        pyautogui.write(text, interval=interval)
        logger.debug(f"Typed text (len={len(text)})")

    def move_mouse(self, x: int, y: int, duration: float = 0.0):
        if not self._check_approval(f"move mouse to ({x},{y})"):
            return
        pyautogui.moveTo(x, y, duration=duration)
        logger.debug(f"Mouse moved to ({x},{y})")

    def click(self, button: str = 'left', clicks: int = 1, interval: float = 0.1):
        if not self._check_approval(f"click {button} x{clicks}"):
            return
        pyautogui.click(button=button, clicks=clicks, interval=interval)
        logger.debug(f"Mouse clicked {button} x{clicks}")

    # ==================== URL handling ====================
    def open_url(self, url: str, new_tab: bool = True) -> bool:
        """Open *url* using the system default browser.
        Uses the webbrowser module which respects the default set on the machine.
        """
        import webbrowser
        try:
            if new_tab:
                webbrowser.open_new_tab(url)
            else:
                webbrowser.open(url)
            logger.info(f"Opened URL: {url}")
            return True
        except Exception as e:
            logger.error(f"Failed to open URL {url}: {e}")
            return False

    # ==================== WhatsApp messaging ====================
    def send_whatsapp_message(self, contact: str, message: str) -> bool:
        """Open WhatsApp (desktop or web) and send *message* to *contact*.
        Returns True on success.
        """
        # Ensure the app/window is active
        if not self.activate_window('WhatsApp'):
            # try launching the desktop client
            self.launch_whatsapp()
            time.sleep(5)
            if not self.activate_window('WhatsApp'):
                logger.info("Desktop WhatsApp not available – opening WhatsApp Web")
                self.open_url('https://web.whatsapp.com')
                time.sleep(8)
        # At this point a WhatsApp window should be present
        # Use Ctrl+F to focus the chat search, type contact, Enter
        self.hotkey('ctrl', 'f')
        time.sleep(0.5)
        self.type_text(contact)
        time.sleep(0.3)
        self.press('enter')
        time.sleep(1.5)  # give chat to load
        # Type the actual message and send
        self.type_text(message)
        time.sleep(0.2)
        self.press('enter')
        logger.info(f"Sent WhatsApp message to {contact}: {message}")
        return True

    # ==================== Misc ====================
    def screenshot(self, filename: Optional[str] = None):
        img = pyautogui.screenshot()
        if filename:
            img.save(filename)
            logger.info(f"Screenshot saved to {filename}")
        return img
"""
