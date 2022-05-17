locals {
  sequencer_env_vars = [
    { name = "SEQ_CONFIG", value = local.local_sequencer_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage }
  ]
  router_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_router_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage }
  ]
  lighthouse_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_lighthouse_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage }
  ]
  web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" }
  ]
}

locals {
  local_sequencer_config = jsonencode({
    redis = {
      host = module.sequencer_cache.redis_instance_address,
      port = module.sequencer_cache.redis_instance_port
    }

    server = {
      adminToken = var.admin_token_router
    }

    logLevel = "debug"
    chains = {
      "1111" = {
        providers = ["https://eth-rinkeby.alchemyapi.io/v2/${var.rinkeby_alchemy_key_0}", "https://rpc.ankr.com/eth_rinkeby"]
        assets = [{
          name    = "TEST"
          address = "0xB7b1d3cC52E658922b2aF00c5729001ceA98142C"
        }]
      }
      "2221" = {
        providers = ["https://eth-kovan.alchemyapi.io/v2/${var.kovan_alchemy_key_0}"]
        assets = [{
          name    = "TEST"
          address = "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F"
        }]
      }
      "3331" = {
        providers = ["https://eth-goerli.alchemyapi.io/v2/${var.goerli_alchemy_key_0}", "https://rpc.ankr.com/eth_goerli"]
        assets = [
          {
            name    = "TEST"
            address = "0xD426e23A6a9524101CDC017e01dDc3262B7aA65D"
          }
        ]
      }
    }

    environment = "production"
  })
}


locals {
  local_router_config = jsonencode({
    redis = {
      host = module.router_cache.redis_instance_address,
      port = module.router_cache.redis_instance_port
    }
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
        providers = ["https://eth-kovan.alchemyapi.io/v2/${var.kovan_alchemy_key_1}"]
        assets = [
          {
            name    = "TEST"
            address = "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F"
          }
        ]
      }
      "3331" = {
        providers = ["https://eth-goerli.alchemyapi.io/v2/${var.goerli_alchemy_key_1}", "https://rpc.ankr.com/eth_goerli"]
        assets = [
          {
            name    = "TEST"
            address = "0xD426e23A6a9524101CDC017e01dDc3262B7aA65D"
          }
        ]
      }
    }
    web3SignerUrl = "https://${module.web3signer.service_endpoint}"
    environment   = "production"
  })
}

locals {
  local_lighthouse_config = jsonencode({
    logLevel = "debug"
    chains = {
      "1111" = {
        providers = ["https://eth-rinkeby.alchemyapi.io/v2/${var.rinkeby_alchemy_key_1}", "https://rpc.ankr.com/eth_rinkeby"]
      }
      "2221" = {
        providers = ["https://eth-kovan.alchemyapi.io/v2/${var.kovan_alchemy_key_1}"]
      }
      "3331" = {
        providers = ["https://eth-goerli.alchemyapi.io/v2/${var.goerli_alchemy_key_1}", "https://rpc.ankr.com/eth_goerli"]
      }
    }
    environment = "production"
  })
}
