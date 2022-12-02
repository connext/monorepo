variable "repository_names" {
  description = "ECR repository names"
  type        = list(string)
}

variable "registry_replication_rules" {
  description = "The replication rules for a replication configuration. A maximum of 10 are allowed"
  type        = any
  default     = []
}
