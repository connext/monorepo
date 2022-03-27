
output "redis_instance_arn" {
  description = "ARN of the created elastic cache cluster"
  value = aws_elasticache_cluster.redis.arn
}

output "redis_instance_address" {
  description = "The redis address"
  value       = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "redis_instance_port" {
  description = "The database port"
  value       = aws_elasticache_cluster.redis.cache_nodes[0].port
}
