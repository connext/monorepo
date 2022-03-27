variable "ecs_cluster_name" {
  default = "tracer"
}

variable "private_subnets" {
  type = list(string)
}

variable "public_subnets" {
  type = list(string)
}

variable "vpc_id" {}
