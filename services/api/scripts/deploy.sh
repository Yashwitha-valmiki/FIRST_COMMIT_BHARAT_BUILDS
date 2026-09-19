#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

echo "[1/4] Installing API deps"
npm install

echo "[2/4] Bundling Lambda"
npm run bundle:lambda

echo "[3/4] Terraform apply"
cd ../../infra/terraform
terraform init
terraform apply -auto-approve

API_BASE=$(terraform output -raw api_base_url)
POOL_ID=$(terraform output -raw cognito_user_pool_id)
CLIENT_ID=$(terraform output -raw cognito_client_id)
DOMAIN_PREFIX=$(terraform output -raw cognito_domain_prefix)

echo "[4/4] Write web env template hints"
cat <<ENVHINT

Set in apps/web/.env.local:

NEXT_PUBLIC_API_BASE=${API_BASE}
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=${POOL_ID}
NEXT_PUBLIC_COGNITO_APP_CLIENT_ID=${CLIENT_ID}
NEXT_PUBLIC_COGNITO_DOMAIN=${DOMAIN_PREFIX}.auth.us-east-1.amazoncognito.com
NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_IN=http://localhost:3000/auth/callback
NEXT_PUBLIC_COGNITO_REDIRECT_SIGN_OUT=http://localhost:3000/login

ENVHINT

echo "Deploy complete."
