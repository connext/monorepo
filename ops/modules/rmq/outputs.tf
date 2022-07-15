output "dns_name" {
  value = aws_lb.amqp.dns_name
}

output "rmq_management_endpoint" {
  value = aws_route53_record.www.name
}

output "rmq_ampq_endpoint" {
  value = aws_route53_record.amqp.name
}

output "log_group_name" {
  value = aws_cloudwatch_log_group.container.name
}

output "log_group_arn" {
  value = aws_cloudwatch_log_group.container.arn
}
