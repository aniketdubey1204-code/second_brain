# 02 – Recon Tools (Hinglish) – Detailed Beginner Guide

**Recon** yaani *reconnaissance* is phase me aap target ka **attack surface** map karte ho – kaunse sub‑domains, ports, directories, aur technologies publicly accessible hain. Ye data aapke later exploitation steps ko focused banata hai, time waste kam karta hai, aur false positives ko reduce karta hai.

## Kyon Recon Zarrori Hai?
- **Scope confirmation** – pata chalta hai kaunse assets *in‑scope* hain.
- **Attack surface reduction** – sirf open services ko test karo, baaki ignore karo.
- **Automation foundation** – kai scanners (sqlmap, xsser) ko proper target list chahiye; recon wo list deta hai.

---

## 2.1 Sub‑domain Enumeration (Subdomains ka Pata Lagana)
Sub‑domains अक्सर एक बड़ी कंपनी के अलग‑अलग प्रोडक्ट या environment को expose करते हैं (dev., api., admin., आदि). इन्हें enumerate करने के लिए कई tools और techniques हैं.

| Tool | Why use? | Quick command | Output |
|------|----------|--------------|--------|
| **Sublist3r** | कई public sources (crt.sh, VirusTotal) से जल्दी list | `sublist3r -d target.com -o subdomains.txt` | `subdomains.txt` – ek line‑per‑domain |
| **Amass** | Passive + active enumeration, DNS‑zone transfer checks | `amass enum -d target.com -o amass.txt` | Detailed list, includes IPs if found |
| **Assetfinder** | Ultra‑fast, केवल sub‑domains | `assetfinder --subs-only target.com > assets.txt` | Simple list, no duplicates |
| **MassDNS** | बड़ी लिस्ट को एक साथ resolve करने के लिए fast DNS resolver | `massdns -r resolvers.txt -t A -q subdomains.txt -o S > results.txt` | `results.txt` – domain + IP mapping |

**How to run:**
1. Install (`pip install sublist3r`, `apt install amass`, `go get -u github.com/tomnomnom/assetfinder`).
2. Run tools, combine outputs:
```bash
cat subdomains.txt amass.txt assets.txt | sort -u > all_subdomains.txt
```
3. Verify live hosts (optional) with `httprobe` or `naabu`.

---

## 2.2 Wayback Machine & Archive.org (Historical URLs)
- **Why:** पुरानी versions में hidden admin panels, backup files, या old API endpoints रह सकते हैं.
- **Tools:**
  - **waybackurls** – Wayback Machine से सभी संभावित URLs लेता है.
    ```bash
    waybackurls target.com > wayback.txt
    ```
  - **gau** (GetAllUrls) – कई sources (Wayback, CommonCrawl, etc.) aggregate करता है.
    ```bash
    gau --providers wayback,commoncrawl target.com > gau.txt
    ```
- **Combine & dedupe:**
```bash
cat wayback.txt gau.txt | sort -u > historic_urls.txt
```
- Use `grep`/`awk` later to pull interesting paths (admin, login, .git).

---

## 2.3 Port Scanning & Service Fingerprinting
Port scan आपको बताता है कि target पर कौन‑कौन se TCP/UDP services चल रही हैं, और क्या version information उपलब्ध है.

| Tool | When to use? | Command (example) | What you get |
|------|--------------|-------------------|-------------|
| **Nmap** | Detailed scan, OS & version detection | `nmap -sS -sV -p- -T4 target.com -oN nmap.txt` | Open ports, service versions, OS guess |
| **Masscan** | Ultra‑fast scan of entire port range (million/second) | `masscan -p1-65535 target.com --rate=5000 -oX masscan.xml` | Super‑fast list of open ports (feed to Nmap later) |
| **Rustscan** | Fast port discovery + automatic Nmap pipe | `rustscan -a target.com -b 5000 -- -sV -oN rustscan.txt` | Open ports with version info in one step |

**Typical workflow:**
1. Run masscan for speed.
2. Feed results to nmap: `masscan -p1-65535 target.com -oX - | nmap -sV -iL - -oN detailed.txt`.
3. Filter for interesting services (`grep -i "http"`).

