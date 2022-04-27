data "aws_security_group" "default" {
  name   = "default"
  vpc_id = var.vpc_id
}


data "aws_iam_role" "cw_lambda_role" {
  name = "cw_lambda_role"
}

resource "aws_lambda_function" "cloudwatch-logdna-lambda" {
  function_name = "export-cw-to-logdna-${var.environment}-${var.stage}-${var.service}"
  s3_bucket     = "aws-lamba-logdna-cloudwatch"
  s3_key        = "logdna-cloudwatch.zip"
  handler       = "index.handler"

  role        = data.aws_iam_role.cw_lambda_role.arn
  memory_size = "128"
  runtime     = "nodejs14.x"
  // set low because I'm concerned about cost-blowout in the case of mis-configuration
  timeout     = "10"
  vpc_config {
    subnet_ids         = flatten([var.public_subnets, var.private_subnets])
    security_group_ids = [data.aws_security_group.default.id]
  }
  environment {
    variables = {
      LOGDNA_KEY  = var.logdna_key
      LOGDNA_TAGS = "${var.stage},${var.environment},${var.service},amarok"
    }
  }
}

resource "aws_lambda_permission" "allow-cloudwatch" {
  statement_id   = "allow-cloudwatch-${var.environment}-${var.stage}-${var.service}"
  action         = "lambda:InvokeFunction"
  function_name  = aws_lambda_function.cloudwatch-logdna-lambda.arn
  principal      = "logs.us-east-1.amazonaws.com"
  source_arn     = "${var.log_group_arn}:*"
  source_account = "679752396206"
}

resource "aws_cloudwatch_log_subscription_filter" "cloudwatch-logdna-lambda-subscription" {
  depends_on      = [aws_lambda_permission.allow-cloudwatch]
  name            = "cw-logdna-lambda-subscription-${var.environment}-${var.stage}-${var.service}"
  log_group_name  = var.log_group_name
  filter_pattern  = ""
  destination_arn = aws_lambda_function.cloudwatch-logdna-lambda.arn
}