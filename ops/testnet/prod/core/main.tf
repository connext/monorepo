terraform {
  backend "s3" {
    bucket = "nxtp-terraform-testnet-prod-core"
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


module "router_subscriber" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.public_subnets
  internal_lb              = false
  docker_image             = var.full_image_name_router_subscriber
  container_family         = "router-subscriber"
  health_check_path        = "/ping"
  container_port           = 8080
  loadbalancer_port        = 80
  cpu                      = 512
  memory                   = 1024
  instance_count           = 1
  timeout                  = 180
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = local.router_env_vars
}

module "router_publisher" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.public_subnets
  internal_lb              = false
  docker_image             = var.full_image_name_router_publisher
  container_family         = "router-publisher"
  health_check_path        = "/ping"
  container_port           = 8080
  loadbalancer_port        = 80
  cpu                      = 1024
  memory                   = 2048
  instance_count           = 1
  timeout                  = 180
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = local.router_publisher_env_vars
}

module "router_executor" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.public_subnets
  internal_lb              = false
  docker_image             = var.full_image_name_router_executor
  container_family         = "router-executor"
  health_check_path        = "/ping"
  container_port           = 8080
  loadbalancer_port        = 80
  cpu                      = 2048
  memory                   = 4096
  instance_count           = 1
  timeout                  = 180
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = local.router_env_vars
}

module "router_web3signer" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.private_subnets
  docker_image             = "ghcr.io/connext/web3signer:latest"
  container_family         = "router-web3signer"
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
  container_env_vars       = local.router_web3signer_env_vars
}

module "centralised_message_queue" {
  source              = "../../../modules/amq"
  stage               = var.stage
  environment         = var.environment
  sg_id               = module.network.ecs_task_sg
  vpc_id              = module.network.vpc_id
  zone_id             = data.aws_route53_zone.primary.zone_id
  publicly_accessible = true
  subnet_ids          = module.network.public_subnets
  rmq_mgt_user        = var.rmq_mgt_user
  rmq_mgt_password    = var.rmq_mgt_password
}


module "sequencer_server" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.public_subnets
  docker_image             = var.full_image_name_sequencer_server
  container_family         = "sequencer"
  health_check_path        = "/ping"
  container_port           = 8081
  loadbalancer_port        = 80
  cpu                      = 2048
  memory                   = 4096
  instance_count           = 1
  timeout                  = 180
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = local.sequencer_env_vars
}

module "sequencer_publisher" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.public_subnets
  docker_image             = var.full_image_name_sequencer_publisher
  container_family         = "sequencer-publisher"
  health_check_path        = "/ping"
  container_port           = 8082
  loadbalancer_port        = 80
  cpu                      = 2048
  memory                   = 4096
  instance_count           = 1
  timeout                  = 180
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = local.sequencer_env_vars
}

module "sequencer_publisher_auto_scaling" {
  source                     = "../../../modules/auto-scaling"
  stage                      = var.stage
  environment                = var.environment
  domain                     = var.domain
  ecs_service_name           = module.sequencer_publisher.service_name
  ecs_cluster_name           = module.ecs.ecs_cluster_name
  avg_cpu_utilization_target = 40
  avg_mem_utilization_target = 60
  min_capacity               = 1
  max_capacity               = 100
}

module "sequencer_subscriber" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.public_subnets
  internal_lb              = false
  docker_image             = var.full_image_name_sequencer_subscriber
  container_family         = "sequencer-subscriber"
  health_check_path        = "/ping"
  container_port           = 8083
  loadbalancer_port        = 80
  cpu                      = 256
  memory                   = 1024
  instance_count           = 1
  timeout                  = 180
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = local.sequencer_env_vars
}

module "sequencer_subscriber_auto_scaling" {
  source                     = "../../../modules/auto-scaling"
  stage                      = var.stage
  environment                = var.environment
  domain                     = var.domain
  ecs_service_name           = module.sequencer_subscriber.service_name
  ecs_cluster_name           = module.ecs.ecs_cluster_name
  avg_cpu_utilization_target = 10
  avg_mem_utilization_target = 60
  min_capacity               = 2
  max_capacity               = 100
}


