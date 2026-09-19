# RiskLens Test Cases

1. Internship doc with lock-in + penalty => HIGH/CRITICAL
2. Loan doc with prepayment penalty => HIGH financial risk
3. Rental doc with unclear deposit return => MODERATE/HIGH ambiguity
4. Missing text input => graceful fallback
5. Invalid analysis JSON => schema validation failure
6. GET analysis before analyze => 404
7. Signed upload URL creation with bad params => 400
8. Fraud phrase "registration fee" increases fraud score
9. Color mapping: 0-20 GREEN, 81-100 RED
10. Disclaimer always present
