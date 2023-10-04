variable "region" {
  default = "us-east-2"
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
  default     = "mainnet"
}

variable "domain" {
  default = "core"
}

variable "full_image_name_router_publisher" {
  type        = string
  description = "router image name"
  default     = "ghcr.io/connext/router-publisher:0.2.1-beta.8"
}

variable "full_image_name_router_subscriber" {
  type        = string
  description = "router image name"
  default     = "ghcr.io/connext/router-subscriber:0.2.1-beta.8"
}

variable "full_image_name_router_executor" {
  type        = string
  description = "router image name"
  default     = "ghcr.io/connext/router-executor:0.2.1-beta.8"
}

variable "full_image_name_sequencer_server" {
  type        = string
  description = "sequencer server image name"
  default     = "ghcr.io/connext/sequencer-server:0.2.1-beta.8"
}

variable "full_image_name_sequencer_publisher" {
  type        = string
  description = "sequencer publisher image name"
  default     = "ghcr.io/connext/sequencer-publisher:0.2.1-beta.8"
}

variable "full_image_name_sequencer_subscriber" {
  type        = string
  description = "sequencer subscriber image name"
  default     = "ghcr.io/connext/sequencer-subscriber:0.2.1-beta.8"
}

variable "full_image_name_lighthouse_prover_subscriber" {
  type        = string
  description = "lighthouse subscriber image name"
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
}

variable "admin_token_router" {
  type        = string
  description = "admin token"
}

variable "admin_token_sequencer" {
  type        = string
  description = "admin token"
}

variable "rmq_mgt_password" {
  type        = string
  description = "RabbitMQ management password"
}

variable "rmq_mgt_user" {
  type        = string
  default     = "connext"
  description = "RabbitMQ management user"
}

variable "certificate_arn" {
  default = "arn:aws:acm:us-east-2:679752396206:certificate/eecbb4dd-f537-40f0-afdb-233ee066ba80"
}

variable "mainnet_alchemy_key_0" {
  type = string
}

variable "mainnet_alchemy_key_1" {
  type = string
}

variable "optimism_alchemy_key_0" {
  type = string
}

variable "optimism_alchemy_key_1" {
  type = string
}

variable "polygon_alchemy_key_0" {
  type = string
}

variable "polygon_alchemy_key_1" {
  type = string
}

variable "arbitrum_alchemy_key_0" {
  type = string
}

variable "arbitrum_alchemy_key_1" {
  type = string
}

variable "blast_key" {
  type = string
}

variable "pokt_key" {
  type = string
}

variable "router_web3_signer_private_key" {
  type = string
}

variable "sequencer_web3_signer_private_key" {
  type = string
}

variable "dd_api_key" {
  type = string
}

variable "gelato_api_key" {
  type = string
}

variable "connext_relayer_api_key" {
  type    = string
  default = "foo"
}

variable "postgres_password" {
  type = string
}

variable "postgres_user" {
  type    = string
  default = "connext"
}

variable "lighthouse_prover_heartbeat" {
  type = string
}

variable "lighthouse_processor_heartbeat" {
  type = string
}

variable "lighthouse_propagate_heartbeat" {
  type = string
}

variable "lighthouse_send_outbound_root_heartbeat" {
  type = string
}

variable "full_image_name_relayer" {
  type        = string
  description = "relayer image name"
  default     = "ghcr.io/connext/relayer:0.2.1-beta.8"
}
variable "relayer_web3_signer_private_key" {
  type = string
}

variable "full_image_name_watcher" {
  type        = string
  description = "watcher image name"
  default     = "ghcr.io/connext/watcher:sha-b5bb49a"
}

variable "admin_token_relayer" {
  type    = string
  default = "blahblah"
}

variable "graph_api_key" {
  type = string
}

variable "watcher_web3_signer_private_key" {
  type = string
}
variable "admin_token_watcher" {
  type    = string
  default = "blahblah"
}

variable "discord_webhook_key" {
  type = string
}

variable "telegram_api_key" {
  type = string
}

variable "telegram_chat_id" {
  type = string
}

variable "betteruptime_api_key" {
  type = string
}

variable "betteruptime_requester_email" {
  type    = string
  default = "layne@connext.network"
}
