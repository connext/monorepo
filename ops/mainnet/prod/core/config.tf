locals {
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
      "6648936" = {
        providers                 = ["https://eth-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth"]
        excludeListFromRelayerFee = ["0x5b9315ce1304df3b2a83b2074cbf849d160642ab"]
      },
      "1869640809" = {
        providers = ["https://optimism-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/optimism"]
      },
      "1886350457" = {
        providers = ["https://polygon-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/polygon"]
      }
      "1634886255" = {
        providers = ["https://arb-mainnet.g.alchemy.com/v2/${var.arbitrum_alchemy_key_0}", "https://rpc.ankr.com/arbitrum"]
      }
      "6450786" = {
        providers = ["https://bsc-mainnet.blastapi.io/${var.blast_key}", "https://bsc-dataseed1.binance.org", "https://bsc-dataseed2.binance.org", "https://rpc.ankr.com/bsc"]
      }
      "6778479" = {
        providers = ["https://gnosis-mainnet.blastapi.io/${var.blast_key}", "https://rpc.gnosischain.com", "https://rpc.ankr.com/gnosis"]
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
    relayerFeeTolerance = 60
    environment         = var.stage
    database = {
      url = "postgresql://${var.postgres_user}:${var.postgres_password}@db.mainnet.connext.ninja:5432/connext"
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
          name       = "6648936"
          limit      = 1
          queueLimit = 10000
          subscribe  = true
        },
        {
          name       = "1869640809"
          limit      = 1
          queueLimit = 10000
          subscribe  = true
        },
        {
          name       = "1886350457"
          limit      = 1
          queueLimit = 10000
          subscribe  = true
        },
        {
          name       = "1634886255"
          limit      = 1
          queueLimit = 10000
          subscribe  = true
        },
        {
          name       = "6450786"
          limit      = 1
          queueLimit = 10000
          subscribe  = true
        },
        {
          name       = "6778479"
          limit      = 1
          queueLimit = 10000
          subscribe  = true
        },
      ]
      bindings = [
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
      ]
      executerTimeout = 300000
      publisher       = "sequencerX"
    }
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
    logLevel = "debug"
    chains = {
      "6648936" = {
        providers = ["https://eth-mainnet.alchemyapi.io/v2/${var.mainnet_alchemy_key_0}", "https://eth-mainnet.blastapi.io/${var.blast_key}", "https://rpc.ankr.com/eth"]
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
    }
    gelatoApiKey = "${var.gelato_api_key}"
    environment  = var.stage
    database = {
      url = "postgresql://${var.postgres_user}:${var.postgres_password}@db.mainnet.connext.ninja:5432/connext"
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
      prover    = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_prover_heartbeat}"
      processor = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_processor_heartbeat}"
      propagate = "https://betteruptime.com/api/v1/heartbeat/${var.lighthouse_propagate_heartbeat}"
    }
    hubDomain       = "6648936"
    proverBatchSize = 1
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
    }
    environment   = var.stage
    web3SignerUrl = "https://${module.relayer_web3signer.service_endpoint}"
  })

  local_watcher_config = jsonencode({
    server = {
      adminToken = var.admin_token_watcher
    }
    logLevel = "debug"
    hubDomain : "6648936"
    chains = {
      "6648936" = {
        providers = ["https://eth-mainnet.blastapi.io/${var.blast_key}", "https://eth.llamarpc.com", "https://rpc.ankr.com/eth", "https://api.zmok.io/mainnet/oaen6dy8ff6hju9k"]
        assets = [{
          name    = "USDC"
          address = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
          }, {
          name    = "WETH"
          address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        }]
      },
      "1869640809" = {
        providers = ["https://optimism-mainnet.blastapi.io/${var.blast_key}", "https://mainnet.optimism.io", "https://rpc.ankr.com/optimism"]
        assets = [{
          name    = "USDC"
          address = "0x67E51f46e8e14D4E4cab9dF48c59ad8F512486DD"
          }, {
          name    = "WETH"
          address = "0xbAD5B3c68F855EaEcE68203312Fd88AD3D365e50"
        }]
      },
      "1886350457" = {
        providers = ["https://polygon-mainnet.blastapi.io/${var.blast_key}", "https://polygon.llamarpc.com", "https://polygon-bor.publicnode.com", "https://rpc.ankr.com/polygon"]
        assets = [{
          name    = "USDC"
          address = "0xF96C6d2537e1af1a9503852eB2A4AF264272a5B6"
          }, {
          name    = "WETH"
          address = "0x4b8BaC8Dd1CAA52E32C07755c17eFadeD6A0bbD0"
        }]
      }
      "1634886255" = {
        providers = ["https://arb-mainnet.g.alchemy.com/v2/${var.arbitrum_alchemy_key_0}", "https://arb1.arbitrum.io/rpc", "https://rpc.ankr.com/arbitrum"]
        assets = [{
          name    = "USDC"
          address = "0x8c556cF37faa0eeDAC7aE665f1Bb0FbD4b2eae36"
          }, {
          name    = "WETH"
          address = "0x2983bf5c334743Aa6657AD70A55041d720d225dB"
        }]
      }
      "6450786" = {
        providers = ["https://bsc-mainnet.blastapi.io/${var.blast_key}", "https://bsc-dataseed1.binance.org", "https://bsc-dataseed2.binance.org", "https://rpc.ankr.com/bsc", "https://bsc-dataseed1.defibit.io"]
        assets = [{
          name    = "USDC"
          address = "0x5e7D83dA751F4C9694b13aF351B30aC108f32C38"
          }, {
          name    = "WETH"
          address = "0xA9CB51C666D2AF451d87442Be50747B31BB7d805"
        }]
      }
      "6778479" = {
        providers = ["https://gnosis-mainnet.blastapi.io/${var.blast_key}", "https://rpc.gnosischain.com", "https://rpc.ankr.com/gnosis", "https://xdai-rpc.gateway.pokt.network", "https://rpc.gnosis.gateway.fm"]
        assets = [{
          name    = "USDC"
          address = "0x44CF74238d840a5fEBB0eAa089D05b763B73faB8"
          }, {
          name    = "WETH"
          address = "0x538E2dDbfDf476D24cCb1477A518A82C9EA81326"
        }]
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
