output "db_instance_fixed_address" {
  description = "the canonical name for the db instance"
  value = aws_route53_record.db.name
}

output "db_instance_address" {
  description = "The address of the RDS instance"
  value       = aws_db_instance.db.address
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

output "db_instance_port" {
  description = "The database port"
  value       = aws_db_instance.db.port
}
