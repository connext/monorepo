resource "aws_security_group" "web3signer" {
  name   = "web3signer-${var.environment}-${var.stage}-sg"
  vpc_id = var.vpc_id

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"

    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }
  lifecycle {
    ignore_changes = [
      ingress,
    ]
  }
  tags = {
    Stage       = var.stage
    Environment = var.environment
    Domain      = var.domain
  }
}

resource "aws_security_group_rule" "web3signer_ingress_cidr_blocks" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = [var.vpc_cdir_block]
  security_group_id = aws_security_group.web3signer.id
}


resource "aws_security_group_rule" "allow-ecs-tasks-to-web3signer" {
  description              = "Allow worker nodes to communicate with cache"
  from_port                = 443
  protocol                 = "tcp"
  security_group_id        = aws_security_group.web3signer.id
  source_security_group_id = var.ecs_task_sg_id
  to_port                  = 443
  type                     = "ingress"
}
