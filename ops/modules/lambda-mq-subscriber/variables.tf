
variable "docker_image_tag" {
  description = "Docker image tag"
  type        = string
  default     = "latest"
}
variable "ecr_repository_name" {
  description = "ECR repository name"
  type        = string
}


variable "container_family" {
  description = "Container family"
  type        = string
}

variable "container_env_vars" {
  description = "env vars for running container"
  sensitive   = true
}

variable "timeout" {
  description = "timeout for lambda"
  default     = 500
}

variable "memory_size" {
  description = "memory size for lambda"
  default     = 10240
}


variable "stage" {
  description = "stage of deployment"
}

variable "environment" {}

variable "rmq_mgt_password" {
  type        = string
  description = "RabbitMQ management password"
  sensitive   = true
}

variable "rmq_mgt_user" {
  type        = string
  default     = "connext"
  description = "RabbitMQ management user"
}

variable "host_instance_type" {
  type        = string
  description = "The broker's instance type. e.g. mq.t2.micro or mq.m4.large"
  default     = "mq.m5.large"
}

variable "publicly_accessible" {
  type        = bool
  description = "Whether to enable connections from applications outside of the VPC that hosts the broker's subnets"
  default     = false
}

variable "vpc_id" {
  type        = string
  description = "The ID of the VPC to create the broker in"
}

variable "zone_id" {
  description = "hosted zone id"
}

variable "base_domain" {
  description = "base domain of the application"
  default     = "connext.ninja"
}

variable "subnet_ids" {
  type        = list(string)
  description = "List of VPC subnet IDs"
}

variable "sg_id" {
  type        = string
  description = "security group id of worker node sg"
}

variable "deployment_mode" {
  type        = string
  description = "Deployment mode of cluster"
  default     = "CLUSTER_MULTI_AZ"
}

variable "aws_mq_amqp_endpoint" {
  type        = string
  description = "The AMQP endpoint of the broker"
}

variable "aws_mq_broker_arn" {
  type        = string
  description = "The ARN of the broker"
}
