resource "aws_cloudwatch_log_group" "container" {
  name = "${var.environment}-${var.stage}-${var.container_family}"
  tags = {
    Family = "${var.environment}-${var.stage}-${var.container_family}"
    Domain = var.domain
  }
}



resource "aws_ecs_task_definition" "service" {
  family                   = "${var.environment}-${var.stage}-${var.container_family}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = var.execution_role_arn
  container_definitions = jsonencode([
    {
      name        = "${var.environment}-${var.stage}-${var.container_family}"
      image       = var.docker_image
      cpu         = var.cpu
      memory      = var.memory
      environment = var.container_env_vars
      networkMode = "awsvpc"
      logConfiguration = {
        logDriver = "awsfirelens",
        options = {
          Name       = "datadog",
          apiKey     = var.dd_api_key,
          dd_service = var.container_family,
          dd_source  = "fargate-app",
          dd_tags    = "domain:${var.domain},env:${var.environment},stage:${var.stage},service:${var.container_family}",
          TLS        = "on",
          provider   = "ecs"
        }
      }
      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
        }
      ]
    },
    {
      name  = "datadog-agent-${var.environment}-${var.stage}-${var.container_family}",
      image = "public.ecr.aws/datadog/agent:latest",
      environment = [
        {
          name  = "DD_API_KEY",
          value = var.dd_api_key
        },
        {
          name  = "ECS_FARGATE",
          value = "true"
        },
        {
          name  = "DD_APM_ENABLED",
          value = "true"
        },
        {
          name  = "DD_DOGSTATSD_NON_LOCAL_TRAFFIC",
          value = "true"
        },

        {
          name  = "DD_APM_NON_LOCAL_TRAFFIC",
          value = "true"
        },

        {
          name  = "DD_PROCESS_AGENT_ENABLED",
          value = "true"
        },

        {
          name  = "DD_TRACE_ANALYTICS_ENABLED",
          value = "true"
        },

        {
          name  = "DD_RUNTIME_METRICS_ENABLED",
          value = "true"
        },

        {
          name  = "DD_LOGS_INJECTION",
          value = "true"
        }
      ]

      port_mappings = [
        {
          containerPort = 8126
          hostPort      = 8126
          protocol      = "tcp"
        },
        {
          containerPort = 8125
          hostPort      = 8125
          protocol      = "udp"
        },
      ]
    },
    {
      name  = "fluent-bit-agent-${var.environment}-${var.stage}-${var.container_family}",
      image = "public.ecr.aws/aws-observability/aws-for-fluent-bit:latest",
      firelensConfiguration = {
        type = "fluentbit",
        options = {
          enable-ecs-log-metadata = "true"
          config-file-type        = "file"
          config-file-value       = "/fluent-bit/configs/parse-json.conf"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "service" {
  name          = "${var.environment}-${var.stage}-${var.container_family}"
  cluster       = var.cluster_id
  desired_count = var.instance_count

  launch_type = "FARGATE"
  # Track the latest ACTIVE revision
  task_definition = "${aws_ecs_task_definition.service.family}:${max("${aws_ecs_task_definition.service.revision}", "${aws_ecs_task_definition.service.revision}")}"

  network_configuration {
    security_groups = flatten([var.service_security_groups])
    subnets         = var.private_subnets
  }
}
