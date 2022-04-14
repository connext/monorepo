terraform {
  backend "s3" {
    bucket = "nxtp-terraform-infra"
    key    = "state/"
    region = "us-east-1"
  }
}


provider "aws" {
  region = var.region
}

module "iam" {
  source = "../modules/iam"
}

module "kms" {
  source = "../modules/kms"
}
