locals {
  thresholds = {
    CPUUtilizationThreshold   = var.cpu_utilization_threshold
    FreeStorageSpaceThreshold = var.free_storage_space_threshold
  }

  alarm_names = toset([
    "cpu_utilization_too_high",
    "free_storage_space_threshold",
  ])
}


resource "aws_sns_topic_subscription" "target" {
  count     = var.enable_cpu_utilization_alarm || var.enable_free_storage_space_too_low_alarm ? length(var.sns_topic_subscription_emails) : 0
  topic_arn = aws_sns_topic.topic[0].arn
  protocol  = "email"
  endpoint  = var.sns_topic_subscription_emails[count.index]
}

resource "aws_sns_topic" "topic" {
  count = var.enable_cpu_utilization_alarm || var.enable_free_storage_space_too_low_alarm ? 1 : 0
  name  = "${var.environment}-${var.stage}-${var.is_replica ? "replica-" : ""}db-sns-topic"
}


resource "aws_cloudwatch_metric_alarm" "cpu_utilization_too_high" {
  count               = var.enable_cpu_utilization_alarm ? 1 : 0
  alarm_name          = "${var.db_instance_name}-cpu-utilization-too-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/RDS"
  period              = "600"
  statistic           = "Average"
  threshold           = local.thresholds["CPUUtilizationThreshold"]
  alarm_description   = "Average database CPU utilization over last 10 minutes too high"
  alarm_actions       = aws_sns_topic.topic.*.arn
  ok_actions          = aws_sns_topic.topic.*.arn

  dimensions = {
    DBInstanceIdentifier = var.db_instance_id
  }
}


resource "aws_cloudwatch_metric_alarm" "free_storage_space_too_low" {
  count               = var.enable_free_storage_space_too_low_alarm ? 1 : 0
  alarm_name          = "${var.db_instance_name}-free-storage-space-too-low"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "FreeStorageSpace"
  namespace           = "AWS/RDS"
  period              = "600"
  statistic           = "Average"
  threshold           = local.thresholds["FreeStorageSpaceThreshold"]
  alarm_description   = "Average database free storage space over last 10 minutes too low"
  alarm_actions       = aws_sns_topic.topic.*.arn
  ok_actions          = aws_sns_topic.topic.*.arn

  dimensions = {
    DBInstanceIdentifier = var.db_instance_id
  }
}
