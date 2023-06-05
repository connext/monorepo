
variable "identifier" {
  description = "The name of the RDS instance, if omitted, Terraform will assign a random, unique identifier"
  type        = string
}

variable "allocated_storage" {
  description = "The allocated storage in gigabytes"
  type        = string
}

variable "instance_class" {
  description = "The instance type of the RDS instance"
  type        = string
}

variable "name" {
  description = "The DB name to create. If omitted, no database is created initially"
  type        = string
  default     = "connext"
}

variable "username" {
  description = "Username for the master DB user"
  type        = string
}

variable "password" {
  description = "Password for the master DB user. Note that this may show up in logs, and it will be stored in the state file"
  type        = string
}

variable "port" {
  description = "The port on which the DB accepts connections"
  type        = string
}

variable "db_security_group_id" {
  description = "Name of DB SG group that allows it to connect to the backend"
  type        = string
}

variable "availability_zone" {
  description = "The Availability Zone of the RDS instance"
  type        = string
  default     = ""
}

variable "tags" {
  description = "A mapping of tags to assign to all resources"
  type        = map(string)
  default     = {}
}


variable "max_allocated_storage" {
  description = "Specifies the value for Storage Autoscaling"
  type        = number
}

variable "maintenance_window" {
  description = "The window to perform maintenance in. Syntax: 'ddd:hh24:mi-ddd:hh24:mi'. Eg: 'Mon:00:00-Mon:03:00'"
  type        = string
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


variable "vpc_id" {
  type        = string
  description = "underlying vpc id"
}

variable "base_domain" {
  description = "base domain of the application"
  default     = "connext.ninja"
}

variable "db_subnet_group_subnet_ids" {
  description = "subnet group ids"
  type        = list(string)
}

variable "publicly_accessible" {
  default = false
}

variable "performance_insights_enabled" {
  default = true
}
