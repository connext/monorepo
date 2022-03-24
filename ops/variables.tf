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

variable "mnemonic_testnet" {
  type        = string
  description = "mnemonic"
}

variable "admin_token_router_testnet" {
  type        = string
  description = "admin token"
  default     = "blahblah"
}
variable "logdna_key" {
  type = string
}

locals {
  docker_compose_router = <<-EOT
  version: \"3.3\"
  networks:
    nxtp:

  services:
    router:
      container_name: router
      environment:
        - 'NXTP_CONFIG=\"${local.local_router_config}\"'
        - 'NXTP_MNEMONIC=\"${var.mnemonic_testnet}\"'
      image: ${var.full_image_name_router}
      restart: always
      ports:
        - 8080:8080
      logging:
        driver: json-file
        options:
          max-size: 10m
          tag: \"{{.ImageName}}|{{.Name}}|{{.ImageFullID}}|{{.FullID}}\"

      networks:
        nxtp:

    logdna:
      container_name: logdna
      image: logdna/logspout:v1.2.0
      restart: always
      environment:
        LOGDNA_KEY: ${var.logdna_key}
        TAGS: "amarok-testnet-router"
      volumes:
        - /var/run/docker.sock:/var/run/docker.sock
      logging:
        driver: json-file
        options:
          max-size: 10m
          tag: \"amarok-testnet\"
      networks:
        - nxtp
      EOT

  docker_compose_sequencer = <<-EOT
  version: \"3.3\"
  networks:
    nxtp:

  services:
    sequencer:
      environment:
        NXTP_CONFIG: '${local.local_sequencer_config}'
      container_name: sequencer
      image: ${var.full_image_name_sequencer}
      restart: always
      ports:
        - 8081:8081
      logging:
        driver: json-file
        options:
          max-size: 10m
          tag: \"{{.ImageName}}|{{.Name}}|{{.ImageFullID}}|{{.FullID}}\"

      networks:
        nxtp:

    logdna:
      container_name: logdna
      image: logdna/logspout:v1.2.0
      restart: always
      environment:
        LOGDNA_KEY: ${var.logdna_key}
        TAGS: "amarok-testnet-sequencer"
      volumes:
        - /var/run/docker.sock:/var/run/docker.sock
      logging:
        driver: json-file
        options:
          max-size: 10m
          tag: \"amarok-testnet\"
      networks:
        - nxtp
      EOT

  local_router_config = jsonencode({
    "logLevel"     = "debug"
    "sequencerUrl" = "http://3.225.28.122:8081"
    "redisUrl"     = "redis://clustercfg.router-testnet.njrwqg.memorydb.us-east-1.amazonaws.com:6379"
    "server" = {
      "adminToken" = var.admin_token_router_testnet
    }
    "chains" = {
      "2000" = {
        "providers" = ["https://rinkeby.infura.io/v3/38f8f85747014e87b48035d84398a97c"]
        "subgraph" = {
          "runtime" = ["https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-rinkeby"]
          "analytics" : [""]
        }
        "deployments" = {
          "transactionManager" : "0xd6d9d8E6304C460b40022e467d8A8748962Eb0B0"
        }
        "assets" = [
          {
            "name"    = "TEST"
            "address" = "0x80dA4efc379E9ab45D2032F9EDf4D4aBc4EF2f9d"
          }
        ]
      }
      "3000" = {
        "providers" = ["https://kovan.infura.io/v3/38f8f85747014e87b48035d84398a97c"]
        "subgraph" = {
          "runtime"   = ["https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-kovan"]
          "analytics" = [""]
        }
        "deployments" = {
          "transactionManager" = "0x9F929643db56eaf747131CB4FA1126612b30Eb7F"
        }
        "assets" = [
          {
            "name"    = "TEST"
            "address" = "0xe71678794fff8846bFF855f716b0Ce9d9a78E844"
          }
        ]
      }
    }
    "mnemonic" = var.mnemonic_testnet
  })

  local_sequencer_config = jsonencode({
    "logLevel" = "debug"
    "redisUrl" = "redis://clustercfg.amarok-sequencer-testnet.njrwqg.memorydb.us-east-1.amazonaws.com:6379"
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
