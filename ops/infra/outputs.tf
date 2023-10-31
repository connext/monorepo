output "ecr_admin_role" {
  value = module.iam.execution_role_arn
}

output "vpc_flow_logs_role" {
  value = module.iam.vpc_flow_logs_role_arn
}
