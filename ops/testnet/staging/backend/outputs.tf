output "sequencer-dns" {
  value = module.poller.dns_name
}

output "router-dns" {
  value = module.postgrest.dns_name
}

output "sequencer-service-endpoint" {
  value = module.poller_db.db_instance_endpoint
}

