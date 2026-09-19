data "aws_iam_policy_document" "scheduler_assume" {
  statement {
    effect = "Allow"
    principals { type = "Service", identifiers = ["scheduler.amazonaws.com"] }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "scheduler_invoke_role" {
  name               = "${var.project_name}-scheduler-invoke-role"
  assume_role_policy = data.aws_iam_policy_document.scheduler_assume.json
}

resource "aws_iam_role_policy" "scheduler_sqs_policy" {
  name = "${var.project_name}-scheduler-sqs-policy"
  role = aws_iam_role.scheduler_invoke_role.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      { Effect="Allow", Action=["sqs:SendMessage"], Resource=[aws_sqs_queue.reminder_queue.arn] }
    ]
  })
}
