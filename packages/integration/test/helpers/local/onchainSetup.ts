import { TransactionService } from "@connext/nxtp-txservice";
import { ERC20Abi } from "@connext/nxtp-utils";

import { DEPLOYER_WALLET, ROUTER_WALLET, PARAMETERS as _PARAMETERS, USER_WALLET } from "../../constants/local";
import { logger } from "./logger";

/**
 * NOTE: These deployment imports must be kept here (or any .ts file that won't be transpiled/compiled) due to local-optimism and local-arbitrum
 * deployment step being a dependency for running these tests. If these imports are moved to a .ts file, `integrations` module will likely
 * be unable to build as local-optimism and local-arbitrum deployment files are not kept in the repository.
 *
 * If it's showing errors below, run `setup_integration_test.sh` script (in root) to generate the deployments.
 *
 * We use these imports to retrieve the deployment addresses dynamically at runtime, so the PARAMETERS config does not need to be hardcoded.
 */
// Local Mainnet deployment imports: chain-id: 31337
import Connext_DiamondProxy_Mainnet from "@connext/smart-contracts/deployments/local-mainnet/Connext_DiamondProxy.json";
import TestERC20_Mainnet from "@connext/smart-contracts/deployments/local-mainnet/TestERC20.json";
import SpokeConnector_Mainnet from "@connext/smart-contracts/deployments/local-mainnet/MainnetSpokeConnector.json";
import RootManager_Mainnet from "@connext/smart-contracts/deployments/local-mainnet/RootManager.json";
import HubConnector_Optimism from "@connext/smart-contracts/deployments/local-mainnet/OptimismHubConnector.json";
import HubConnector_Arbitrum from "@connext/smart-contracts/deployments/local-mainnet/ArbitrumHubConnector.json";
// Local Optimism deployment imports: chain id: 31338
import Connext_DiamondProxy_Optimism from "@connext/smart-contracts/deployments/local-optimism/Connext_DiamondProxy.json";
import TestERC20_Optimism from "@connext/smart-contracts/deployments/local-optimism/TestERC20.json";
import SpokeConnector_Optimism from "@connext/smart-contracts/deployments/local-optimism/OptimismSpokeConnector.json";
// Local Arbitrum deployment imports: chain-id: 31339
import Connext_DiamondProxy_Arbitrum from "@connext/smart-contracts/deployments/local-arbitrum/Connext_DiamondProxy.json";
import TestERC20_Arbitrum from "@connext/smart-contracts/deployments/local-arbitrum/TestERC20.json";
import SpokeConnector_Arbitrum from "@connext/smart-contracts/deployments/local-arbitrum/ArbitrumSpokeConnector.json";
import { canonizeId } from "@connext/smart-contracts";
import { Contract, providers, utils } from "ethers";
import { addLiquidity } from "./addLiquidity";

export type Deployments = {
  Connext: string;
  TestERC20: string;
  SpokeConnector: string;
  HubConnectorA?: string;
  HubConnectorB?: string;
  RootManager?: string;
};

export const LocalDeployments: Record<string, Deployments> = {
  "31337": {
    Connext: Connext_DiamondProxy_Mainnet.address,
    TestERC20: TestERC20_Mainnet.address,
    SpokeConnector: SpokeConnector_Mainnet.address,
    RootManager: RootManager_Mainnet.address,
    HubConnectorA: HubConnector_Optimism.address,
    HubConnectorB: HubConnector_Arbitrum.address,
  },
  "31338": {
    Connext: Connext_DiamondProxy_Optimism.address,
    TestERC20: TestERC20_Optimism.address,
    SpokeConnector: SpokeConnector_Optimism.address,
  },
  "31339": {
    Connext: Connext_DiamondProxy_Arbitrum.address,
    TestERC20: TestERC20_Arbitrum.address,
    SpokeConnector: SpokeConnector_Arbitrum.address,
  },
};
/**
 * Get deployments needed for E2E test for the specified chain.
 * @param _chain - Local chain for which we are getting deployment addresses.
 * @returns Deployments object.
 */
export const getDeployments = (_chain: string | number): Deployments => {
  const chain = _chain.toString();

  const result: Deployments = LocalDeployments[chain] ?? undefined;
  if (!result) {
    throw new Error(`Chain ${chain} not supported! Cannot retrieve contract deployment addresses for that chain.`);
  }
  console.log(`Retrieved deployments for chain ${chain}:`, result);
  return result;
};

