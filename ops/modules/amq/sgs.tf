resource "aws_security_group" "rabbitmq" {
  name   = "rabbitmq-${var.environment}-${var.stage}"
  vpc_id = var.vpc_id

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    description = "internet"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Stage       = var.stage
    Environment = var.environment
  }
}


resource "aws_security_group_rule" "allow-ecs-tasks-to-rabbitmq" {
  description              = "private subnet"
  from_port                = 5671
  to_port                  = 5671
  protocol                 = "tcp"
  type                     = "ingress"
  source_security_group_id = var.sg_id
  security_group_id        = aws_security_group.rabbitmq.id
}

