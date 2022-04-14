variable "az_count" {
  default = 2
}

variable "cidr_block" {}

variable "stage" {
  description = "stage of deployment"
}

variable "environment" {
  description = "env we're deploying to"
}