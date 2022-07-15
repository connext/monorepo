output "sequencer-subscriber-dns" {
  value = module.sequencer_subscriber.dns_name
}
output "sequencer-publisher-dns" {
  value = module.sequencer_publisher.dns_name
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

output "sequencer-publisher-service-endpoint" {
  value = module.sequencer_publisher.service_endpoint
}

output "sequencer-subscriber-service-endpoint" {
  value = module.sequencer_subscriber.service_endpoint
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

output "rmq-sequencer-management-endpoint" {
  value = module.sequencer_message_queue.rmq_management_endpoint
}

