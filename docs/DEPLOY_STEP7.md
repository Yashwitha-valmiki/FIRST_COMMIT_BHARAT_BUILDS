# Step-7 Deploy (Lambda + API Gateway)

## Build and zip API
cd services/api
npm install
npm run build
zip -r api.zip dist package.json node_modules

## Terraform apply
cd ../../infra/terraform
terraform init
terraform apply -auto-approve

Copy output `api_base_url` to frontend env:
NEXT_PUBLIC_API_BASE=<api_base_url>

Then run frontend:
cd ../../apps/web
npm install
npm run dev
