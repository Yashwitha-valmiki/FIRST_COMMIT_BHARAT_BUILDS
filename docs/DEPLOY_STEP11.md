# Deploy Step-11 (Critical Fix)

## API bundle
cd services/api
npm install
npm run bundle:lambda

## Terraform apply
cd ../../infra/terraform
terraform init
terraform apply -auto-approve

## Frontend env
Set:
- NEXT_PUBLIC_API_BASE=<api_base_url output>
- NEXT_PUBLIC_AWS_REGION
- NEXT_PUBLIC_COGNITO_USER_POOL_ID
- NEXT_PUBLIC_COGNITO_APP_CLIENT_ID
- NEXT_PUBLIC_COGNITO_DOMAIN
- NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_IN
- NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_OUT
