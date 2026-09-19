# Step-13 Hardening Complete

Includes:
- Canonical Terraform resources (no duplicate Cognito client)
- Reminder infra provisioned (SQS + Scheduler role)
- Canonical deploy script: services/api/scripts/deploy.sh
- Preflight env validation
- Route-level health test with supertest
- CI updated to run preflight + tests + builds
