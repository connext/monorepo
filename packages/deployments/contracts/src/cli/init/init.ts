import * as fs from "fs";

import { providers, Wallet, utils, constants } from "ethers";
import * as zk from "zksync-ethers";
import commandLineArgs from "command-line-args";
import { ajv, domainToChainId, getGelatoRelayerAddress, getChainData } from "@connext/nxtp-utils";
import { HttpNetworkUserConfig } from "hardhat/types";

import { canonizeId } from "../../domain";
import { hardhatNetworks } from "../../config";
import { updateIfNeeded } from "../helpers";

import {
  ProtocolStack,
  getDeployments,
  NetworkStack,
  HubMessagingDeployments,
  InitConfig,
  InitConfigSchema,
  AssetStack,
  SpokeMessagingDeployments,
  setupAsset,
  setupMessaging,
} from "./helpers";
import { DEFAULT_INIT_CONFIG } from "./config";

// defines which stages of the init script should be executed
const STAGES = ["messaging", "agents", "assets", "all"] as const;
type Stage = (typeof STAGES)[number];

export const optionDefinitions = [
  { name: "name", defaultOption: true, defaultValue: "all", multiple: true },
  { name: "network", type: String },
  { name: "env", type: String },
  { name: "apply", type: String, defaultValue: "false" },
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
  const { network, env, domains: _domains, apply: _apply, name: _name } = cmdArgs;
  const apply = _apply === "true";
  const name = _name as Stage[];
  if (!name.every((n) => STAGES.includes(n))) {
    throw new Error(`Name should be one of ${STAGES.join()}, name: ${name}`);
  }

  if (!["staging", "production"].includes(env as string)) {
    throw new Error(`Environment should be either staging or production, env: ${env}`);
  }

  if (!["local", "devnet", "testnet", "mainnet"].includes(network as string)) {
    throw new Error(`Network should be either testnet or mainnet, network: ${network}`);
  }

  const useStaging = env === "staging";
  console.log(`USING ${useStaging ? "STAGING" : "PRODUCTION"} AS ENVIRONMENT. DRYRUN: ${!apply}`);

  console.log(`Network: `, network);

  // Read init.json if exists
  const path =
    process.env.INIT_CONFIG_FILE ??
    (network === "devnet" ? "devnet.init.json" : network === "local" ? "local.init.json" : "init.json");
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
  const domains: string[] = _domains ?? supported;
  for (const domain of domains) {
    if (!supported.includes(domain)) {
      throw new Error(`Unsupported domain parsed!, domain: ${domain}, supported: ${supported}`);
    }
  }

  // Sanitation checks for hub domain and assets configuration
  const hubDomain = initConfig.hub;
  if (!domains.includes(hubDomain) || !supported.includes(hubDomain)) {
    throw new Error(`Supported domains MUST include the hub domain. hub: ${hubDomain}, supported: ${supported}`);
  }

  const _assets = initConfig.assets ?? [];
  for (const asset of _assets) {
    const assetDomains = [asset.canonical.domain].concat(Object.keys(asset.representations));

    const configuredDomains = domains.filter((domain) => assetDomains.includes(domain));
    const isSubset = configuredDomains.every((item) => domains.includes(item));
    if (!isSubset) {
      throw new Error(
        `Not configured asset domains, asset: ${asset.name}, canonical: (${asset.canonical.domain}, ${
          asset.canonical.address
        }), configured: ${configuredDomains.sort()}, parsed: ${supported.sort()}`,
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
      if (+domain === +asset.canonical.domain) continue;
      _extracted.representations[domain] = asset.representations[domain];
    }

    return _extracted;
  });

  /// MARK - Deployer
  // Get deployer mnemonic, which should be provided in env if not in the config.
  const privateKey = process.env.PRIVATE_KEY;
  const mnemonic = process.env.DEPLOYER || process.env.DEPLOYER_MNEMONIC || process.env.MNEMONIC;
  if (!mnemonic && !privateKey) {
    throw new Error(
      "Deployer mnemonic was not specified. Please specify `deployer` in the config file, " +
        "or set DEPLOYER or DEPLOYER_MNEMONIC in env.",
    );
  }

  const networks: NetworkStack[] = [];

  const filteredHardhatNetworks: { [key: string]: any } = {};
  for (const key in hardhatNetworks) {
    const network = (hardhatNetworks as { [key: string]: any })[key];
    if (
      !key.includes("fork") &&
      !key.includes("devnet") &&
      Object.keys(network as object).includes("chainId") &&
      Object.keys(network as object).includes("url")
    ) {
      filteredHardhatNetworks[key] = network;
    }
  }

  // Get deployments for each domain if not specified in the config.
  for (const domain of domains) {
    const chainId = domainToChainId(Number(domain));

    const chainConfig = Object.values(filteredHardhatNetworks).find(
      (networkConfig: any) => networkConfig["chainId"] == chainId,
    ) as HttpNetworkUserConfig & { zksync: boolean | undefined };

    if (!chainConfig || !chainConfig.url) {
      throw new Error(`Not configured network for chainId: ${chainId} in hardhat config`);
    }

    // Convert deployer from mnemonic to Wallet.
    let deployer;
    if (privateKey) {
      deployer = chainConfig.zksync ? new zk.Wallet(privateKey) : new Wallet(privateKey);
    } else {
      deployer = chainConfig.zksync ? zk.Wallet.fromMnemonic(mnemonic!) : Wallet.fromMnemonic(mnemonic!);
    }
    console.log(`domain: ${domain}, deployer: ${deployer.address}, rpc: ${chainConfig.url}`);

    const rpc = chainConfig.zksync ? new zk.Provider(chainConfig.url) : new providers.JsonRpcProvider(chainConfig.url);

    const isHub = domain === hubDomain;
    const deployments = getDeployments({
      deployer,
      chainInfo: { chain: chainId.toString(), rpc, zksync: chainConfig.zksync || false },
      isHub,
      useStaging,
      network,
    });

    // TODO: all agents should also be configured per-network
    if (!initConfig.agents.relayerFeeVaults[domain]) {
      throw new Error(`No relayer fee vault configured for ${domain}!`);
    }
    networks.push({
      signerAddress: deployer.address.toLowerCase(),
      chain: chainId.toString(),
      domain,
      rpc,
      deployments,
      relayerFeeVault: initConfig.agents.relayerFeeVaults[domain],
    });
  }

  const sanitized = {
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

  await initProtocol(sanitized, apply, name, useStaging);
};

/**
 * Handle configuration of the entire protocol, including messaging stack and connext diamond
 * contracts, across all listed domains.
 *
 * Should effectively be a diagnostic on the whole protocol, making sure that everything that
 * requires configuration and/or setup has been done so properly.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const initProtocol = async (protocol: ProtocolStack, apply: boolean, stages: Stage[], useStaging: boolean) => {
  /// ********************** SETUP **********************
  /// MARK - ChainData
  // Retrieve chain data for it to be saved locally; this will avoid those pesky logs and frontload the http request.
  const chainData = await getChainData();

  /// MARK - Stage helper
  const shouldExecute = (s: Stage): boolean => {
    return stages.includes(s) || stages[0] === "all";
  };

  /// ********************* Messaging **********************
  /// MARK - Messaging
  if (shouldExecute("messaging")) {
    await setupMessaging(protocol, apply);

    /// ********************* CONNEXT *********************
    /// MARK - Enroll Handlers
    console.log("\n\nENROLLING HANDLERS");
    for (let i = 0; i < protocol.networks.length; i++) {
      const targetNetwork = protocol.networks[i];
      const remoteNetworks = protocol.networks.filter((_, j) => j !== i);
      for (const remoteNetwork of remoteNetworks) {
        const desiredConnextion = remoteNetwork.deployments.Connext.address;
        await updateIfNeeded({
          apply,
          deployment: targetNetwork.deployments.Connext,
          desired: desiredConnextion,
          read: { method: "remote", args: [remoteNetwork.domain] },
          write: {
            method: "enrollRemoteRouter",
            args: [remoteNetwork.domain, utils.hexlify(canonizeId(desiredConnextion))],
          },
          auth: [
            { method: "owner", eval: (ret: string) => ret.toLowerCase() === targetNetwork.signerAddress },
            { method: "queryRole", args: [targetNetwork.signerAddress], eval: (ret: number) => ret === 3 },
          ],
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
        apply,
        deployment: Connext,
        desired: relayerFeeVault,
        read: { method: "relayerFeeVault" },
        write: { method: "setRelayerFeeVault", args: [relayerFeeVault] },
        auth: [
          { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
          { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 3 },
        ],
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
        apply,
        deployment: messaging.RelayerProxy,
        desired: Connext.address,
        read: { method: "connext" },
        write: { method: "setConnext", args: [Connext.address] },
        auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
        chainData,
      });

      // update spoke -- use MainnetConnector key if on hub
      const spokeConnector = isHub
        ? (messaging as HubMessagingDeployments).MainnetConnector.address
        : (messaging as SpokeMessagingDeployments).SpokeConnector.address;
      await updateIfNeeded({
        apply,
        deployment: messaging.RelayerProxy,
        desired: spokeConnector,
        read: { method: "spokeConnector" },
        write: { method: "setSpokeConnector", args: [spokeConnector] },
        auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
        chainData,
      });

      // TODO: gelato relayer
      // TODO: gelato fee connector

      // On hub, ensure the following are correctly set:
      // - root manager
      if (isHub) {
        const rootManager = (messaging as HubMessagingDeployments).RootManager.address;
        await updateIfNeeded({
          apply,
          deployment: messaging.RelayerProxy,
          desired: rootManager,
          read: { method: "rootManager" },
          write: { method: "setRootManager", args: [rootManager] },
          auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
          chainData,
        });
      }
    }
  }

  /// ********************* ASSETS **********************
  if (shouldExecute("assets")) {
    /// MARK - Register Assets
    console.log("\n\nREGISTER ASSETS");
    // Convert asset addresses: get canonical ID, canonical domain, convert to `key` hash.
    // Determine if a stableswap pool is needed - does asset have both `local` and `adopted`?
    // If so, initialize stableswap pool with `initializeSwap`.
    // Call `setupAsset` for each domain. This will:
    // - Set up mappings for canonical ID / canonical domain / adopted asset address / etc.
    // - Set up mapping for stableswap pool if applicable.

    // Sanity check: ensure that all assets have a unique canonical registration.
    const canonicals = protocol.assets.map((a) => a.canonical.domain + a.canonical.address);
    if (new Set(canonicals).size !== canonicals.length) {
      throw new Error(
        `Duplicate canonical asset detected! (unique: ${new Set(canonicals).size}; total: ${canonicals.length})`,
      );
    }

    // Sanity check, on each chain:
    // - no duplicate locals
    // - no duplicate adopteds
    const adopteds: Record<string, string[]> = {};
    const locals: Record<string, string[]> = {};
    protocol.assets.forEach((asset) => {
      Object.entries(asset.representations).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        // create the adopted and local mappings (domain => [tokenAddrs])
        if (!adopteds[key]) {
          adopteds[key] = [];
        }
        if (!locals[key]) {
          locals[key] = [];
        }
        if (value.adopted && value.adopted !== constants.AddressZero) {
          adopteds[key].push(value.adopted);
        }
        if (value.local && value.local !== constants.AddressZero) {
          locals[key].push(value.local);
        }
      });
    });
    Object.keys(locals).forEach((l) => {
      if (new Set(locals[l]).size !== locals[l].length) {
        throw new Error(
          `Duplicate local asset detected! (unique: ${new Set(locals[l].values())}; total: ${
            locals[l].length
          }, domain: ${l})`,
        );
      }
    });
    Object.keys(adopteds).forEach((l) => {
      if (new Set(adopteds[l]).size !== adopteds[l].length) {
        throw new Error(
          `Duplicate adopted asset detected! (unique: ${new Set(adopteds[l]).size}; total: ${
            adopteds[l].length
          }, domain: ${l})`,
        );
      }
    });

    for (const asset of protocol.assets) {
      await setupAsset({
        apply,
        asset,
        networks: protocol.networks,
        chainData,
        useStaging,
      });
    }
  }

  /// ********************* AGENTS **********************
  if (shouldExecute("agents")) {
    if (protocol.agents) {
      /// MARK - Watchers
      if (protocol.agents.watchers) {
        if (protocol.agents.watchers.allowlist) {
          console.log("\n\nWHITELIST WATCHERS");

          // Watchers are a permissioned role with the ability to disconnect malicious connectors.
          // Allowlist watchers in WatcherManager + Connext.
          for (const watcher of protocol.agents.watchers.allowlist) {
            for (const network of protocol.networks) {
              // Messaging layer watchers
              await updateIfNeeded({
                apply,
                deployment: network.deployments.messaging.WatcherManager,
                desired: true,
                auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
                read: { method: "isWatcher", args: [watcher] },
                write: { method: "addWatcher", args: [watcher] },
                chainData,
              });

              // Execution layer watchers
              await updateIfNeeded({
                apply,
                deployment: network.deployments.Connext,
                desired: 2,
                auth: [
                  { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
                  { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 3 },
                ],
                read: { method: "queryRole", args: [watcher] },
                write: { method: "assignRoleWatcher", args: [watcher] },
                chainData,
              });
            }
          }
        }
        // TODO: Blacklist/remove watchers.
      }

      /// MARK - Proposers
      console.log("\n\nWHITELIST PROPOSERS");

      // Define helper function
      const whitelistProposerOnRootAndSpoke = async (proposer: string, network: NetworkStack) => {
        const isHub = network.domain === protocol.hub;
        // Whitelist on spoke connector
        await updateIfNeeded({
          apply,
          deployment: isHub
            ? (network.deployments.messaging as HubMessagingDeployments).MainnetConnector
            : (network.deployments.messaging as SpokeMessagingDeployments).SpokeConnector,
          desired: true,
          read: { method: "allowlistedProposers", args: [proposer] },
          write: { method: "addProposer", args: [proposer] },
          auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
          chainData,
        });

        if (!isHub) {
          return;
        }

        // Whitelist on root manager
        await updateIfNeeded({
          apply,
          deployment: (network.deployments.messaging as HubMessagingDeployments).RootManager,
          desired: true,
          read: { method: "allowlistedProposers", args: [proposer] },
          write: { method: "addProposer", args: [proposer] },
          auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
          chainData,
        });
      };

      // Allowlist proxy address as proposer
      console.log("\tVerifying RelayerProxies are set as proposers.");
      for (const network of protocol.networks) {
        await whitelistProposerOnRootAndSpoke(network.deployments.messaging.RelayerProxy.address, network);
      }

      // Allowlist named proposers.
      if (protocol.agents.proposers?.allowlist) {
        for (const proposer of protocol.agents.proposers.allowlist) {
          console.log("\tVerifying agents are set as proposers.");
          for (const network of protocol.networks) {
            await whitelistProposerOnRootAndSpoke(proposer, network);
          }

          // TODO: Blacklist/remove proposers.
        }
      }

      /// MARK - Relayers
      if (protocol.agents.relayers) {
        console.log("\n\nWHITELIST RELAYERS");

        console.log("\tVerifying RelayerProxy setup.");
        for (const network of protocol.networks) {
          // whitelist relayer proxy as relayer on connext
          const relayerProxyAddress = network.deployments.messaging.RelayerProxy.address;
          await updateIfNeeded({
            apply,
            deployment: network.deployments.Connext,
            desired: true,
            read: { method: "approvedRelayers", args: [relayerProxyAddress] },
            write: { method: "addRelayer", args: [relayerProxyAddress] },
            auth: [
              { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
              { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 3 },
            ],
            chainData,
          });

          // set gelato relayer address on relayer proxy
          await updateIfNeeded({
            apply,
            deployment: network.deployments.messaging.RelayerProxy,
            desired: getGelatoRelayerAddress(network.domain),
            read: { method: "gelatoRelayer" },
            write: { method: "setGelatoRelayer", args: [getGelatoRelayerAddress(network.domain)] },
            chainData,
            auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
          });

          // set fee collector on relayer proxy
          const feeCollector = network.relayerFeeVault;
          await updateIfNeeded({
            apply,
            deployment: network.deployments.messaging.RelayerProxy,
            desired: feeCollector,
            read: { method: "feeCollector" },
            write: { method: "setFeeCollector", args: [feeCollector] },
            chainData,
            auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
          });

          // Whitelist gelato relayer on the Relayer Proxy + Connext
          await updateIfNeeded({
            apply,
            deployment: network.deployments.messaging.RelayerProxy,
            desired: true,
            read: { method: "allowedRelayer", args: [getGelatoRelayerAddress(network.domain)] },
            write: { method: "addRelayer", args: [getGelatoRelayerAddress(network.domain)] },
            chainData,
            auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
          });

          // also add gelato to the base connext contract
          await updateIfNeeded({
            apply,
            deployment: network.deployments.Connext,
            desired: true,
            read: { method: "approvedRelayers", args: [getGelatoRelayerAddress(network.domain)] },
            write: { method: "addRelayer", args: [getGelatoRelayerAddress(network.domain)] },
            auth: [
              { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
              { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 3 },
            ],
            chainData,
          });
        }

        if (protocol.agents.relayers.allowlist) {
          // Whitelist named relayers for the Relayer Proxy, in order to call `execute`.
          console.log("\tWhitelisting named relayers on RelayerProxy + Connext");
          for (const relayer of protocol.agents.relayers.allowlist) {
            for (const network of protocol.networks) {
              await updateIfNeeded({
                apply,
                deployment: network.deployments.messaging.RelayerProxy,
                desired: true,
                read: { method: "allowedRelayer", args: [relayer] },
                write: { method: "addRelayer", args: [relayer] },
                chainData,
                auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
              });

              // also add relayers to the base connext contract
              await updateIfNeeded({
                apply,
                deployment: network.deployments.Connext,
                desired: true,
                read: { method: "approvedRelayers", args: [relayer] },
                write: { method: "addRelayer", args: [relayer] },
                auth: [
                  { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
                  { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 3 },
                ],
                chainData,
              });
            }
          }
        }

        if (protocol.agents.relayers.blacklist) {
          // Blacklist named relayers for the relayer proxy / connext
          console.log("\tBlacklisting named relayers on RelayerProxy + Connext");
          for (const relayer of protocol.agents.relayers.blacklist) {
            for (const network of protocol.networks) {
              await updateIfNeeded({
                apply,
                deployment: network.deployments.messaging.RelayerProxy,
                desired: false,
                read: { method: "allowedRelayer", args: [relayer] },
                write: { method: "removeRelayer", args: [relayer] },
                chainData,
                auth: { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
              });

              // also add relayers to the base connext contract
              await updateIfNeeded({
                apply,
                deployment: network.deployments.Connext,
                desired: false,
                read: { method: "approvedRelayers", args: [relayer] },
                write: { method: "removeRelayer", args: [relayer] },
                auth: [
                  { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
                  { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 3 },
                ],
                chainData,
              });
            }
          }
        }
      }

      /// MARK - Sequencers
      if (protocol.agents.sequencers) {
        if (protocol.agents.sequencers.allowlist) {
          console.log("\n\nWHITELIST SEQUENCERS");
          // Allowlist named sequencers.
          for (const sequencer of protocol.agents.sequencers.allowlist) {
            for (const network of protocol.networks) {
              await updateIfNeeded({
                apply,
                deployment: network.deployments.Connext,
                desired: true,
                read: { method: "approvedSequencers", args: [sequencer] },
                write: { method: "addSequencer", args: [sequencer] },
                auth: [
                  { method: "owner", eval: (ret: string) => ret.toLowerCase() === network.signerAddress },
                  { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 3 },
                ],
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
                apply,
                deployment: network.deployments.Connext,
                desired: true,
                // router admin submits (can be owner, assume router admin)
                auth: [
                  {
                    method: "owner",
                    eval: (ret: string) => {
                      return ret.toLowerCase() === network.signerAddress.toLowerCase();
                    },
                  },
                  { method: "queryRole", args: [network.signerAddress], eval: (ret) => ret === 1 },
                ],
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
  }
};
