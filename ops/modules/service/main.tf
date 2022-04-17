resource "aws_cloudwatch_log_group" "container" {
  name = "${var.environment}-${var.stage}-${var.container_family}"
}

resource "aws_ecs_task_definition" "service" {
  family                   = "${var.environment}-${var.stage}-${var.container_family}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = var.execution_role_arn
  container_definitions    = jsonencode([
    {
      name        = "${var.environment}-${var.stage}-${var.container_family}"
      image       = var.docker_image
      cpu         = var.cpu
      memory      = var.memory
      environment = [
        { name = var.service_config_name, value = var.service_config_value },
        { name = "NXTP_MNEMONIC", value = var.mnemonic },
        { name = "ENVIRONMENT", value = var.environment }
      ]
      networkMode      = "awsvpc"
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
  depends_on  = [aws_alb_target_group.front_end, aws_alb.lb]

  # Track the latest ACTIVE revision
  task_definition = "${aws_ecs_task_definition.service.family}:${max("${aws_ecs_task_definition.service.revision}", "${aws_ecs_task_definition.service.revision}")}"

  network_configuration {
    security_groups = flatten([var.service_security_groups, aws_security_group.lb.id])
    subnets         = var.private_subnets
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.front_end.id
    container_name   = "${var.environment}-${var.stage}-${var.container_family}"
    container_port   = var.container_port
  }
}

resource "aws_alb" "lb" {
  internal                   = var.internal_lb
  security_groups            = var.service_security_groups
  subnets                    = var.lb_subnets
  enable_deletion_protection = false
  idle_timeout               = var.timeout
  tags                       = {
    Family = "${var.environment}-${var.stage}-${var.container_family}"
  }
}

resource "aws_alb_target_group" "front_end" {
  port        = var.loadbalancer_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path     = var.health_check_path
    matcher  = var.matcher_ports
    interval = var.timeout + 10
  }
  lifecycle {
    create_before_destroy = true
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
    target_group_arn = aws_alb_target_group.front_end.arn
  }
}

# ALB Security group
# This is the group you need to edit if you want to restrict access to your application
resource "aws_security_group" "lb" {
  description = "controls access to the ALB"
  vpc_id      = var.vpc_id

  ingress {
    protocol         = "tcp"
    from_port        = var.loadbalancer_port
    to_port          = var.container_port
    cidr_blocks      = var.ingress_cdir_blocks
    ipv6_cidr_blocks = var.ingress_ipv6_cdir_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = var.allow_all_cdir_blocks
  }
}

#var.environment != "prod" ? "${var.environment}.${var.hosted_zone_url}" : var.hosted_zone_url


resource "aws_route53_record" "www" {
  zone_id = var.zone_id
  name    = var.stage != "prod" ? "${var.container_family}.${var.environment}.${var.stage}.${var.base_domain}" : "${var.container_family}.${var.environment}.${var.base_domain}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_alb.lb.dns_name]
}

