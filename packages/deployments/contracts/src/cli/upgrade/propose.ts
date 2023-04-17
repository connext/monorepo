import { writeFileSync } from "fs";
import { resolve } from "path";
import { exec } from "child_process";
import * as util from "util";

import { constants, Contract, providers } from "ethers";
import commandLineArgs from "command-line-args";
import { FacetCut } from "hardhat-deploy/types";
import { HardhatUserConfig } from "hardhat/types";

import { getProposedFacetCuts } from "../../../deployHelpers/getProposedFacetCuts";
import { Env, getDeploymentName } from "../../utils";
import { hardhatNetworks, SUPPORTED_CHAINS } from "../../config";
import { delay } from "../../domain";
import { DiamondCutFacet__factory } from "../../typechain-types";

import { FORK_BLOCKS, getDeployments } from "./helpers";

const execAsync = util.promisify(exec);

const DEFAULT_TAG = "relayer-fee-upgrade";

export const optionDefinitions = [
  { name: "env", type: String },
  { name: "network", type: String },
  { name: "chains", type: Number, multiple: true },
  { name: "tag", type: String, defaultValue: DEFAULT_TAG },
];

type NetworkContext = {
  name: string;
  config: HardhatUserConfig;
  rpc: string;
};

type ForkContext = {
  default: NetworkContext;
  fork: NetworkContext;
};

// sanitation checks before running the `hardhat deploy` command
const preflight = async (tag: string, networkInfo: ForkContext) => {
  if (tag === "relayer-fee-upgrade") {
    // Should delete the existing deployment from the copied-over fork
    // to ensure the deployment is not reused

    // fork names are in format: 5_staging_fork
    const env = networkInfo.fork.name.includes("staging") ? "staging" : "production";
    const file = getDeploymentName("BridgeFacet", env);
    const path = resolve(`./deployments/${networkInfo.fork.name}/${file}.json`);
    const remove = `rm -rf ${path}`;
    console.log(`\ntrying to remove ${file}:`, remove);
    await execAsync(remove);
    return;
  }
  throw new Error(`Ensure no preflight needed for ${tag}`);
};

const deployAgainstForks = async (chains: number[], tag: string): Promise<Record<number, ForkContext>> => {
  // for each chain, start an anvil fork and store the rpc url
  const networkInfo: Record<number, ForkContext> = {};

  // create all the forks + populate the network info
  for (const chain of chains) {
    const forkBlock = (FORK_BLOCKS as any)[chain];
    // get the hardhat config
    const [forkName, forkConfig] = Object.entries(hardhatNetworks).find(([name, networkConfig]) => {
      return name.includes(`fork`) && (networkConfig as any)?.chainId === chain;
    }) as any;
    const [name, config] = Object.entries(hardhatNetworks).find(([name, networkConfig]) => {
      return !name.includes(`fork`) && (networkConfig as any)?.chainId === chain;
    }) as any;
    if (!config?.url || !forkConfig?.url) {
      throw new Error(`Could not find url for chainId: ${chain}`);
    }
    const port = +forkConfig.url.split("http://")[1].split(":")[1];
    const command = `anvil --fork-url ${config.url} --fork-block-number ${forkBlock} --port ${port} --block-time 2 >/dev/null 2>&1 &`;
    console.log(`\ntrying to create fork ${chain}:`, command);
    await execAsync(command);

    // sanity check: provider functional
    let match = false;
    let attempt = 0;
    while (!match && attempt < 5) {
      try {
        const forkN = await new providers.JsonRpcProvider(forkConfig.url as string).getNetwork();
        const n = await new providers.JsonRpcProvider(config.url as string).getNetwork();
        if (n.chainId === forkN.chainId) {
          match = true;
        }
      } catch (e: any) {}
      await delay(750);
      attempt++;
    }

    // update network info
    networkInfo[chain] = {
      default: { name, config, rpc: config.url! },
      fork: { name: forkName, config: forkConfig, rpc: forkConfig.url },
    };
  }

  // copy all current deployments to the `deployments` folder
  for (const chain of chains) {
    const forkDirectory = resolve(`./deployments/${networkInfo[chain].fork.name}`);
    const sourceDirectory = resolve(`./deployments/${networkInfo[chain].default.name}`);
    console.log(`chain`, chain);
    // remove all deployments from chain
    const remove = `rm -rf ${forkDirectory}`;
    console.log(`\ntrying to remove deployments:`, remove);
    await execAsync(remove);

    const copy = `cp -R ${sourceDirectory} ${forkDirectory}`;
    console.log(`\ntrying to copy over deployments:`, copy);
    await execAsync(copy);
    console.log(`completed copying deployment on ${chain}`);

    // run preflight
    await preflight(tag, networkInfo[chain]);
  }

  // deploy all the facets
  for (const chain of chains) {
    const deploy = `yarn workspace @connext/smart-contracts hardhat deploy --network ${networkInfo[chain].fork.name} --tags "${tag}"`;
    console.log(`\ntrying to run deploy cmd:`, deploy);
    const { stderr, stdout } = await execAsync(deploy);
    if (stderr) {
      console.log(stderr);
      continue;
    }
    console.log(stdout);
    console.log(`completed deployment of facets on ${chain}`);
  }

  // return rpcs
  return networkInfo;
};

