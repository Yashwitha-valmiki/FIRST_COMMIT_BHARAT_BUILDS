data "aws_iam_policy_document" "lambda_assume" {
  statement {
    effect = "Allow"
    principals { type = "Service", identifiers = ["lambda.amazonaws.com"] }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_role" {
  name               = "${var.project_name}-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "${var.project_name}-lambda-policy"
  role = aws_iam_role.lambda_role.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      { Effect="Allow", Action=["logs:CreateLogGroup","logs:CreateLogStream","logs:PutLogEvents"], Resource="*" },
      { Effect="Allow", Action=["s3:GetObject","s3:PutObject"], Resource=["${aws_s3_bucket.documents.arn}/*"] },
      { Effect="Allow", Action=["dynamodb:GetItem","dynamodb:PutItem","dynamodb:UpdateItem","dynamodb:Query","dynamodb:Scan"], Resource=[aws_dynamodb_table.documents.arn, aws_dynamodb_table.risks.arn] },
      { Effect="Allow", Action=["textract:AnalyzeDocument","textract:DetectDocumentText"], Resource="*" },
      { Effect="Allow", Action=["bedrock:InvokeModel"], Resource="*" },
      { Effect="Allow", Action=["scheduler:CreateSchedule"], Resource="*" },
      { Effect="Allow", Action=["iam:PassRole"], Resource=[aws_iam_role.scheduler_invoke_role.arn] }
    ]
  })
}

resource "aws_lambda_function" "api" {
  function_name = "${var.project_name}-api"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda.handler"
  runtime       = "nodejs20.x"
  timeout       = 30

  filename         = "${path.module}/../../services/api/api.zip"
  source_code_hash = filebase64sha256("${path.module}/../../services/api/api.zip")

  environment {
    variables = {
      AWS_REGION            = var.aws_region
      DOCUMENT_BUCKET       = aws_s3_bucket.documents.bucket
      DDB_TABLE_DOCUMENTS   = aws_dynamodb_table.documents.name
      DDB_TABLE_RISKS       = aws_dynamodb_table.risks.name
      BEDROCK_MODEL_ID      = "amazon.titan-text-express-v1"
      CORS_ORIGIN           = var.web_origin
      COGNITO_USER_POOL_ID  = aws_cognito_user_pool.pool.id
      COGNITO_APP_CLIENT_ID = aws_cognito_user_pool_client.client.id
      REMINDER_TARGET_ARN   = aws_sqs_queue.reminder_queue.arn
      SCHEDULER_ROLE_ARN    = aws_iam_role.scheduler_invoke_role.arn
    }
  }

  depends_on = [aws_iam_role_policy.lambda_policy]
}

resource "aws_apigatewayv2_api" "http_api" {
  name          = "${var.project_name}-http-api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = [var.web_origin]
    allow_methods = ["GET","POST","OPTIONS"]
    allow_headers = ["authorization","content-type"]
  }
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.api.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "default_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "apigw_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}
