variable "execution_role_arn" {}

variable "cluster_id" {}

variable "vpc_id" {}

variable "private_subnets" {
  type = list(string)
}


variable "lb_subnets" {
  type = list(string)
}

variable "docker_image" {}
variable "container_family" {}

variable "instance_count" {
  default = 1
}

variable "ingress_cdir_blocks" {
  type = list(string)
}
variable "allow_all_cdir_blocks" {
  default = ["0.0.0.0/0"]
}

variable "service_security_groups" {
  type = list(string)
}
variable "zone_id" {
  description = "hosted zone id"
}

variable "cert_arn" {
  description = "ACM certificate"
}

variable "base_domain" {
  description = "base domain of the application"
  default     = "connext.ninja"
}

variable "domain" {
  description = "domain of deployment"
}

variable "stage" {
  description = "stage of deployment"
}


variable "cpu" {
  default = 256
}

variable "memory" {
  default = 512
}

variable "timeout" {
  default = 60
}

variable "region" {}

variable "environment" {}

variable "container_env_vars" {
  description = "env vars for running container"
}