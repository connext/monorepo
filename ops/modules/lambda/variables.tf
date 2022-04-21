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

variable "logdna_key" {
  description = "logdna key"
}

variable "service" {
  description = "service name for which to export logs"
}

variable "log_group_name" {
  description = "log group name"
}

variable "log_group_arn" {
  description = "log group arn"
}


