
resource "aws_db_instance" "db" {

  identifier = var.identifier

  engine            = "postgres"
  engine_version    = "14.3"
  instance_class    = var.instance_class
  allocated_storage = var.allocated_storage

  db_name  = var.name
  username = var.username
  password = var.password
  port     = var.port


  vpc_security_group_ids = [var.db_security_group_id]
  db_subnet_group_name   = aws_db_subnet_group.default.name
  parameter_group_name   = var.parameter_group_name


  availability_zone = var.availability_zone

  allow_major_version_upgrade = true
  auto_minor_version_upgrade  = true
  apply_immediately           = true
  max_allocated_storage       = var.max_allocated_storage

  skip_final_snapshot     = true
  backup_retention_period = 5
  backup_window           = "03:00-06:00"
  maintenance_window      = var.maintenance_window

  publicly_accessible = var.publicly_accessible
  //  final_snapshot_identifier = "${var.identifier}-snapshot"
  enabled_cloudwatch_logs_exports = ["postgresql"]

  tags = merge(
    var.tags,
    {
      "Name" = format("%s", var.identifier)
    },
  )

  timeouts {
    create = "40m"
    update = "80m"
    delete = "40m"
  }
}


resource "aws_db_instance" "db_read_replica" {

  identifier                 = var.replica_identifier
  replicate_source_db        = aws_db_instance.db.id
  
  engine                     = "postgres"
  engine_version             = var.engine_version
  instance_class             = var.instance_class

  // allocated_storage, db_name, user, pass, etc are inherited from source DB

  vpc_security_group_ids     = var.vpc_security_group_ids
  db_subnet_group_name       = aws_db_subnet_group.default.name

  publicly_accessible        = var.publicly_accessible
  multi_az                   = false
  storage_type               = "gp2"
  apply_immediately          = true
  skip_final_snapshot        = true
  monitoring_interval        = 60
  maintenance_window         = var.maintenance_window
  backup_retention_period    = var.backup_retention_period
  backup_window              = var.backup_window
  auto_minor_version_upgrade = true

  tags = merge(
    var.tags,
    {
      "Name" = format("%s-read-replica", var.identifier)
    },
  )

  timeouts {
    create = "40m"
    update = "80m"
    delete = "40m"
  }
}


resource "aws_db_subnet_group" "default" {
  name       = "rds-subnet-group-${var.environment}-${var.stage}"
  subnet_ids = var.db_subnet_group_subnet_ids
}


resource "aws_route53_record" "db" {
  zone_id = var.hosted_zone_id
  name    = var.stage != "production" ? "db.${var.environment}.${var.stage}.${var.base_domain}" : "db.${var.environment}.${var.base_domain}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_db_instance.db.address]
}


resource "aws_route53_record" "db_read_replica" {
  zone_id = var.hosted_zone_id
  name    = var.stage != "production" ? "db-read-replica.${var.environment}.${var.stage}.${var.base_domain}" : "db-read-replica.${var.environment}.${var.base_domain}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_db_instance.db_read_replica.address]
}


resource "aws_db_proxy" "rds_db_proxy" {
  name                   = "rds-db-proxy-${var.environment}-${var.stage}"
  debug_logging          = false
  engine_family          = "POSTGRESQL"
  idle_client_timeout    = 1800
  require_tls            = true
  role_arn               = aws_iam_role.example.arn
  vpc_security_group_ids = var.vpc_security_group_ids
  vpc_subnet_ids         = aws_subnet.private.*.id

  auth {
    auth_scheme = "SECRETS"
    description = "example"
    iam_auth    = "DISABLED"
    secret_arn  = aws_secretsmanager_secret.web3signer_secret.arn
  }

  tags = {
    Environment = var.environment
    Stage       = var.stage
    Domain      = var.domain
  }
}

