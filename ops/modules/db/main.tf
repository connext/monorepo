
resource "aws_db_instance" "db" {

  identifier        = var.identifier

  engine            = "postgres"
  engine_version    = "11"
  instance_class    = var.instance_class
  allocated_storage = var.allocated_storage

  name                                = var.name
  username                            = var.username
  password                            = var.password
  port                                = var.port


  vpc_security_group_ids = [var.db_security_group_id]
  db_subnet_group_name   = var.db_subnet_group_name
  parameter_group_name   = var.parameter_group_name


  availability_zone   = var.availability_zone

  allow_major_version_upgrade = true
  auto_minor_version_upgrade  = true
  apply_immediately           = true
  max_allocated_storage       = var.max_allocated_storage

  skip_final_snapshot = true
  backup_retention_period = 5
  backup_window           = "03:00-06:00"
  maintenance_window      = var.maintenance_window

//  final_snapshot_identifier = "${var.identifier}-snapshot"
  enabled_cloudwatch_logs_exports =  ["postgresql"]

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



resource "aws_route53_record" "db" {
  zone_id = var.hosted_zone_id
  name    = var.stage != "prod" ? "db.${var.environment}.${var.stage}.${var.base_domain}" : "db.${var.environment}.${var.base_domain}"
  type = "CNAME"
  ttl = "300"
  records = [aws_db_instance.db.address]
}

