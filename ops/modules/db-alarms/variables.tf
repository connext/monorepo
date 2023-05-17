variable "db_instance_name" {
  type        = string
  description = "The name of the database instance"
}

variable "db_instance_id" {
  type        = string
  description = "The id of the database instance"
}

variable "is_replica" {
  type        = bool
  description = "Whether the database instance is a replica"
}

variable "enable_cpu_utilization_alarm" {
  type        = bool
  description = "Whether to enable the CPU utilization alarm"
}

variable "enable_free_storage_space_too_low_alarm" {
  type        = bool
  description = "Whether to enable the free storage space too low alarm"
}

variable "environment" {
  type        = string
  description = "The environment of the database instance"
}

variable "stage" {
  type        = string
  description = "The stage of the database instance"
}

variable "sns_topic_subscription_emails" {
  type        = list(string)
  description = "The emails to subscribe to the SNS topic"
}

variable "free_storage_space_threshold" {
  type        = number
  description = "The free storage space threshold"
  default     = 5
}


variable "cpu_utilization_threshold" {
  type        = number
  description = "The free storage space threshold"
  default     = 90
}
