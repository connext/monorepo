locals {
  dns_name = var.stage != "production" ? "${var.environment}.${var.stage}.${var.base_domain}" : "${var.environment}.${var.base_domain}"
}


resource "aws_cloudwatch_log_group" "container" {
  name = "${var.environment}-${var.stage}-${var.container_family}"
  tags = {
    Family = "${var.environment}-${var.stage}-${var.container_family}"
    Domain = var.domain
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
          awslogs-group         = aws_cloudwatch_log_group.container.name
          awslogs-region        = var.region
          awslogs-stream-prefix = var.container_family
        }
      },
      portMappings = [
        {
          containerPort = 5672
          hostPort      = 5672
          protocol      = "tcp"
        },
        {
          containerPort = 15672
          hostPort      = 15672
          protocol      = "tcp"
        }
      ],
    }
  ])
}

resource "aws_ecs_service" "service" {
  name          = "${var.environment}-${var.stage}-${var.container_family}"
  cluster       = var.cluster_id
  desired_count = var.instance_count

  launch_type = "FARGATE"
  depends_on  = [aws_alb_target_group.management, aws_alb.lb]

  task_definition = "${aws_ecs_task_definition.rmq.family}:${max("${aws_ecs_task_definition.rmq.revision}", "${aws_ecs_task_definition.rmq.revision}")}"

  load_balancer {
    target_group_arn = aws_lb_target_group.amqp.arn
    container_name   = "${var.environment}-${var.stage}-${var.container_family}"
    container_port   = 5672
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.management.arn
    container_name   = "${var.environment}-${var.stage}-${var.container_family}"
    container_port   = 15672
  }
  network_configuration {
    security_groups = flatten([var.service_security_groups, aws_security_group.lb.id])
    subnets         = var.private_subnets
  }

  tags = {
    Environment = var.environment
    Stage       = var.stage
    Family      = var.container_family
    Domain      = var.domain
  }

}

resource "aws_alb" "lb" {
  security_groups            = var.service_security_groups
  subnets                    = var.lb_subnets
  enable_deletion_protection = false
  idle_timeout               = var.timeout
  tags = {
    Family = "${var.environment}-${var.stage}-${var.container_family}"
    Domain = var.domain
  }
}

resource "aws_lb" "amqp" {
  name               = "${var.environment}-${var.stage}-amqp-lb"
  internal           = true
  load_balancer_type = "network"
  subnets            = var.private_subnets

  enable_deletion_protection = false

  tags = {
    Family = "${var.environment}-${var.stage}-${var.container_family}"
    Domain = var.domain
  }
}

resource "aws_lb_target_group" "amqp" {
  name        = "${var.environment}-${var.stage}-amqp-lb-tg"
  port        = 5672
  protocol    = "TCP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  lifecycle {
    create_before_destroy = true
  }
  tags = {
    Environment = var.environment
    Stage       = var.stage
    Family      = var.container_family
    Domain      = var.domain
  }

  depends_on = [aws_lb.amqp]
}

resource "aws_alb_target_group" "management" {
  name        = "${var.environment}-${var.stage}-mgt-lb-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  lifecycle {
    create_before_destroy = true
  }

  health_check {
    matcher  = "200"
    path     = "/"
    port     = 80
    timeout  = 30
    interval = 40
  }

  tags = {
    Environment = var.environment
    Stage       = var.stage
    Family      = var.container_family
    Domain      = var.domain
  }

  depends_on = [aws_alb.lb]
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_alb.lb.arn
  port              = 443
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

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.amqp.arn
  port              = 5672
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.amqp.arn
  }
  tags = {
    Family = "${var.environment}-${var.stage}-${var.container_family}"
    Domain = var.domain
  }
}
resource "aws_security_group" "lb" {
  description = "controls access to the ALB"
  vpc_id      = var.vpc_id

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 15672
    cidr_blocks = var.ingress_cdir_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = var.allow_all_cdir_blocks
  }
  tags = {
    Family = "${var.environment}-${var.stage}-${var.container_family}"
    Domain = var.domain
  }
}

resource "aws_route53_record" "www" {
  zone_id = var.zone_id
  name    = "${var.container_family}.${local.dns_name}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_alb.lb.dns_name]
}

resource "aws_route53_record" "amqp" {
  zone_id = var.zone_id
  name    = "${var.container_family}.amqp.${local.dns_name}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_lb.amqp.dns_name]
}


