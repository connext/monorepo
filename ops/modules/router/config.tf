
locals {
  local_router_config = jsonencode({
    "logLevel"     = "debug"
    "sequencerUrl" = var.sequencer_url
    "redisUrl" = "redis://${var.redis_uri}:6379"
    "server"       = {
      "adminToken" = var.admin_token
    }
    "chains" = {
      "2000" = {
        "providers" = ["https://rinkeby.infura.io/v3/38f8f85747014e87b48035d84398a97c"]
        "subgraph"  = {
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
        "subgraph"  = {
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
    "mnemonic" = var.mnemonic
  })
}