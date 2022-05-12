resource "aws_ecs_cluster" "infrastructure" {
  name = "${var.ecs_cluster_name_prefix}-${var.domain}-${var.environment}-${var.stage}"
  tags = {
    Stage       = var.stage
    Environment = var.environment
    Domain      = var.domain
  }
}

