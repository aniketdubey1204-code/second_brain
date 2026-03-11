# 01 – Foundations (Hinglish)

## 1. Networking Basics
- **IP Address** – 4 octet number (e.g., `192.168.1.10`).
- **Subnet Mask** – network aur host ka division batata hai (`/24`).
- **Ports** – 0‑65535, common ones: `80` (HTTP), `443` (HTTPS), `22` (SSH), `3306` (MySQL). 
- **TCP vs UDP** – TCP reliable, UDP fast but unreliable.

## 2. OSI Model & How It Relates to Bugs
| Layer | Common Bugs |
|-------|------------|
| 7 – Application | XSS, SQLi, SSRF |
| 6 – Presentation | MIME‑type mismatch |
| 4 – Transport | Rate‑limit bypass |
| 3 – Network | IP‑based access control flaws |

## 3. HTTP Essentials (in Hinglish) 
- **Request Line** – `GET /path HTTP/1.1`
- **Headers** – `User‑Agent`, `Cookie`, `Referer`
- **Methods** – `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`
- **Status Codes** – `200 OK`, `302 Redirect`, `403 Forbidden`, `500 Server Error`
- **Common Mis‑configurations** – `Server` header leakage, `X‑Powered‑By` etc.

## 4. Linux Command‑Line for Hunters
```bash
# Basic navigation
ls -la
cd /var/www/html

# Search for interesting files
find . -name "*.php" -o -name "*.js"

# Netcat listener for reverse shells
nc -lvnp 4444
```
- **Permissions** – `chmod 644 file.php` (readable), `chmod 755 script.sh` (executable).

## 5. Setting Up a Lab
- **Kali Linux** – pre‑installed tools.
- **OWASP Juice Shop** – vulnerable web app (`docker run bkimminich/juice-shop`).
- **DVWA** – `docker run vulnerables/web-dvwa`.
- **Burp Suite Community** – intercepting proxy (`java -jar burpsuite_community.jar`).

## 6. Legal & Ethical Basics
- **Scope** – sirf listed assets pe hi test karo.
- **Bug Bounty Platforms** – HackerOne, Bugcrowd, Intigriti, Open Bug Bounty.
- **Disclosure** – responsible disclosure, no data leakage.

---

### 📚 Recommended Reading / Videos
- *The Web Application Hacker's Handbook* (Chapters 1‑3)
- *LiveOverflow* – "Web Hacking Basics" (YouTube)
- *PortSwigger Web Security Academy* – free labs

Stay tuned for the next module – Recon Tools! 🚀