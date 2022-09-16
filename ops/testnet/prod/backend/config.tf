
locals {
  cartographer_env_vars = [
    { name = "CARTOGRAPHER_CONFIG", value = local.local_cartographer_config },
    { name = "DATABASE_URL", value = "postgres://${var.postgres_user}:${var.postgres_password}@${module.cartographer_db.db_instance_endpoint}/connext" },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = var.stage }
  ]

  postgrest_env_vars = [
    { name = "PGRST_ADMIN_SERVER_PORT", value = "3001" },
    { name = "PGRST_DB_URI", value = "postgres://${var.postgres_user}:${var.postgres_password}@${module.cartographer_db.db_instance_endpoint}/connext" },
    { name = "PGRST_DB_SCHEMA", value = "public" },
    { name = "PGRST_DB_ANON_ROLE", value = "query" },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage }
  ]

  local_cartographer_config = jsonencode({
    logLevel = "debug"
    chains = {
      "1735356532" = {}
      "1735353714" = {}
      "9991"       = {}
    }
    environment = var.stage
  })
}
