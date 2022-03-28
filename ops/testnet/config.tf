locals {
  local_sequencer_config = jsonencode({
    "logLevel" = "debug"
    "redisUrl" = "redis://${module.sequencer_cache.redis_instance_address}:6379"
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


locals {
  local_router_config = jsonencode({
    "logLevel"     = "debug"
    "sequencerUrl" =  module.sequencer.dns_name
    "redisUrl"     = "redis://${module.router_cache.redis_instance_address}:6379"
    "server" = {
      "adminToken" = var.admin_token_router
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
    "mnemonic" = "${var.mnemonic}"
  })
}