output "aws_mq_broker_console" {
  value = aws_mq_broker.default.instances[0].console_url
}

output "aws_mq_amqp_endpoint" {
  value = trimprefix(aws_mq_broker.default.instances[0].endpoints[0], "amqps://")
}

output "aws_mq_amqp_arn" {
  value = aws_mq_broker.default.arn
}
