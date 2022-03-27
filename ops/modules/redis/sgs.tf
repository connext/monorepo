resource "aws_security_group" "redis" {
  name   = "redis-cluster-celery-broker-sg"
  vpc_id = var.vpc_id
}

resource "aws_security_group_rule" "allow-nodes-to-redis" {
  description              = "Allow worker nodes to communicate with cache"
  from_port                = 6379
  protocol                 = "tcp"
  security_group_id        = aws_security_group.redis.id
  source_security_group_id = var.sg_id
  to_port                  = 6379
  type                     = "ingress"
}
