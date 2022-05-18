terraform {
  backend "s3" {
    bucket = "nxtp-terraform-testnet-staging-core"
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
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
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
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = local.router_env_vars
}

module "router_logdna_lambda_exporter" {
  source               = "../../../modules/lambda"
  stage                = var.stage
  environment          = var.environment
  domain               = var.domain
  region               = var.region
  log_group_name       = module.router.log_group_name
  logdna_key           = var.logdna_key
  private_subnets      = module.network.private_subnets
  public_subnets       = module.network.public_subnets
  service              = "router"
  vpc_id               = module.network.vpc_id
  log_group_arn        = module.router.log_group_arn
  aws_lambda_s3_bucket = "aws-lamba-logdna-cloudwatch-staging"
}


module "sequencer" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
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
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = local.sequencer_env_vars
}

module "sequencer_logdna_lambda_exporter" {
  source               = "../../../modules/lambda"
  stage                = var.stage
  environment          = var.environment
  domain               = var.domain
  region               = var.region
  log_group_name       = module.sequencer.log_group_name
  logdna_key           = var.logdna_key
  private_subnets      = module.network.private_subnets
  public_subnets       = module.network.public_subnets
  service              = "sequencer"
  vpc_id               = module.network.vpc_id
  log_group_arn        = module.sequencer.log_group_arn
  aws_lambda_s3_bucket = "aws-lamba-logdna-cloudwatch-staging"
}

module "web3signer" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
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
  internal_lb              = true
  ingress_cdir_blocks      = [module.network.vpc_cdir_block]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = local.web3signer_env_vars

}

module "lighthouse" {
  source                   = "../../../modules/service"
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
  docker_image             = var.full_image_name_lighthouse
  container_family         = "lighthouse"
  container_port           = 8080
  loadbalancer_port        = 80
  cpu                      = 256
  memory                   = 512
  instance_count           = 1
  timeout                  = 180
  environment              = var.environment
  stage                    = var.stage
  domain                   = var.domain
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = local.lighthouse_env_vars
}

module "lighthouse_logdna_lambda_exporter" {
  source               = "../../../modules/lambda"
  stage                = var.stage
  environment          = var.environment
  domain               = var.domain
  region               = var.region
  log_group_name       = module.sequencer.log_group_name
  logdna_key           = var.logdna_key
  private_subnets      = module.network.private_subnets
  public_subnets       = module.network.public_subnets
  service              = "lighthouse"
  vpc_id               = module.network.vpc_id
  log_group_arn        = module.sequencer.log_group_arn
  aws_lambda_s3_bucket = "aws-lamba-logdna-cloudwatch-staging"
}


module "network" {
  source      = "../../../modules/networking"
  stage       = var.stage
  environment = var.environment
  domain      = var.domain
  cidr_block  = var.cidr_block
}

module "sgs" {
  source         = "../../../modules/sgs/core"
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

module "sequencer_cache" {
  source                        = "../../../modules/redis"
  stage                         = var.stage
  environment                   = var.environment
  family                        = "sequencer"
  sg_id                         = module.network.ecs_task_sg
  vpc_id                        = module.network.vpc_id
  cache_subnet_group_subnet_ids = module.network.public_subnets
}

module "router_cache" {
  source                        = "../../../modules/redis"
  stage                         = var.stage
  environment                   = var.environment
  family                        = "router"
  sg_id                         = module.network.ecs_task_sg
  vpc_id                        = module.network.vpc_id
  cache_subnet_group_subnet_ids = module.network.public_subnets
}
