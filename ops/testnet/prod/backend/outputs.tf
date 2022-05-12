output "poller-dns" {
  value = module.poller.dns_name
}

output "postgrest-dns" {
  value = module.postgrest.dns_name
}

output "postgrest-service-endpoint" {
  value = module.postgrest.service_endpoint
}

output "db-instance-endpoint" {
  value = module.poller_db.db_instance_endpoint
}

output "db-instance-fixed-address" {
  value = module.poller_db.db_instance_fixed_address
}

