locals {
  poller_env_vars = [
    { name = "ENVIRONMENT", value = var.environment }
  ]
  postgrest_env_vars = [
    { name = "PGRST_ADMIN_SERVER_PORT", value = 3001 },
    { name = "ENVIRONMENT", value = var.environment }
  ]
}