export const getDiamondUpgradeProposal = async () => {
  let cmdArgs: any;
  try {
    cmdArgs = commandLineArgs(optionDefinitions);
  } catch (err: any) {
    throw new Error(`Parsing arguments failed, cmdArgs: ${process.argv}`);
  }

  // Validate command line arguments
  // const chains = [1, 10, 56, 100, 137, 42161];
  const { env: _env, chains: _chains, network: _network, tag } = cmdArgs;
  const network: "testnet" | "mainnet" = _network ?? process.env.NETWORK ?? "testnet";
  const env: Env = _env ?? process.env.ENV ?? "staging";
  const chains: number[] = _chains ?? SUPPORTED_CHAINS[network];
  if (!["testnet", "mainnet"].includes(network as string)) {
    throw new Error(`Environment should be either staging or production, env: ${env}`);
  }

  if (!["staging", "production"].includes(env as string)) {
    throw new Error(`Environment should be either staging or production, env: ${env}`);
  }

  // deploy all the facets against a fork of the chain. when proposing, will use the
  // current `Connext` deployment on the mirroring fork chain
  const completeNetwork = await deployAgainstForks(chains, tag as string);

  const forkBlocks = chains.map((c) => (FORK_BLOCKS as any)[c] ?? 0);
  const chainCuts: Record<
    number,
    { proposal: (FacetCut & { code: string })[]; connext: string; numberOfCuts: number }
  > & {
    chains: number[];
    rpcs: string[];
    forkBlocks: number[];
    passed: false;
  } = { forkBlocks, chains, rpcs: Object.values(completeNetwork).map((n) => n.default.rpc), passed: false };
  for (const chain of chains) {
    // get the hardhat config
    const [, config]: any = Object.entries(hardhatNetworks).find(
      ([name, c]: [string, any]) => c.chainId === chain && name.includes("fork"),
    );
    if (!config?.url) {
      throw new Error(`Could not find url for chainId: ${chain}`);
    }
    // get provider for fork chain
    const forkProvider = new providers.JsonRpcProvider(config.url as string);
    // get all the deployments
    const deployments = getDeployments(`${chain}`, env);

    // generate the facet options
    const { Connext, ...facets } = deployments;
    const facetOptions = Object.values(facets).map((deployment) => {
      return {
        name: deployment.name,
        contract: deployment.contract.connect(forkProvider),
      };
    });

    // this is the connext address / abi of the non-fork deployment on the
    // forked chain
    const connext = new Contract(Connext.address, Connext.abi, forkProvider);

    // get excluded facets
    const excludedFacets = facetOptions
      .filter((f) => f.name.includes("DiamondLoupeFacet"))
      .map((c) => c.contract.address);

    // get the proposed cut
    const namedCuts = await getProposedFacetCuts(facetOptions, connext, excludedFacets);
    // write to file without `name` field (matching contract call)
    const proposal = await Promise.all(
      namedCuts.map(async (n) => {
        const match = facetOptions.find((f) => f.name.toLowerCase() === n.name.toLowerCase());
        if (!match) {
          throw new Error(`Could not find match for ${n.name}`);
        }
        return {
          ...n,
          code: await forkProvider.getCode(n.facetAddress),
        };
      }),
    );
    chainCuts[chain] = {
      numberOfCuts: namedCuts.length,
      connext: Connext.address,
      proposal,
    };
  }

  // write cuts output to json file
  writeFileSync("cuts.json", JSON.stringify(chainCuts), { encoding: "utf-8" });

  // run the forge fork tests
  const forgeTest = `yarn forge test -vv --ffi --match-path '*/upgrade/**.sol'`;
  console.log(`\nrunning forge fork tests with command:`, forgeTest);
  const { stderr, stdout } = await execAsync(forgeTest);
  console.log("forge stdout", stdout);

  if (stderr) {
    console.log("forge stderr", stderr);
  } else {
    // write the proposals to file
    // write that tests passed + proposal txs to file
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passed: _p, rpcs: _r, chains: _c, forkBlocks: _f, ...proposals } = chainCuts;
    const txs = Object.entries(proposals).map(([chain, value]) => {
      const data = DiamondCutFacet__factory.createInterface().encodeFunctionData("proposeDiamondCut", [
        value.proposal.map((p) => ({
          facetAddress: p.facetAddress,
          action: p.action,
          functionSelectors: p.functionSelectors,
        })),
        constants.AddressZero,
        "0x",
      ]);
      return {
        chain,
        to: value.connext,
        data,
      };
    });
    writeFileSync("proposals.json", JSON.stringify(txs), { encoding: "utf-8" });
    writeFileSync("cuts.json", JSON.stringify({ ...chainCuts, passed: true }), { encoding: "utf-8" });
  }

  // kill all the forks
  const kill = `pkill -f anvil`;
  console.log(`\ntrying to kill all forks:`, kill);
  await execAsync(kill);
};