module "sequencer_web3signer" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.private_subnets
  docker_image             = "ghcr.io/connext/web3signer:latest"
  container_family         = "sequencer-web3signer"
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
  container_env_vars       = local.sequencer_web3signer_env_vars
}

module "lighthouse_prover_cron" {
  source              = "../../../modules/lambda"
  ecr_repository_name = "nxtp-lighthouse"
  docker_image_tag    = var.lighthouse_image_tag
  container_family    = "lighthouse-prover"
  environment         = var.environment
  stage               = var.stage
  container_env_vars = merge(local.lighthouse_env_vars, {
    LIGHTHOUSE_SERVICE = "prover-pub"
  })
  schedule_expression    = "rate(5 minutes)"
  timeout                = 300
  memory_size            = 10240
  lambda_in_vpc          = true
  subnet_ids             = module.network.private_subnets
  lambda_security_groups = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
}

module "lighthouse_prover_subscriber" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.public_subnets
  internal_lb              = false
  docker_image             = var.full_image_name_lighthouse_prover_subscriber
  container_family         = "lighthouse-prover-subscriber"
  health_check_path        = "/ping"
  container_port           = 7072
  loadbalancer_port        = 80
  cpu                      = 4096
  memory                   = 8192
  instance_count           = 2
  timeout                  = 290
  ingress_cdir_blocks      = ["0.0.0.0/0"]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = concat(local.lighthouse_prover_subscriber_env_vars, [{ name = "LIGHTHOUSE_SERVICE", value = "prover-sub" }])
}
module "lighthouse_prover_subscriber_auto_scaling" {
  source                     = "../../../modules/auto-scaling"
  stage                      = var.stage
  environment                = var.environment
  domain                     = var.domain
  ecs_service_name           = module.lighthouse_prover_subscriber.service_name
  ecs_cluster_name           = module.ecs.ecs_cluster_name
  min_capacity               = 2
  max_capacity               = 200
  avg_cpu_utilization_target = 20
  avg_mem_utilization_target = 40
}

module "lighthouse_process_from_root_cron" {
  source              = "../../../modules/lambda"
  ecr_repository_name = "nxtp-lighthouse"
  docker_image_tag    = var.lighthouse_image_tag
  container_family    = "lighthouse-process-from-root"
  environment         = var.environment
  stage               = var.stage
  container_env_vars  = merge(local.lighthouse_env_vars, { LIGHTHOUSE_SERVICE = "process" })
  schedule_expression = "rate(5 minutes)"
  memory_size         = 1536
}


module "lighthouse_propagate_cron" {
  source              = "../../../modules/lambda"
  ecr_repository_name = "nxtp-lighthouse"
  docker_image_tag    = var.lighthouse_image_tag
  container_family    = "lighthouse-propagate"
  environment         = var.environment
  stage               = var.stage
  container_env_vars  = merge(local.lighthouse_env_vars, { LIGHTHOUSE_SERVICE = "propagate" })
  memory_size         = 2048
  schedule_expression = "rate(30 minutes)"
}

module "lighthouse_sendoutboundroot_cron" {
  source              = "../../../modules/lambda"
  ecr_repository_name = "nxtp-lighthouse"
  docker_image_tag    = var.lighthouse_image_tag
  container_family    = "lighthouse-sendoutboundroot"
  environment         = var.environment
  stage               = var.stage
  container_env_vars  = merge(local.lighthouse_env_vars, { LIGHTHOUSE_SERVICE = "sendoutboundroot" })
  schedule_expression = "rate(30 minutes)"
  memory_size         = 2048
}

module "lighthouse_web3signer" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.private_subnets
  docker_image             = "ghcr.io/connext/web3signer:latest"
  container_family         = "lighthouse-web3signer"
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
  container_env_vars       = local.lighthouse_web3signer_env_vars
}

