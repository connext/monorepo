variable "region" {
  default = "eu-central-1"
}

variable "ami" {
  type        = map(string)
  description = "AWS ECS AMI id"

  default = {
    us-east-1      = "ami-cb2305a1"
    us-west-1      = "ami-bdafdbdd"
    us-west-2      = "ami-ec75908c"
    eu-west-1      = "ami-13f84d60"
    eu-central-1   = "ami-c3253caf"
    ap-northeast-1 = "ami-e9724c87"
    ap-southeast-1 = "ami-5f31fd3c"
    ap-southeast-2 = "ami-83af8ae0"
  }
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
  default     = "ghcr.io/connext/router:sha-011c975"
}

variable "full_image_name_sequencer" {
  type        = string
  description = "sequencer image name"
  default     = "ghcr.io/connext/sequencer:sha-011c975"
}

variable "mnemonic" {
  type        = string
  description = "mnemonic"
}

variable "admin_token_router" {
  type        = string
  description = "admin token"
  default     = "blahblah"
}