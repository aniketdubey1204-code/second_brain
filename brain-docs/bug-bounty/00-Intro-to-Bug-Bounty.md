# 00 – Bug Bounty Kya Hai? (Hinglish)

**Bug bounty** ek aisa program hai jahan companies apni web‑applications, mobile apps, ya infrastructure me security bugs ko dhundhne ke liye **reward** deti hain. Aap, ek security researcher (ya “hunter”) ke roop me, in bugs ko responsibly report karte ho, aur agar bug genuine aur in‑scope hota hai to aapko paise milte hain.

## Kyun Bug Bounty?
- **Paise kamane ka mauka** – simple bugs se bhi $50‑$500 tak mil sakte hain, aur critical bugs se $10k+ tak.
- **Skill development** – real‑world applications pe kaam karke aapki security knowledge sharp hoti hai.
- **Community recognition** – platforms like HackerOne/ Bugcrowd aapko ranking, badges, aur reputation points dete hain.

## Basic Process (Step‑by‑Step)
1. **Platform pe sign‑up** – HackerOne, Bugcrowd, Intigriti, ya koi private bug bounty program.
2. **Scope check** – Program ke *rules* padho; kaunse domains, APIs, ya features test kar sakte ho.
3. **Recon (Discovery)** – Target ki sub‑domains, endpoints, technology stack pe research karo.
4. **Vulnerability hunting** – XSS, SQLi, RCE, etc. ke liye manual ya automated testing.
5. **Proof‑of‑Concept (PoC)** – Exploit ka simple demo banao (usually a curl command or screenshot).
6. **Report likho** – Clear, concise, aur sab proof ke sath submit karo.
7. **Payout receive karo** – Platform verification ke baad aapka reward release hota hai.

## Important Terms (Brief)
- **Scope** – wo assets jinke andar aap testing kar sakte ho. Out‑of‑scope pe test karna *illegal* ho sakta hai.
- **Severity** – Bug ki impact level (Low, Medium, High, Critical). High severity bugs usually zyada paise dete hain.
- **Responsible Disclosure** – company ko pehle inform karna, public disclosure tab tak delay karna jab tak fix na ho.
- **Duplication** – agar koi aur pehle se hi same bug report kar chuka hai to aapko reward nahi milta.

## Getting Started Quickly
- **Create a free account** on HackerOne (or any platform you prefer).
- **Pick a beginner‑friendly program** – look for “low‑hanging fruit” tags like `easy`, `newbie`, `web`.
- **Set up your lab** – install Kali Linux (or Ubuntu + tools) and run a vulnerable app like OWASP Juice Shop locally.
- **Read the “Getting Started” guide** on the platform – it explains how to submit a report.

Ab aapko understanding mil gayi ki bug bounty kya hai. Next step – **Recon Tools** – kaunse tools kaunse kaam ke liye hain aur kaise use karte hain, iske liye agla module padho. 

*Happy hunting, bhai!*