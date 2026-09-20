# RiskLens — Universal Document Risk Intelligence

RiskLens analyzes any document (internship offer, loan agreement, 
rental contract, insurance policy) and shows you risks, red flags, 
and what to do before signing.

## Problem
People sign documents without understanding risks hidden inside — 
penalty clauses, lock-in periods, fraud indicators, payment traps. 
Students, tenants, borrowers, and freelancers lose money because 
of terms they never understood.

## Solution
Paste any document text → RiskLens analyzes it instantly and shows:
- Overall Risk Score (0–100) with color: Green/Yellow/Orange/Red
- Top Red Flags with severity
- Category breakdown (Financial, Legal, Fraud, Privacy etc.)
- Plain language summary
- Action checklist — what to do before signing

## Who It Helps
- Students checking internship offers for scam signals
- Tenants reviewing rental agreements
- Borrowers understanding loan documents
- Freelancers checking client contracts
- Anyone signing any agreement

## AWS Services Used
- Amazon Bedrock (AI analysis)
- AWS Lambda (serverless API)
- Amazon DynamoDB (data storage)
- Amazon S3 (document storage)
- Amazon Textract (OCR)
- Amazon Cognito (authentication)
- AWS EventBridge (reminders)
- AWS Amplify (hosting)

## Tech Stack
- Frontend: Next.js + React
- Backend: Node.js + Express + TypeScript
- Infrastructure: Terraform
- AI: Amazon Bedrock

## How to Run Locally

### API
```bash
cd services/api
npm install
npm run dev
```
API runs at http://localhost:4000/health

### Web
```bash
cd apps/web
npm install
npm run dev
```
Web runs at http://localhost:3000

## How It Works
1. Paste document text into the input box
2. Click "Analyze Document"
3. RiskLens extracts key risk signals
4. Shows risk score, red flags, category breakdown
5. Gives plain language explanation and action steps

## Risk Categories
- Financial Risk
- Legal Liability Risk
- Exit/Lock-in Risk
- Privacy/Data Risk
- Ambiguity Risk
- Compliance/Deadline Risk
- Fraud Suspicion Risk
- Jurisdiction Complexity

## Risk Colors
- 🟢 0–20: Safe
- 🟡 21–40: Low Risk
- 🟡 41–60: Moderate Risk
- 🟠 61–80: High Risk
- 🔴 81–100: Critical Risk

## Team
- Yaswitha Kondlopalli — Team DataMinds
- Vinmaya Juturu

## Disclaimer
RiskLens provides AI-assisted risk insights and does not 
constitute legal advice. Always consult a professional for 
high-stakes decisions.

## Hackathon
Built for First Commit — Bharat Builds Tour, September 2026
WeMakeDevs × AWS