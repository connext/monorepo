output "sequencer-subscriber-dns" {
  value = module.sequencer_subscriber.dns_name
}
output "sequencer-publisher-dns" {
  value = module.sequencer_publisher.dns_name
}

output "sequencer-server-dns" {
  value = module.sequencer_server.dns_name
}

// Disable DAO router from bidding
# output "router-subscriber-dns" {
#   value = module.router_subscriber.dns_name
# }
# output "router-publisher-dns" {
#   value = module.router_publisher.dns_name
# }

output "sequencer-server-service-endpoint" {
  value = module.sequencer_server.service_endpoint
}

output "sequencer-publisher-service-endpoint" {
  value = module.sequencer_publisher.service_endpoint
}

output "sequencer-subscriber-service-endpoint" {
  value = module.sequencer_subscriber.service_endpoint
}

# Disable DAO router from bidding
# output "router-publisher-service-endpoint" {
#   value = module.router_publisher.service_endpoint
# }

# output "router-subscriber-service-endpoint" {
#   value = module.router_subscriber.service_endpoint
# }

output "router-executor-service-endpoint" {
  value = module.router_executor.service_endpoint
}

output "lighthouse-prover-service-name" {
  value = module.lighthouse_prover_cron.lambda_cron_service_name
}

output "lighthouse-process-from-root-service-name" {
  value = module.lighthouse_process_from_root_cron.lambda_cron_service_name
}

output "lighthouse-propagate-service-name" {
  value = module.lighthouse_propagate_cron.lambda_cron_service_name
}

output "relayer-service-endpoint" {
  value = module.relayer_server.service_endpoint
}

output "relayer-dns" {
  value = module.relayer.dns_name
}

output "rmq-management-endpoint" {
  value = module.centralised_message_queue.aws_mq_broker_console
}

output "rmq-amqps-endpoint" {
  value = module.centralised_message_queue.aws_mq_amqp_endpoint
}
