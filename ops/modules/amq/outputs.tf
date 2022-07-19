output "aws_mq_broker_console" {
  value = aws_mq_broker.default.instances[0].console_url
}

output "aws_mq_amqp_endpoint" {
  value = aws_mq_broker.default.instances[0].endpoints[1]
}
