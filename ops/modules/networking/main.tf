data "aws_availability_zones" "available" {}

resource "aws_vpc" "main" {
  cidr_block = var.cidr_block
  tags = {
    Environment = var.environment
  }
}

resource "aws_subnet" "main" {
  count  = var.az_count
  vpc_id = aws_vpc.main.id

  availability_zone       = data.aws_availability_zones.available.names[count.index]
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, var.az_count + count.index)
  depends_on              = [aws_internet_gateway.main]
  map_public_ip_on_launch = true

}

resource "aws_subnet" "private" {
  count  = var.az_count
  vpc_id = aws_vpc.main.id

  # availability_zone = "us-east-1b"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  depends_on        = [aws_internet_gateway.main]

}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

}

# Route the public subnet traffic through the IGW
resource "aws_route" "internet_access" {
  route_table_id         = aws_vpc.main.main_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

#Create a NAT gateway with an EIP for each private subnet to get internet connectivity
resource "aws_eip" "gw" {
  count      = var.az_count
  vpc        = true
  depends_on = [aws_internet_gateway.main]
}

resource "aws_nat_gateway" "gw" {
  count         = var.az_count
  subnet_id     = element(aws_subnet.main.*.id, count.index)
  allocation_id = element(aws_eip.gw.*.id, count.index)
}

# Create a new route table for the private subnets
# And make it route non-local traffic through the NAT gateway to the internet
resource "aws_route_table" "private" {
  count  = var.az_count
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = element(aws_nat_gateway.gw.*.id, count.index)
  }
}

# Explicitely associate the newly created route tables to the private subnets (so they don't default to the main route table)
resource "aws_route_table_association" "private" {
  count          = var.az_count
  subnet_id      = element(aws_subnet.private.*.id, count.index)
  route_table_id = element(aws_route_table.private.*.id, count.index)
}

# Traffic to the ECS Cluster should only come from the ALB
resource "aws_security_group" "ecs_tasks" {
  name        = "tf-ecs-tasks"
  description = "allow inbound access from the ALB only"
  vpc_id      = aws_vpc.main.id

  ingress {
    protocol  = "tcp"
    from_port = 80
    to_port   = 80

    # security_groups = ["${aws_security_group.lb.id}"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow_tls" {
  description = "Allow all inbound traffic"
  name        = "allow_tls"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow_all" {
  name        = "allow_all"
  description = "Allow all inbound traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elasticache_subnet_group" "default" {
  name       = "redis-subnet-group-${var.environment}-${var.stage}"
  subnet_ids = aws_subnet.main.*.id
    lifecycle {
      create_before_destroy = true
  }
}
