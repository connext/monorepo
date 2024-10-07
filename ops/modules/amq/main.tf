resource "aws_mq_broker" "default" {
  broker_name         = "rmq-cluster-${var.environment}-${var.stage}"
  deployment_mode     = var.deployment_mode
  engine_type         = "RabbitMQ"
  engine_version      = "3.10.25"
  host_instance_type  = var.host_instance_type
  publicly_accessible = var.publicly_accessible
  subnet_ids          = var.publicly_accessible ? [] : var.subnet_ids

  tags = {
    Environment = var.environment
    Stage       = var.stage
  }

  security_groups = var.publicly_accessible ? [] : [aws_security_group.rabbitmq.id, var.sg_id]

  logs {
    general = true
  }

  maintenance_window_start_time {
    day_of_week = "SUNDAY"
    time_of_day = "03:00"
    time_zone   = "UTC"
  }

  user {
    username = var.rmq_mgt_user
    password = var.rmq_mgt_password
  }

  auto_minor_version_upgrade = false
  apply_immediately          = true
}



