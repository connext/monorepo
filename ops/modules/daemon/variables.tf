variable "execution_role_arn" {}
variable "cluster_id" {}
variable "vpc_id" {}

variable "private_subnets" {
  type = list(string)
}

variable "docker_image" {}
variable "container_family" {}

variable "instance_count" {
  default = 1
}

variable "container_port" {
  default = 8080
}


variable "cpu" {
  default = 256
}

variable "memory" {
  default = 512
}

variable "region" {}

variable "environment" {}

variable "service_security_groups" {
  type = list(string)
}


variable "domain" {
  description = "domain of deployment"
}


variable "stage" {
  description = "stage of deployment"
}

variable "container_env_vars" {
  description = "env vars for running container"
}

variable "dd_api_key" {
  description = "DataDog API Key"
}

variable "health_check_command" {
  type        = list(string)
  description = "Path to health check endpoint"
  default = [
    "CMD-SHELL",
    "pgrep -x node"
  ]
}
