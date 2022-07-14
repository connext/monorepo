output "sequencer-dns" {
  value = module.sequencer.dns_name
}

output "router-subscriber-dns" {
  value = module.router_subscriber.dns_name
}
output "router-publisher-dns" {
  value = module.router_publisher.dns_name
}

output "lighthouse-dns" {
  value = module.lighthouse.daemon_service_name
}

output "sequencer-service-endpoint" {
  value = module.sequencer.service_endpoint
}

output "router-publisher-service-endpoint" {
  value = module.router_publisher.service_endpoint
}

output "router-subscriber-service-endpoint" {
  value = module.router_subscriber.service_endpoint
}


output "lighthouse-service-name" {
  value = module.lighthouse.daemon_service_name
}

output "rmq-router-management-endpoint" {
  value = module.router_message_queue.rmq_management_endpoint
}

