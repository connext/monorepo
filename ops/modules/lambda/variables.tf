variable "docker_image_tag" {
  description = "Docker image tag"
  type        = string
  default     = "latest"
}
variable "ecr_repository_name" {
  description = "ECR repository name"
  type        = string
}

variable "environment" {
  description = "Environment"
  type        = string
}

variable "container_family" {
  description = "Container family"
  type        = string
}

variable "stage" {
  description = "stage of deployment"
}

variable "container_env_vars" {
  description = "env vars for running container"
  sensitive   = true
}

variable "schedule_expression" {
  description = "how to schedule the cron job"
  default     = "cron(* * * * ? *)"
}

variable "timeout" {
  description = "timeout for lambda"
  default     = 750
}


variable "memory_size" {
  description = "memory size for lambda"
  default     = 10240
}

variable "cidr_block" {
  default = "172.17.0.0/16"
}

variable "domain" {
  description = "domain of deployment"
  default     = "core"
}

variable "lambda_in_vpc" {
  description = "whether or not to run lambda in vpc"
  default     = false
}

variable "subnet_ids" {
  type    = list(string)
  default = []
}

variable "lambda_security_groups" {
  type    = list(string)
  default = []
}
