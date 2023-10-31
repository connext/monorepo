data "aws_iam_policy_document" "assume_role_policy_document" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["vpc-flow-logs.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "vpc_flow_logs_role" {
  name               = "vpc_flow_logs_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy_document.json
}

data "aws_iam_policy_document" "aws_logs_policy" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:DescribeLogGroups",
      "logs:DescribeLogStreams",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "vpc_flow_logs_policy" {
  name   = "vpc_flow_logs_policy"
  role   = aws_iam_role.vpc_flow_logs_role.id
  policy = data.aws_iam_policy_document.aws_logs_policy.json
}
