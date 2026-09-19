output "documents_bucket" { value = aws_s3_bucket.documents.bucket }
output "documents_table"  { value = aws_dynamodb_table.documents.name }
output "risks_table"      { value = aws_dynamodb_table.risks.name }
output "cognito_user_pool_id" { value = aws_cognito_user_pool.pool.id }
output "cognito_client_id"    { value = aws_cognito_user_pool_client.client.id }
