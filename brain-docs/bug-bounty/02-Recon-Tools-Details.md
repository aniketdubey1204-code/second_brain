# 02 – Recon Tools (Hinglish) – Detailed Beginner Guide

**Recon** yaani *reconnaissance* us phase ko kehte hain jahan aap target ka map banate ho – kaunse sub‑domains exist karte hain, kaunse ports khule hain, kaunse technology stack use ho rahi hai, etc. Ye data aapko later ke vulnerability testing ke liye direction deta hai.

---

## क्यों Recon जरूरी है?
- **Scope identification** – aapko pata chalega ki kaunse sub‑domains/paths *in‑scope* hain.
- **Attack surface reduction** – sirf jo visible services hain unhi pe focus karoge, time bachega.
- **Automation foundation** – aage ke automated scanners (nikto, sqlmap, etc.) ke liye pehle ki data ki zaroorat hoti hai.

---

## 2.1 Sub‑domain Enumeration (Subdomains ka pata lagana)
| Tool | क्या करता है? | कमांड (example) | कब use करो |
|------|---------------|----------------|------------|
| **Sublist3r** | Multiple public sources (crt.sh, VirusTotal) se sub‑domains fetch karta hai. | `sublist3r -d target.com -o subdomains.txt` | Quick start, low‑resource.
| **Amass** | Passive + active enumeration, DNS bruteforce, DNS‑zone transfer checks. | `amass enum -d target.com -o amass.txt` | Detailed recon, when you need comprehensive list.
| **Assetfinder** | Simple tool – only sub‑domains, fast. | `assetfinder --subs-only target.com > assets.txt` | Fast, when limited time ho.
| **MassDNS** | High‑speed DNS resolver – bulk lookups ke liye. | `massdns -r resolvers.txt -t A -q subdomains.txt -o S > results.txt` | When you already have a big list of possible sub‑domains.

**How to use:**
1. Install tool (`pip install sublist3r` ya `apt install amass`).
2. Run command, output file me domain list aayegi.
3. `cat *.txt | sort -u > all_subdomains.txt` – duplicate remove karo.

---

## 2.2 Wayback Machine & Archive.org (Historic URLs)
- **Why:** Old versions of the site may expose hidden endpoints (admin panels, backup files).
- **Tools:**
  - **waybackurls** – simple python script jo `https://web.archive.org/` se URLs scrape karta hai.
  - **gau** (GetAllUrls) – multiple archives (Wayback, CommonCrawl, etc.) se URLs pull karta hai.
- **Commands:**
```bash
waybackurls target.com > wayback.txt

gau --providers wayback,commoncrawl target.com > gau.txt
```
- **Next step:** `cat wayback.txt gau.txt | sort -u > historical_urls.txt`

---

## 2.3 Port Scanning & Service Fingerprinting (Ports aur services ka pata lagana)
| Tool | क्या करता है? | कमांड | कब इस्तेमाल?
|------|---------------|--------|-----------|
| **Nmap** | TCP SYN scan, version detection, OS guessing. | `nmap -sS -sV -p- -T4 target.com -oN nmap.txt` | General purpose, detailed report.
| **Masscan** | Ultra‑fast port scanner (millions per second). | `masscan -p1-65535 target.com --rate=1000 -oX masscan.xml` | When you want a quick “open ports” list, then feed to Nmap for service detection.
| **Rustscan** | Fast port discovery + pipes to Nmap automatically. | `rustscan -a target.com -b 5000 -- -sV -oN rustscan.txt` | Simpler syntax, good for large IP ranges.

**Typical workflow:**
1. `masscan` ya `rustscan` se open ports list banaye.
2. `nmap -sV -iL <portlist>` se service version details lein.
3. Result ko `grep`/`awk` se filter karke specific services (e.g., `http`, `ssh`) nikale.

---

## 2.4 Directory & File Brute‑Forcing (Hidden pages/folders dhundhna)
- **Why:** Many bugs (XSS, LFI, admin panels) hidden directories mein hoti hain.
- **Tools & Quick Start:**
  - **Dirsearch** (Python):
    ```bash
    python3 dirsearch.py -u https://target.com -e php,js,html -x 403,404
    ```
    *`-e`* file extensions, *`-x`* status codes ignore.
  - **Gobuster** (Go):
    ```bash
    gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt -x php,js,txt
    ```
  - **FFUF** (Fast web fuzzer):
    ```bash
    ffuf -u https://target.com/FUZZ -w /usr/share/wordlists/dirb/common.txt -mc 200,204,302
    ```
    *`-mc`* – only show these status codes.
- **How to run:** Choose wordlist (`SecLists/Discovery/Web-Content`), set extensions, run. Results file me discovered paths.

---

## 2.5 Technology Fingerprinting (Stack ka pata lagana)
- **Why:** Knowing "is it PHP, Node, WordPress?" helps you pick relevant exploits.
- **Tools:**
  - **Wappalyzer** – Chrome extension, point and click UI.
  - **WhatWeb** – CLI; quick output.
    ```bash
    whatweb -v https://target.com > whatweb.txt
    ```
  - **BuiltWith.com** – manual web UI for deep dive.
- **Output:** Usually shows framework, CMS, server software, JavaScript libraries.

---

## 2.6 Open‑Source Intelligence (OSINT) – Extra Nuggets
- **Google Dorking** – special search queries to uncover hidden admin pages, config files.
  - Example: `site:target.com inurl:admin`.
- **Shodan** – IoT/servers ka global search engine. Use `shodan host <IP>` to see open services.
- **Hakrawler** – recursive crawler to map internal links.
  ```bash
  hakrawler -url https://target.com -depth 3 -plain -output urls.txt
  ```

---

## 2.7 Simple Automation Script (Bash) – One‑liner Recon Wrapper
```bash
#!/usr/bin/env bash
TARGET=$1
if [ -z "$TARGET" ]; then echo "Usage: $0 <target.com>"; exit 1; fi

# Subdomains
sublist3r -d $TARGET -o subdomains.txt
amass enum -d $TARGET -o amass.txt
cat subdomains.txt amass.txt | sort -u > all_subs.txt

# Ports (Rustscan -> Nmap)
rustscan -a $TARGET -b 5000 -- -sV -oN rustscan.txt

# Directory brute force (Dirsearch)
python3 dirsearch.py -u https://$TARGET -e php,js,html -x 403,404 -o dirsearch.txt

# Tech fingerprint (WhatWeb)
whatweb -v https://$TARGET > whatweb.txt

echo "Recon complete. Files: subdomains.txt, all_subs.txt, rustscan.txt, dirsearch.txt, whatweb.txt"
```
- Save as `recon.sh`, `chmod +x recon.sh`, run `./recon.sh target.com`.

---

### 📚 Further Reading / Tools
- **PortSwigger Academy – Scanning & Enumeration** (free labs)
- **OWASP Amass – Documentation**
- **SecLists** – massive wordlist collection (`https://github.com/danielmiessler/SecLists`).

Ab aapko har tool ka purpose, basic command, aur kab use karna hai, sab clear ho gaya hoga. Recon ke baad aage ke modules (vulnerability types, exploitation, reporting) aapko deeper level pe le jayenge.

---

*Happy hunting, bhai!*