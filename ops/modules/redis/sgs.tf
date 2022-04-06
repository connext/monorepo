resource "aws_security_group" "redis" {
  name   = "redis-cluster-${var.environment}-${var.family}-sg"
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

}

resource "aws_security_group_rule" "redis_ingress_cidr_blocks" {
  type              = "ingress"
  from_port         = 6379
  to_port           = 6379
  protocol          = "tcp"
  cidr_blocks       = ["172.17.0.0/16"]
  security_group_id = aws_security_group.redis.id
}


resource "aws_security_group_rule" "allow-res-to-redis" {
  description              = "Allow worker nodes to communicate with cache"
  from_port                = 6379
  protocol                 = "tcp"
  security_group_id        = aws_security_group.redis.id
  source_security_group_id = var.sg_id
  to_port                  = 6379
  type                     = "ingress"
}
