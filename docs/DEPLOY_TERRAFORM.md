# Terraform Deploy

cd infra/terraform
terraform init
terraform apply -auto-approve

Copy outputs into API env:
- DOCUMENT_BUCKET
- DDB_TABLE_DOCUMENTS
- DDB_TABLE_RISKS
- COGNITO_USER_POOL_ID
- COGNITO_APP_CLIENT_ID
