variable "region" {
  default = "us-west-1"
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
  default     = "production"
}

variable "environment" {
  description = "env we're deploying to"
  default     = "testnet"
}

variable "full_image_name_cartographer_routers" {
  type        = string
  description = "cartographer routers image name"
  default     = "ghcr.io/connext/cartographer-routers:0.2.0-beta.17"
}

variable "full_image_name_cartographer_transfers" {
  type        = string
  description = "cartographer transfers image name"
  default     = "ghcr.io/connext/cartographer-transfers:0.2.0-beta.17"
}

variable "full_image_name_cartographer_messages" {
  type        = string
  description = "cartographer messages image name"
  default     = "ghcr.io/connext/cartographer-messages:0.2.0-beta.17"
}

variable "certificate_arn_testnet" {
  default = "arn:aws:acm:us-west-1:679752396206:certificate/0ebbf095-681a-4a0a-9dc9-fa70cb80166a"
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
