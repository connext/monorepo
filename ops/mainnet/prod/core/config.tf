locals {
  sequencer_env_vars = [
    { name = "SEQ_CONFIG", value = local.local_sequencer_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = var.stage },
    { name = "DD_SERVICE", value = "sequencer-${var.environment}" }
  ]
  router_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_router_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = var.stage },
    { name = "DD_SERVICE", value = "router-${var.environment}" }
  ]
  lighthouse_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_lighthouse_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = var.stage },
    { name = "DD_SERVICE", value = "router-${var.environment}" }
  ]
  router_web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.router_web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" }
  ]
  sequencer_web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.sequencer_web3_signer_private_key },
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
      "6648936" = {
        providers = ["https://eth-mainnet.alchemyapi.io/v2/${var.mainnet_alchemy_key_0}", "https://rpc.ankr.com/eth"]
        assets = [{
          name    = "USDC"
          address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
          }, {
          name    = "WETH"
          address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        }]
      },
      "1869640809" = {
        providers = ["https://opt-mainnet.g.alchemy.com/v2/${var.optimism_alchemy_key_0}", "https://rpc.ankr.com/optimism"]
        assets = [{
          name    = "USDC"
          address = "0x85FB8e2903Ad92A2ab0C6a725806636666ee2Ab4"
          }, {
          name    = "WETH"
          address = "0xfD5C16a50b717338Cbcb44e34e10d735709E9Cb9"
        }]
      },
      "1886350457" = {
        providers = ["https://polygon-mainnet.g.alchemy.com/v2/${var.polygon_alchemy_key_0}", "https://rpc.ankr.com/polygon"]
        assets = [{
          name    = "USDC"
          address = "0x2ABe2d4F09ea3124DE56AD91ae0950A3B71eCD11"
          }, {
          name    = "WETH"
          address = "0x2BD5B3cfB2b16F2B10e7BA41dc1cb93d61B36bB8"
        }]
      }
    }
    web3SignerUrl = "https://${module.sequencer_web3signer.service_endpoint}"
    environment   = var.stage
    messageQueue = {
      connection = {
        uri = "amqps://${var.rmq_mgt_user}:${var.rmq_mgt_password}@${module.centralised_message_queue.aws_mq_amqp_endpoint}"
      }
      exchanges = [
        {
          name           = "sequencerX"
          type           = "direct"
          publishTimeout = 1000
          persistent     = true
          durable        = true
        }
      ]
      queues = [
        {
          name       = "1"
          limit      = 6
          queueLimit = 10000
          subscribe  = true
        },
        {
          name       = "10"
          limit      = 6
          queueLimit = 10000
          subscribe  = true
        },
        {
          name       = "137"
          limit      = 6
          queueLimit = 10000
          subscribe  = true
        }
      ]
      bindings = [
        {
          exchange = "sequencerX"
          target   = "1"
          keys     = ["1"]
        },
        {
          exchange = "sequencerX"
          target   = "10"
          keys     = ["10"]
        },
        {
          exchange = "sequencerX"
          target   = "137"
          keys     = ["137"]
        }
      ]
      executerTimeout = 300000
      publisher       = "sequencerX"
    },
    gelatoApiKey = "${var.gelato_api_key}"
  })

  local_router_config = jsonencode({
    redis = {
      host = module.router_cache.redis_instance_address,
      port = module.router_cache.redis_instance_port
    }
    logLevel     = "debug"
    sequencerUrl = "https://${module.sequencer_publisher.service_endpoint}"
    server = {
      adminToken = var.admin_token_router
      pub = {
        port = 8080
      }
      sub = {
        port = 8080
      }
      exec = {
        port = 8080
      }
    }
    chains = {
      "6648936" = {
        providers = ["https://eth-mainnet.alchemyapi.io/v2/${var.mainnet_alchemy_key_1}", "https://rpc.ankr.com/eth"]
        assets = [{
          name    = "USDC"
          address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
          }, {
          name    = "WETH"
          address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        }]
      },
      "1869640809" = {
        providers = ["https://opt-mainnet.g.alchemy.com/v2/${var.optimism_alchemy_key_1}", "https://rpc.ankr.com/optimism"]
        assets = [{
          name    = "USDC"
          address = "0x85FB8e2903Ad92A2ab0C6a725806636666ee2Ab4"
          }, {
          name    = "WETH"
          address = "0xfD5C16a50b717338Cbcb44e34e10d735709E9Cb9"
        }]
      },
      "1886350457" = {
        providers = ["https://polygon-mainnet.g.alchemy.com/v2/${var.polygon_alchemy_key_1}", "https://rpc.ankr.com/polygon"]
        assets = [{
          name    = "USDC"
          address = "0x2ABe2d4F09ea3124DE56AD91ae0950A3B71eCD11"
          }, {
          name    = "WETH"
          address = "0x2BD5B3cfB2b16F2B10e7BA41dc1cb93d61B36bB8"
        }]
      }
    }
    cartographerUrl = "https://postgrest.mainnet.connext.ninja"
    web3SignerUrl   = "https://${module.router_web3signer.service_endpoint}"
    environment     = var.stage
    messageQueue = {
      uri = "amqps://${var.rmq_mgt_user}:${var.rmq_mgt_password}@${module.centralised_message_queue.aws_mq_amqp_endpoint}"
    }
  })

  local_lighthouse_config = jsonencode({
    logLevel = "debug"
    chains = {
      "6648936" = {
        providers = ["https://eth-mainnet.alchemyapi.io/v2/${var.mainnet_alchemy_key_0}", "https://rpc.ankr.com/eth"]
      },
      "1869640809" = {
        providers = ["https://opt-mainnet.g.alchemy.com/v2/${var.optimism_alchemy_key_0}", "https://rpc.ankr.com/optimism"]
      },
      "1886350457" = {
        providers = ["https://polygon-mainnet.g.alchemy.com/v2/${var.polygon_alchemy_key_0}", "https://rpc.ankr.com/polygon"]
      }
    }
    gelatoApiKey = "${var.gelato_api_key}"
    environment  = var.stage
    databaseUrl  = "postgresql://${var.postgres_user}:${var.postgres_password}@db.mainnet.connext.ninja:5432/connext"
  })
}
