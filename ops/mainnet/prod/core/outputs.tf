output "sequencer-dns" {
  value = module.sequencer.dns_name
}

output "router-dns" {
  value = module.router.dns_name
}

output "lighthouse-dns" {
  value = module.lighthouse.daemon_service_name
}

output "sequencer-service-endpoint" {
  value = module.sequencer.service_endpoint
}

output "router-service-endpoint" {
  value = module.router.service_endpoint
}

output "lighthouse-service-name" {
  value = module.lighthouse.daemon_service_name
}

