variable "region" {
  default = "us-east-1"
}

variable "cidr_block" {
  default = "172.17.0.0/16"
}

variable "az_count" {
  default = "2"
}

variable "domain" {
  description = "domain of deployment"
  default     = "backend"
}

variable "stage" {
  description = "stage of deployment"
  default     = "staging"
}

variable "environment" {
  description = "env we're deploying to"
  default     = "testnet"
}

variable "full_image_name_cartographer_routers" {
  type        = string
  description = "cartographer routers image name"
  default     = "ghcr.io/connext/cartographer-routers:sha-67628e6"
}

variable "full_image_name_cartographer_transfers" {
  type        = string
  description = "cartographer transfers image name"
  default     = "ghcr.io/connext/cartographer-transfers:sha-67628e6"
}

variable "full_image_name_cartographer_messages" {
  type        = string
  description = "cartographer messages image name"
  default     = "ghcr.io/connext/cartographer-messages:sha-67628e6"
}

variable "certificate_arn_testnet" {
  default = "arn:aws:acm:us-east-1:679752396206:certificate/45908dc4-137b-4366-8538-4f59ee6a914e"
}

variable "postgres_password" {
  type = string
}

variable "postgres_user" {
  type    = string
  default = "connext"
}

variable "dd_api_key" {
  type = string
}

variable "health_check_command" {
  type        = list(string)
  description = "Path to health check endpoint"
  default = [
    "CMD-SHELL",
    "pgrep -x node"
  ]
}
