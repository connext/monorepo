resource "aws_cloudwatch_log_group" "container" {
  name = "${var.environment}-${var.stage}-${var.container_family}"
  tags = {
    Family = "${var.environment}-${var.stage}-${var.container_family}"
    Domain = var.domain
  }
}

resource "aws_service_discovery_private_dns_namespace" "this" {
  name        = "discovery.rabbitmq"
  description = "Rabbitmq dns"
  vpc         = var.vpc_id
}

resource "aws_service_discovery_service" "rmq_sds" {
  name = "nodes"
  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.this.id
    dns_records {
      ttl  = 10
      type = "A"
    }
    routing_policy = "MULTIVALUE"
  }
}


resource "aws_ecs_task_definition" "rmq" {
  family                   = "${var.environment}-${var.stage}-${var.container_family}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = var.execution_role_arn
  tags = {
    Environment = var.environment
    Stage       = var.stage
    Family      = "rabbitmq"
    Domain      = var.domain
  }
  container_definitions = jsonencode([
    {
      name      = "${var.environment}-${var.stage}-${var.container_family}"
      image     = var.docker_image
      essential = true
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "rabbit-mq-${var.environment}-${var.stage}"
          awslogs-region        = var.region
          awslogs-stream-prefix = var.container_family
        }
      },
      portMappings = [
        {
          containerPort = 4369
          hostPort      = 4369
          protocol      = "tcp"
        },
        {
          containerPort = 5672
          hostPort      = 5672
          protocol      = "tcp"
        },
        {
          containerPort = 15672
          hostPort      = 15672
          protocol      = "tcp"
        },
        {
          containerPort = 15692
          hostPort      = 15692
          protocol      = "tcp"
        },
        {
          containerPort = 25672
          hostPort      = 25672
          protocol      = "tcp"
        }
      ],
      healthCheck = {
        command = [
          "CMD-SHELL",
          "curl localhost:15692/metrics || exit 1"
        ],
        interval = 30
        retries  = 3
        timeout  = 5
      }
    }
  ])
}

resource "aws_ecs_service" "service" {
  cluster                 = var.cluster_id
  desired_count           = var.desired_tasks
  launch_type             = "FARGATE"
  name                    = var.container_name
  task_definition         = aws_ecs_task_definition.rmq.arn
  enable_ecs_managed_tags = true

  lifecycle {
    ignore_changes = [desired_count]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.management.arn
    container_name   = "${var.environment}-${var.stage}-${var.container_family}"
    container_port   = 15672
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.rabbit.arn
    container_name   = "${var.environment}-${var.stage}-${var.container_family}"
    container_port   = 5672
  }

  service_registries {
    registry_arn = aws_service_discovery_service.rmq_sds.arn
  }

  network_configuration {
    assign_public_ip = false
    security_groups  = flatten([var.service_security_groups, aws_security_group.lb.id])
    subnets          = var.private_subnets
  }

  tags = {
    Environment = var.environment
    Stage       = var.stage
    Family      = var.container_family
    Domain      = var.domain
  }

  depends_on = [aws_lb_target_group.management, aws_lb_target_group.rabbit]
}

# Rabbit Management
resource "aws_lb_target_group" "management" {
  name        = "${var.environment}-${var.stage}-${var.container_family}-rabbitmq-mg-lb-tg"
  port        = 15672
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  lifecycle {
    create_before_destroy = true
  }

  health_check {
    matcher  = "200"
    path     = "/"
    port     = 15672
    timeout  = 30
    interval = 40
  }

  tags = {
    Environment = var.environment
    Stage       = var.stage
    Family      = var.container_family
    Domain      = var.domain
  }

  depends_on = [aws_lb.lb]
}

resource "aws_lb_listener" "management" {
  load_balancer_arn = aws_lb.lb.arn
  port              = 15672
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.management.arn
  }
}


resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_alb.lb.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.cert_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.management.arn
  }
  tags = {
    Family = "${var.environment}-${var.stage}-${var.container_family}"
    Domain = var.domain
  }
}
resource "aws_lb_listener_rule" "http" {
  listener_arn = aws_lb_listener.management.arn
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.management.arn
  }
  condition {
    host_header {
      values = ["${var.container_family}.${var.dns_name}"]
    }
  }
}
resource "aws_lb_listener_rule" "https" {
  listener_arn = aws_lb_listener.https.arn

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.management.arn
  }

  condition {
    host_header {
      values = ["${var.container_family}.${var.dns_name}"]
    }
  }
}


# Management
resource "aws_route53_record" "this" {
  zone_id = var.zone_id
  name    = "${var.container_family}.${var.dns_name}"
  type    = "A"
  alias {
    name                   = aws_lb.lb.dns_name
    zone_id                = aws_lb.lb.zone_id
    evaluate_target_health = true
  }
}
# AMQP
resource "aws_route53_record" "amqp" {
  zone_id = var.zone_id
  name    = "${var.container_family}.amqp.${var.dns_name}"
  type    = "A"
  alias {
    name                   = aws_lb.network.dns_name
    zone_id                = aws_lb.network.zone_id
    evaluate_target_health = true
  }
}


# resource "aws_route53_record" "www" {
#   zone_id = var.zone_id
#   name    = var.stage != "production" ? "${var.container_family}.${var.environment}.${var.stage}.${var.base_domain}" : "${var.container_family}.${var.environment}.${var.base_domain}"
#   type    = "CNAME"
#   ttl     = "300"
#   records = [aws_alb.lb.dns_name]
# }

