variable "ecs_cluster_name_prefix" {
}

variable "private_subnets" {
  type = list(string)
}

variable "public_subnets" {
  type = list(string)
}

variable "vpc_id" {}

variable "stage" {
  description = "stage of deployment"
}


variable "environment" {
  description = "env we're deploying to"
}