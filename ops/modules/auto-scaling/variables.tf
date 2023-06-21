
variable "ecs_service_name" {
  description = "Service name to be scaled"
  type        = string
}

variable "ecs_cluster_name" {
  description = "Name of the ECS cluster to use"
  type        = string
}

variable "domain" {
  description = "domain of deployment"
}

variable "stage" {
  description = "stage of deployment"
}

variable "environment" {
  description = "env we're deploying to"
}

variable "max_capacity" {
  description = "Maximum number of tasks to run"
  type        = number
  default     = 30
}

variable "min_capacity" {
  description = "Minimum number of tasks to run"
  type        = number
  default     = 10
}

variable "avg_mem_utilization_target" {
  description = "Average memory utilization target"
  type        = number
  default     = 20
}

variable "avg_cpu_utilization_target" {
  description = "Average cpu utilization target"
  type        = number
  default     = 25
}
