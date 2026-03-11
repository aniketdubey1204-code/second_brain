# 02 – Recon Tools (Hinglish)

Recon is the **first** step – target ko locate aur map karna. Isme aapko sub‑domains, hidden endpoints, aur technology stack pata lagana hota hai.

## 2.1 Subdomain Enumeration
| Tool | Command | Notes |
|------|---------|-------|
| **Sublist3r** | `sublist3r -d target.com -o subdomains.txt` | Fast, uses many sources |
| **Amass** | `amass enum -d target.com -o amass.txt` | Passive + active mode |
| **Assetfinder** | `assetfinder --subs-only target.com > assets.txt` | Simple & quick |
| **MassDNS** | `massdns -r resolvers.txt -t A -q subdomains.txt -o S > results.txt` | Massive DNS lookups |

## 2.2 Wayback Machine & Archive.org
- **Waybackurls** – URL snapshots collect karta hai:
```bash
waybackurls target.com > wayback.txt
```
- Use **gau** (GetAllUrls) for more sources:
```bash
gau --providers wayback,commoncrawl target.com > gau.txt
```

## 2.3 Port Scanning & Service Fingerprinting
| Tool | Command | Description |
|------|---------|-------------|
| **Nmap** | `nmap -sS -sV -p- -T4 target.com -oN nmap.txt` | Full TCP scan, version detection |
| **Masscan** | `masscan -p1-65535 target.com --rate=1000 -oX masscan.xml` | Ultra‑fast, then feed to Nmap |
| **Rustscan** | `rustscan -a target.com -b 5000 -- -sV -oN rustscan.txt` | Fast port discoverer |

## 2.4 Directory & File Brute‑Forcing
- **Dirsearch** (Python):
```bash
python3 dirsearch.py -u https://target.com -e php,js,html -x 403,404
```
- **Gobuster** (Go):
```bash
gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt -x php,js,txt
```
- **FFUF** (Fast web fuzzer):
```bash
ffuf -u https://target.com/FUZZ -w /usr/share/wordlists/dirb/common.txt -mc 200,204,302
```

## 2.5 Technology Fingerprinting
- **Wappalyzer** Chrome extension – quick UI.
- **WhatWeb** CLI:
```bash
whatweb -v https://target.com > whatweb.txt
```
- **BuiltWith** website – manual lookup.

## 2.6 Open‑Source Intelligence (OSINT)
- **Google Dorking** – example: `site:target.com inurl:admin`.
- **Shodan** – device level info (`shodan host IP`).
- **Crawler‑Based** – `hakrawler` for linked URLs.

## 2.7 Automation Scripts (Bash/Python snippets)
```bash
#!/usr/bin/env bash
# Quick recon wrapper
TARGET=$1
sublist3r -d $TARGET -o subdomains.txt
amass enum -d $TARGET -o amass.txt
cat subdomains.txt amass.txt | sort -u > all_subs.txt
nmap -sS -sV -iL all_subs.txt -oN nmap.txt
```

---

### 📚 Resources
- *PortSwigger Academy – “Scanning and Enumeration”*
- *OWASP Amass – Documentation*
- *SecLists* wordlist repo for dir busting (`https://github.com/danielmiessler/SecLists`).

Next up: **Vulnerability Types** – chalo deeper dive karte hain! 🚀