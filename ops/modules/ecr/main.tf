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
            "description": "Expire main images that are not the last 50",
            "selection": {
                "tagStatus": "tagged",
                "tagPrefixList": ["main-"],
                "countType": "imageCountMoreThan",
                "countNumber": 50
            },
            "action": {
                "type": "expire"
            }
        },
        {
            "rulePriority": 2,
            "description": "Expire staging images that are not the last 20",
            "selection": {
                "tagStatus": "tagged",
                "tagPrefixList": ["staging-"],
                "countType": "imageCountMoreThan",
                "countNumber": 20
            },
            "action": {
                "type": "expire"
            }
        },
        {
            "rulePriority": 3,
            "description": "Expire testnet-prod images that are not the last 10",
            "selection": {
                "tagStatus": "tagged",
                "tagPrefixList": ["testnet-prod-"],
                "countType": "imageCountMoreThan",
                "countNumber": 10
            },
            "action": {
                "type": "expire"
            }
        },
        {
            "rulePriority": 4,
            "description": "Expire prod images that are not the last 5",
            "selection": {
                "tagStatus": "tagged",
                "tagPrefixList": ["prod-"],
                "countType": "imageCountMoreThan",
                "countNumber": 5
            },
            "action": {
                "type": "expire"
            }
        },
        {
            "rulePriority": 6,
            "description": "Expire images older than 60 days",
            "selection": {
                "tagStatus": "tagged",
                "tagPrefixList": ["main-", "staging-", "testnet-prod", "prod-"],
                "countType": "sinceImagePushed",
                "countUnit": "days",
                "countNumber": 180
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