// Add deployment addresses to the config PARAMETERS constant.
export const PARAMETERS = {
  ..._PARAMETERS,
  HUB: {
    ..._PARAMETERS.HUB,
    DEPLOYMENTS: getDeployments(_PARAMETERS.HUB.CHAIN),
  },
  A: {
    ..._PARAMETERS.A,
    DEPLOYMENTS: getDeployments(_PARAMETERS.A.CHAIN),
  },
  B: {
    ..._PARAMETERS.B,
    DEPLOYMENTS: getDeployments(_PARAMETERS.B.CHAIN),
  },
} as const;

export const deployerTxService = new TransactionService(
  logger,
  {
    [PARAMETERS.HUB.DOMAIN]: {
      providers: PARAMETERS.HUB.RPC,
      confirmations: 1,
    },
    [PARAMETERS.A.DOMAIN]: {
      providers: PARAMETERS.A.RPC,
      confirmations: 1,
    },
    [PARAMETERS.B.DOMAIN]: {
      providers: PARAMETERS.B.RPC,
      confirmations: 1,
    },
  },
  DEPLOYER_WALLET,
  true,
);

export const userTxService = new TransactionService(
  logger,
  {
    [PARAMETERS.HUB.DOMAIN]: {
      providers: PARAMETERS.HUB.RPC,
    },
    [PARAMETERS.A.DOMAIN]: {
      providers: PARAMETERS.A.RPC,
    },
    [PARAMETERS.B.DOMAIN]: {
      providers: PARAMETERS.B.RPC,
    },
  },
  USER_WALLET,
  true,
);

export const routerTxService = new TransactionService(
  logger,
  {
    [PARAMETERS.HUB.DOMAIN]: {
      providers: PARAMETERS.HUB.RPC,
      confirmations: 1,
    },
    [PARAMETERS.A.DOMAIN]: {
      providers: PARAMETERS.A.RPC,
      confirmations: 1,
    },
    [PARAMETERS.B.DOMAIN]: {
      providers: PARAMETERS.B.RPC,
      confirmations: 1,
    },
  },
  ROUTER_WALLET,
  true,
);

export const onchainSetup = async () => {
  logger.info("Minting TEST tokens for setup");
  for (const key of ["HUB", "A", "B"]) {
    const deployments = getDeployments((PARAMETERS as any)[key].DOMAIN);
    const rpcUrl = (PARAMETERS as any)[key].RPC[0] as string;
    const deployer = PARAMETERS.AGENTS.DEPLOYER.signer.connect(new providers.JsonRpcProvider(rpcUrl));
    const user = PARAMETERS.AGENTS.USER.signer.connect(new providers.JsonRpcProvider(rpcUrl));

    for (const signer of [deployer, user]) {
      const tokenContract = new Contract(deployments.TestERC20, ERC20Abi, signer);
      const assetBalance = await tokenContract.balanceOf(signer.address);
      const tx = await tokenContract.mint(signer.address, utils.parseEther("10000000"));
      await tx.wait();
      const afterBalance = await tokenContract.balanceOf(signer.address);
      console.log({ before: assetBalance.toString(), after: afterBalance.toString() });
    }
  }

  logger.info(`Adding liquidity for router: ${PARAMETERS.AGENTS.ROUTER.address}...`);
  const canonicalId = utils.hexlify(canonizeId(PARAMETERS.HUB.DEPLOYMENTS.TestERC20));
  await addLiquidity(
    [
      {
        domain: PARAMETERS.HUB.DOMAIN,
        amount: utils.parseEther("100").toString(),
        router: PARAMETERS.AGENTS.ROUTER.address,
        canonicalId: canonicalId,
        canonicalDomain: PARAMETERS.HUB.DOMAIN,
        Connext: PARAMETERS.HUB.DEPLOYMENTS.Connext,
      },
      {
        domain: PARAMETERS.A.DOMAIN,
        amount: utils.parseEther("100").toString(),
        router: PARAMETERS.AGENTS.ROUTER.address,
        canonicalId: canonicalId,
        canonicalDomain: PARAMETERS.HUB.DOMAIN,
        Connext: PARAMETERS.A.DEPLOYMENTS.Connext,
      },
      {
        domain: PARAMETERS.B.DOMAIN,
        amount: utils.parseEther("100").toString(),
        router: PARAMETERS.AGENTS.ROUTER.address,
        canonicalId: canonicalId,
        canonicalDomain: PARAMETERS.HUB.DOMAIN,
        Connext: PARAMETERS.B.DEPLOYMENTS.Connext,
      },
    ],
    deployerTxService,
    logger,
  );
  logger.info("Added liquidity.");
};
