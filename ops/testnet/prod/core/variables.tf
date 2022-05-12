variable "region" {
  default = "us-west-1"
}

variable "cidr_block" {
  default = "172.17.0.0/16"
}

variable "az_count" {
  default = "2"
}

variable "stage" {
  description = "stage of deployment"
  default     = "production"
}

variable "environment" {
  description = "env we're deploying to"
  default     = "testnet"
}

variable "domain" {
  default = "core"
}

variable "full_image_name_router" {
  type        = string
  description = "router image name"
  default     = "ghcr.io/connext/router:0.2.0-alpha.11"
}

variable "full_image_name_sequencer" {
  type        = string
  description = "sequencer image name"
  default     = "ghcr.io/connext/sequencer:0.2.0-alpha.14"
}

variable "full_image_name_lighthouse" {
  type        = string
  description = "router image name"
  default     = "ghcr.io/connext/lighthouse:0.2.0-alpha.14"
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
  default = "arn:aws:acm:us-west-1:679752396206:certificate/0ebbf095-681a-4a0a-9dc9-fa70cb80166a"
}

variable "rinkeby_alchemy_key_0" {
  type = string
}

variable "kovan_alchemy_key_0" {
  type = string
}

variable "goerli_alchemy_key_0" {
  type = string
}

variable "rinkeby_alchemy_key_1" {
  type = string
}

variable "kovan_alchemy_key_1" {
  type = string
}

variable "goerli_alchemy_key_1" {
  type = string
}

variable "logdna_key" {
  type = string
}

variable "web3_signer_private_key" {
  type = string
}
