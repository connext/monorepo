
resource "aws_security_group" "rds" {
  name   = "rds-${var.environment}-${var.stage}-sg"
  vpc_id = var.vpc_id
  egress {
    cidr_blocks = ["0.0.0.0/0"]
    description = "internet"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
  }
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Stage       = var.stage
    Environment = var.environment
    Domain      = var.domain
  }
}
