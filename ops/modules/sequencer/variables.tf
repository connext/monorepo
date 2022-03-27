variable "execution_role_arn" {}
variable "cluster_id" {}
variable "vpc_id" {}

variable "private_subnets" {
  type = list(string)
}

variable "public_subnets" {
  type = list(string)
}

variable "docker_image" {}
variable "container_family" {}

variable "instance_count" {
  default = 1
}

variable "container_port" {
  default = 8080
}

variable "loadbalancer_port" {
  default = 8080
}

variable "cpu" {
  default = 256
}

variable "memory" {
  default = 512
}

variable "health_check_path" {
  default = "/healthz"
}

variable "matcher_ports" {
  default = "200,302"
}

variable "timeout" {
  default = 60
}

variable "ecs_cluster_sg" {}

variable "allow_all_sg" {}

variable "redis_uri" {}

variable "environment" {}

variable "mnemonic" {}

locals {
  local_sequencer_config = jsonencode({
    "logLevel" = "debug"
    "redisUrl" = "redis://${var.redis_uri}:6379"
    "chains" = {
      "2000" = {
        "providers" = ["https://rinkeby.infura.io/v3/19b854cad0bc4089bffd0c93f23ece9f"]
        "subgraph" = {
          "runtime"   = ["https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-rinkeby"]
          "analytics" = [""]
        }
        "deployments" = {
          "transactionManager" = "0xd6d9d8E6304C460b40022e467d8A8748962Eb0B0"
        }
        "assets" = [{
          "name"    = "TEST"
          "address" = "0xf4CF3FcC8dC7E5171Bb08bef75EDe3fEf00F46E6"
        }]
      }
      "3000" = {
        "providers" = ["https://kovan.infura.io/v3/19b854cad0bc4089bffd0c93f23ece9f"]
        "subgraph" = {
          "runtime" = ["https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-kovan"]
          "analytics" : [""]
        }
        "deployments" = {
          "transactionManager" = "0x9F929643db56eaf747131CB4FA1126612b30Eb7F"
        }
        "assets" = [{
          "name"    = "TEST"
          "address" = "0xe71678794fff8846bFF855f716b0Ce9d9a78E844"
        }]
      }
    }
  })
}

