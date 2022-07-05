output "daemon_service_name" {
  value = aws_ecs_service.service.name
}

output "log_group_name" {
  value = aws_cloudwatch_log_group.container.name
}

output "log_group_arn" {
  value = aws_cloudwatch_log_group.container.arn
}
