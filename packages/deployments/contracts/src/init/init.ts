import { config } from "dotenv";
import { providers, Wallet, utils } from "ethers";
import commandLineArgs from "command-line-args";
import { ajv, getChainData } from "@connext/nxtp-utils";
import { HttpNetworkUserConfig } from "hardhat/types";

import HardhatConfig from "../../hardhat.config";
import { canonizeId, domainToChainId } from "../domain";

import {
  ProtocolStack,
  getDeployments,
  updateIfNeeded,
  NetworkStack,
  HubMessagingDeployments,
  InitConfig,
  InitConfigSchema,
} from "./helpers";
import { setupAsset } from "./helpers/assets";
import { setupMessaging } from "./helpers/messaging";
import { DEFAULT_INIT_CONFIG } from "./config";

config();

export const optionDefinitions = [
  { name: "name", defaultOption: true },
  { name: "network", type: String },
  { name: "env", type: String },
  { name: "domains", type: String, multiple: true },
];

/**
 * Call the core `initProtocol` method.
 * Sanitizer method to make sure config is set up correctly.
 * @param config - ProtocolStack, but as any/Partial.
 */
export const sanitizeAndInit = async () => {
  let cmdArgs: any;
  try {
    cmdArgs = commandLineArgs(optionDefinitions);
  } catch (err: any) {
    throw new Error(`Parsing arguments failed, cmdArgs: ${process.argv}`);
  }

  // Validate command line arguments
  const { network, env, domains } = cmdArgs;
  if (!["staging", "production"].includes(env as string)) {
    throw new Error(`Environment should be either staging or production, env: ${env}`);
  }

  if (!["testnet", "mainnet"].includes(env as string)) {
    throw new Error(`Network should be either testnet or mainnet, network: ${network}`);
  }

  const useStaging = env === "staging";
  console.log(`USING ${useStaging ? "STAGING" : "PRODUCTION"} AS ENVIRONMENT`);

  // Validate init config schema
  const initConfig: InitConfig = (DEFAULT_INIT_CONFIG as any)[network as string][env];
  const validate = ajv.compile(InitConfigSchema);
  const valid = validate(initConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  const supported = initConfig.supportedDomains;
  for (const domain of domains) {
    if (!supported.includes(domain as string)) {
      throw new Error(`Unsupported domain parsed!, domain: ${domain}, supported: ${supported}`);
    }
  }

  // Sanitation checks
  const hubDomain = initConfig.hub;
  if (!supported.includes(hubDomain)) {
    throw new Error(`Supported domains MUST include the hub domain. hub: ${hubDomain}, supported: ${supported}`);
  }

  const assets = initConfig.assets ?? [];
  for (const asset of assets) {
    const assetDomains: string[] = [];
    assetDomains.push(asset.canonical.domain);
    assetDomains.concat(Object.keys(asset.representations));

    const configuredDomains = assetDomains.filter((assetDomain) => supported.includes(assetDomain));
    if (configuredDomains !== assetDomains) {
      throw new Error(
        `Not configured asset domains, asset: ${asset.name}, canonical: (${asset.canonical.domain}, ${asset.canonical.address}), configured: ${configuredDomains}, supported: ${supported}`,
      );
    }
  }

  /// MARK - Deployer
  // Get deployer mnemonic, which should be provided in env if not in the config.
  const mnemonic = process.env.DEPLOYER || process.env.DEPLOYER_MNEMONIC || process.env.MNEMONIC;
  if (!mnemonic) {
    throw new Error(
      "Deployer mnemonic was not specified. Please specify `deployer` in the config file, " +
        "or set DEPLOYER or DEPLOYER_MNEMONIC in env.",
    );
  }
  // Convert deployer from mnemonic to Wallet.
  const deployer = Wallet.fromMnemonic(mnemonic);

  // Load hardhat config for setting up rpc urls
  const hardhatNetworks = HardhatConfig.networks;
  if (!hardhatNetworks) {
    throw new Error(`Couldn't load networks config from hardhat.config.ts`);
  }

  const networks: NetworkStack[] = [];
  // Get deployments for each domain if not specified in the config.
  for (const _domain of domains) {
    const domain = _domain as string;
    const chainId = domainToChainId(Number(domain));

    const chainConfig = Object.values(hardhatNetworks).find(
      (networkConfig) => networkConfig?.chainId === chainId,
    ) as HttpNetworkUserConfig;
    if (!chainConfig || !chainConfig.url) {
      throw new Error(`Not configured network for chainId: ${chainId} in hardhat config`);
    }

    const rpc = new providers.JsonRpcProvider(chainConfig.url);

    const isHub = domain === hubDomain;
    const deployments = getDeployments({
      deployer,
      chainInfo: { chain: chainId.toString(), rpc },
      isHub,
      useStaging,
    });

    networks.push({
      chain: chainId.toString(),
      domain,
      rpc,
      deployments,
    });
  }

  // TODO: Sanity - check that every hub has a spoke and vice versa!

  const sanitized = {
    deployer,
    networks,
    assets,
    agents: initConfig.agents,
  } as ProtocolStack;
  console.log("Sanitized protocol config:", sanitized);

  console.log("DEBUG: Logging all deployment names:");
  for (const network of sanitized.networks) {
    console.log(
      network.chain,
      "deployments:",
      "\n" +
        Object.entries(network.deployments)
          .map(([k, v]) => {
            if ((v as any).name) {
              return `${k}: ${(v as any).proxy}`;
            } else {
              return Object.entries(network.deployments[k as keyof typeof network.deployments] as unknown as object)
                .map(([k, v]) => {
                  if (k === "HubConnectors") {
                    const list: string = v.map((c: any) => c.name).join(", ");
                    return `${k}: [ ${list} ]`;
                  }
                  return `${k}: ${v.proxy ?? v.name}`;
                })
                .join(";\n");
            }
          })
          .join(";\n"),
      "\n",
    );
  }

  await initProtocol(sanitized);
};

/**
 * Handle configuration of the entire protocol, including messaging stack and connext diamond
 * contracts, across all listed domains.
 *
 * Should effectively be a diagnostic on the whole protocol, making sure that everything that
 * requires configuration and/or setup has been done so properly.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const initProtocol = async (protocol: ProtocolStack) => {
  /// ********************** SETUP **********************
  /// MARK - ChainData
  // Retrieve chain data for it to be saved locally; this will avoid those pesky logs and frontload the http request.
  await getChainData(true);

  /// ********************* Messaging **********************
  /// MARK - Messaging
  await setupMessaging(protocol);

  // ********************* CONNEXT *********************
  /// MARK - Enroll Handlers
  console.log("\n\nEnrolling handlers");
  for (let i = 0; i < protocol.networks.length; i++) {
    const targetNetwork = protocol.networks[i];
    const remoteNetworks = protocol.networks.filter((_, j) => j !== i);
    for (const remoteNetwork of remoteNetworks) {
      const desiredConnextion = remoteNetwork.deployments.Connext.address;
      await updateIfNeeded({
        deployment: targetNetwork.deployments.Connext,
        desired: desiredConnextion,
        read: { method: "remote", args: [remoteNetwork.domain] },
        write: {
          method: "enrollRemoteRouter",
          args: [remoteNetwork.domain, utils.hexlify(canonizeId(desiredConnextion))],
        },
      });
    }
  }

  /// ********************* ASSETS **********************
  /// MARK - Register Assets
  console.log("\n\nREGISTER ASSETS");
  // Convert asset addresses: get canonical ID, canonical domain, convert to `key` hash.
  // Determine if a stableswap pool is needed - does asset have both `local` and `adopted`?
  // If so, initialize stableswap pool with `initializeSwap`.
  // Call `setupAsset` for each domain. This will:
  // - Set up mappings for canonical ID / canonical domain / adopted asset address / etc.
  // - Set up mapping for stableswap pool if applicable.
  for (const asset of protocol.assets) {
    await setupAsset({
      asset,
      networks: protocol.networks,
    });
  }

  /// ********************* AGENTS **********************
  if (protocol.agents) {
    /// MARK - Watchers
    if (protocol.agents.watchers) {
      if (protocol.agents.watchers.whitelist) {
        console.log("\n\nWHITELIST WATCHERS");

        // Get hub domain for specific use.
        const hub: NetworkStack = protocol.networks.filter((d) => d.domain === protocol.hub)[0];

        /// MARK - Contracts
        // Convenience setup for contracts.
        const { WatcherManager } = hub.deployments.messaging as HubMessagingDeployments;

        // Watchers are a permissioned role with the ability to disconnect malicious connectors.
        // Whitelist watchers in RootManager.
        for (const watcher of protocol.agents.watchers.whitelist) {
          await updateIfNeeded({
            deployment: WatcherManager,
            desired: true,
            read: { method: "isWatcher", args: [watcher] },
            write: { method: "addWatcher", args: [watcher] },
          });
        }
      }
      // TODO: Blacklist/remove watchers.
    }

    /// MARK - Relayers
    if (protocol.agents.relayers) {
      if (protocol.agents.relayers.whitelist) {
        console.log("\n\nWHITELIST RELAYERS");
        // Whitelist named relayers for the Connext bridge, in order to call `execute`.
        for (const relayer of protocol.agents.relayers.whitelist) {
          for (const network of protocol.networks) {
            await updateIfNeeded({
              deployment: network.deployments.Connext,
              desired: true,
              read: { method: "approvedRelayers", args: [relayer] },
              write: { method: "addRelayer", args: [relayer] },
            });
          }
        }
        // Additionally, approve relayers as callers for connectors and root manager.
      }
      // TODO: Blacklist/remove relayers.
    }

    /// MARK - Sequencers
    if (protocol.agents.sequencers) {
      if (protocol.agents.sequencers.whitelist) {
        console.log("\n\nWHITELIST SEQUENCERS");
        // Whitelist named sequencers.
        for (const sequencer of protocol.agents.sequencers.whitelist) {
          for (const network of protocol.networks) {
            await updateIfNeeded({
              deployment: network.deployments.Connext,
              desired: true,
              read: { method: "approvedSequencers", args: [sequencer] },
              write: { method: "addSequencer", args: [sequencer] },
            });
          }
        }
      }
      // TODO: Blacklist/remove sequencers.
    }

    /// MARK - Routers
    if (protocol.agents.routers) {
      if (protocol.agents.routers.whitelist) {
        console.log("\n\nWHITELIST ROUTERS");
        // Whitelist connext routers.
        for (const router of protocol.agents.routers.whitelist) {
          for (const network of protocol.networks) {
            await updateIfNeeded({
              deployment: network.deployments.Connext,
              desired: true,
              read: { method: "getRouterApproval", args: [router] },
              // TODO: Should we enable configuring owner and recipient for this script, too?
              write: { method: "setupRouter", args: [router, router, router] },
            });
          }
        }
      }
      // TODO: Blacklist/remove routers.
    }
  }
};
