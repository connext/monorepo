
locals {
  sequencer_env_vars = jsondecode([
    { name = "SEQ_CONFIG", value = local.local_sequencer_config },
    { name = "ENVIRONMENT", value = var.environment }
  ])
  router_env_vars = jsondecode([
    { name = "NXTP_CONFIG", value = local.local_sequencer_config },
    { name = "NXTP_MNEMONIC", value = var.mnemonic },
    { name = "ENVIRONMENT", value = var.environment }
  ])
  web3signer_env_vars = jsondecode([
    { name = "AWS_SM_SECRET_NAME", value = module.aws_secrets.web3signer_secret_name },
    { name = "AWS_ACCESS_KEY_ID", value = var.web3signer_aws_access_key_id },
    { name = "AWS_SECRET_ACCESS_KEY", value = var.web3signer_aws_secret_access_key },
    { name = "AWS_REGION", value = var.region },
  ])
}

locals {
  local_sequencer_config = jsonencode({
    redis = {
      host : module.sequencer_cache.redis_instance_address,
      port : module.sequencer_cache.redis_instance_port
    },

    server       = {
      adminToken = var.admin_token_router
    }

    chains = {
      "1111" = {
        providers = ["https://eth-rinkeby.alchemyapi.io/v2/${var.rinkeby_alchemy_key_0}", "https://rpc.ankr.com/eth_rinkeby"]
        assets = [
          {
            "name"    = "TEST"
            "address" = "0xcF4d2994088a8CDE52FB584fE29608b63Ec063B2"
          }
        ]
      }
      "2221" = {
        assets = [
          {
            name    = "TEST"
            address = "0xB5AabB55385bfBe31D627E2A717a7B189ddA4F8F"
          }
        ]
        providers = ["https://eth-kovan.alchemyapi.io/v2/${var.kovan_alchemy_key_0}"]
      }
    }
    logLevel = "debug"
  })
}


locals {
  local_router_config = jsonencode({
    redis = {
      host : module.router_cache.redis_instance_address,
      port : module.router_cache.redis_instance_port
    },
    logLevel     = "debug"
    sequencerUrl = "https://${module.sequencer.service_endpoint}"
    server       = {
      adminToken = var.admin_token_router
      port       = 8080
    }
    chains = {
      "1111" = {
        providers = ["https://eth-rinkeby.alchemyapi.io/v2/${var.rinkeby_alchemy_key_1}", "https://rpc.ankr.com/eth_rinkeby"]
        assets = [
          {
            name    = "TEST"
            address = "0xcF4d2994088a8CDE52FB584fE29608b63Ec063B2"
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
    mnemonic = var.mnemonic
  })
}
