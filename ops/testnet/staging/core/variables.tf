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
  default     = "core"
}

variable "stage" {
  description = "stage of deployment"
  default     = "staging"
}

variable "environment" {
  description = "env we're deploying to"
  default     = "testnet"
}

variable "full_image_name_router_publisher" {
  type        = string
  description = "router image name"
  default     = "ghcr.io/connext/router-publisher:sha-b5bb49a"
}

variable "full_image_name_router_subscriber" {
  type        = string
  description = "lighthouse subscriber image name"
  default     = "ghcr.io/connext/router-subscriber:sha-b5bb49a"
}

variable "full_image_name_lighthouse_prover_subscriber" {
  type        = string
  description = "lighthouse prover image name"
  default     = "ghcr.io/connext/lighthouse-subscriber:sha-b5bb49a"
}

variable "full_image_name_sequencer_server" {
  type        = string
  description = "sequencer image name"
  default     = "ghcr.io/connext/sequencer-server:sha-b5bb49a"
}

variable "full_image_name_sequencer_publisher" {
  type        = string
  description = "sequencer image name"
  default     = "ghcr.io/connext/sequencer-publisher:sha-b5bb49a"
}

variable "full_image_name_sequencer_subscriber" {
  type        = string
  description = "sequencer image name"
  default     = "ghcr.io/connext/sequencer-subscriber:sha-b5bb49a"
}

variable "full_image_name_router_executor" {
  type        = string
  description = "executor image name"
  default     = "ghcr.io/connext/router-executor:sha-7855c40"
}

variable "full_image_name_relayer" {
  type        = string
  description = "relayer image name"
  default     = "ghcr.io/connext/relayer:sha-b5bb49a"
}

variable "full_image_name_watcher" {
  type        = string
  description = "watcher image name"
  default     = "ghcr.io/connext/watcher:sha-b5bb49a"
}

variable "lighthouse_image_tag" {
  type        = string
  description = "lighthouse image tag"
  default     = "latest"
}

variable "mnemonic" {
  type        = string
  description = "mnemonic"
  default     = "female autumn drive capable scorpion congress hockey chunk mouse cherry blame trumpet"
  sensitive   = true
}

variable "admin_token_router" {
  type        = string
  description = "admin token"
  sensitive   = true
}

variable "rmq_mgt_password" {
  type        = string
  description = "RabbitMQ management password"
  sensitive   = true
}

variable "rmq_mgt_user" {
  type        = string
  default     = "connext"
  description = "RabbitMQ management user"
}


variable "certificate_arn_testnet" {
  default = "arn:aws:acm:us-east-1:679752396206:certificate/45908dc4-137b-4366-8538-4f59ee6a914e"
}

variable "goerli_alchemy_key_0" {
  type      = string
  sensitive = true
}

variable "goerli_alchemy_key_1" {
  type      = string
  sensitive = true
}

variable "optgoerli_alchemy_key_0" {
  type      = string
  sensitive = true
}

variable "optgoerli_alchemy_key_1" {
  type      = string
  sensitive = true
}

variable "mumbai_alchemy_key_0" {
  type      = string
  sensitive = true
}

variable "blast_key" {
  type      = string
  sensitive = true
}

variable "dd_api_key" {
  type      = string
  sensitive = true
}

variable "router_web3_signer_private_key" {
  type      = string
  sensitive = true
}

variable "sequencer_web3_signer_private_key" {
  type      = string
  sensitive = true
}

variable "gelato_api_key" {
  type      = string
  sensitive = true
}

variable "postgres_password" {
  type      = string
  sensitive = true
}

variable "postgres_user" {
  type    = string
  default = "connext"
}

variable "relayer_web3_signer_private_key" {
  type      = string
  sensitive = true
}

variable "admin_token_relayer" {
  type      = string
  default   = "blahblah"
  sensitive = true
}

variable "watcher_web3_signer_private_key" {
  type      = string
  sensitive = true
}
variable "admin_token_watcher" {
  type      = string
  default   = "blahblah"
  sensitive = true
}

variable "discord_webhook_key" {
  type      = string
  sensitive = true
}

variable "telegram_api_key" {
  type      = string
  sensitive = true
}

variable "telegram_chat_id" {
  type      = string
  sensitive = true
}

variable "betteruptime_api_key" {
  type      = string
  sensitive = true
}

variable "betteruptime_requester_email" {
  type    = string
  default = "layne@proximalabs.io"
}

variable "lighthouse_web3_signer_private_key" {
  type      = string
  sensitive = true
}
