# 00 – Bug Bounty Kya Hai? (Hinglish)

**Bug bounty** ek aisa program hai jahan companies apni web‑applications, mobile apps, ya infrastructure me security bugs ko dhundhne ke liye **reward** deti hain. Aap, ek security researcher ("hunter") ke roop me, in bugs ko responsibly report karte ho, aur agar bug genuine aur **in‑scope** hota hai to aapko paise milte hain.

## Kyun Bug Bounty?
- **Paise kamane ka chance** – simple bugs se $50‑$500, critical bugs se $10k‑$50k tak.
- **Skill development** – real‑world apps pe kaam karne se networking, HTTP, Linux, aur exploitation skills sharpen hoti hain.
- **Community recognition** – HackerOne, Bugcrowd, Intigriti platforms aapko ranking, badges, aur reputation points dete hain (future contracts me kaam aata hai).
- **Legal & safe** – jab tak aap scope follow karte ho, sab legit hai.

## Bug Bounty Ka Basic Workflow (Step‑by‑Step)
1. **Platform pe sign‑up** – HackerOne, Bugcrowd, Intigriti, ya koi private program (usually invitation‑only).
2. **Scope ko read & understand karo** – program ke rules, **assets list**, aur excluded endpoints padho. Out‑of‑scope testing illegal ho sakti hai.
3. **Recon (Discovery)** – target ki sub‑domains, hidden endpoints, tech stack, aur open ports discover karo. (Details in *Recon Tools* module.)
4. **Vulnerability hunting** – XSS, SQLi, RCE, SSRF, etc. ke liye manual ya automated testing.
5. **Proof‑of‑Concept (PoC)** – ek simple demo (curl command, screenshot, ya short video) jo bug ko clearly show kare.
6. **Report likho** – concise, structured, sab proof ke sath submit karo. Include impact, severity, aur remediation suggestions.
7. **Payout receive karo** – platform verification ke baad reward release hota hai. Agar bug triage stage me reject ho, feedback leke improve karo.

## Important Terminology (Brief)
- **Scope** – wahi assets (domains, APIs, mobile apps) jinke andar aap testing kar sakte ho. Out‑of‑scope pe test karna illegal ho sakta hai.
- **Severity** – bug ka impact level (Low, Medium, High, Critical). High severity usually zyada reward deti hai.
- **Responsible Disclosure** – company ko pehle inform karna, public disclosure tab tak delay karna jab tak fix na ho.
- **Duplication** – agar koi aur pehle se hi same bug report kar chuka hai, aapko reward nahi milta.
- **Triaging** – platform ki security team ki initial review; agar bug valid hai to *accepted*, nahi to *rejected* (with reasons).

## Getting Started Quickly (Practical Steps)
- **Create a free account** on HackerOne (or any platform you prefer). Verify email and enable 2FA.
- **Pick a beginner‑friendly program** – look for tags like `easy`, `newbie`, `web`, `low‑hanging fruit`. Example: "Acme Corp – Web Application (Beginner)".
- **Set up a local lab**:
  - Install Kali Linux (or Ubuntu + tools).
  - Run a vulnerable app like **OWASP Juice Shop** (`docker run -d -p 3000:3000 bkimminich/juice-shop`).
  - Install **Burp Suite Community** (`java -jar burpsuite_community.jar`).
- **Read the platform’s “Getting Started” guide** – explains how to submit a report, expected format, and any bounty caps.
- **Join community chats** (HackerOne Slack, Discord bug bounty channels) – help milti hai, new programs ke alerts milte hain.

Ab aapko bug bounty ka high‑level overview mil gaya hai. Agla module **Recon Tools** me hum detail se batayenge ki kaunse tools kaunse kaam ke liye hain, aur kaise use karte hain. Happy hunting, bhai!
