resource "aws_iam_role" "lambda" {
  name               = "${local.prefix}-lambda-role"
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
  function_name = var.function_name
  image_uri     = "${aws_ecr_repository.image_storage.repository_url}:latest"
  package_type  = "Image"
  role          = aws_iam_role.lambda.arn
  architectures = ["x86_64"]
  timeout       = 300
  environment   {
    variables = var.container_env_vars
  }
}
