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
      "1735356532" = {
        providers = ["https://opt-goerli.g.alchemy.com/v2/${var.optgoerli_alchemy_key_0}", "https://goerli.optimism.io"]
        assets = [
          {
            name    = "TEST"
            address = "0xf21Ad79d25d3E2eCAEe99e09c237EfDD83fdAfEB"
          },
          {
            name    = "WETH"
            address = "0x6dC42a10F89Da5dAE486De606B1Dc4d8C5Ed1bfE"
          }
        ]
      }
      "1735353714" = {
        providers = ["https://eth-goerli.alchemyapi.io/v2/${var.goerli_alchemy_key_0}", "https://rpc.ankr.com/eth_goerli"]
        assets = [
          {
            name    = "TEST"
            address = "0x30C687780AD7946d77C62b3413A95D5126B57cA1"
          },
          {
            name    = "WETH"
            address = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
          }
        ]
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
          name       = "1735356532"
          limit      = 3
          queueLimit = 10000
          subscribe  = true
        },
        {
          name       = "1735353714"
          limit      = 3
          queueLimit = 10000
          subscribe  = true
        }
      ]
      bindings = [
        {
          exchange = "sequencerX"
          target   = "1735356532"
          keys     = ["1735356532"]
        },
        {
          exchange = "sequencerX"
          target   = "1735353714"
          keys     = ["1735353714"]
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
    },
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
      "1735356532" = {
        providers = ["https://opt-goerli.g.alchemy.com/v2/${var.optgoerli_alchemy_key_1}", "https://goerli.optimism.io"]
        assets = [
          {
            name    = "TEST"
            address = "0xf21Ad79d25d3E2eCAEe99e09c237EfDD83fdAfEB"
          },
          {
            name    = "WETH"
            address = "0x6dC42a10F89Da5dAE486De606B1Dc4d8C5Ed1bfE"
          }
        ]
      }
      "1735353714" = {
        providers = ["https://eth-goerli.alchemyapi.io/v2/${var.goerli_alchemy_key_1}", "https://rpc.ankr.com/eth_goerli"]
        assets = [
          {
            name    = "TEST"
            address = "0x26FE8a8f86511d678d031a022E48FfF41c6a3e3b"
          },
          {
            name    = "WETH"
            address = "0x30C687780AD7946d77C62b3413A95D5126B57cA1"
          }
        ]
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
