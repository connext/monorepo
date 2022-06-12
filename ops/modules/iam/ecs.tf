data "aws_iam_policy_document" "cloudwatch_assume_role" {
  statement {
    principals {
      type = "Service"
      identifiers = [
        "events.amazonaws.com",
        "ecs-tasks.amazonaws.com",
      ]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "ecr_admin_role" {
  name               = "erc_admin_role"
  assume_role_policy = data.aws_iam_policy_document.cloudwatch_assume_role.json
}

