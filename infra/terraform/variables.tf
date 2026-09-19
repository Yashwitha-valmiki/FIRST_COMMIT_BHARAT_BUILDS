variable "aws_region" { type = string default = "us-east-1" }
variable "project_name" { type = string default = "risklens" }
variable "web_origin" { type = string default = "http://localhost:3000" }
variable "web_callback_url" { type = string default = "http://localhost:3000/auth/callback" }
variable "web_logout_url" { type = string default = "http://localhost:3000/login" }
variable "reminder_target_arn" { type = string default = "arn:aws:sqs:us-east-1:111111111111:replace-me" }
variable "scheduler_role_arn" { type = string default = "arn:aws:iam::111111111111:role/replace-me" }
