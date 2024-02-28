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
    { name = "GRAPH_API_KEY", value = var.graph_api_key }
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
    GRAPH_API_KEY     = var.graph_api_key
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
      adminToken = var.admin_token_sequencer
    }

    logLevel = "debug"
    chains = {
      "6648936" = {
        providers                 = ["https://eth-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth"]
        excludeListFromRelayerFee = ["0x5b9315ce1304df3b2a83b2074cbf849d160642ab"]
      },
      "1869640809" = {
        providers                 = ["https://optimism-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/optimism"],
        excludeListFromRelayerFee = ["0x9D9ce29Dc7812ccb63aB14EA987B52d9aF053Eb3"]
      },
      "1886350457" = {
        providers                 = ["https://polygon-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/polygon"],
        excludeListFromRelayerFee = ["0x83e8Cf4A51035665BAF97DdB0cf03b565AC76B44"]
      }
      "1634886255" = {
        providers                 = ["https://arb-mainnet.g.alchemy.com/v2/${var.arbitrum_alchemy_key_0}", "https://rpc.ankr.com/arbitrum"],
        excludeListFromRelayerFee = ["0xE6B7aB9EBCfBF1A72E489ff00CdF9C6473ff6224"]
      }
      "6450786" = {
        providers = ["https://bsc-mainnet.blastapi.io/${var.blast_key}", "https://bsc-dataseed1.binance.org", "https://bsc-dataseed2.binance.org", "https://rpc.ankr.com/bsc"]
      }
      "6778479" = {
        providers                 = ["https://gnosis-mainnet.blastapi.io/${var.blast_key}", "https://rpc.gnosischain.com", "https://rpc.ankr.com/gnosis"],
        excludeListFromRelayerFee = ["0x6D4D82aE73DC9059Ac83B085b2505e00b5eF8511"]
      }
      "1818848877" = {
        providers = ["https://linea-mainnet.infura.io/v3/${var.infura_key}", "https://rpc.linea.build"]
      }
      "2053862243" = {
        providers = ["https://zksync-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1887071085" = {
        providers = ["https://polygon-zkevm-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1650553709" = {
        providers = ["https://base-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1635148152" = {
        providers = ["https://ava-mainnet.blastapi.io/${var.blast_key}/ext/bc/C/rpc"]
      }
      "1835365481" = {
        providers = ["https://metis-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1835101812" = {
        providers = ["https://mantle-mainnet.blastapi.io/${var.blast_key}"]
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
    relayerFeeTolerance = 60
    environment         = var.stage
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
          name       = "6648936"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1869640809"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1886350457"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1634886255"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "6450786"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "6778479"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1818848877"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "2053862243"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1887071085"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1650553709"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1635148152"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1835365481"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },
        {
          name       = "1835101812"
          limit      = 1
          queueLimit = 1000000
          subscribe  = true
        },   
      ]
      bindings = [
        {
          exchange = "sequencerX"
          target   = "http"
          keys     = ["http"]
        },
        {
          exchange = "sequencerX"
          target   = "6648936"
          keys     = ["6648936"]
        },
        {
          exchange = "sequencerX"
          target   = "1869640809"
          keys     = ["1869640809"]
        },
        {
          exchange = "sequencerX"
          target   = "1886350457"
          keys     = ["1886350457"]
        },
        {
          exchange = "sequencerX"
          target   = "1634886255"
          keys     = ["1634886255"]
        },
        {
          exchange = "sequencerX"
          target   = "6450786"
          keys     = ["6450786"]
        },
        {
          exchange = "sequencerX"
          target   = "6778479"
          keys     = ["6778479"]
        },
        {
          exchange = "sequencerX"
          target   = "1818848877"
          keys     = ["1818848877"]
        },
        {
          exchange = "sequencerX"
          target   = "2053862243"
          keys     = ["2053862243"]
        },
        {
          exchange = "sequencerX"
          target   = "1887071085"
          keys     = ["1887071085"]
        },
        {
          exchange = "sequencerX"
          target   = "1650553709"
          keys     = ["1650553709"]
        },
        {
          exchange = "sequencerX"
          target   = "1635148152"
          keys     = ["1635148152"]
        },
        {
          exchange = "sequencerX"
          target   = "1835365481"
          keys     = ["1835365481"]
        },
        {
          exchange = "sequencerX"
          target   = "1835101812"
          keys     = ["1835101812"]
        },
        {
          exchange = "sequencerX"
          target   = "1836016741"
          keys     = ["1836016741"]
        }
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
      "6648936" = {
        providers = ["https://eth-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth"]
      },
      "1869640809" = {
        providers = ["https://optimism-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/optimism"]
      },
      "1886350457" = {
        providers = ["https://polygon-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/polygon"]
      },
      "1634886255" = {
        providers = ["https://arb-mainnet.g.alchemy.com/v2/${var.arbitrum_alchemy_key_1}", "https://rpc.ankr.com/arbitrum"]
      },
      "6450786" = {
        providers = ["https://bsc-mainnet.blastapi.io/${var.blast_key}", "https://bsc-dataseed1.binance.org", "https://bsc-dataseed2.binance.org", "https://rpc.ankr.com/bsc"]
      }
      "6778479" = {
        providers = ["https://gnosis-mainnet.blastapi.io/${var.blast_key}", "https://rpc.gnosischain.com", "https://rpc.ankr.com/gnosis"]
      }
      "1818848877" = {
        providers = ["https://linea-mainnet.infura.io/v3/${var.infura_key}", "https://rpc.linea.build"]
      }
      "2053862243" = {
        providers = ["https://zksync-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1887071085" = {
        providers = ["https://polygon-zkevm-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1650553709" = {
        providers = ["https://base-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1635148152" = {
        providers = ["https://ava-mainnet.blastapi.io/${var.blast_key}/ext/bc/C/rpc"]
      }
      "1835365481" = {
        providers = ["https://metis-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1835101812" = {
        providers = ["https://mantle-mainnet.blastapi.io/${var.blast_key}"]
      }
    }
    cartographerUrl = "https://postgrest.mainnet.connext.ninja"
    web3SignerUrl   = "https://${module.router_web3signer.service_endpoint}"
    environment     = var.stage
    messageQueue = {
      uri = "amqps://${var.rmq_mgt_user}:${var.rmq_mgt_password}@${module.centralised_message_queue.aws_mq_amqp_endpoint}"
    }
    auctionWaitTime = 15000
  })

  local_lighthouse_config = jsonencode({
    redis = {
      host = module.lighthouse_cache.redis_instance_address,
      port = module.lighthouse_cache.redis_instance_port
    }
    logLevel = "debug"
    chains = {
      "6648936" = {
        providers = ["https://eth-mainnet.blastapi.io/${var.blast_key}"]
      },
      "1869640809" = {
        providers = ["https://optimism-mainnet.blastapi.io/${var.blast_key}"]
      },
      "1886350457" = {
        providers = ["https://polygon-mainnet.blastapi.io/${var.blast_key}"]
      },
      "1634886255" = {
        providers = ["https://arb-mainnet.g.alchemy.com/v2/${var.arbitrum_alchemy_key_0}"]
      },
      "6450786" = {
        providers = ["https://bsc-mainnet.blastapi.io/${var.blast_key}"]
      }
      "6778479" = {
        providers = ["https://gnosis-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1818848877" = {
        providers = ["https://linea-mainnet.infura.io/v3/${var.infura_key}"]
      }
      "2053862243" = {
        providers = ["https://zksync-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1887071085" = {
        providers = ["https://polygon-zkevm-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1650553709" = {
        providers = ["https://base-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1635148152" = {
        providers = ["https://ava-mainnet.blastapi.io/${var.blast_key}/ext/bc/C/rpc"]
      }
      "1835365481" = {
        providers = ["https://metis-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1835101812" = {
        providers = ["https://mantle-mainnet.blastapi.io/${var.blast_key}"]
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
        url    = "https://${module.relayer_server.service_endpoint}"
      }
    ]
    healthUrls = {
      prover           = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_prover_heartbeat}"
      processor        = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_processor_heartbeat}"
      propagate        = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_propagate_heartbeat}"
      propose          = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_propose_heartbeat}"
      sendOutboundRoot = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_send_outbound_root_heartbeat}"
    }
    hubDomain = "6648936"
    proverBatchSize = {
      "6648936"    = 10,
      "1869640809" = 10,
      "1886350457" = 10,
      "1634886255" = 10,
      "6450786"    = 10,
      "6778479"    = 10,
      "1818848877" = 10,
      "2053862243" = 10,
      "1887071085" = 10,
      "1650553709" = 10,
      "1635148152" = 10,
      "1835365481" = 10,
      "1835101812" = 10,
    }
    proverBatchWaitTime = {
      "6648936"    = 43200,
      "1634886255" = 14400,
      "1869640809" = 14400,
      "1886350457" = 14400,
      "1634886255" = 14400,
      "6450786"    = 14400,
      "6778479"    = 14400,
      "1818848877" = 14400,
      "2053862243" = 14400,
      "1887071085" = 14400,
      "1650553709" = 14400,
      "1635148152" = 14400,
      "1835365481" = 14400,
      "1835101812" = 14400,
      "1836016741" = 14400
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
    server = {
      adminToken = var.admin_token_lighthouse_prover_subscriber
    }
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
      "6648936" = {
        providers = ["https://eth-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth"]
      },
      "1869640809" = {
        providers = ["https://optimism-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/optimism"]
      },
      "1886350457" = {
        providers = ["https://polygon-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/polygon"]
      },
      "1634886255" = {
        providers = ["https://arb-mainnet.g.alchemy.com/v2/${var.arbitrum_alchemy_key_0}", "https://rpc.ankr.com/arbitrum"]
      },
      "6450786" = {
        providers = ["https://bsc-mainnet.blastapi.io/${var.blast_key}", "https://bsc-dataseed1.binance.org", "https://bsc-dataseed2.binance.org", "https://rpc.ankr.com/bsc"]
      }
      "6778479" = {
        providers = ["https://gnosis-mainnet.blastapi.io/${var.blast_key}", "https://rpc.gnosischain.com", "https://rpc.ankr.com/gnosis"]
      }
      "1818848877" = {
        providers = ["https://linea-mainnet.infura.io/v3/${var.infura_key}", "https://rpc.linea.build"]
      }
      "2053862243" = {
        providers = ["https://zksync-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1887071085" = {
        providers = ["https://polygon-zkevm-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1650553709" = {
        providers = ["https://base-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1635148152" = {
        providers = ["https://ava-mainnet.blastapi.io/${var.blast_key}/ext/bc/C/rpc"]
      }
      "1835365481" = {
        providers = ["https://metis-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1835101812" = {
        providers = ["https://mantle-mainnet.blastapi.io/${var.blast_key}"]
      }
    }
    environment   = var.stage
    web3SignerUrl = "https://${module.relayer_web3signer.service_endpoint}"
  })
}
