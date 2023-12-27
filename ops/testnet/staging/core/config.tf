locals {
  base_domain              = "connext.ninja"
  default_db_endpoint      = "db.${var.environment}.${var.stage}.${local.base_domain}"
  read_replica_db_endpoint = "db_read_replica.${var.environment}.${var.stage}.${local.base_domain}"
  default_db_url           = "postgresql://${var.postgres_user}:${var.postgres_password}@${local.default_db_endpoint}:5432/connext"
  read_replica_db_url      = "postgresql://${var.postgres_user}:${var.postgres_password}@${local.read_replica_db_endpoint}:5432/connext"

  sequencer_env_vars = [
    { name = "SEQ_CONFIG", value = local.local_sequencer_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  router_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_router_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  router_publisher_env_vars = concat(
    local.router_env_vars, [
      { name = "NODE_OPTIONS", value = "--max-old-space-size=1536" }
  ])
  lighthouse_env_vars = {
    NXTP_CONFIG       = local.local_lighthouse_config,
    ENVIRONMENT       = var.environment,
    STAGE             = var.stage,
    DD_LOGS_ENABLED   = true,
    DD_ENV            = "${var.environment}-${var.stage}",
    DD_API_KEY        = var.dd_api_key,
    DD_LAMBDA_HANDLER = "packages/agents/lighthouse/dist/index.handler"
  }
  lighthouse_prover_subscriber_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_lighthouse_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  lighthouse_web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.lighthouse_web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  router_web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.router_web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  sequencer_web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.sequencer_web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  relayer_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_relayer_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  relayer_web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.relayer_web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  watcher_env_vars = [
    { name = "WATCHER_CONFIG", value = local.local_watcher_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = var.stage }
  ]
  watcher_web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.watcher_web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
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
        providers = ["https://optimism-goerli.blastapi.io/${var.blast_key}", "https://goerli.optimism.io"]
      }
      "1735353714" = {
        providers = ["https://eth-goerli.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth_goerli"]
      }
      "9991" = {
        providers = ["https://rpc.ankr.com/polygon_mumbai", "https://polygon-testnet.blastapi.io/${var.blast_key}"]
      }
      # "2053862260" = {
      #   providers = ["https://zksync2-testnet.zksync.dev"]
      # }
    }
    web3SignerUrl = "https://${module.sequencer_web3signer.service_endpoint}"
    relayers = [
      {
        type   = "Gelato",
        apiKey = "${var.gelato_api_key}",
        url    = "https://relay.gelato.digital"
      },
      {
        type   = "Connext",
        apiKey = "${var.admin_token_relayer}",
        url    = "https://${module.relayer.service_endpoint}"
      }
    ]
    environment = var.stage
    database = {
      url = local.default_db_url
    }
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
          name       = "http"
          limit      = 100
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1735353714"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1735356532"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "9991"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        # {
        #   name       = "2053862260"
        #  limit      = 1
        #   queueLimit = 100000
        #   subscribe  = true
        # },
      ]
      bindings = [
        {
          exchange = "sequencerX"
          target   = "http"
          keys     = ["http"]
        },
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
        },
        # {
        #   exchange = "sequencerX"
        #   target   = "2053862260"
        #   keys     = ["2053862260"]
        # },
      ]
      executerTimeout = 300000
      publisher       = "sequencerX"
    }
  })

  local_router_config = jsonencode({
    redis = {
      host = module.router_cache.redis_instance_address,
      port = module.router_cache.redis_instance_port
    },
    logLevel     = "debug"
    sequencerUrl = "https://${module.sequencer_server.service_endpoint}"
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
        providers = ["https://optimism-goerli.blastapi.io/${var.blast_key}", "https://goerli.optimism.io"]
      }
      "1735353714" = {
        providers = ["https://eth-goerli.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth_goerli"]
      }
      "9991" = {
        providers = ["https://rpc.ankr.com/polygon_mumbai", "https://polygon-testnet.blastapi.io/${var.blast_key}"]
      }
      # "2053862260" = {
      #   providers = ["https://zksync2-testnet.zksync.dev"]
      # }
    }
    cartographerUrl = "https://postgrest.testnet.staging.connext.ninja"
    web3SignerUrl   = "https://${module.router_web3signer.service_endpoint}"
    environment     = var.stage
    messageQueue = {
      uri = "amqps://${var.rmq_mgt_user}:${var.rmq_mgt_password}@${module.centralised_message_queue.aws_mq_amqp_endpoint}"
    }
  })

  local_lighthouse_config = jsonencode({
    redis = {
      host = module.lighthouse_cache.redis_instance_address,
      port = module.lighthouse_cache.redis_instance_port
    }
    logLevel = "debug"
    chains = {
      "1735356532" = {
        providers = ["https://opt-goerli.g.alchemy.com/v2/${var.optgoerli_alchemy_key_0}"]
      }
      "1735353714" = {
        providers = ["https://eth-goerli.g.alchemy.com/v2/${var.goerli_alchemy_key_0}"]
      }
      "9991" = {
        providers = ["https://polygon-mumbai.g.alchemy.com/v2/${var.mumbai_alchemy_key_0}"]
      }
      # "2053862260" = {
      #   providers = ["https://zksync2-testnet.zksync.dev"]
      # }
    }
    gelatoApiKey = "${var.gelato_api_key}"
    relayers = [
      {
        type   = "Gelato",
        apiKey = "${var.gelato_api_key}",
        url    = "https://relay.gelato.digital"
      },
      {
        type   = "Connext",
        apiKey = "${var.admin_token_relayer}",
        url    = "https://${module.relayer.service_endpoint}"
      }
    ]
    environment = var.stage
    database = {
      url = local.default_db_url
    }
    databaseWriter = {
      url = local.default_db_url
    }
    main = "1735353714"
    proverBatchSize = {
      # "1668247156" = 10,
      "9991"       = 10,
      "1735353714" = 10,
      # "2053862260" = 10,
      "1735356532" = 10
    }
    messageQueue = {
      connection = {
        uri = "amqps://${var.rmq_mgt_user}:${var.rmq_mgt_password}@${module.centralised_message_queue.aws_mq_amqp_endpoint}"
      }
      exchange = {
        name           = "proverX"
        type           = "direct"
        publishTimeout = 1000
        persistent     = true
        durable        = true
      }
      prefetchSize = 1
    }
    web3SignerUrl   = "https://${module.lighthouse_web3signer.service_endpoint}"
  })

  local_relayer_config = jsonencode({
    redis = {
      host = module.relayer_cache.redis_instance_address,
      port = module.relayer_cache.redis_instance_port
    }
    server = {
      adminToken = var.admin_token_relayer
    }
    logLevel = "debug"
    chains = {
      "1735356532" = {
        providers = ["https://optimism-goerli.blastapi.io/${var.blast_key}", "https://goerli.optimism.io"]
      }
      "1735353714" = {
        providers = ["https://eth-goerli.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth_goerli"]
      }
      "9991" = {
        providers = ["https://rpc.ankr.com/polygon_mumbai", "https://polygon-testnet.blastapi.io/${var.blast_key}"]
      }
      # "2053862260" = {
      #   providers = ["https://zksync2-testnet.zksync.dev"]
      # }
    }
    environment   = var.stage
    web3SignerUrl = "https://${module.relayer_web3signer.service_endpoint}"
  })

  local_watcher_config = jsonencode({
    server = {
      adminToken = var.admin_token_watcher
    }
    logLevel    = "debug"
    environment = "staging"
    chains = {
      "1735353714" = {
        providers = ["https://eth-goerli.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth_goerli", "https://goerli.blockpi.network/v1/rpc/public"]
      }
      "1735356532" = {
        providers = ["https://optimism-goerli.infura.io/v3/7672e2bf7cbe427e8cd25b0f1dde65cf", "https://optimism-goerli.blastapi.io/${var.blast_key}", "https://goerli.optimism.io"]
      }
    }
    web3SignerUrl              = "https://${module.watcher_web3signer.service_endpoint}"
    environment                = var.stage
    discordHookUrl             = "https://discord.com/api/webhooks/${var.discord_webhook_key}"
    telegramApiKey             = "${var.telegram_api_key}"
    telegramChatId             = "${var.telegram_chat_id}"
    betterUptimeApiKey         = "${var.betteruptime_api_key}"
    betterUptimeRequesterEmail = "${var.betteruptime_requester_email}"
  })
}
