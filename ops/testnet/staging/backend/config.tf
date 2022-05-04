
locals {
  poller_env_vars = [
    { name = "ENVIRONMENT", value = var.environment },
    { name = "DATABASE_URL", value = "postgres://${var.postgres_user}:${var.postgres_password}@${module.poller_db.db_instance_fixed_address}:${module.poller_db.db_instance_port}/connext" }
  ]
  postgrest_env_vars = [
    { name = "PGRST_ADMIN_SERVER_PORT", value = 3001 },
    { name = "PGRST_DB_URI", value = "postgres://${var.postgres_user}:${var.postgres_password}@${module.poller_db.db_instance_fixed_address}:${module.poller_db.db_instance_port}/connext" },
    { name = "PGRST_DB_SCHEMA", value = "public" },
    { name = "PGRST_DB_ANON_ROLE", value = "query" },
    { name = "ENVIRONMENT", value = var.environment }
  ]
}
