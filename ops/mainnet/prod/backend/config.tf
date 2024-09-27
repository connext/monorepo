
locals {
  cartographer_env_vars = {
    CARTOGRAPHER_CONFIG = local.local_cartographer_config,
    DATABASE_URL        = "postgres://${var.postgres_user}:${var.postgres_password}@${module.cartographer_db.db_instance_endpoint}/connext",
    ENVIRONMENT         = var.environment,
    STAGE               = var.stage,
    DD_ENV              = "${var.environment}-${var.stage}",
    DD_LOGS_ENABLED     = true,
    DD_API_KEY          = var.dd_api_key
    DD_LAMBDA_HANDLER   = "packages/agents/cartographer/poller/dist/index.handler"
    GRAPH_API_KEY       = var.graph_api_key
  }

  postgrest_env_vars = [
    { name = "PGRST_ADMIN_SERVER_PORT", value = "3001" },
    { name = "PGRST_DB_URI", value = "postgres://${var.postgres_user}:${var.postgres_password}@${module.cartographer_db_replica.db_instance_endpoint}/connext" },
    { name = "PGRST_DB_SCHEMA", value = "public" },
    { name = "PGRST_DB_ANON_ROLE", value = "query" },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage }
  ]

  sdk_server_env_vars = [
    { name = "SDK_SERVER_CONFIG", value = local.local_sdk_server_config },
    { name = "ENVIRONMENT", value = var.environment },
    { name = "STAGE", value = var.stage },
    { name = "DD_PROFILING_ENABLED", value = "true" },
    { name = "DD_ENV", value = "${var.environment}-${var.stage}" },
  ]

  local_sdk_server_config = jsonencode({
    logLevel = "debug"
    chains = {
      "6648936" = {
        providers = ["https://rpc.ankr.com/eth/"]
        disabledAssets = [
          "0x3f6740b5898c5D3650ec6eAce9a649Ac791e44D7",
          "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          "0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44",
          "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
          "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          "0xdAC17F958D2ee523a2206206994597C13D831ec7"
        ]
      }
      "1869640809" = {
        providers = ["https://rpc.ankr.com/optimism"]
        disabledAssets = [
          "0xf232D1Afbed9Df3880143d4FAD095f3698c4d1c6",
          "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
          "0xca87472DBfB041c2e5a2672d319eA6184Ad9755e",
          "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
          "0xF0EB88B8C83347092ef321Ae5D1D54C88Ee89219",
          "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
          "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58"
        ]
      }
      "1886350457" = {
        providers = ["https://rpc.ankr.com/polygon"]
        disabledAssets = [
          "0x7cf93c434260519537184631A347eE8AD0Bc68Cb",
          "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
          "0x4a2bE2075588BcE6A7E072574698a7DbbAc39b08",
          "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
          "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
          "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
        ]
      }
      "1634886255" = {
        providers = ["https://rpc.ankr.com/arbitrum"]
        disabledAssets = [
          "0x386E2699f89EDE6005c4913512bC88F05847607B",
          "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
          "0x16aF9fe3f9E48547971af959fD631A8cDBE40484",
          "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
          "0xF0EB88B8C83347092ef321Ae5D1D54C88Ee89219",
          "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
          "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
        ]
      }
      "6450786" = {
        providers = ["https://rpc.ankr.com/bsc"]
        disabledAssets = [
          "0xd00D9EE9238687A2041004Fe9D55a2299e0Af2fa",
          "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
          "0x2aa48B3d6EFe651542D22CEF0CB7ea853D97A850",
          "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
          "0xF0EB88B8C83347092ef321Ae5D1D54C88Ee89219",
          "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
          "0x55d398326f99059fF775485246999027B3197955"
        ]
      }
      "6778479" = {
        providers      = ["https://rpc.ankr.com/gnosis"]
        disabledAssets = [
          "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
          "0x386508A233EE1494d31555Ab8aa2df6D6DC76E61",
          "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
          "0x398bB7642BD0A5c7CB64f6255159BFABa5512342",
          "0x58b9cB810A68a7f3e1E4f8Cb45D1B9B3c79705E8",
          "0x8b988A5E3c1C7F5230102606eaEFE421e2CD9A10",
          "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
          "0x4ECaBa5870353805a9F068101A40E0f32ed605C6"
        ]
      }
      "1818848877" = {
        providers      = ["https://rpc.linea.build"]
        disabledAssets = [
          "0xA219439258ca9da29E9Cc4cE5596924745e12B93",
          "0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5",
          "0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5",
          "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
          "0xA219439258ca9da29E9Cc4cE5596924745e12B93"
        ]
      }
      "1887071085" = {
        providers = ["https://polygon-zkevm-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1650553709" = {
        providers = ["https://base-mainnet.blastapi.io/${var.blast_key}"],
        disabledAssets = [
          "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
          "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
        ]
      }
      "1635148152" = {
        providers = ["https://ava-mainnet.blastapi.io/${var.blast_key}/ext/bc/C/rpc"]
      }
      "1835365481" = {
        providers = ["https://metis-mainnet.blastapi.io/${var.blast_key}"],
        disabledAssets = [
          "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
          "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC"
        ]
      }
      "1835101812" = {
        providers = ["https://mantle-mainnet.blastapi.io/${var.blast_key}"]
      }
      "1836016741" = {
        providers = ["https://mode-mainnet.blastapi.io/${var.blast_key}", "https://mainnet.mode.network/"]
      }    
    }

    # The following are defined in variables.tf and don't map to the
    # definitions of environment and network in agent configs.
    environment = var.stage
    network     = var.environment

    redis = {
      enabled        = true
      expirationTime = 10
      host           = module.sdk_server_cache.redis_instance_address,
      port           = module.sdk_server_cache.redis_instance_port
    }

    server = {
      http = {
        host = "0.0.0.0"
        port = 8080
      }
    }
  })

  local_cartographer_config = jsonencode({
    logLevel = "debug"
    chains = {
      "6648936"    = { confirmations = 10 }
      "1869640809" = { confirmations = 1 }
      "1886350457" = { confirmations = 200 }
      "1634886255" = { confirmations = 1 }
      "6450786"    = { confirmations = 50 }
      "6778479"    = { confirmations = 100 }
      "1818848877" = { confirmations = 10 }
      "1887071085" = { confirmations = 10 }
      "1650553709" = { confirmations = 1 }
      "1635148152" = { confirmations = 10 }
      "1835365481" = { confirmations = 1 }
      "1835101812" = { confirmations = 1 }
      "1836016741" = { confirmations = 10 }
      "2020368761" = { confirmations = 10 }
    }
    environment = var.stage
    healthUrls = {
      messages  = "https://betteruptime.com/api/v1/heartbeat/${var.carto_messages_heartbeat}"
      roots     = "https://betteruptime.com/api/v1/heartbeat/${var.carto_roots_heartbeat}"
      routers   = "https://betteruptime.com/api/v1/heartbeat/${var.carto_routers_heartbeat}"
      transfers = "https://betteruptime.com/api/v1/heartbeat/${var.carto_transfers_heartbeat}"
    }
  })
}
