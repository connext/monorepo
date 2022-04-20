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

module "aws_secrets" {
  source                  = "../../modules/sm"
  environment             = var.environment
  stage                   = var.stage
  web3_signer_private_key = var.web3_signer_private_key
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
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  stage                    = var.stage
  container_env_vars       = local.router_env_vars
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
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  stage                    = var.stage
  container_env_vars       = local.sequencer_env_vars
}

module "web3signer" {
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
  docker_image             = "ghcr.io/connext/web3signer:latest"
  container_family         = "web3signer"
  health_check_path        = "/upcheck"
  container_port           = 9000
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
  container_env_vars       = local.web3signer_env_vars
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
