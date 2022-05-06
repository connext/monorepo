variable "private_subnets" {
  type = list(string)
}

variable "public_subnets" {
  type = list(string)
}

variable "aws_lambda_s3_bucket" {
  description = "bucket where the lambda function resides"
}

variable "vpc_id" {}

variable "region" {
  description = "region in which to run the resource"
}

variable "stage" {
  description = "stage of deployment"
}

variable "environment" {
  description = "env we're deploying to"
}

variable "logdna_key" {
  description = "logdna key"
}

variable "service" {
  description = "service name for which to export logs"
}

variable "log_group_name" {
  description = "log group name"
}

variable "log_group_arn" {
  description = "log group arn"
}

variable "domain" {
  description = "domain of deployment"
}
