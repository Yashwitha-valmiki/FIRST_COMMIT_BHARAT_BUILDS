# RiskLens Architecture

Frontend (Next.js) -> API (Express/Lambda-style handlers)
-> Analysis pipeline
-> AWS services:
- S3 (documents)
- Textract (OCR)
- Bedrock (NLP extraction/explanation)
- DynamoDB (risks/doc metadata)
- EventBridge + SES (reminders, planned)

Output:
- Risk score + color
- Category breakdown
- Red flags
- Action checklist
- Report export
