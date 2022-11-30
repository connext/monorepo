resource "aws_iam_role" "lambda" {
  name               = "${var.container_family}-lambda-role"
  assume_role_policy = <<EOF
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Action": "sts:AssumeRole",
           "Principal": {
               "Service": "lambda.amazonaws.com"
           },
           "Effect": "Allow"
       }
   ]
}
 EOF
}

resource "aws_lambda_function" "executable" {
  function_name = "${var.container_family}-${var.environment}-${var.stage}"
  image_uri     = var.docker_image
  package_type  = "Image"
  role          = aws_iam_role.lambda.arn
  architectures = ["x86_64"]
  timeout       = 300
  environment {
    variables = var.container_env_vars
  }
}
