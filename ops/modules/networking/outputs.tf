output "public_subnets" {
  value = aws_subnet.main.*.id
}

output "private_subnets" {
  value = aws_subnet.private.*.id
}

output "rds_subnet_group" {
  value = aws_db_subnet_group.default.name
}

output "redis_subnet_group" {
  value = aws_elasticache_subnet_group.default.name
}

output "vpc_id" {
  value = aws_vpc.main.id
}

output "allow_all_sg" {
  value = aws_security_group.allow_all.id
}

output "ecs_task_sg" {
  value = aws_security_group.ecs_tasks.id
}