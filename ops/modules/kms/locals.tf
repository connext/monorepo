locals {
  developers = [
    "arn:aws:iam::679752396206:user/eddie",
    "arn:aws:iam::679752396206:user/carlo",
    "arn:aws:iam::679752396206:user/rahul",
    "arn:aws:iam::679752396206:user/jake",
    "arn:aws:iam::679752396206:user/layne",
    "arn:aws:iam::679752396206:user/marcus",
    "arn:aws:iam::679752396206:user/sanchay",
    "arn:aws:iam::679752396206:user/arjun",
  ]
}


locals {
  key_admins = [
    "arn:aws:iam::679752396206:user/aws-deployer",
    "arn:aws:iam::679752396206:user/carlo",
    "arn:aws:iam::679752396206:user/rahul",
    "arn:aws:iam::679752396206:user/arjun",
  ]
}


locals {
  users = {
    staging = {
      name = "staging_user"
      tags = {
        environment = "staging"
      }
      policy = file("${path.module}/policies/user-policy.json")
    }
    testnet = {
      name = "testnet_user"
      tags = {
        environment = "testnet"
      }
      policy = file("${path.module}/policies/user-policy.json")
    }
    key_admin = {
      name = "key_admin_user"
      tags = {
        environment = "all"
      }
      policy = file("${path.module}/policies/key-admin-policy.json")
    }
  }
}

locals {
  keys = {
    staging = {
      description             = "Key for staging env using SOPS"
      deletion_window_in_days = 7
      policy                  = templatefile("${path.module}/policies/key-policy.tpl", {
        key_users  = local.developers,
        key_admins = local.key_admins
      })
      enable_key_rotation = true
      tags                = {
        environment = "staging"
      }
    }
    testnet = {
      description             = "Key for testnet env using SOPS"
      deletion_window_in_days = 7
      policy                  = templatefile("${path.module}/policies/key-policy.tpl", {
        key_users  = local.developers,
        key_admins = local.key_admins
      })
      enable_key_rotation = true
      tags                = {
        use         = "example"
        environment = "testnet"
      }
    }
  }
}


