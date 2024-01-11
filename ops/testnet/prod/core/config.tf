locals {

  base_domain              = "connext.ninja"
  default_db_endpoint      = "db.${var.environment}.${local.base_domain}"
  read_replica_db_endpoint = "db_read_replica.${var.environment}.${local.base_domain}"
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
        providers = ["https://lb.drpc.org/ogrpc?network=optimism-testnet&dkey=${var.drpc_key}", "https://optimism-goerli.blastapi.io/${var.blast_key}", "https://goerli.optimism.io"]
      }
      "1735353714" = {
        providers                 = ["https://lb.drpc.org/ogrpc?network=goerli&dkey=${var.drpc_key}", "https://eth-goerli.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth_goerli"]
        excludeListFromRelayerFee = ["0x79D5007F9782eE0407DB4C7a9fC6AE030586afac", "0xc8D125853346a389A8a68390dd23D719c08BF8F8"]
      }
      "9991" = {
        providers                 = ["https://lb.drpc.org/ogrpc?network=polygon-mumbai&dkey=${var.drpc_key}", "https://rpc.ankr.com/polygon_mumbai", "https://polygon-testnet.blastapi.io/${var.blast_key}"]
        excludeListFromRelayerFee = ["0x6c461C0296eBE3715820F1Cbde856219e06ac3B8", "0x5Ee7Acd9E57f81a08d361b3Dc516f30964601068", "0xcD7dE973264D5967D930Ef5144C59E9811ce5787"]
      }
      "1668247156" = {
        providers = ["https://lb.drpc.org/ogrpc?network=linea-goerli&dkey=${var.drpc_key}", "https://linea-goerli.infura.io/v3/${var.infura_key}", "https://rpc.goerli.linea.build"]
      }
      # "2053862260" = {
      #   providers = ["https://zksync-era-testnet.blockpi.network/v1/rpc/public", "https://testnet.era.zksync.dev"]
      # }
      "1650553703" = {
        providers = ["https://base-goerli.g.alchemy.com/v2/${var.basegoerli_alchemy_key_0}", "https://lb.drpc.org/ogrpc?network=base-goerli&dkey=${var.drpc_key}", "https://goerli.base.org"]
      }
      "2016506996" = {
        providers = ["https://testrpc.x1.tech", "https://x1testrpc.okx.com/"]
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
          name       = "1735356532"
          limit      = 1
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
          name       = "9991"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1668247156"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1650553703"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "2016506996"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        }
        # {
        #   name       = "2053862260"
        #   limit      = 1
        #   queueLimit = 1000000
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
          target   = "1735356532"
          keys     = ["1735356532"]
        },
        {
          exchange = "sequencerX"
          target   = "1735353714"
          keys     = ["1735353714"]
        },
        {
          exchange = "sequencerX"
          target   = "9991"
          keys     = ["9991"]
        },
        {
          exchange = "sequencerX"
          target   = "1668247156"
          keys     = ["1668247156"]
        },
        {
          exchange = "sequencerX"
          target   = "1650553703"
          keys     = ["1650553703"]
        },
        {
          exchange = "sequencerX"
          target   = "2016506996"
          keys     = ["2016506996"]
        }
        # {
        #   exchange = "sequencerX"
        #   target   = "2053862260"
        #   keys     = ["2053862260"]
        # }
      ]
      executerTimeout = 300000
      prefetch        = 1
      publisher       = "sequencerX"
    }
  })

  local_router_config = jsonencode({
    redis = {
      host = module.router_cache.redis_instance_address,
      port = module.router_cache.redis_instance_port
    }
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
        providers = ["https://lb.drpc.org/ogrpc?network=optimism-testnet&dkey=${var.drpc_key}", "https://optimism-goerli.blastapi.io/${var.blast_key}", "https://goerli.optimism.io"]
      }
      "1735353714" = {
        providers = ["https://lb.drpc.org/ogrpc?network=goerli&dkey=${var.drpc_key}", "https://eth-goerli.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth_goerli"]
      }
      "9991" = {
        providers = ["https://lb.drpc.org/ogrpc?network=polygon-mumbai&dkey=${var.drpc_key}", "https://rpc.ankr.com/polygon_mumbai", "https://polygon-testnet.blastapi.io/${var.blast_key}"]
      }
      "1668247156" = {
        providers = ["https://lb.drpc.org/ogrpc?network=linea-goerli&dkey=${var.drpc_key}", "https://linea-goerli.infura.io/v3/${var.infura_key}", "https://rpc.goerli.linea.build"]
      }
      "1650553703" = {
        providers = ["https://base-goerli.g.alchemy.com/v2/${var.basegoerli_alchemy_key_0}", "https://lb.drpc.org/ogrpc?network=base-goerli&dkey=${var.drpc_key}", "https://goerli.base.org"]
      }
      "2016506996" = {
        providers = ["https://testrpc.x1.tech", "https://x1testrpc.okx.com/"]
      }
    }
    cartographerUrl = "https://postgrest.testnet.connext.ninja"
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
        providers = ["https://lb.drpc.org/ogrpc?network=optimism-testnet&dkey=${var.drpc_key}", "https://opt-goerli.g.alchemy.com/v2/${var.optgoerli_alchemy_key_for_lh}"]
      }
      "1735353714" = {
        providers = ["https://lb.drpc.org/ogrpc?network=goerli&dkey=${var.drpc_key}", "https://eth-goerli.g.alchemy.com/v2/${var.goerli_alchemy_key_0}"]
      }
      "9991" = {
        providers = ["https://lb.drpc.org/ogrpc?network=polygon-mumbai&dkey=${var.drpc_key}", "https://polygon-mumbai.g.alchemy.com/v2/${var.mumbai_alchemy_key_0}"]
      }
      # "1668247156" = {
      #   providers = ["https://lb.drpc.org/ogrpc?network=linea-goerli&dkey=${var.drpc_key}", "https://linea-goerli.infura.io/v3/${var.infura_key}", "https://rpc.goerli.linea.build"]
      # }
      # "2053862260" = {
      #   providers = ["https://zksync-era-testnet.blockpi.network/v1/rpc/public", "https://testnet.era.zksync.dev"]
      # }
      "1650553703" = {
        providers = ["https://base-goerli.g.alchemy.com/v2/${var.basegoerli_alchemy_key_0}", "https://lb.drpc.org/ogrpc?network=base-goerli&dkey=${var.drpc_key}", "https://goerli.base.org"]
      }
      "2016506996" = {
        providers = ["https://testrpc.x1.tech", "https://x1testrpc.okx.com/"]
      }
    }
    gelatoApiKey = "${var.gelato_api_key}"
    environment  = var.stage
    database = {
      url = local.read_replica_db_url
    }
    databaseWriter = {
      url = local.default_db_url
    }
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
    healthUrls = {
      prover           = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_prover_heartbeat}"
      processor        = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_processor_heartbeat}"
      propagate        = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_propagate_heartbeat}"
      propose          = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_propose_heartbeat}"
      sendOutboundRoot = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_send_outbound_root_heartbeat}"
    }
    hubDomain = "1735353714"
    proverBatchSize = {
      # "1668247156" = 10,
      "9991"       = 10,
      "1735353714" = 10,
      # "2053862260" = 10,
      "1735356532" = 10,
      "1650553703" = 10,
      "2016506996" = 10
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
      "1735356532" = {
        providers = ["https://lb.drpc.org/ogrpc?network=optimism-testnet&dkey=${var.drpc_key}", "https://optimism-goerli.blastapi.io/${var.blast_key}", "https://goerli.optimism.io"]
      }
      "1735353714" = {
        providers = ["https://lb.drpc.org/ogrpc?network=goerli&dkey=${var.drpc_key}", "https://eth-goerli.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth_goerli"]
      }
      "9991" = {
        providers = ["https://lb.drpc.org/ogrpc?network=polygon-mumbai&dkey=${var.drpc_key}", "https://rpc.ankr.com/polygon_mumbai", "https://polygon-testnet.blastapi.io/${var.blast_key}"]
      }
      "1668247156" = {
        providers = ["https://lb.drpc.org/ogrpc?network=linea-goerli&dkey=${var.drpc_key}", "https://linea-goerli.infura.io/v3/${var.infura_key}", "https://rpc.goerli.linea.build"]
      }
      # "2053862260" = {
      #  providers = ["https://zksync-era-testnet.blockpi.network/v1/rpc/public", "https://testnet.era.zksync.dev"]
      # }
      "1650553703" = {
        providers = ["https://base-goerli.g.alchemy.com/v2/${var.basegoerli_alchemy_key_0}", "https://lb.drpc.org/ogrpc?network=base-goerli&dkey=${var.drpc_key}", "https://goerli.base.org"]
      }
      "2016506996" = {
        providers   = ["https://x1-testnet.blockpi.network/v1/rpc/${var.blockpi_key}", "https://testrpc.x1.tech", "https://x1testrpc.okx.com/"],
        minGasPrice = "200000000000"
      }
    }
    environment   = var.stage
    web3SignerUrl = "https://${module.relayer_web3signer.service_endpoint}"
  })
}