---

## 2.4 Directory & File Brute‑Forcing (Hidden Endpoints)
Many bugs reside in *unlinked* files – admin panels, backup scripts, test endpoints.

| Tool | What it does? | Example command |
|------|---------------|-----------------|
| **Dirsearch** (Python) | Wordlist‑based directory fuzzing | `python3 dirsearch.py -u https://target.com -e php,js,html -x 403,404` |
| **Gobuster** (Go) | Fast, multithreaded dir/file brute‑force | `gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt -x php,js,txt` |
| **FFUF** (Fast web fuzzer) | Flexible, supports status‑code filtering | `ffuf -u https://target.com/FUZZ -w /usr/share/wordlists/dirb/common.txt -mc 200,302` |
| **gobuster dns** | Sub‑domain brute‑force (if wordlist available) | `gobuster dns -d target.com -w subdomains.txt` |

**Wordlist recommendation:** Use `SecLists/Discovery/Web-Content/common.txt` for generic fuzzing, and `SecLists/Discovery/DNS/subdomains-top1million-5000.txt` for DNS.

---

## 2.5 Technology Fingerprinting (Know the Stack)
Knowing if a site runs WordPress, Django, Node.js, etc., helps you pick relevant vulnerability checks.
- **Wappalyzer** – Chrome/Firefox extension, click‑and‑see.
- **WhatWeb** – CLI, gives detailed tech stack.
  ```bash
  whatweb -v https://target.com > whatweb.txt
  ```
- **BuiltWith** – Web UI for deeper analysis (sometimes requires sign‑up).
- **whatcms** – lightweight tool (`whatcms -url https://target.com`).

---

## 2.6 Open‑Source Intelligence (OSINT) – Extra Nuggets
- **Google Dorking** – special search queries to expose admin panels, config files, or exposed `.git` directories.
  - Example: `site:target.com inurl:admin`
- **Shodan** – IoT & server search engine; useful for finding open services, exposed databases.
  - Example: `shodan host 203.0.113.5`
- **Hakrawler** – crawler to enumerate linked URLs inside a domain.
  ```bash
  hakrawler -url https://target.com -depth 3 -plain -output urls.txt
  ```
- **crt.sh** – Certificate Transparency log search for sub‑domains.
  ```bash
  curl "https://crt.sh/?q=%25.target.com&output=json" | jq -r '.[].name_value' | sort -u > ct_subdomains.txt
  ```

---

## 2.7 Simple Automation Script (Bash) – One‑liner Recon Wrapper
```bash
#!/usr/bin/env bash
# quick‑run recon for a single target
TARGET=$1
if [[ -z "$TARGET" ]]; then echo "Usage: $0 <target.com>"; exit 1; fi

# 1. Subdomains
sublist3r -d $TARGET -o subdomains.txt
amass enum -d $TARGET -o amass.txt
cat subdomains.txt amass.txt | sort -u > all_subs.txt

# 2. Port scan (rustscan + nmap)
rustscan -a $TARGET -b 5000 -- -sV -oN rustscan.txt

# 3. Directory brute force (dirsearch)
python3 dirsearch.py -u https://$TARGET -e php,js,html -x 403,404 -o dirsearch.txt

# 4. Tech fingerprint
whatweb -v https://$TARGET > whatweb.txt

echo "--- Recon complete ---"
echo "Files generated: subdomains.txt, all_subs.txt, rustscan.txt, dirsearch.txt, whatweb.txt"
```
- Save as `recon.sh`, make executable (`chmod +x recon.sh`), run `./recon.sh target.com`.

---

### 📚 Recommended Resources & Wordlists
- **PortSwigger Academy – “Scanning and Enumeration”** (free labs)
- **OWASP Amass – Documentation** (official website)
- **SecLists** – massive collection of wordlists (`https://github.com/danielmiessler/SecLists`).
- **Awesome Bug Bounty** – curated list of tools (`https://github.com/nomi-sec/awesome-bugbounty`).

Now you have a solid recon foundation. Next step: **Vulnerability Types** – explore common bugs you’ll actually exploit. 🚀