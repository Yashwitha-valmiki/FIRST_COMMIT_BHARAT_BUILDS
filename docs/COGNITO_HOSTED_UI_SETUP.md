# Cognito Hosted UI + Amplify Setup

1) Terraform apply:
   cd infra/terraform
   terraform init
   terraform apply -auto-approve

2) Copy outputs:
   - cognito_user_pool_id
   - cognito_client_id
   - cognito_domain
   - api_base_url

3) Create apps/web/.env.local from .env.local.example
   - NEXT_PUBLIC_COGNITO_DOMAIN = <cognito_domain>.auth.<region>.amazoncognito.com
   - NEXT_PUBLIC_API_BASE = <api_base_url>

4) Run web:
   cd apps/web
   npm install
   npm run dev

5) Open /login and authenticate via Hosted UI.
