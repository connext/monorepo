output "public_subnets" {
  value = aws_subnet.main.*.id
}

output "private_subnets" {
  value = aws_subnet.private.*.id
}

output "redis_subnet_group" {
  value = aws_elasticache_subnet_group.default.name
}

output "vpc_id" {
  value = aws_vpc.main.id
}

output "allow_all_sg" {
  value = aws_security_group.allow_tls.id
}

output "ecs_task_sg" {
  value = aws_security_group.ecs_tasks.id
}

output "vpc_cdir_block" {
  value = aws_vpc.main.cidr_block
}
