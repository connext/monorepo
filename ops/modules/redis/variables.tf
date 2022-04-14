variable "subnet_group_name" {
  description = "Name of the subnet group to be used for the cache cluster. Changing this value will re-create the resource."
  type        = string
}


variable "sg_id" {
  type        = string
  description = "security group id of worker node sg"
}

variable "vpc_id" {
  type        = string
  description = "underlying vpc id"
}

variable "stage" {
  description = "stage of deployment"
}

variable "environment" {
  description = "env we're deploying to"
}

variable "family" {
  default = "sequencer"
}