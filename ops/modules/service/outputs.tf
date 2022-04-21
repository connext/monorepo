output "dns_name" {
  value = aws_alb.lb.dns_name
}

output "service_endpoint" {
  value = aws_route53_record.www.name
}

output "log_group_name" {
  value = aws_cloudwatch_log_group.container.name
}

output "log_group_arn" {
  value = aws_cloudwatch_log_group.container.arn
}