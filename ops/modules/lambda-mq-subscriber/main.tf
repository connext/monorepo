data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

locals {
  account_id     = data.aws_caller_identity.current.account_id
  repository_url = "${local.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/${var.ecr_repository_name}"
}

resource "aws_iam_role" "lambda" {
  name = "${var.container_family}-${var.environment}-${var.stage}-lambda-mq-subscriber-role"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : "lambda.amazonaws.com"
        },
        "Effect" : "Allow"
      }
    ]
  })

  inline_policy {
    name = "${var.container_family}-${var.environment}-${var.stage}-lambda-mq-subscriber-policies"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Action" : [
            "mq:DescribeBroker",
            "secretsmanager:GetSecretValue",
            "ec2:CreateNetworkInterface",
            "ec2:DescribeNetworkInterfaces",
            "ec2:DescribeVpcs",
            "ec2:DeleteNetworkInterface",
            "ec2:DescribeSubnets",
            "ec2:DescribeSecurityGroups",
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ],
          "Resource" : ["*"]
        }
      ]
    })
  }
}
resource "aws_lambda_function" "executable" {
  function_name = "${var.container_family}-${var.environment}-${var.stage}-mq-subscriber"
  image_uri     = "${local.repository_url}:${var.docker_image_tag}"
  package_type  = "Image"
  role          = aws_iam_role.lambda.arn
  architectures = ["x86_64"]
  timeout       = var.timeout
  memory_size   = var.memory_size
  environment {
    variables = merge(var.container_env_vars, { DD_SERVICE = var.container_family })
  }
}


resource "aws_lambda_event_source_mapping" "prover_x" {
  batch_size       = 10
  event_source_arn = var.aws_mq_broker_arn
  enabled          = true
  function_name    = aws_lambda_function.executable.arn
  queues           = ["proverX"]

  source_access_configuration {
    type = "BASIC_AUTH"
    uri  = aws_secretsmanager_secret_version.rmq_uri.arn
  }
}
