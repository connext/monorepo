terraform {
  backend "s3" {
    bucket = "nxtp-terraform-testnet-staging-backend"
    key    = "state/"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.region
}

# Fetch AZs in the current region
data "aws_availability_zones" "available" {}

data "aws_iam_role" "ecr_admin_role" {
  name = "erc_admin_role"
}


data "aws_route53_zone" "primary" {
  zone_id = "Z03634792TWUEHHQ5L0YX"
}

module "cartographer_db" {
  domain                = "cartographer"
  source                = "../../../modules/db"
  identifier            = "rds-postgres-cartographer-${var.environment}-${var.stage}"
  instance_class        = "db.t3.medium"
  allocated_storage     = 5
  max_allocated_storage = 10


  name     = "connext" // db name
  username = var.postgres_user
  password = var.postgres_password
  port     = "5432"

  maintenance_window = "Mon:00:00-Mon:03:00"

  tags = {
    Environment = var.environment
    Domain      = var.domain
  }

  parameter_group_name = "default.postgres14"
  vpc_id               = module.network.vpc_id

  hosted_zone_id             = data.aws_route53_zone.primary.zone_id
  stage                      = var.stage
  environment                = var.environment
  db_security_group_id       = module.sgs.rds_sg_id
  db_subnet_group_subnet_ids = module.network.public_subnets
  publicly_accessible        = true
}


module "postgrest" {
  source                   = "../../../modules/service"
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  private_subnets          = module.network.private_subnets
  lb_subnets               = module.network.public_subnets
  internal_lb              = false
  docker_image             = "postgrest/postgrest:v9.0.0.20220107"
  container_family         = "postgrest"
  container_port           = 3000
  loadbalancer_port        = 80
  cpu                      = 256
  memory                   = 512
  instance_count           = 1
  timeout                  = 180
  environment              = var.environment
  stage                    = var.stage
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = local.postgrest_env_vars
  domain                   = var.domain
}


module "cartographer-routers-cron" {
  source                  = "../../../modules/cron"
  region                  = var.region
  dd_api_key              = var.dd_api_key
  execution_role_arn      = data.aws_iam_role.ecr_admin_role.arn
  cluster_id              = module.ecs.ecs_cluster_id
  ecs_cluster_arn         = module.ecs.ecs_cluster_arn
  vpc_id                  = module.network.vpc_id
  private_subnets         = module.network.private_subnets
  docker_image            = var.full_image_name_cartographer_routers
  container_family        = "cartographer_routers_cron"
  container_port          = 8080
  cpu                     = 256
  memory                  = 512
  instance_count          = 1
  environment             = var.environment
  stage                   = var.stage
  domain                  = var.domain
  service_security_groups = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  container_env_vars      = concat(local.cartographer_env_vars, [{ name = "DD_SERVICE", value = "cartographer-routers-${var.environment}" }])
  schedule_expression     = "cron(* * * * ? *)"
}


module "cartographer-transfers-cron" {
  source                  = "../../../modules/cron"
  region                  = var.region
  dd_api_key              = var.dd_api_key
  execution_role_arn      = data.aws_iam_role.ecr_admin_role.arn
  cluster_id              = module.ecs.ecs_cluster_id
  ecs_cluster_arn         = module.ecs.ecs_cluster_arn
  vpc_id                  = module.network.vpc_id
  private_subnets         = module.network.private_subnets
  docker_image            = var.full_image_name_cartographer_transfers
  container_family        = "cartographer_transfers_cron"
  container_port          = 8080
  cpu                     = 256
  memory                  = 512
  instance_count          = 1
  environment             = var.environment
  stage                   = var.stage
  domain                  = var.domain
  service_security_groups = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  container_env_vars      = concat(local.cartographer_env_vars, [{ name = "DD_SERVICE", value = "cartographer-transfers-${var.environment}" }])
  schedule_expression     = "cron(* * * * ? *)"
}

module "cartographer-messages-cron" {
  source                  = "../../../modules/cron"
  region                  = var.region
  dd_api_key              = var.dd_api_key
  execution_role_arn      = data.aws_iam_role.ecr_admin_role.arn
  cluster_id              = module.ecs.ecs_cluster_id
  ecs_cluster_arn         = module.ecs.ecs_cluster_arn
  vpc_id                  = module.network.vpc_id
  private_subnets         = module.network.private_subnets
  docker_image            = var.full_image_name_cartographer_messages
  container_family        = "cartographer_messages_cron"
  container_port          = 8080
  cpu                     = 256
  memory                  = 512
  instance_count          = 1
  environment             = var.environment
  stage                   = var.stage
  domain                  = var.domain
  service_security_groups = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  container_env_vars      = concat(local.cartographer_env_vars, [{ name = "DD_SERVICE", value = "cartographer-messages-${var.environment}" }])
  schedule_expression     = "cron(* * * * ? *)"
}

module "network" {
  source      = "../../../modules/networking"
  cidr_block  = var.cidr_block
  environment = var.environment
  stage       = var.stage
  domain      = var.domain
}

module "sgs" {
  source         = "../../../modules/sgs/backend"
  environment    = var.environment
  stage          = var.stage
  domain         = var.domain
  ecs_task_sg_id = module.network.ecs_task_sg
  vpc_cdir_block = module.network.vpc_cdir_block
  vpc_id         = module.network.vpc_id
}

module "ecs" {
  source                  = "../../../modules/ecs"
  stage                   = var.stage
  environment             = var.environment
  domain                  = var.domain
  ecs_cluster_name_prefix = "nxtp-ecs"
  vpc_id                  = module.network.vpc_id
  private_subnets         = module.network.private_subnets
  public_subnets          = module.network.public_subnets
}
