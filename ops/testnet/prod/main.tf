terraform {
  backend "s3" {
    bucket = "nxtp-terraform-testnet-prod"
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


module "router" {
  source                   = "../../modules/service"
  region                   = var.region
  zone_id                  = data.aws_route53_zone.primary.zone_id
  ecs_cluster_sg           = module.network.ecs_task_sg
  allow_all_sg             = module.network.allow_all_sg
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  private_subnets          = module.network.private_subnets
  lb_subnets               = module.network.public_subnets
  internal_lb              = false
  docker_image             = var.full_image_name_router
  container_family         = "router"
  health_check_path        = "/ping"
  container_port           = 8080
  loadbalancer_port        = 80
  cpu                      = 256
  memory                   = 512
  instance_count           = 1
  timeout                  = 180
  environment              = var.environment
  mnemonic                 = var.mnemonic
  service_config_value     = local.local_router_config
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  service_config_name      = "NXTP_CONFIG"
  stage                    = var.stage
}

module "router_logdna_lambda_exporter" {
  source          = "../../modules/lambda"
  environment     = var.environment
  log_group_name  = module.router.log_group_name
  logdna_key      = var.logdna_key
  private_subnets = module.network.private_subnets
  public_subnets  = module.network.public_subnets
  service         = "router"
  stage           = var.stage
  vpc_id          = module.network.vpc_id
  log_group_arn   = module.router.log_group_arn
}

module "sequencer" {
  source                   = "../../modules/service"
  region                   = var.region
  zone_id                  = data.aws_route53_zone.primary.zone_id
  ecs_cluster_sg           = module.network.ecs_task_sg
  allow_all_sg             = module.network.allow_all_sg
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  private_subnets          = module.network.private_subnets
  lb_subnets               = module.network.public_subnets
  docker_image             = var.full_image_name_sequencer
  container_family         = "sequencer"
  health_check_path        = "/ping"
  container_port           = 8081
  loadbalancer_port        = 80
  cpu                      = 256
  memory                   = 512
  instance_count           = 1
  timeout                  = 180
  environment              = var.environment
  mnemonic                 = var.mnemonic
  service_config_value     = local.local_sequencer_config
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  service_config_name      = "SEQ_CONFIG"
  stage                    = var.stage
}

module "sequencer_logdna_lambda_exporter" {
  source          = "../../modules/lambda"
  environment     = var.environment
  log_group_name  = module.sequencer.log_group_name
  logdna_key      = var.logdna_key
  private_subnets = module.network.private_subnets
  public_subnets  = module.network.public_subnets
  service         = "sequencer"
  stage           = var.stage
  vpc_id          = module.network.vpc_id
  log_group_arn   = module.sequencer.log_group_arn
}

module "network" {
  source      = "../../modules/networking"
  cidr_block  = var.cidr_block
  environment = var.environment
  stage       = var.stage
}

module "ecs" {
  source           = "../../modules/ecs"
  stage                   = var.stage
  environment             = var.environment
  ecs_cluster_name_prefix = "nxtp-ecs"
  vpc_id           = module.network.vpc_id
  private_subnets  = module.network.private_subnets
  public_subnets   = module.network.public_subnets
}

module "sequencer_cache" {
  source            = "../../modules/redis"
  family            = "sequencer"
  stage             = var.stage
  environment       = var.environment
  sg_id             = module.network.ecs_task_sg
  subnet_group_name = module.network.redis_subnet_group
  vpc_id            = module.network.vpc_id
}

module "router_cache" {
  source            = "../../modules/redis"
  family            = "router"
  stage             = var.stage
  environment       = var.environment
  sg_id             = module.network.ecs_task_sg
  subnet_group_name = module.network.redis_subnet_group
  vpc_id            = module.network.vpc_id
}
