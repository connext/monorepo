import * as fs from "fs";

import { config } from "dotenv";
import { providers, Wallet, utils } from "ethers";
import commandLineArgs from "command-line-args";
import { ajv, getChainData } from "@connext/nxtp-utils";
import { HttpNetworkUserConfig } from "hardhat/types";

import { canonizeId, domainToChainId } from "../../domain";
import { hardhatNetworks } from "../../config";

import {
  ProtocolStack,
  getDeployments,
  updateIfNeeded,
  NetworkStack,
  HubMessagingDeployments,
  InitConfig,
  InitConfigSchema,
  AssetStack,
  SpokeMessagingDeployments,
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
 * Make sure config is set up properly and start initializtion.
 */
export const sanitizeAndInit = async () => {
  let cmdArgs: any;
  try {
    cmdArgs = commandLineArgs(optionDefinitions);
  } catch (err: any) {
    throw new Error(`Parsing arguments failed, cmdArgs: ${process.argv}`);
  }

  // Validate command line arguments
  const { network, env, domains: _domains } = cmdArgs;
  if (!["staging", "production"].includes(env as string)) {
    throw new Error(`Environment should be either staging or production, env: ${env}`);
  }

  if (!["testnet", "mainnet"].includes(network as string)) {
    throw new Error(`Network should be either testnet or mainnet, network: ${network}`);
  }

  const useStaging = env === "staging";
  console.log(`USING ${useStaging ? "STAGING" : "PRODUCTION"} AS ENVIRONMENT`);

  // Read init.json if exists
  const path = process.env.INIT_CONFIG_FILE ?? "init.json";
  let overrideConfig: any;
  if (fs.existsSync(path)) {
    const json = fs.readFileSync(path, { encoding: "utf-8" });
    overrideConfig = JSON.parse(json);
  }

  // Validate init config schema
  const initConfig: InitConfig = overrideConfig ?? (DEFAULT_INIT_CONFIG as any)[network as string][env];
  console.log(initConfig);
  const validate = ajv.compile(InitConfigSchema);
  const valid = validate(initConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  const supported = initConfig.supportedDomains;
  const domains = _domains ?? supported;
  for (const domain of domains) {
    if (!supported.includes(domain as string)) {
      throw new Error(`Unsupported domain parsed!, domain: ${domain}, supported: ${supported}`);
    }
  }

  // Sanitation checks for hub domain and assets configuration
  const hubDomain = initConfig.hub;
  if (!supported.includes(hubDomain)) {
    throw new Error(`Supported domains MUST include the hub domain. hub: ${hubDomain}, supported: ${supported}`);
  }

  const _assets = initConfig.assets ?? [];
  for (const asset of _assets) {
    const assetDomains = [asset.canonical.domain].concat(Object.keys(asset.representations));

    const configuredDomains = supported.filter((domain) => assetDomains.includes(domain));
    if (JSON.stringify(configuredDomains) != JSON.stringify(supported)) {
      throw new Error(
        `Not configured asset domains, asset: ${asset.name}, canonical: (${asset.canonical.domain}, ${asset.canonical.address}), configured: ${configuredDomains}, parsed: ${domains}`,
      );
    }
  }

  // get assets configuration for given domains
  const assets = _assets.map((asset) => {
    const _extracted: AssetStack = {
      name: asset.name,
      canonical: {
        domain: asset.canonical.domain,
        address: asset.canonical.address,
        decimals: asset.canonical.decimals,
        cap: asset.canonical.cap,
      },
      representations: {},
    };

    for (const domain of domains) {
      if (domain === hubDomain) continue;
      _extracted.representations[domain] = asset.representations[domain];
    }

    return _extracted;
  });

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

  const networks: NetworkStack[] = [];
  const filteredHardhatNetworks = Object.values(hardhatNetworks).filter(
    (hardhatNetwork) =>
      Object.keys(hardhatNetwork as object).includes("chainId") &&
      Object.keys(hardhatNetwork as object).includes("url"),
  );

  // Get deployments for each domain if not specified in the config.
  for (const _domain of domains) {
    const domain = _domain as string;
    const chainId = domainToChainId(Number(domain));

    const chainConfig = Object.values(filteredHardhatNetworks).find(
      (networkConfig: any) => networkConfig["chainId"] == chainId,
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

    // TODO: relayers and agents should also be configured per-network. when this is done,
    // ensure the relayerFeeVault can be passed in
    networks.push({
      chain: chainId.toString(),
      domain,
      rpc,
      deployments,
      relayerFeeVault: deployments.messaging.RelayerProxy.address,
    });
  }

  const sanitized = {
    deployer,
    hub: hubDomain,
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
  const chainData = await getChainData(true);

  for (const asset of protocol.assets) {
    await setupAsset({
      asset,
      networks: protocol.networks,
      chainData,
    });
  }

  /// ********************* Messaging **********************
  /// MARK - Messaging
  await setupMessaging(protocol);

  /// ********************* CONNEXT *********************
  /// MARK - Enroll Handlers
  console.log("\n\nENROLLING HANDLERS");
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
        chainData,
      });
    }
  }

  /// MARK - Set relayerFeeVault
  console.log("\n\nENROLLING RELAYER FEE VAULT");
  for (const network of protocol.networks) {
    const {
      relayerFeeVault,
      deployments: { Connext },
    } = network;

    await updateIfNeeded({
      deployment: Connext,
      desired: relayerFeeVault,
      read: { method: "relayerFeeVault" },
      write: { method: "setRelayerFeeVault", args: [relayerFeeVault] },
      chainData,
    });
  }

  /// ********************* Relayer Proxy **********************
  /// MARK - relayer proxy
  console.log("\n\nCONFIGURE RELAYER PROXY");
  // On all domains, ensure the following are correctly set:
  // - connext
  // - spoke connector
  // - gelato relayer -- TODO: need to update config
  // - gelato fee collector -- TODO: need to update config
  for (const network of protocol.networks) {
    const isHub = network.domain === protocol.hub;
    const { Connext, messaging } = network.deployments;

    // update connext
    await updateIfNeeded({
      deployment: messaging.RelayerProxy,
      desired: Connext.address,
      read: { method: "connext" },
      write: { method: "setConnext", args: [Connext.address] },
      chainData,
    });

    // update spoke -- use MainnetConnector key if on hub
    const spokeConnector = isHub
      ? (messaging as HubMessagingDeployments).MainnetConnector.address
      : (messaging as SpokeMessagingDeployments).SpokeConnector.address;
    await updateIfNeeded({
      deployment: messaging.RelayerProxy,
      desired: spokeConnector,
      read: { method: "spokeConnector" },
      write: { method: "setSpokeConnector", args: [spokeConnector] },
      chainData,
    });

    // TODO: gelato relayer
    // TODO: gelato fee connector

    // On hub, ensure the following are correctly set:
    // - root manager
    if (isHub) {
      const rootManager = (messaging as HubMessagingDeployments).RootManager.address;
      await updateIfNeeded({
        deployment: messaging.RelayerProxy,
        desired: rootManager,
        read: { method: "rootManager" },
        write: { method: "setRootManager", args: [rootManager] },
        chainData,
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
      chainData,
    });
  }

  /// ********************* AGENTS **********************
  if (protocol.agents) {
    /// MARK - Watchers
    if (protocol.agents.watchers) {
      if (protocol.agents.watchers.allowlist) {
        console.log("\n\nWHITELIST WATCHERS");

        // Get hub domain for specific use.
        const hub: NetworkStack = protocol.networks.filter((d) => d.domain === protocol.hub)[0];

        /// MARK - Contracts
        // Convenience setup for contracts.
        const { WatcherManager } = hub.deployments.messaging as HubMessagingDeployments;

        // Watchers are a permissioned role with the ability to disconnect malicious connectors.
        // Allowlist watchers in RootManager.
        for (const watcher of protocol.agents.watchers.allowlist) {
          await updateIfNeeded({
            deployment: WatcherManager,
            desired: true,
            read: { method: "isWatcher", args: [watcher] },
            write: { method: "addWatcher", args: [watcher] },
            chainData,
          });
        }
      }
      // TODO: Blacklist/remove watchers.
    }

    /// MARK - Relayers
    if (protocol.agents.relayers) {
      if (protocol.agents.relayers.allowlist) {
        console.log("\n\nWHITELIST RELAYERS");

        for (const network of protocol.networks) {
          const relayerProxyAddress = network.deployments.messaging.RelayerProxy.address;
          await updateIfNeeded({
            deployment: network.deployments.Connext,
            desired: true,
            read: { method: "approvedRelayers", args: [relayerProxyAddress] },
            write: { method: "addRelayer", args: [relayerProxyAddress] },
            chainData,
          });
        }

        // Whitelist named relayers for the Relayer Proxy, in order to call `execute`.
        for (const relayer of protocol.agents.relayers.allowlist) {
          for (const network of protocol.networks) {
            await updateIfNeeded({
              deployment: network.deployments.messaging.RelayerProxy,
              desired: true,
              read: { method: "allowedRelayer", args: [relayer] },
              write: { method: "addRelayer", args: [relayer] },
              chainData,
            });
          }
        }
        // Additionally, approve relayers as callers for connectors and root manager.
      }
      // TODO: Blacklist/remove relayers.
    }

    /// MARK - Sequencers
    if (protocol.agents.sequencers) {
      if (protocol.agents.sequencers.allowlist) {
        console.log("\n\nWHITELIST SEQUENCERS");
        // Allowlist named sequencers.
        for (const sequencer of protocol.agents.sequencers.allowlist) {
          for (const network of protocol.networks) {
            await updateIfNeeded({
              deployment: network.deployments.Connext,
              desired: true,
              read: { method: "approvedSequencers", args: [sequencer] },
              write: { method: "addSequencer", args: [sequencer] },
              chainData,
            });
          }
        }
      }
      // TODO: Blacklist/remove sequencers.
    }

    /// MARK - Routers
    if (protocol.agents.routers) {
      if (protocol.agents.routers.allowlist) {
        console.log("\n\nWHITELIST ROUTERS");
        // Allowlist connext routers.
        for (const router of protocol.agents.routers.allowlist) {
          for (const network of protocol.networks) {
            await updateIfNeeded({
              deployment: network.deployments.Connext,
              desired: true,
              read: { method: "getRouterApproval", args: [router] },
              // TODO: Should we enable configuring owner and recipient for this script, too?
              write: { method: "approveRouter", args: [router] },
              chainData,
            });
          }
        }
      }
      // TODO: Blacklist/remove routers.
    }
  }
};
