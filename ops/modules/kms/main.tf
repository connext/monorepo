resource "aws_iam_policy" "user-policy" {
  name   = "user-policy"
  policy =  file("${path.module}/policies/user-policy.json")
}


resource "aws_iam_user_policy_attachment" "key_usage" {
  for_each   = toset(local.developers)
  policy_arn = aws_iam_policy.user-policy.arn
  user       = element(split("/", each.value), 1)
}

resource "aws_kms_key" "sops_key" {
  for_each                = local.keys
  description             = each.value.description
  deletion_window_in_days = each.value.deletion_window_in_days
  policy                  = each.value.policy
  enable_key_rotation     = each.value.enable_key_rotation
  tags                    = each.value.tags
}
