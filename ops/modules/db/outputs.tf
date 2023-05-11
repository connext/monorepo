output "db_instance_fixed_address" {
  description = "the canonical name for the db instance"
  value       = aws_route53_record.db.name
}

output "db_instance_address" {
  description = "The address of the RDS instance"
  value       = aws_db_instance.db.address
}

output "db_instance_id" {
  description = "The ID of the RDS instance"
  value       = aws_db_instance.db.id
}

output "db_instance_arn" {
  description = "The ARN of the RDS instance"
  value       = aws_db_instance.db.arn
}

output "db_instance_endpoint" {
  description = "The connection endpoint"
  value       = aws_db_instance.db.endpoint
}

output "db_instance_name" {
  description = "The database name"
  value       = aws_db_instance.db.name
}

output "db_instance_username" {
  description = "The master username for the database"
  value       = aws_db_instance.db.username
}

output "db_instance_password" {
  description = "The password of the master user of the RDS instance"
  value       = aws_db_instance.db.password
}

output "db_instance_port" {
  description = "The database port"
  value       = aws_db_instance.db.port
}

output "db_instance_engine" {
  description = "The engine of the RDS instance"
  value       = aws_db_instance.db.engine
}

output "db_instance_engine_version" {
  description = "The engine version of the RDS instance"
  value       = aws_db_instance.db.engine_version
}

output "db_instance_class" {
  description = "The RDS instance class"
  value       = aws_db_instance.db.instance_class
}

output "db_allocated_storage" {
  description = "The allocated storage in gigabytes"
  value       = aws_db_instance.db.allocated_storage
}

output "db_instance_vpc_security_group_ids" {
  description = "The security group IDs of the RDS instance"
  value       = aws_db_instance.db.vpc_security_group_ids
}

output "db_subnet_group_name" {
  description = "The name of the RDS instance's subnet group"
  value       = aws_db_instance.db.db_subnet_group_name
}

output "db_publicly_accessible" {
  description = "Whether the database instance is publicly accessible"
  value       = aws_db_instance.db.publicly_accessible
}


output "db_maintenance_window" {
  description = "The maintenance window of the RDS instance"
  value       = aws_db_instance.db.maintenance_window
}

output "db_backup_retention_period" {
  description = "The backup retention period"
  value       = aws_db_instance.db.backup_retention_period
}

output "db_backup_window" {
  description = "The backup window of the RDS instance"
  value       = aws_db_instance.db.backup_window
}

output "rds_parameter_group_name" {
  description = "The name of the RDS parameter group"
  value       = aws_db_parameter_group.rds_postgres.name
}
