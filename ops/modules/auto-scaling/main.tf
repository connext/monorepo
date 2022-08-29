
resource "aws_appautoscaling_target" "service_task_scaling" {
  max_capacity       = 50
  min_capacity       = 10
  resource_id        = "service/${var.ecs_cluster_name}/${var.ecs_service_name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "service_avg_mem_scaling" {
  name               = "${var.domain}-${var.environment}-${var.stage}-memory-as"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.service_task_scaling.resource_id
  scalable_dimension = aws_appautoscaling_target.service_task_scaling.scalable_dimension
  service_namespace  = aws_appautoscaling_target.service_task_scaling.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value = 30
  }
}

resource "aws_appautoscaling_policy" "service_avg_cpu_scaling" {
  name               = "${var.domain}-${var.environment}-${var.stage}-cpu-as"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.service_task_scaling.resource_id
  scalable_dimension = aws_appautoscaling_target.service_task_scaling.scalable_dimension
  service_namespace  = aws_appautoscaling_target.service_task_scaling.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }

    target_value = 50
  }
}
