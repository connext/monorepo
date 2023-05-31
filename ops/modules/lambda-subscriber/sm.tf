resource "aws_secretsmanager_secret" "rmq_secret" {
  name = "rmq-pw-${var.environment}-${var.stage}"
}

resource "aws_secretsmanager_secret_version" "rmq_password" {
  secret_id     = aws_secretsmanager_secret.rmq_secret.id
  secret_string = "amqps://${var.rmq_mgt_user}:${var.rmq_mgt_password}@${var.aws_mq_amqp_endpoint}"
}
