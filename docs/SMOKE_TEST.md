# End-to-End Smoke Test

1. Login:
   - Open /login
   - Complete Hosted UI flow
2. Upload:
   - POST /documents/upload-url
   - PUT file to returned S3 URL
   - POST /documents
3. Parse:
   - POST /documents/{id}/parse
4. Analyze:
   - POST /documents/{id}/analyze (without text; should use parsedText)
5. Read:
   - GET /documents/{id}/analysis
   - GET /documents/{id}/report
6. Reminder:
   - POST /reminders with future ISO time
