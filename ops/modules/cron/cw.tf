resource "aws_cloudwatch_event_rule" "event_rule" {
  name                = "${var.environment}-${var.stage}-${var.container_family}"
  schedule_expression = var.schedule_expression
}


// Failure notification configuration (using Cloudwatch)
// -----------------------------------------------------
// We create an event rule that sends a message to an SNS Topic every time the task fails with a non-0 error code
// We also configure the

resource "aws_cloudwatch_event_target" "ecs_scheduled_task" {
  rule      = aws_cloudwatch_event_rule.event_rule.name
  target_id = "${var.environment}-${var.stage}-${var.container_family}"
  arn       = var.ecs_cluster_arn
  role_arn  = var.execution_role_arn

  ecs_target {
    launch_type         = "FARGATE"
    platform_version    = "LATEST"
    task_count          = 1
    task_definition_arn = aws_ecs_task_definition.service.arn
    network_configuration {
      subnets = var.private_subnets
    }
  }
}

resource "aws_cloudwatch_event_rule" "task_failure" {
  name        = "${var.environment}-${var.stage}-${var.container_family}_task_failure"
  description = "Watch for ${var.container_family} tasks that exit with non zero exit codes"

  event_pattern = <<EOF
  {
    "source": [
      "aws.ecs"
    ],
    "detail-type": [
      "ECS Task State Change"
    ],
    "detail": {
      "lastStatus": [
        "STOPPED"
      ],
      "stoppedReason": [
        "Essential container in task exited"
      ],
      "containers": {
        "exitCode": [
          {"anything-but": 0}
        ]
      },
      "clusterArn": ["${var.ecs_cluster_arn}"],
      "taskDefinitionArn": ["${aws_ecs_task_definition.service.arn}"]
    }
  }
  EOF
}
