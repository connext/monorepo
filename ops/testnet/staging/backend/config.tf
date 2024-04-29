
locals {
  cartographer_env_vars = {
    CARTOGRAPHER_CONFIG = local.local_cartographer_config,
    DATABASE_URL        = "postgres://${var.postgres_user}:${var.postgres_password}@${module.cartographer_db.db_instance_endpoint}/connext",
    ENVIRONMENT         = var.stage,
    STAGE               = var.stage,
    DD_ENV              = "${var.environment}-${var.stage}",
    DD_LOGS_ENABLED     = true,
    DD_API_KEY          = var.dd_api_key,
    DD_LAMBDA_HANDLER   = "packages/agents/cartographer/poller/dist/index.handler"
  }

  postgrest_env_vars = [
    { name = "PGRST_ADMIN_SERVER_PORT", value = "3001" },
    { name = "PGRST_DB_URI", value = "postgres://${var.postgres_user}:${var.postgres_password}@${module.cartographer_db.db_instance_endpoint}/connext" },
    { name = "PGRST_DB_SCHEMA", value = "public" },
    { name = "PGRST_DB_ANON_ROLE", value = "query" },
    { name = "ENVIRONMENT", value = var.stage },
    { name = "STAGE", value = var.stage }
  ]

  sdk_server_env_vars = [
    { name = "SDK_SERVER_CONFIG", value = local.local_sdk_server_config },
    { name = "ENVIRONMENT", value = var.stage },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]

  local_sdk_server_config = jsonencode({
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
      "1633842021" = { confirmations = 1 }
      "1936027759" = { confirmations = 10 }
      "1869640549" = { confirmations = 10 }
    }
    environment = var.stage
  })
}
