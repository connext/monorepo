
locals {
  cartographer_env_vars = {
    CARTOGRAPHER_CONFIG = local.local_cartographer_config,
    DATABASE_URL        = "postgres://${var.postgres_user}:${var.postgres_password}@${module.cartographer_db.db_instance_endpoint}/connext",
    ENVIRONMENT         = var.environment,
    STAGE               = var.stage,
    DD_ENV              = "${var.environment}-${var.stage}",
    DD_LOGS_ENABLED     = true,
    DD_API_KEY          = var.dd_api_key
    DD_LAMBDA_HANDLER   = "packages/agents/cartographer/poller/dist/index.handler"
    GRAPH_API_KEY       = var.graph_api_key
  }

  postgrest_env_vars = [
    { name = "PGRST_ADMIN_SERVER_PORT", value = "3001" },
    { name = "PGRST_DB_URI", value = "postgres://${var.postgres_user}:${var.postgres_password}@${module.cartographer_db_replica.db_instance_endpoint}/connext" },
    { name = "PGRST_DB_SCHEMA", value = "public" },
    { name = "PGRST_DB_ANON_ROLE", value = "query" },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage }
  ]

  sdk_server_env_vars = [
    { name = "SDK_SERVER_CONFIG", value = local.local_sdk_server_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]

  local_sdk_server_config = jsonencode({
    logLevel = "debug"
    chains = {
      "6648936" = {
        providers = ["https://rpc.ankr.com/eth/"]
      }
      "1869640809" = {
        providers = ["https://rpc.ankr.com/optimism"]
      }
      "1886350457" = {
        providers = ["https://rpc.ankr.com/polygon"]
      }
      "1634886255" = {
        providers = ["https://rpc.ankr.com/arbitrum"]
      }
      "6450786" = {
        providers = ["https://rpc.ankr.com/bsc"]
      }
      "6778479" = {
        providers      = ["https://rpc.ankr.com/gnosis"]
        disabledAssets = ["0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d"]
      }
      "1818848877" = {
        providers      = ["https://rpc.linea.build"]
        disabledAssets = ["0xA219439258ca9da29E9Cc4cE5596924745e12B93", "0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5"]
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

    # The following are defined in variables.tf and don't map to the
    # definitions of environment and network in agent configs.
    environment = var.stage
    network     = var.environment

    redis = {
      enabled        = true
      expirationTime = 10
      host           = module.sdk_server_cache.redis_instance_address,
      port           = module.sdk_server_cache.redis_instance_port
    }

    server = {
      http = {
        host = "0.0.0.0"
        port = 8080
      }
    }
  })

  local_cartographer_config = jsonencode({
    logLevel = "debug"
    chains = {
      "6648936"    = { confirmations = 10 }
      "1869640809" = { confirmations = 1 }
      "1886350457" = { confirmations = 200 }
      "1634886255" = { confirmations = 1 }
      "6450786"    = { confirmations = 50 }
      "6778479"    = { confirmations = 100 }
      "1818848877" = { confirmations = 10 }
      "1887071085" = { confirmations = 10 }
      "1650553709" = { confirmations = 1 }
      "1635148152" = { confirmations = 10 }
      "1835365481" = { confirmations = 1 }
      "1835101812" = { confirmations = 1 }
    }
    environment = var.stage
    healthUrls = {
      messages  = "https://betteruptime.com/api/v1/heartbeat/${var.carto_messages_heartbeat}"
      roots     = "https://betteruptime.com/api/v1/heartbeat/${var.carto_roots_heartbeat}"
      routers   = "https://betteruptime.com/api/v1/heartbeat/${var.carto_routers_heartbeat}"
      transfers = "https://betteruptime.com/api/v1/heartbeat/${var.carto_transfers_heartbeat}"
    }
  })
}
