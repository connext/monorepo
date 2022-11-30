variable "docker_image" {}

variable "environment" {}


variable "container_family" {
  type = string
}


variable "stage" {
  description = "stage of deployment"
}

variable "container_env_vars" {
  description = "env vars for running container"
}
variable "schedule_expression" {
  description = "how to schedule the cron job"
  default     = "cron(* * * * ? *)"
}
