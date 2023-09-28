resource "aws_ecr_repository" "name" {
  for_each = toset(var.repository_names)
  name     = each.value
}

resource "aws_ecr_lifecycle_policy" "remove_old_images" {
  for_each   = aws_ecr_repository.name
  repository = each.value.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Expire images older than 20 days",
            "selection": {
                "tagStatus": "any",
                "countType": "sinceImagePushed",
                "countUnit": "days",
                "countNumber": 20
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
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
