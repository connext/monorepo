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
  # lighthouse_env_vars = [
  #   { name = "NXTP_CONFIG", value = local.local_lighthouse_config },
  #   { name = "ENVIRONMENT", value = var.environment },
  #   { name = "STAGE", value = var.stage }
  # ]
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
      "1" = {
        providers = ["https://eth-mainnet.alchemyapi.io/v2/${var.mainnet_alchemy_key_0}", "https://rpc.ankr.com/eth_mainnet"]
        assets = [{
          name    = "USDC"
          address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        }]
      }
    }
    environment = var.stage
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
          limit   = 6
          queueLimit = 10000
          subscribe  = true
        }
      ]
      bindings = [
        {
          exchange = "sequencerX"
          target   = "1"
          keys     = ["1"]
        }
      ]
      executerTimeout = 300000
      publisher       = "sequencerX"
    }
  })
}


locals {
  local_router_config = jsonencode({
    redis = {
      host = module.router_cache.redis_instance_address,
      port = module.router_cache.redis_instance_port
    }
    logLevel     = "debug"
    sequencerUrl = "https://${module.sequencer_publisher.service_endpoint}"
    server = {
      adminToken = var.admin_token_router
      port       = 8080
    }
    chains = {
      "1" = {
        providers = ["https://eth-mainnet.alchemyapi.io/v2/${var.mainnet_alchemy_key_0}", "https://rpc.ankr.com/eth_mainnet"]
        assets = [{
          name    = "USDC"
          address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        }]
      }
    }
    web3SignerUrl    = "https://${module.web3signer.service_endpoint}"
    environment      = var.stage
    nomadEnvironment = var.nomad_environment
    messageQueue = {
      uri = "amqps://${var.rmq_mgt_user}:${var.rmq_mgt_password}@${module.centralised_message_queue.aws_mq_amqp_endpoint}"
    }
  })
}

locals {
  local_lighthouse_config = jsonencode({
    logLevel = "debug"
    chains = {
      "1" = {
        providers = ["https://eth-mainnet.alchemyapi.io/v2/${var.mainnet_alchemy_key_0}", "https://rpc.ankr.com/eth_mainnet"]
      }
    }
    environment = var.stage
  })
}
