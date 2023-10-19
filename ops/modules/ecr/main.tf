resource "aws_ecr_repository" "name" {
  for_each = toset(var.repository_names)
  name     = each.value
}

resource "aws_ecr_replication_configuration" "this" {
  replication_configuration {

    dynamic "rule" {
      for_each = var.registry_replication_rules

      content {
        dynamic "destination" {
          for_each = rule.value.destinations

          content {
            region      = destination.value.region
            registry_id = destination.value.registry_id
          }
        }
      }
    }
  }
}
