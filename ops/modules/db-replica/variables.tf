variable "replicate_source_db" {
  description = "The identifier of the source DB instance or DB cluster if this DB instance is to be created as a Read Replica"
  type        = string
}

variable "allocated_storage" {
  description = "The allocated storage in gigabytes"
  type        = string
}

variable "engine_version" {
  description = "The engine version to use"
  type        = string
}

variable "instance_class" {
  description = "The instance type of the RDS instance"
  type        = string
}

variable "parameter_group_name" {
  description = "Name of the DB parameter group to associate"
  type        = string
}

variable "tags" {
  description = "A mapping of tags to assign to all resources"
  type        = map(string)
  default     = {}
}

variable "domain" {
  type        = string
  description = "Domain model target"
}

variable "stage" {
  description = "stage of deployment"
}

variable "environment" {
  description = "env we're deploying to"
}

variable "hosted_zone_id" {
  type        = string
  description = "ARN of route53 zone"
}

variable "base_domain" {
  description = "base domain of the application"
  default     = "connext.ninja"
}

variable "replica_identifier" {
  description = "The identifier for the read replica DB instance"
  type        = string
}

variable "maintenance_window" {
  description = "The window to perform maintenance in. Syntax: 'ddd:hh24:mi-ddd:hh24:mi'. Eg: 'Mon:00:00-Mon:03:00'"
  type        = string
}

variable "backup_window" {
  description = "The daily time range during which automated backups are created if automated backups are enabled using the BackupRetentionPeriod parameter.Time in UTC"
  type        = string
}

variable "backup_retention_period" {
  description = "The days to retain backups for"
  type        = number
}

variable "publicly_accessible" {
  description = "Bool to control if instance is publicly accessible"
  type        = bool
}

variable "db_subnet_group_name" {
  description = "The name of a DB subnet group to associate with this DB instance"
  type        = string
}

variable "db_security_group_ids" {
  description = "List of VPC security groups to associate"
  type        = list(string)
}

variable "port" {
  description = "The port on which the DB accepts connections"
  type        = number
}

variable "name" {
  description = "The name of the RDS instance"
  type        = string
}

variable "username" {
  description = "The username for the DB user"
  type        = string
}

variable "password" {
  description = "The password for the DB user"
  type        = string
}

variable "performance_insights_enabled" {
  default = true
}