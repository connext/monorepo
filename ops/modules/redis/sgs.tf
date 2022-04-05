resource "aws_security_group" "redis" {
  name   = "redis-cluster-${var.environment}-${var.family}-sg"
  vpc_id = var.vpc_id
}

resource "aws_security_group" "allow_all_redis" {
  name        = "allow_all_redis_${var.family}"
  description = "Allow all inbound traffic"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  lifecycle {
    create_before_destroy = true
  }
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
