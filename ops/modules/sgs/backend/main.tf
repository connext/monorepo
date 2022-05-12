
resource "aws_security_group" "rds" {
  name        = "rds-${var.environment}-${var.stage}-sg"
  vpc_id      = var.vpc_id
  tags                       = {
    Stage = var.stage
    Environment = var.environment
    Domain = var.domain
  }
}

resource "aws_security_group_rule" "allow-nodes-to-rds" {
  description              = "Allow worker nodes to communicate with database"
  from_port                = 5432
  protocol                 = "tcp"
  security_group_id        = aws_security_group.rds.id
  source_security_group_id = var.ecs_task_sg_id
  to_port                  = 5432
  type                     = "ingress"

}

