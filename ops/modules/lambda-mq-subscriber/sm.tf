resource "aws_secretsmanager_secret" "rmq_secret" {
  name = "aws-rmq-pw-4-${var.environment}-${var.stage}"
}

resource "aws_secretsmanager_secret_version" "rmq_uri" {
  secret_id = aws_secretsmanager_secret.rmq_secret.id
  secret_string = jsonencode({
    username = var.rmq_mgt_user
    password = var.rmq_mgt_password
  })
}
