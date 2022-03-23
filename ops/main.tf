terraform {
  backend "s3" {
    bucket = "nxtp-terraform"
    key    = "state/"
    region = "us-east-1"
  }
}

variable "full_image_name_router" {
  type        = string
  description = "router image name"
  default     = "ghcr.io/connext/router:sha-011c975"
}

variable "full_image_name_sequencer" {
  type        = string
  description = "sequencer image name"
  default     = "ghcr.io/connext/sequencer:sha-011c975"
}

variable "mnemonic_testnet" {
  type = string
  description = "mnemonic"
}

variable "admin_token_router_testnet" {
  type = string
  description = "admin token"
}

locals {
  local_router_config = jsonencode({
    "logLevel"     = "debug"
    "sequencerUrl" = "http://3.225.28.122:8081"
    "redisUrl" = "redis://clustercfg.router-testnet.njrwqg.memorydb.us-east-1.amazonaws.com:6379"
    "server" = {
      "adminToken" = var.admin_token_router_testnet
    }
    "chains" = {
      "2000" = {
        "providers" = ["https://rinkeby.infura.io/v3/38f8f85747014e87b48035d84398a97c"]
        "subgraph" = {
          "runtime" = ["https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-rinkeby"]
          "analytics" : [""]
        }
        "deployments" = {
          "transactionManager" : "0xd6d9d8E6304C460b40022e467d8A8748962Eb0B0"
        }
        "assets" = [
          {
            "name"    = "TEST"
            "address" = "0x80dA4efc379E9ab45D2032F9EDf4D4aBc4EF2f9d"
          }
        ]
      }
      "3000" = {
        "providers" = ["https://kovan.infura.io/v3/38f8f85747014e87b48035d84398a97c"]
        "subgraph" = {
          "runtime"   = ["https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-kovan"]
          "analytics" = [""]
        }
        "deployments" = {
          "transactionManager" = "0x9F929643db56eaf747131CB4FA1126612b30Eb7F"
        }
        "assets" = [
          {
            "name"    = "TEST"
            "address" = "0xe71678794fff8846bFF855f716b0Ce9d9a78E844"
          }
        ]
      }
    }
    "mnemonic" = var.mnemonic_testnet
  })
  local_sequencer_config = jsonencode({ 
    "logLevel" = "debug" 
    "redisUrl" = "redis://clustercfg.amarok-sequencer-testnet.njrwqg.memorydb.us-east-1.amazonaws.com:6379"
    "chains" = { 
      "2000" = { 
        "providers" = ["https://rinkeby.infura.io/v3/19b854cad0bc4089bffd0c93f23ece9f"] 
        "subgraph" = { 
          "runtime" = ["https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-rinkeby"] 
          "analytics" = [""] 
        } 
        "deployments" = { 
          "transactionManager" = "0xd6d9d8E6304C460b40022e467d8A8748962Eb0B0" 
        } 
        "assets" = [{ 
          "name" = "TEST" 
          "address" = "0xf4CF3FcC8dC7E5171Bb08bef75EDe3fEf00F46E6" 
        }] 
      } 
      "3000" = { 
        "providers" = ["https://kovan.infura.io/v3/19b854cad0bc4089bffd0c93f23ece9f"] 
        "subgraph" = { 
          "runtime" = ["https://api.thegraph.com/subgraphs/name/connext/nxtp-amarok-runtime-v0-kovan"] 
          "analytics" : [""] 
        } 
        "deployments" = { 
          "transactionManager" = "0x9F929643db56eaf747131CB4FA1126612b30Eb7F" 
        } 
        "assets" = [{ 
          "name" = "TEST" 
          "address" = "0xe71678794fff8846bFF855f716b0Ce9d9a78E844" 
        }] 
      } 
    } 
  })
}

data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-ebs"]
  }
}

provider "aws" {
  region = "us-east-1"
}


resource "aws_vpc" "test-env" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "MARS"
  }
}

resource "aws_subnet" "subnet-uno" {
  cidr_block        = cidrsubnet(aws_vpc.test-env.cidr_block, 3, 1)
  vpc_id            = aws_vpc.test-env.id
  availability_zone = "us-east-1a"
}

resource "aws_security_group" "ingress-all-test" {
  name   = "allow-all-sg"
  vpc_id = aws_vpc.test-env.id
  ingress {
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
  }
  // Terraform removes the default rule
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "terraformed-router" {
  ami             = data.aws_ami.amazon_linux_2.id
  instance_type   = "t3.large"
  key_name        = "Terraform"
  security_groups = ["${aws_security_group.ingress-all-test.id}"]
  subnet_id       = aws_subnet.subnet-uno.id
  tags = {
    Name = "Router"
  }

  user_data = <<EOF
  #!/bin/bash -xe
    set -ex
    sudo touch /root/touch.txt
    sudo echo "RUNNING INITIAL SCRIPT" >> /root/touch.txt
    sudo echo "${var.full_image_name_router}" >> /root/touch.txt
    sudo echo "${local.local_router_config}" >> /root/touch.txt
    sudo yum update -y
    sudo yum install amazon-linux-extras docker git -y
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    sudo curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo docker pull "${var.full_image_name_router}"
    sudo docker run -e NXTP_CONFIG='${local.local_router_config}' -d "${var.full_image_name_router}" >> /root/dockerout
  EOF

}

resource "aws_instance" "terraformed-sequencer" {
  ami             = data.aws_ami.amazon_linux_2.id
  instance_type   = "t3.large"
  key_name        = "Terraform"
  security_groups = ["${aws_security_group.ingress-all-test.id}"]
  subnet_id       = aws_subnet.subnet-uno.id
  tags = {
    Name = "Sequencer"
  }

  user_data = <<EOF
  #!/bin/bash -xe
    set -ex
    sudo touch /root/touch.txt
    sudo echo "RUNNING INITIAL SCRIPT" >> /root/touch.txt
    sudo echo "${var.full_image_name_sequencer}" >> /root/touch.txt
    sudo echo "${local.local_sequencer_config}" >> /root/touch.txt
    sudo yum update -y
    sudo yum install amazon-linux-extras docker git -y
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    sudo curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo docker pull "${var.full_image_name_sequencer}"
    sudo docker run -e NXTP_CONFIG='${local.local_sequencer_config}' -d "${var.full_image_name_sequencer}" >> /root/dockerout
  EOF

}

resource "aws_eip" "ip-test-env-router" {
  instance = aws_instance.terraformed-router.id
  vpc      = true
}

resource "aws_eip" "ip-test-env-sequencer" {
  instance = aws_instance.terraformed-sequencer.id
  vpc      = true
}

resource "aws_internet_gateway" "test-env-gw" {
  vpc_id = aws_vpc.test-env.id
  tags = {
    Name = "test-env-gw"
  }
}

resource "aws_route_table" "route-table-test-env" {
  vpc_id = aws_vpc.test-env.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.test-env-gw.id
  }
  tags = {
    Name = "test-env-route-table"
  }
}

resource "aws_route_table_association" "subnet-association" {
  subnet_id      = aws_subnet.subnet-uno.id
  route_table_id = aws_route_table.route-table-test-env.id
}
