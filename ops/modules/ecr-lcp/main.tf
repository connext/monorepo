resource "aws_ecr_lifecycle_policy" "remove_old_images" {
  for_each   = toset(var.repository_names)
  repository = each.value

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
            "description": "remove old images",
            "selection": {
                "tagStatus": "any",
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
