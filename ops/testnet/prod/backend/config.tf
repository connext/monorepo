
locals {
  poller_env_vars = [
    { name = "BACKEND_CONFIG", value = local.local_poller_config },
    { name = "DATABASE_URL", value = "postgres://${var.postgres_user}:${var.postgres_password}@${module.poller_db.db_instance_endpoint}/connext" }
  ]

  postgrest_env_vars = [
    { name = "PGRST_ADMIN_SERVER_PORT", value = "3001" },
    { name = "PGRST_DB_URI", value = "postgres://${var.postgres_user}:${var.postgres_password}@${module.poller_db.db_instance_endpoint}/connext" },
    { name = "PGRST_DB_SCHEMA", value = "public" },
    { name = "PGRST_DB_ANON_ROLE", value = "query" },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage }
  ]
}

locals {
  local_poller_config = jsonencode({
    logLevel = "debug"
    chains = {
      "1111" = {}
      "2221" = {}
      "3331" = {}
    }
    environment = var.stage
  })
}
