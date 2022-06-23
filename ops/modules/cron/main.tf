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
        logDriver = "awslogs",
        options   = {
          awslogs-group         = aws_cloudwatch_log_group.container.name,
          awslogs-region        = var.region,
          awslogs-stream-prefix = "logs"
        }
      }
      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
        }
      ]
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
