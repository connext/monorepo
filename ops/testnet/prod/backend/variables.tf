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

variable "cartographer_image_tag" {
  type        = string
  description = "cartographer image tag"
  default     = "latest"
}

variable "full_image_name_sdk_server" {
  type        = string
  description = "sdk-server image name"
  default     = "latest"
}

variable "certificate_arn_testnet" {
  default = "arn:aws:acm:us-west-1:679752396206:certificate/0ebbf095-681a-4a0a-9dc9-fa70cb80166a"
}

variable "postgres_password" {
  type      = string
  sensitive = true
}

variable "postgres_user" {
  type    = string
  default = "connext"
}

variable "dd_api_key" {
  type      = string
  sensitive = true
}

variable "carto_messages_heartbeat" {
  type = string
}

variable "carto_roots_heartbeat" {
  type = string
}

variable "carto_routers_heartbeat" {
  type = string
}

variable "carto_transfers_heartbeat" {
  type = string
}
