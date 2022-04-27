resource "aws_secretsmanager_secret" "web3signer_secret" {
  name   = "web3signer-private-key-${var.environment}-${var.stage}"
  policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow",
        Principal = {
          AWS = "arn:aws:iam::679752396206:user/web3signer"
        }
        Action   = "secretsmanager:GetSecretValue"
        Resource = "*"
      }
    ]
  })
}

resource "aws_secretsmanager_secret_version" "pkey" {
  secret_id     = aws_secretsmanager_secret.web3signer_secret.id
  secret_string = var.web3_signer_private_key
}