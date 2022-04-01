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
        "assets" = [{
          "name"    = "TEST"
          "address" = "0xcF4d2994088a8CDE52FB584fE29608b63Ec063B2"
        }]
      }
      "3000" = {
        "providers" = ["https://kovan.infura.io/v3/19b854cad0bc4089bffd0c93f23ece9f"]
        "subgraph" = {
          "runtime" = ["https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-kovan"]
          "analytics" : [""]
        }
        "assets" = [{
          "name"    = "TEST"
          "address" = "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F"
        }]
      }
    }
  })
}


locals {
  local_router_config = jsonencode({
    logLevel     = "debug"
    sequencerUrl = "http://${module.sequencer.dns_name}:8080"
    redisUrl     = "redis://${module.router_cache.redis_instance_address}:6379"
    server = {
      adminToken = var.admin_token_router
      port       = 8080
    }
    chains = {
      2000 = {
        providers = ["https://rinkeby.infura.io/v3/38f8f85747014e87b48035d84398a97c"]
        subgraph = {
          runtime = ["https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-rinkeby"]
          analytics : [""]
        }
        assets = [
          {
            name    = "TEST"
            address = "0xcF4d2994088a8CDE52FB584fE29608b63Ec063B2"
          }
        ]
      }
      3000 = {
        providers = ["https://kovan.infura.io/v3/38f8f85747014e87b48035d84398a97c"]
        subgraph = {
          runtime   = ["https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-kovan"]
          analytics = [""]
        }
        assets = [
          {
            name    = "TEST"
            address = "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F"
          }
        ]
      }
    }
    mnemonic = var.mnemonic
  })
}
