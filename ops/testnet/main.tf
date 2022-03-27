terraform {
  backend "s3" {
    bucket = "nxtp-terraform"
    key    = "state/"
    region = "us-east-1"
  }
}

provider "aws" {
  region  = var.region
}


# Fetch AZs in the current region
data "aws_availability_zones" "available" {}

data "aws_iam_role" "ecr_admin_role" {
  name = "erc_admin_role"
}

module "router" {
  source             = "../modules/router"
  ecs_cluster_sg     = module.network.ecs_task_sg
  allow_all_sg       = module.network.allow_all_sg
  execution_role_arn = data.aws_iam_role.ecr_admin_role.arn
  cluster_id         = module.ecs.ecs_cluster_id
  vpc_id             = module.network.vpc_id
  private_subnets    = module.network.private_subnets
  public_subnets     = []
  docker_image       = var.full_image_name_router
  container_family   = "server"
  health_check_path  = "/healthz"
  container_port     = 8080
  loadbalancer_port  = 8080
  cpu                = 512
  memory             = 1024
  instance_count     = 1
  timeout            = 180
  redis_uri          = module.router_cache.redis_instance_address
  environment        = "testnet"
  mnemonic           = var.mnemonic
  admin_token        = var.admin_token_router
  sequencer_url      = module.sequencer.dns_name
}


module "sequencer" {
  source             = "../modules/sequencer"
  ecs_cluster_sg     = module.network.ecs_task_sg
  allow_all_sg       = module.network.allow_all_sg
  execution_role_arn = data.aws_iam_role.ecr_admin_role.arn
  cluster_id         = module.ecs.ecs_cluster_id
  vpc_id             = module.network.vpc_id
  private_subnets    = module.network.private_subnets
  public_subnets     = module.network.public_subnets
  docker_image       = var.full_image_name_sequencer
  container_family   = "sequencer"
  health_check_path  = "/healthz"
  container_port     = 8080
  loadbalancer_port  = 8080
  cpu                = 512
  memory             = 1024
  instance_count     = 1
  timeout            = 180
  redis_uri          = module.sequencer_cache.redis_instance_address
  environment        = "testnet"
  mnemonic           = var.mnemonic
}


module "network" {
  source      = "../modules/networking"
  cidr_block  = var.cidr_block
  environment = "dev"
}

module "ecs" {
  source           = "../modules/ecs"
  ecs_cluster_name = "nxtp-ecs"
  vpc_id           = module.network.vpc_id
  private_subnets  = module.network.private_subnets
  public_subnets   = module.network.public_subnets
}

module "sequencer_cache" {
  environment       = "testnet"
  family            = "sequencer"
  source            = "../modules/redis"
  sg_id             = module.network.ecs_task_sg
  subnet_group_name = module.network.redis_subnet_group
  vpc_id            = module.network.vpc_id
}

module "router_cache" {
  environment       = "testnet"
  family            = "router"
  source            = "../modules/redis"
  sg_id             = module.network.ecs_task_sg
  subnet_group_name = module.network.redis_subnet_group
  vpc_id            = module.network.vpc_id
}
