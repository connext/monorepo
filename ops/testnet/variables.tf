variable "region" {
  default = "us-east-1"
}

variable "cidr_block" {
  default = "172.17.0.0/16"
}

variable "az_count" {
  default = "2"
}

variable "environment" {
  description = "env we're deploying to"
  default     = "testnet"
}

variable "full_image_name_router" {
  type        = string
  description = "router image name"
  default     = "ghcr.io/connext/router:sha-0666fc1"
}

variable "full_image_name_sequencer" {
  type        = string
  description = "sequencer image name"
  default     = "ghcr.io/connext/sequencer:sha-0666fc1"
}

variable "mnemonic" {
  type        = string
  description = "mnemonic"
  default     = "female autumn drive capable scorpion congress hockey chunk mouse cherry blame trumpet"
}

variable "admin_token_router" {
  type        = string
  description = "admin token"
}

variable "certificate_arn_testnet" {
  default = "arn:aws:acm:us-east-1:679752396206:certificate/849d038c-a8c8-4324-9773-ffb4c6afe0a3"
}

