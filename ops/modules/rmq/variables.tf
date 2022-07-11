variable "cluster_id" {}

variable "vpc_id" {}

variable "private_subnets" {
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

variable "container_env_vars" {
  description = "env vars for running container"
}

variable "docker_image" {}
variable "container_family" {}

variable "instance_count" {
  default = 1
}

variable "container_port" {
  default = 8080
}

variable "loadbalancer_port" {
  default = 80
}

variable "cpu" {
  default = 256
}

variable "memory" {
  default = 512
}


variable "min_tasks" {
  description = "Number of tasks to run"
  default     = 1
}

variable "max_tasks" {
  description = "Number of tasks to run"
  default     = 2
}

variable "desired_tasks" {
  description = "Desired tasks"
  default     = 1
}

variable "registry_url" {
  description = "Your docker registry url"
  type        = string
}

variable "dns_name" {
  type    = string
  default = var.stage != "production" ? "${var.environment}.${var.stage}.${var.base_domain}" : "${var.environment}.${var.base_domain}"
}
