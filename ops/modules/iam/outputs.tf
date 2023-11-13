output "execution_role_arn" {
  value = aws_iam_role.ecr_admin_role.arn
}

output "vpc_flow_logs_role_arn" {
  value = aws_iam_role.vpc_flow_logs_role.arn
}
