
variable "domain" {
  type = string
  description = "Domain model target"
}

variable "stage" {
  description = "stage of deployment"
}

variable "environment" {
  description = "env we're deploying to"
}

variable "ecs_task_sg_id" {
  type = string
  description = "security group id of worker node sg"
}

variable "vpc_id" {
  type = string
  description = "security group id of worker node sg"
}


variable "vpc_cdir_block" {
  type = string
  description = "security group id of worker node sg"
}
