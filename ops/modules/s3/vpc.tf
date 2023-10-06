resource "aws_s3_bucket" "vpc_flow_logs" {
  bucket = "all-vpcs-flow-logs-bucket"
  acl    = "private"

  versioning {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true

    rule {
      id      = "expire-old-logs"
      status  = "Enabled"
      prefix  = ""
      enabled = true

      transitions {
        days          = 30
        storage_class = "GLACIER"
      }

      expiration {
        days = 365
      }
    }
  }
}
