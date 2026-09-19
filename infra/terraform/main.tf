locals {
  project = var.project_name
}

data "aws_caller_identity" "current" {}

resource "aws_s3_bucket" "documents" {
  bucket = "${local.project}-documents-${data.aws_caller_identity.current.account_id}"
}

resource "aws_s3_bucket_versioning" "documents_ver" {
  bucket = aws_s3_bucket.documents.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_dynamodb_table" "documents" {
  name         = "Documents"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "PK"
  range_key    = "SK"
  attribute { name = "PK" type = "S" }
  attribute { name = "SK" type = "S" }
}

resource "aws_dynamodb_table" "risks" {
  name         = "RiskAssessments"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "PK"
  range_key    = "SK"
  attribute { name = "PK" type = "S" }
  attribute { name = "SK" type = "S" }
}

resource "aws_cognito_user_pool" "pool" {
  name = "${local.project}-users"
  auto_verified_attributes = ["email"]
}

resource "aws_cognito_user_pool_domain" "domain" {
  domain       = "${var.project_name}-${data.aws_caller_identity.current.account_id}"
  user_pool_id = aws_cognito_user_pool.pool.id
}

# Single canonical client
resource "aws_cognito_user_pool_client" "client" {
  name         = "${local.project}-web-client"
  user_pool_id = aws_cognito_user_pool.pool.id
  generate_secret = false

  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  supported_identity_providers         = ["COGNITO"]

  callback_urls = [var.web_callback_url]
  logout_urls   = [var.web_logout_url]

  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_USER_PASSWORD_AUTH"
  ]
}

# Reminder target queue
resource "aws_sqs_queue" "reminder_queue" {
  name = "${local.project}-reminder-queue"
}
