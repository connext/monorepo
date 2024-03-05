terraform {
  backend "s3" {
    bucket = "nxtp-terraform-mainnet-prod-backend"
    key    = "state"
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
locals {
  db_alarm_emails = ["carlo@proximalabs.io", "wang@proximalabs.io", "preetham@proximalabs.io"]
}

module "cartographer_db" {
  domain                = "cartographer"
  source                = "../../../modules/db"
  identifier            = "rds-postgres-cartographer-${var.environment}"
  instance_class        = "db.t4g.xlarge"
  allocated_storage     = 250
  max_allocated_storage = 1000


  name     = "connext" // db name
  username = var.postgres_user
  password = var.postgres_password
  port     = "5432"

  maintenance_window = "Mon:00:00-Mon:03:00"

  tags = {
    Environment = var.environment
    Domain      = var.domain
  }

  vpc_id = module.network.vpc_id

  hosted_zone_id             = data.aws_route53_zone.primary.zone_id
  stage                      = var.stage
  environment                = var.environment
  db_security_group_id       = module.sgs.rds_sg_id
  db_subnet_group_subnet_ids = module.network.public_subnets
  publicly_accessible        = true
}
module "cartographer-db-alarms" {
  source                                  = "../../../modules/db-alarms"
  db_instance_name                        = module.cartographer_db.db_instance_name
  db_instance_id                          = module.cartographer_db.db_instance_id
  is_replica                              = false
  enable_cpu_utilization_alarm            = true
  enable_free_storage_space_too_low_alarm = true
  stage                                   = var.stage
  environment                             = var.environment
  sns_topic_subscription_emails           = local.db_alarm_emails
}

module "cartographer_db_replica" {
  domain              = "cartographer"
  source              = "../../../modules/db-replica"
  replicate_source_db = module.cartographer_db.db_instance_identifier
  depends_on          = [module.cartographer_db]
  replica_identifier  = "rds-postgres-cartographer-replica-${var.environment}"
  instance_class      = "db.t4g.2xlarge"
  allocated_storage   = 150

  name     = module.cartographer_db.db_instance_name
  username = module.cartographer_db.db_instance_username
  password = module.cartographer_db.db_instance_password
  port     = module.cartographer_db.db_instance_port

  engine_version = module.cartographer_db.db_instance_engine_version

  maintenance_window      = module.cartographer_db.db_maintenance_window
  backup_retention_period = module.cartographer_db.db_backup_retention_period
  backup_window           = module.cartographer_db.db_backup_window

  tags = {
    Environment = var.environment
    Domain      = var.domain
  }

  parameter_group_name = "default.postgres14"

  hosted_zone_id        = data.aws_route53_zone.primary.zone_id
  stage                 = var.stage
  environment           = var.environment
  db_security_group_ids = module.cartographer_db.db_instance_vpc_security_group_ids
  db_subnet_group_name  = module.cartographer_db.db_subnet_group_name
  publicly_accessible   = module.cartographer_db.db_publicly_accessible
}

module "cartographer-db-replica-alarms" {
  source                                  = "../../../modules/db-alarms"
  db_instance_name                        = module.cartographer_db.db_instance_name
  db_instance_id                          = module.cartographer_db.db_instance_id
  is_replica                              = true
  enable_cpu_utilization_alarm            = true
  enable_free_storage_space_too_low_alarm = true
  stage                                   = var.stage
  environment                             = var.environment
  sns_topic_subscription_emails           = local.db_alarm_emails
}
module "postgrest" {
  source                   = "../../../modules/service"
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.public_subnets
  internal_lb              = false
  docker_image             = "postgrest/postgrest:v10.0.0.20221011"
  container_family         = "postgrest"
  container_port           = 3000
  loadbalancer_port        = 80
  cpu                      = 1024
  memory                   = 2048
  instance_count           = 2
  timeout                  = 180
  environment              = var.environment
  stage                    = var.stage
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn
  container_env_vars       = local.postgrest_env_vars
  domain                   = var.domain
}

module "sdk-server" {
  source                   = "../../../modules/service"
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.public_subnets
  internal_lb              = false
  docker_image             = var.full_image_name_sdk_server
  container_family         = "sdk-server"
  health_check_path        = "/ping"
  container_port           = 8080
  loadbalancer_port        = 80
  cpu                      = 512
  memory                   = 1024
  instance_count           = 10
  timeout                  = 180
  environment              = var.environment
  stage                    = var.stage
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn
  container_env_vars       = local.sdk_server_env_vars
  domain                   = var.domain
}

module "sdk_server_cache" {
  source                        = "../../../modules/redis"
  stage                         = var.stage
  environment                   = var.environment
  family                        = "sdk-server"
  sg_id                         = module.network.ecs_task_sg
  vpc_id                        = module.network.vpc_id
  cache_subnet_group_subnet_ids = module.network.public_subnets
}

module "sdk_server_auto_scaling" {
  source                     = "../../../modules/auto-scaling"
  stage                      = var.stage
  environment                = var.environment
  domain                     = var.domain
  ecs_service_name           = module.sdk-server.service_name
  ecs_cluster_name           = module.ecs.ecs_cluster_name
  avg_cpu_utilization_target = 40
  avg_mem_utilization_target = 60
  min_capacity               = 10
  max_capacity               = 50
}


module "cartographer-routers-lambda-cron" {
  source              = "../../../modules/lambda"
  ecr_repository_name = "nxtp-cartographer"
  docker_image_tag    = var.cartographer_image_tag
  container_family    = "cartographer-routers"
  environment         = var.environment
  stage               = var.stage
  container_env_vars  = merge(local.cartographer_env_vars, { CARTOGRAPHER_SERVICE = "routers" })
  schedule_expression = "rate(1 minute)"
  memory_size         = 1024
}

module "cartographer-transfers-lambda-cron" {
  source              = "../../../modules/lambda"
  ecr_repository_name = "nxtp-cartographer"
  docker_image_tag    = var.cartographer_image_tag
  container_family    = "cartographer-transfers"
  environment         = var.environment
  stage               = var.stage
  container_env_vars  = merge(local.cartographer_env_vars, { CARTOGRAPHER_SERVICE = "transfers" })
  schedule_expression = "rate(1 minute)"
  memory_size         = 2048
}

module "cartographer-messages-lambda-cron" {
  source              = "../../../modules/lambda"
  ecr_repository_name = "nxtp-cartographer"
  docker_image_tag    = var.cartographer_image_tag
  container_family    = "cartographer-messages"
  environment         = var.environment
  stage               = var.stage
  container_env_vars  = merge(local.cartographer_env_vars, { CARTOGRAPHER_SERVICE = "messages" })
  schedule_expression = "rate(1 minute)"
  memory_size         = 1024
}

module "cartographer-roots-lambda-cron" {
  source              = "../../../modules/lambda"
  ecr_repository_name = "nxtp-cartographer"
  docker_image_tag    = var.cartographer_image_tag
  container_family    = "cartographer-roots"
  environment         = var.environment
  stage               = var.stage
  container_env_vars  = merge(local.cartographer_env_vars, { CARTOGRAPHER_SERVICE = "roots" })
  schedule_expression = "rate(1 minute)"
  memory_size         = 1024
}

module "cartographer-stableswap-lambda-cron" {
  source              = "../../../modules/lambda"
  ecr_repository_name = "nxtp-cartographer"
  docker_image_tag    = var.cartographer_image_tag
  container_family    = "cartographer-stableswap"
  environment         = var.environment
  stage               = var.stage
  container_env_vars  = merge(local.cartographer_env_vars, { CARTOGRAPHER_SERVICE = "stableswap" })
  schedule_expression = "rate(1 minute)"
  memory_size         = 1024
}

module "cartographer-messagestatus-lambda-cron" {
  source              = "../../../modules/lambda"
  ecr_repository_name = "nxtp-cartographer"
  docker_image_tag    = var.cartographer_image_tag
  container_family    = "cartographer-messagestatus"
  environment         = var.environment
  stage               = var.stage
  container_env_vars  = merge(local.cartographer_env_vars, { CARTOGRAPHER_SERVICE = "messagestatus" })
  schedule_expression = "rate(1 minute)"
  memory_size         = 1024
}

module "cartographer-prices-lambda-cron" {
  source              = "../../../modules/lambda"
  ecr_repository_name = "nxtp-cartographer"
  docker_image_tag    = var.cartographer_image_tag
  container_family    = "cartographer-prices"
  environment         = var.environment
  stage               = var.stage
  container_env_vars  = merge(local.cartographer_env_vars, { CARTOGRAPHER_SERVICE = "prices" })
  schedule_expression = "rate(15 minutes)"
  memory_size         = 1024
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
}
