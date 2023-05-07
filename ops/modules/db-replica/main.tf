resource "aws_db_instance" "db_read_replica" {

  identifier          = var.replica_identifier
  replicate_source_db = var.replicate_source_db

  engine         = "postgres"
  engine_version = var.engine_version
  instance_class = var.instance_class

  allocated_storage = var.allocated_storage
  db_name           = var.name
  username          = var.username
  password          = var.password
  port              = var.port

  vpc_security_group_ids = var.db_security_group_ids
  db_subnet_group_name   = var.db_subnet_group_name

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
      "Name" = format("%s-read-replica", var.replica_identifier)
    },
  )

  timeouts {
    create = "40m"
    update = "80m"
    delete = "40m"
  }
}


resource "aws_route53_record" "db_read_replica" {
  zone_id = var.hosted_zone_id
  name    = var.stage != "production" ? "db_read_replica.${var.environment}.${var.stage}.${var.base_domain}" : "db_read_replica.${var.environment}.${var.base_domain}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_db_instance.db_read_replica.address]
}
