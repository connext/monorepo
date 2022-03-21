terraform {
  backend "s3" {
    bucket = "nxtp-terraform"
    key    = "state/"
    region = "us-east-1"
  }
}

variable "AWS_SECRET" {
  type = string
  description = "secret aws key"
}

variable "AWS_KEY" {
  type = string
  description = "aws key"
}
variable "full_image_name_router" {
  type = string
  description = "router image name"
  default = "connext/router"
}

variable "full_image_name_sequencer" {
  type = string
  description = "sequencer image name"
  default = "connext/sequencer"
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
  access_key = var.AWS_KEY
  secret_key = var.AWS_SECRET
}


resource "aws_vpc" "test-env" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support = true
  tags = {
    Name = "MARS"
  }
}

resource "aws_subnet" "subnet-uno" {
  cidr_block = "${cidrsubnet(aws_vpc.test-env.cidr_block, 3, 1)}"
  vpc_id = "${aws_vpc.test-env.id}"
  availability_zone = "us-east-1a"
}

resource "aws_security_group" "ingress-all-test" {
name = "allow-all-sg"
vpc_id = "${aws_vpc.test-env.id}"
ingress {
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = 22
    to_port = 22
    protocol = "tcp"
  }
// Terraform removes the default rule
  egress {
   from_port = 0
   to_port = 0
   protocol = "-1"
   cidr_blocks = ["0.0.0.0/0"]
 }
}

resource "aws_instance" "terraformed-router" {
  ami = data.aws_ami.amazon_linux_2.id
  instance_type = "t3.large"
  key_name = "Terraform"
  security_groups = ["${aws_security_group.ingress-all-test.id}"]
  subnet_id = "${aws_subnet.subnet-uno.id}"

  user_data = <<EOF
  #!/bin/bash -xe
    echo "RUNNING INITIAL SCRIPT"
    set -ex
    sudo yum update -y
    sudo yum install amazon-linux-extras docker git -y
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    sudo curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo docker pull "${var.full_image_name_router}"
    sudo docker run -d "${var.full_image_name_router}" >> /root/dockerout
    sudo touch /root/touch.txt
  EOF
  
}

resource "aws_instance" "terraformed-sequencer" {
  ami = data.aws_ami.amazon_linux_2.id
  instance_type = "t3.large"
  key_name = "Terraform"
  security_groups = ["${aws_security_group.ingress-all-test.id}"]
  subnet_id = "${aws_subnet.subnet-uno.id}"

  user_data = <<EOF
  #!/bin/bash -xe
    echo "RUNNING INITIAL SCRIPT"
    set -ex
    sudo yum update -y
    sudo yum install amazon-linux-extras docker git -y
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    sudo curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo docker pull "${var.full_image_name_sequencer}"
    sudo docker run -d "${var.full_image_name_sequencer}" >> /root/dockerout
    sudo touch /root/touch.txt
  EOF
  
}

resource "aws_eip" "ip-test-env-router" {
  instance = "${aws_instance.terraformed-router.id}"
  vpc      = true
}

resource "aws_eip" "ip-test-env-sequencer" {
  instance = "${aws_instance.terraformed-sequencer.id}"
  vpc      = true
}

resource "aws_internet_gateway" "test-env-gw" {
  vpc_id = "${aws_vpc.test-env.id}"
  tags = {
    Name = "test-env-gw"
  }
}

resource "aws_route_table" "route-table-test-env" {
  vpc_id = "${aws_vpc.test-env.id}"
route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.test-env-gw.id}"
  }
tags = {
    Name = "test-env-route-table"
  }
}

resource "aws_route_table_association" "subnet-association" {
  subnet_id      = "${aws_subnet.subnet-uno.id}"
  route_table_id = "${aws_route_table.route-table-test-env.id}"
}