import { Wallet } from "ethers";
import { Interface } from "ethers/lib/utils";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { Logger, getChainData, RequestContext, createLoggingContext, createMethodContext } from "@connext/nxtp-utils";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import {
  getContractInterfaces,
  contractDeployments,
  TransactionService,
  ContractPostfix,
} from "@connext/nxtp-txservice";

import { RelayerConfig, AppContext } from "./lib/entities";
import { getConfig } from "./config";
import { bindServer, bindRelays, bindHealthServer } from "./bindings";
import { AutomationVaultAbi, XKeeperRelayerAbi } from "./abi";

const context: AppContext = {} as any;
export const getContext = () => context;

export const makeRelayer = async (_configOverride?: RelayerConfig) => {
  try {
    await setupContext(_configOverride);

    const service = process.env.RELAYER_SERVICE ?? "";
    switch (service) {
      case "poller":
        await bindHealthServer();
        await bindRelays();
        break;
      case "server":
        await bindServer();
        break;
    }
  } catch (err: unknown) {
    console.error("Error starting relayer :(", err);
    process.exit(1);
  }
};

export const setupContext = async (_configOverride?: RelayerConfig) => {
  const { requestContext, methodContext } = createLoggingContext(setupContext.name);

  const deployments = {
    ...contractDeployments,
    automationVault: (chainId: number, postfix: ContractPostfix, _network: string) => {
      // only available in testnet staging
      if (chainId === 11155111 && postfix == "Staging") {
        return {
          address: "0x0ad045A64A4c90252C9Ac75e5a7e2F1c4e863917",
          abi: AutomationVaultAbi,
        };
      }
      return undefined;
    },
    xKeeperRelayer: (chainId: number, _postfix: ContractPostfix, _network: string) => {
      // zksync has different addresses
      if (chainId === 324 || chainId === 280) {
        undefined;
      }
      return {
        address: "0xB0CB8E6Fe8F655d46eE0910332C263ddB61FF9a0",
        abi: XKeeperRelayerAbi,
      };
    },
  };

  try {
    context.adapters = {} as any;

    /// MARK - Config
    // Get ChainData and parse out configuration.
    const chainData = await getChainData();
    context.chainData = chainData;
    context.config = _configOverride ?? (await getConfig(chainData, deployments));
    context.logger = new Logger({
      level: context.config.logLevel,
      name: "relayer",
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    });
    context.logger.info("Relayer config generated.", requestContext, methodContext, {
      config: { ...context.config, mnemonic: "*****" },
    });

    /// MARK - Adapters
    // Set up adapters.
    context.adapters.cache = await setupCache(context.config.redis, context.logger, requestContext);
    context.adapters.wallet = context.config.mnemonic
      ? Wallet.fromMnemonic(context.config.mnemonic)
      : new Web3Signer(context.config.web3SignerUrl!);
    context.adapters.txservice = new TransactionService(
      context.logger.child({ module: "ChainReader", level: context.config.logLevel }),
      context.config.chains,
      context.adapters.wallet,
      true, // Ghost instance, in the event that this is running in the same process as a router.
    );
    context.adapters.contracts = {
      ...getContractInterfaces(),
      automationVault: new Interface(AutomationVaultAbi),
      xKeeperRelayer: new Interface(XKeeperRelayerAbi),
    };

    /// MARK - Utilities
    context.chainToDomainMap = new Map();
    for (const domain of Object.keys(context.config.chains)) {
      if (context.chainData.has(domain)) {
        context.chainToDomainMap.set(context.chainData.get(domain)!.chainId, Number(domain));
      } else {
        throw new Error(`ChainData doesn't have a record for domain: ${domain}`);
      }
    }
  } catch (error: unknown) {
    console.error("Error setup context Relayer! D: Who could have done this?", error);
  }
};

export const setupCache = async (
  redis: { host?: string; port?: number },
  logger: Logger,
  requestContext: RequestContext,
): Promise<StoreManager> => {
  const methodContext = createMethodContext(setupCache.name);

  logger.info("Cache instance setup in progress...", requestContext, methodContext, {});

  const cacheInstance = StoreManager.getInstance({
    redis: { host: redis.host, port: redis.port, instance: undefined },
    mock: !redis.host || !redis.port,
    logger: logger.child({ module: "StoreManager" }),
  });

  logger.info("Cache instance setup is done!", requestContext, methodContext, {
    host: redis.host,
    port: redis.port,
  });
  return cacheInstance;
};
