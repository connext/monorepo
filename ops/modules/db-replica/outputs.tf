output "replica_instance_fixed_address" {
  description = "the canonical name for the db replica"
  value       = aws_route53_record.db_read_replica.name
}

output "db_instance_address" {
  description = "The address of the RDS replica instance"
  value       = aws_db_instance.db_read_replica.address
}

output "db_instance_id" {
  description = "The ID of the RDS replica instance"
  value       = aws_db_instance.db_read_replica.id
}

output "db_instance_arn" {
  description = "The ARN of the RDS replica instance"
  value       = aws_db_instance.db_read_replica.arn
}

output "db_instance_endpoint" {
  description = "The connection endpoint"
  value       = aws_db_instance.db_read_replica.endpoint
}

output "db_instance_name" {
  description = "The database name"
  value       = aws_db_instance.db_read_replica.name
}

output "db_instance_username" {
  description = "The master username for the database"
  value       = aws_db_instance.db_read_replica.username
}

output "db_instance_password" {
  description = "The password of the master user of the RDS instance"
  value       = aws_db_instance.db_read_replica.password
}

output "db_instance_port" {
  description = "The database port"
  value       = aws_db_instance.db_read_replica.port
}

output "db_instance_engine" {
  description = "The engine of the RDS instance"
  value       = aws_db_instance.db_read_replica.engine
}

output "db_instance_engine_version" {
  description = "The engine version of the RDS instance"
  value       = aws_db_instance.db_read_replica.engine_version
}

output "db_instance_class" {
  description = "The RDS instance class"
  value       = aws_db_instance.db_read_replica.instance_class
}

output "db_allocated_storage" {
  description = "The allocated storage in gigabytes"
  value       = aws_db_instance.db_read_replica.allocated_storage
}

output "db_instance_vpc_security_group_ids" {
  description = "The security group IDs of the RDS instance"
  value       = aws_db_instance.db_read_replica.vpc_security_group_ids
}

output "db_subnet_group_name" {
  description = "The name of the RDS instance's subnet group"
  value       = aws_db_instance.db_read_replica.db_subnet_group_name
}

output "db_publicly_accessible" {
  description = "Whether the database instance is publicly accessible"
  value       = aws_db_instance.db_read_replica.publicly_accessible
}


output "db_maintenance_window" {
  description = "The maintenance window of the RDS instance"
  value       = aws_db_instance.db_read_replica.maintenance_window
}

output "db_backup_retention_period" {
  description = "The backup retention period"
  value       = aws_db_instance.db_read_replica.backup_retention_period
}

output "db_backup_window" {
  description = "The backup window of the RDS instance"
  value       = aws_db_instance.db_read_replica.backup_window
}
