locals {
  base_domain              = "connext.ninja"
  default_db_endpoint      = "db.${var.environment}.${var.stage}.${local.base_domain}"
  read_replica_db_endpoint = "db_read_replica.${var.environment}.${var.stage}.${local.base_domain}"
  default_db_url           = "postgresql://${var.postgres_user}:${var.postgres_password}@${local.default_db_endpoint}:5432/connext"
  read_replica_db_url      = "postgresql://${var.postgres_user}:${var.postgres_password}@${local.read_replica_db_endpoint}:5432/connext"

  sequencer_env_vars = [
    { name = "SEQ_CONFIG", value = local.local_sequencer_config },
    { name = "ENVIRONMENT", value = "production" },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  router_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_router_config },
    { name = "ENVIRONMENT", value = "production" },
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
    ENVIRONMENT       = "production",
    STAGE             = var.stage,
    DD_LOGS_ENABLED   = true,
    DD_ENV            = "${var.environment}-${var.stage}",
    DD_API_KEY        = var.dd_api_key,
    DD_LAMBDA_HANDLER = "packages/agents/lighthouse/dist/index.handler"
  }
  lighthouse_prover_subscriber_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_lighthouse_config },
    { name = "ENVIRONMENT", value = "production" },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  lighthouse_web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.lighthouse_web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" },
    { name = "ENVIRONMENT", value = "production" },
    { name = "STAGE", value = var.stage },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  router_web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.router_web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" },
    { name = "ENVIRONMENT", value = "production" },
    { name = "STAGE", value = var.stage },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  sequencer_web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.sequencer_web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" },
    { name = "ENVIRONMENT", value = "production" },
    { name = "STAGE", value = var.stage },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  relayer_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_relayer_config },
    { name = "ENVIRONMENT", value = "production" },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]
  relayer_web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.relayer_web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" },
    { name = "ENVIRONMENT", value = "production" },
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
      "1869640549" = {
        providers = ["https://sepolia.optimism.io/"]
      }
      "1936027759" = {
        providers = ["https://eth-sepolia.public.blastapi.io"]
      }
      "1633842021" = {
        providers = ["https://sepolia-rollup.arbitrum.io/rpc"]
      }
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
        url    = "https://${module.relayer_server.service_endpoint}"
      }
    ]
    environment = "production"
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
          name       = "1936027759"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1869640549"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1633842021"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        }
      ]
      bindings = [
        {
          exchange = "sequencerX"
          target   = "http"
          keys     = ["http"]
        },
        {
          exchange = "sequencerX"
          target   = "1936027759"
          keys     = ["1936027759"]
        },
        {
          exchange = "sequencerX"
          target   = "1869640549"
          keys     = ["1869640549"]
        },
        {
          exchange = "sequencerX"
          target   = "1633842021"
          keys     = ["1633842021"]
        }
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
      "1869640549" = {
        providers = ["https://sepolia.optimism.io/"]
      }
      "1936027759" = {
        providers = ["https://eth-sepolia.public.blastapi.io"]
      }
      "1633842021" = {
        providers = ["https://sepolia-rollup.arbitrum.io/rpc"]
      }
    }
    cartographerUrl = "https://postgrest.testnet.staging.connext.ninja"
    web3SignerUrl   = "https://${module.router_web3signer.service_endpoint}"
    environment     = "production"
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
      "1869640549" = {
        providers = ["https://sepolia.optimism.io/"]
      }
      "1936027759" = {
        providers = ["https://eth-sepolia.public.blastapi.io"]
      }
      "1633842021" = {
        providers = ["https://sepolia-rollup.arbitrum.io/rpc"]
      }
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
        url    = "https://${module.relayer_server.service_endpoint}"
      }
    ]
    environment = "production"
    database = {
      url = local.default_db_url
    }
    databaseWriter = {
      url = local.default_db_url
    }
    main = "1936027759"
    proverBatchSize = {
      "1633842021" = 10,
      "1936027759" = 10,
      "1869640549" = 10
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
    web3SignerUrl = "https://${module.lighthouse_web3signer.service_endpoint}"
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
      "1869640549" = {
        providers = ["https://sepolia.optimism.io/"]
      }
      "1936027759" = {
        providers = ["https://eth-sepolia.public.blastapi.io"]
      }
      "1633842021" = {
        providers = ["https://sepolia-rollup.arbitrum.io/rpc"]
      }
    }
    environment   = "production"
    web3SignerUrl = "https://${module.relayer_web3signer.service_endpoint}"
  })
}
