resource "aws_cloudwatch_log_group" "container" {
  name = var.container_family
}

resource "aws_ecs_task_definition" "service" {
  family                   = "${var.container_family}-${var.environment}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = var.execution_role_arn
  container_definitions    = <<TASK_DEFINITION
[
 {
   "cpu": ${var.cpu},
   "memory": ${var.memory},
   "environment": [
      {"name": "REDIS_URI", "value": "redis://${var.redis_uri}:6379/0"},
      {"name": "NXTP_CONFIG", "value": ${local.local_sequencer_config},
      {"name": "ENV", "value": "${var.environment}"}

   ],
   "name": "${var.container_family}",
   "image": "${var.docker_image}",
   "networkMode": "awsvpc",
   "portMappings": [
     {
       "containerPort": ${var.container_port},
       "hostPort": ${var.container_port}
     }
   ],
   "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "${aws_cloudwatch_log_group.container.name}",
                    "awslogs-region": "eu-central-1",
                    "awslogs-stream-prefix": "logs"
                }
            }
 }
]
TASK_DEFINITION
}

resource "aws_ecs_service" "service" {
  name          = "${var.container_family}-${var.environment}"
  cluster       = var.cluster_id
  desired_count = var.instance_count

  launch_type = "FARGATE"
  depends_on  = [aws_alb_target_group.front_end, aws_alb.lb]

  # Track the latest ACTIVE revision

  task_definition = "${aws_ecs_task_definition.service.family}:${max("${aws_ecs_task_definition.service.revision}", "${aws_ecs_task_definition.service.revision}")}"

  network_configuration {
    security_groups = flatten([var.allow_all_sg, var.ecs_cluster_sg])
    subnets         = flatten([var.private_subnets])
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.front_end.id
    container_name   = var.container_family
    container_port   = var.container_port
  }
}

resource "aws_alb" "lb" {
  security_groups            = flatten([var.allow_all_sg, var.ecs_cluster_sg])
  subnets                    = var.public_subnets
  enable_deletion_protection = false
  idle_timeout               = var.timeout

}

resource "aws_alb_target_group" "front_end" {
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path     = var.health_check_path
    matcher  = var.matcher_ports
    interval = var.timeout + 10
  }
}


resource "aws_alb_listener" "front_end" {
  load_balancer_arn = aws_alb.lb.id
  port              = var.loadbalancer_port
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.front_end.id
    type             = "forward"
  }
}

# ALB Security group
# This is the group you need to edit if you want to restrict access to your application
resource "aws_security_group" "lb" {
  description = "controls access to the ALB"


  ingress {
    protocol    = "tcp"
    from_port   = var.loadbalancer_port
    to_port     = var.container_port
    cidr_blocks = [
      "0.0.0.0/0"
    ]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [
      "0.0.0.0/0"
    ]
  }
}



