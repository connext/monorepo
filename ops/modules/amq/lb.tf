
module "shell_execute" {
  source  = "github.com/matti/terraform-shell-resource"
  command = "dig +short $(echo $URL | cut -d'/' -f3 | cut -d':' -f1) | grep -v '\\.$'"
  environment = {
    URL = aws_mq_broker.default.instances[0].console_url
  }
}

resource "aws_alb" "lb" {
  internal                   = false
  security_groups            = [var.sg_id, aws_security_group.rabbitmq.id, var.allow_all_sg]
  subnets                    = var.subnet_ids
  enable_deletion_protection = false
  idle_timeout               = 60
  tags = {
    Environment = var.environment
    Stage       = var.stage
  }
}


resource "aws_alb_target_group" "front_end" {
  port        = 15671
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    enabled  = true
    path     = "/"
    matcher  = "200,302"
    interval = 90
  }
  lifecycle {
    create_before_destroy = true
  }
  tags = {
    Environment = var.environment
    Stage       = var.stage
  }
}

resource "aws_lb_target_group_attachment" "test" {
  target_group_arn = aws_alb_target_group.front_end.arn
  target_id        = module.shell_execute.stdout
  port             = 15671
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
  tags = {
    Environment = var.environment
    Stage       = var.stage
  }
}

# ALB Security group
# This is the group you need to edit if you want to restrict access to your application
resource "aws_security_group" "lb" {
  description = "controls access to the ALB"
  vpc_id      = var.vpc_id

  ingress {
    protocol    = "tcp"
    from_port   = 15671
    to_port     = 15671
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Environment = var.environment
    Stage       = var.stage
  }
}


resource "aws_route53_record" "www" {
  zone_id = var.zone_id
  name    = var.stage != "production" ? "rmq-management.${var.environment}.${var.stage}.${var.base_domain}" : "rmq-management.${var.environment}.${var.base_domain}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_alb.lb.dns_name]
  #   records = [trimprefix(aws_mq_broker.default.instances[0].console_url, "https://")]
}
