output "web3signer_sg" {
  value = aws_security_group.web3signer.id
}

output "rabbitmq_sg" {
  value = aws_security_group.rabbitmq.id
}
