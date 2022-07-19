locals {
  sequencer_env_vars = [
    { name = "SEQ_CONFIG", value = local.local_sequencer_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = var.stage },
    { name = "DD_SERVICE", value = "sequencer-${var.environment}" }


  ]
  router_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_router_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = var.stage },
    { name = "DD_SERVICE", value = "router-${var.environment}" }
  ]
  lighthouse_env_vars = [
    { name = "NXTP_CONFIG", value = local.local_lighthouse_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage }

  ]
  web3signer_env_vars = [
    { name = "WEB3_SIGNER_PRIVATE_KEY", value = var.web3_signer_private_key },
    { name = "WEB3SIGNER_HTTP_HOST_ALLOWLIST", value = "*" }
  ]
}

locals {
  local_sequencer_config = jsonencode({
    redis = {
      host = module.sequencer_cache.redis_instance_address,
      port = module.sequencer_cache.redis_instance_port
    },

    server = {
      adminToken = var.admin_token_router
    }

    logLevel = "debug"
    chains = {
      "1111" = {
        providers = ["https://eth-rinkeby.alchemyapi.io/v2/${var.rinkeby_alchemy_key_0}", "https://rpc.ankr.com/eth_rinkeby"]
        assets = [
          {
            name    = "TEST"
            address = "0x3ffc03f05d1869f493c7dbf913e636c6280e0ff9"
          }
        ]
      }
      "3331" = {
        providers = ["https://eth-goerli.alchemyapi.io/v2/${var.goerli_alchemy_key_0}", "https://rpc.ankr.com/eth_goerli"]
        assets = [
          {
            name    = "TEST"
            address = "0x26FE8a8f86511d678d031a022E48FfF41c6a3e3b"
          }
        ]
      }
    }

    environment = var.stage
    messageQueue = {
      connection = {
        server         = module.centralised_message_queue.aws_mq_amqp_endpoint
        port           = 5671
        user           = var.rmq_mgt_user
        pass           = var.rmq_mgt_password
        timeout        = 2000,
        publishTimeout = 100,
        failAfter      = 10,
        retryLimit     = 100
      }
      exchanges = [
        {
          name           = "sequencerX"
          type           = "direct"
          publishTimeout = 1000
          persistent     = true
          durable        = true
        }
      ]
      queues = [
        {
          name       = "1337"
          prefetch   = 100
          queueLimit = 10000
          subscribe  = true
        },
        {
          name       = "1338"
          prefetch   = 100
          queueLimit = 10000
          subscribe  = true
        }
      ]
      bindings = [
        {
          exchange = "sequencerX"
          target   = "1337"
          keys     = ["1337"]
        },
        {
          exchange = "sequencerX"
          target   = "1338"
          keys     = ["1338"]
        }
      ]
      executerTimeout = 300000
      publisher       = "sequencerX"
    }
  })
}


locals {
  local_router_config = jsonencode({
    redis = {
      host = module.router_cache.redis_instance_address,
      port = module.router_cache.redis_instance_port
    },
    logLevel     = "debug"
    sequencerUrl = "https://${module.sequencer_publisher.service_endpoint}"
    server = {
      adminToken = var.admin_token_router
      port       = 8080
    }
    chains = {
      "1111" = {
        providers = ["https://eth-rinkeby.alchemyapi.io/v2/${var.rinkeby_alchemy_key_0}", "https://rpc.ankr.com/eth_rinkeby"]
        assets = [
          {
            name    = "TEST"
            address = "0x3ffc03f05d1869f493c7dbf913e636c6280e0ff9"
          }
        ]
      }
      "3331" = {
        providers = ["https://eth-goerli.alchemyapi.io/v2/${var.goerli_alchemy_key_0}", "https://rpc.ankr.com/eth_goerli"]
        assets = [
          {
            name    = "TEST"
            address = "0x26FE8a8f86511d678d031a022E48FfF41c6a3e3b"
          }
        ]
      }
    }
    web3SignerUrl    = "https://${module.web3signer.service_endpoint}"
    environment      = var.stage
    nomadEnvironment = var.nomad_environment
    messageQueue = {
      host = module.centralised_message_queue.aws_mq_amqp_endpoint
      port = 5671
      user = var.rmq_mgt_user
      pass = var.rmq_mgt_password
    }
  })
}



locals {
  local_lighthouse_config = jsonencode({
    logLevel = "debug"
    chains = {
      "1111" = {
        providers = ["https://eth-rinkeby.alchemyapi.io/v2/${var.rinkeby_alchemy_key_1}"]
      }
      "3331" = {
        providers = ["https://eth-goerli.alchemyapi.io/v2/${var.goerli_alchemy_key_1}"]
      }
    }
    environment = var.stage
  })
}
