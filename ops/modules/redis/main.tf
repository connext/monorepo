
resource "aws_elasticache_cluster" "redis" {
  cluster_id               = "redis-cluster-${var.environment}-${var.stage}-${var.family}"
  engine                   = "redis"
  node_type                = "cache.t2.micro"
  num_cache_nodes          = 1
  parameter_group_name     = "default.redis6.x"
  // engine_version        = "6.x"
  port                     = 6379
  subnet_group_name        = var.subnet_group_name
  security_group_ids       = [aws_security_group.redis.id]
  apply_immediately        = true
  snapshot_retention_limit = 0
}
