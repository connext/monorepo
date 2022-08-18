
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
