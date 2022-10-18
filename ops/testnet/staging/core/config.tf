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
      "1735353714" = {
        providers = ["https://eth-goerli.alchemyapi.io/v2/${var.goerli_alchemy_key_0}", "https://rpc.ankr.com/eth_goerli"]
        assets = [
          {
            name    = "TEST"
            address = "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1"
          },
          {
            name    = "WETH"
            address = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
          }
        ]
      }
      "1735356532" = {
        providers = ["https://opt-goerli.g.alchemy.com/v2/${var.optgoerli_alchemy_key_0}", "https://goerli.optimism.io"]
        assets = [
          {
            name    = "TEST"
            address = "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF"
          },
          {
            name    = "WETH"
            address = "0x39B061B7e41DE8B721f9aEcEB6b3f17ECB7ba63E"
          }
        ]
      }
      "9991" = {
        providers = ["https://rpc.ankr.com/polygon_mumbai", "https://polygon-testnet.blastapi.io/${var.mumbai_blast_key_0}"]
        assets = [
          {
            name    = "TEST"
            address = "0xeDb95D8037f769B72AAab41deeC92903A98C9E16"
          },
          {
            name    = "WETH"
            address = "0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69"
          }
        ]
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
          name       = "1735353714"
          limit      = 6
          queueLimit = 10000
          subscribe  = true
        },
        {
          name       = "1735356532"
          limit      = 6
          queueLimit = 10000
          subscribe  = true
        },
        {
          name       = "9991"
          limit      = 6
          queueLimit = 10000
          subscribe  = true
        }
      ]
      bindings = [
        {
          exchange = "sequencerX"
          target   = "1735353714"
          keys     = ["1735353714"]
        },
        {
          exchange = "sequencerX"
          target   = "1735356532"
          keys     = ["1735356532"]
        },
        {
          exchange = "sequencerX"
          target   = "9991"
          keys     = ["9991"]
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
      "1735353714" = {
        providers = ["https://eth-goerli.alchemyapi.io/v2/${var.goerli_alchemy_key_1}", "https://rpc.ankr.com/eth_goerli"]
        assets = [
          {
            name    = "TEST"
            address = "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1"
          },
          {
            name    = "WETH"
            address = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
          }
        ]
      }
      "1735356532" = {
        providers = ["https://opt-goerli.g.alchemy.com/v2/${var.optgoerli_alchemy_key_1}", "https://goerli.optimism.io"]
        assets = [
          {
            name    = "TEST"
            address = "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF"
          },
          {
            name    = "WETH"
            address = "0x39B061B7e41DE8B721f9aEcEB6b3f17ECB7ba63E"
          }
        ]
      }
      "9991" = {
        providers = ["https://rpc.ankr.com/polygon_mumbai", "https://polygon-testnet.blastapi.io/${var.mumbai_blast_key_0}"]
        assets = [
          {
            name    = "TEST"
            address = "0xeDb95D8037f769B72AAab41deeC92903A98C9E16"
          },
          {
            name    = "WETH"
            address = "0x1E5341E4b7ed5D0680d9066aac0396F0b1bD1E69"
          }
        ]
      }
    }
    cartographerUrl  = "https://postgrest.testnet.staging.connext.ninja"
    web3SignerUrl    = "https://${module.router_web3signer.service_endpoint}"
    environment      = var.stage
    nomadEnvironment = "none"
    messageQueue = {
      uri = "amqps://${var.rmq_mgt_user}:${var.rmq_mgt_password}@${module.centralised_message_queue.aws_mq_amqp_endpoint}"
    }
  })

  local_lighthouse_config = jsonencode({
    logLevel = "debug"
    chains = {
      "1735353714" = {
        providers = ["https://eth-goerli.alchemyapi.io/v2/${var.goerli_alchemy_key_1}", "https://rpc.ankr.com/eth_goerli"]
      }
      "1735356532" = {
        providers = ["https://opt-goerli.g.alchemy.com/v2/${var.optgoerli_alchemy_key_1}", "https://goerli.optimism.io"]
      }
      "9991" = {
        providers = ["https://rpc.ankr.com/polygon_mumbai", "https://polygon-testnet.blastapi.io/${var.mumbai_blast_key_0}"]
      }
    }
    gelatoApiKey = "${var.gelato_api_key}"
    environment  = var.stage
    databaseUrl  = "postgresql://${var.postgres_user}:${var.postgres_password}@db.testnet.staging.connext.ninja:5432/connext"
  })
}