module "lighthouse_propose_cron" {
  source                 = "../../../modules/lambda"
  ecr_repository_name    = "nxtp-lighthouse"
  docker_image_tag       = var.lighthouse_image_tag
  container_family       = "lighthouse-propose"
  environment            = var.environment
  stage                  = var.stage
  container_env_vars     = merge(local.lighthouse_env_vars, { LIGHTHOUSE_SERVICE = "propose" })
  schedule_expression    = "rate(15 minutes)"
  memory_size            = 4096
  timeout                = 900
  lambda_in_vpc          = true
  subnet_ids             = module.network.private_subnets
  lambda_security_groups = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
}

module "relayer" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.public_subnets
  docker_image             = var.full_image_name_relayer
  container_family         = "relayer"
  health_check_path        = "/ping"
  container_port           = 8080
  loadbalancer_port        = 80
  cpu                      = 8192
  memory                   = 16384
  instance_count           = 1
  timeout                  = 180
  internal_lb              = false
  ingress_cdir_blocks      = [module.network.vpc_cdir_block]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = concat(local.relayer_env_vars, [{ name = "RELAYER_SERVICE", value = "poller" }])
}

module "relayer_server" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.public_subnets
  docker_image             = var.full_image_name_relayer
  container_family         = "relayer-server"
  health_check_path        = "/ping"
  container_port           = 8080
  loadbalancer_port        = 80
  cpu                      = 1024
  memory                   = 4096
  instance_count           = 1
  timeout                  = 180
  internal_lb              = false
  ingress_cdir_blocks      = [module.network.vpc_cdir_block]
  ingress_ipv6_cdir_blocks = []
  service_security_groups  = flatten([module.network.allow_all_sg, module.network.ecs_task_sg])
  cert_arn                 = var.certificate_arn_testnet
  container_env_vars       = concat(local.relayer_env_vars, [{ name = "RELAYER_SERVICE", value = "server" }])
}

module "relayer_web3signer" {
  source                   = "../../../modules/service"
  stage                    = var.stage
  environment              = var.environment
  domain                   = var.domain
  region                   = var.region
  dd_api_key               = var.dd_api_key
  zone_id                  = data.aws_route53_zone.primary.zone_id
  execution_role_arn       = data.aws_iam_role.ecr_admin_role.arn
  cluster_id               = module.ecs.ecs_cluster_id
  vpc_id                   = module.network.vpc_id
  lb_subnets               = module.network.private_subnets
  docker_image             = "ghcr.io/connext/web3signer:latest"
  container_family         = "relayer-web3signer"
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
  container_env_vars       = local.relayer_web3signer_env_vars
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
}

module "sequencer_cache" {
  source                        = "../../../modules/redis"
  stage                         = var.stage
  environment                   = var.environment
  family                        = "sequencer"
  sg_id                         = module.network.ecs_task_sg
  vpc_id                        = module.network.vpc_id
  cache_subnet_group_subnet_ids = module.network.public_subnets
  node_type                     = "cache.r4.large"
  public_redis                  = true
}

module "router_cache" {
  source                        = "../../../modules/redis"
  stage                         = var.stage
  environment                   = var.environment
  family                        = "router"
  sg_id                         = module.network.ecs_task_sg
  vpc_id                        = module.network.vpc_id
  cache_subnet_group_subnet_ids = module.network.public_subnets
  node_type                     = "cache.t2.medium"
  public_redis                  = true
}

module "relayer_cache" {
  source                        = "../../../modules/redis"
  stage                         = var.stage
  environment                   = var.environment
  family                        = "relayer"
  sg_id                         = module.network.ecs_task_sg
  vpc_id                        = module.network.vpc_id
  cache_subnet_group_subnet_ids = module.network.public_subnets
  node_type                     = "cache.r4.large"
  public_redis                  = true
}

module "lighthouse_cache" {
  source                        = "../../../modules/redis"
  stage                         = var.stage
  environment                   = var.environment
  family                        = "lighthouse"
  sg_id                         = module.network.ecs_task_sg
  vpc_id                        = module.network.vpc_id
  cache_subnet_group_subnet_ids = module.network.public_subnets
  node_type                     = "cache.r4.large"
}

module "ecr-lcp" {
  source           = "../../../modules/ecr-lcp"
  repository_names = ["nxtp-cartographer", "nxtp-lighthouse", "postgrest"]
}
