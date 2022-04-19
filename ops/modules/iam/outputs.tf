output "execution_role_arn" {
  value = aws_iam_role.ecr_admin_role.arn
}

output "cw_lambda_role" {
  value = aws_iam_role.cw_lambda_role.arn
}