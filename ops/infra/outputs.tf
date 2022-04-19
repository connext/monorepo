
output "ecr_admin_role" {
  value = module.iam.execution_role_arn
}

output "cw_lambda_role" {
  value = module.iam.cw_lambda_role
}