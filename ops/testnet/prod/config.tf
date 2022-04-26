locals {
  sequencer_env_vars = jsondecode([
    { name = "SEQ_CONFIG", value = local.local_sequencer_config },
    { name = "ENVIRONMENT", value = var.environment }
  ])
  router_env_vars = jsondecode([
    { name = "NXTP_CONFIG", value = local.local_sequencer_config },
    { name = "ENVIRONMENT", value = var.environment }
  ])
  web3signer_env_vars = jsondecode([
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" }
  ])
}

locals {
  local_sequencer_config = jsonencode({
    redis =  {
      host: module.sequencer_cache.redis_instance_address,
      port: module.sequencer_cache.redis_instance_port
    },

    server       = {
      adminToken = var.admin_token_router
    }

    logLevel = "debug"
    chains = {
      "1111" = {
        providers = ["https://eth-rinkeby.alchemyapi.io/v2/${var.rinkeby_alchemy_key_0}", "https://rpc.ankr.com/eth_rinkeby"]
        "assets" = [{
          "name"    = "TEST"
          "address" = "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C"
        }]
      }
      "2221" = {
        providers = ["https://eth-kovan.alchemyapi.io/v2/${var.kovan_alchemy_key_0}"]
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
    redis =  {
      host: module.router_cache.redis_instance_address,
      port: module.router_cache.redis_instance_port
    },
    logLevel     = "debug"
    sequencerUrl = "https://${module.sequencer.service_endpoint}"
    server = {
      adminToken = var.admin_token_router
      port       = 8080
    }
    chains = {
      "1111" = {
        providers = ["https://eth-rinkeby.alchemyapi.io/v2/${var.rinkeby_alchemy_key_1}", "https://rpc.ankr.com/eth_rinkeby"]
        assets = [
          {
            name    = "TEST"
            address = "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C"
          }
        ]
      }
      "2221" = {
        "providers" = ["https://eth-kovan.alchemyapi.io/v2/${var.kovan_alchemy_key_1}"]
        assets = [
          {
            name    = "TEST"
            address = "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F"
          }
        ]
      }
    }
    web3SignerUrl = "https://${module.web3signer.service_endpoint}"
  })
}
