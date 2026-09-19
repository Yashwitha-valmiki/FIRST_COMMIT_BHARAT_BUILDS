variable "aws_region" { type = string default = "us-east-1" }
variable "project_name" { type = string default = "risklens" }
variable "web_origin" { type = string default = "http://localhost:3000" }
variable "web_callback_url" { type = string default = "http://localhost:3000/auth/callback" }
variable "web_logout_url" { type = string default = "http://localhost:3000/login" }
