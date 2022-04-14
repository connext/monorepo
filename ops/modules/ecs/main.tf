resource "aws_ecs_cluster" "infrastructure" {
  name = "${var.ecs_cluster_name_prefix}-${var.environment}-${var.stage}"
}

