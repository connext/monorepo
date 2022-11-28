variable "execution_role_arn" {}
variable "cluster_id" {}
variable "vpc_id" {}

variable "private_subnets" {
  type = list(string)
}

variable "docker_image" {}

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

variable "ecs_cluster_arn" {
  description = "ECS cluster ARN"
}

variable "schedule_expression" {
  description = "how to schedule the cron job"
  default = "cron(* * * * ? *)"
}