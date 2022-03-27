resource "aws_security_group" "rds" {
  name   = "sequencer-to-router-sg"
  vpc_id = var.vpc_id
}


resource "aws_security_group_rule" "allow-sequencer-to-router" {
  description              = "Allow sequencer to communicate with router"
  from_port                = 5432
  protocol                 = "tcp"
  security_group_id        = aws_security_group.rds.id
  source_security_group_id = var.ecs_cluster_sg
  to_port                  = 5432
  type                     = "ingress"
}

