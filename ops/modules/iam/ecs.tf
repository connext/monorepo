data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "cloudwatch_assume_role" {
  statement {
    principals {
      type = "Service"
      identifiers = [
        "events.amazonaws.com",
        "ecs-tasks.amazonaws.com",
        "logs.amazonaws.com"
      ]
    }
    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "task_execution_cloudwatch_access" {
  statement {
    effect = "Allow"
    actions = [
      "logs:*",
    ]
    resources = [      
      "arn:aws:logs:us-east-1:*:*", 
      "arn:aws:logs:us-east-2:*:*", 
      "arn:aws:logs:us-west-1:*:*", 
      "arn:aws:logs:us-west-2:*:*"]
  }
}


resource "aws_iam_role" "ecr_admin_role" {
  name               = "erc_admin_role"
  assume_role_policy = data.aws_iam_policy_document.cloudwatch_assume_role.json
}

resource "aws_iam_role_policy_attachment" "cloudwatch" {
  role       = aws_iam_role.ecr_admin_role.name
  policy_arn = aws_iam_policy.cloudwatch.arn
}
resource "aws_iam_policy" "cloudwatch" {
  name   = "ecs-cloudwatch-execution"
  policy = data.aws_iam_policy_document.task_execution_cloudwatch_access.json
}