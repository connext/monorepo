import {
  createLoggingContext,
  Logger,
} from "@connext/nxtp-utils";
import { TransactionService, getConnextInterface } from "@connext/nxtp-txservice";
import { NxtpSdkBase, NxtpSdkUtils } from "@connext/sdk";
import { setupRouter, setupAsset, addLiquidity, addRelayer } from "./helpers/local";
import { BigNumber, constants, Contract, ContractInterface, providers, utils, Wallet } from "ethers";
import { expect } from "chai";
/**
 * NOTE: These deployment imports must be kept here (or any .ts file that won't be transpiled/compiled) due to local_1337 and local_1338
 * deployment step being a dependency for running these tests. If these imports are moved to a .ts file, `integrations` module will likely
 * be unable to build as local_1337 and local_1338 deployment files are not kept in the repository.
 *
 * If it's showing errors below, run `setup_integration_test.sh` script (in root) to generate the deployments.
 *
 * We use these imports to retrieve the deployment addresses dynamically at runtime, so the PARAMETERS config does not need to be hardcoded.
 */
// Local 1338 deployment imports:
import Connext_DiamondProxy_1338 from "@connext/smart-contracts/cicdResources/deployments/local_1338/Connext_DiamondProxy.json";
import TestERC20_1338 from "@connext/smart-contracts/cicdResources/deployments/local_1338/TestERC20.json";
// Local 1337 deployment imports:
import Connext_DiamondProxy_1337 from "@connext/smart-contracts/cicdResources/deployments/local_1337/Connext_DiamondProxy.json";
import TestERC20_1337 from "@connext/smart-contracts/cicdResources/deployments/local_1337/TestERC20.json";

import { DEPLOYER_WALLET, getParams, PARAMETERS as _PARAMETERS } from "./constants/local";

export const logger = new Logger({ name: "e2e" });

type Deployments = {
  Connext: string;
  TestERC20: string;
};

const getParameters = async () => {
  let _params = await getParams();
const PARAMS = {
  ..._params,
  A: {
    ..._params.A,
    DEPLOYMENTS: getDeployments(_params.A.CHAIN),
  },
  B: {
    ..._params.B,
    DEPLOYMENTS: getDeployments(_params.B.CHAIN),
  },
} as const;
  return PARAMS;
}

const deployerTxServiceFn = async() => {
  const PARAMS = await getParameters();
  return new TransactionService(
  logger,
  {
    [PARAMS.A.DOMAIN]: {
      providers: PARAMS.A.RPC,
      confirmations: 1,
    },
    [PARAMS.B.DOMAIN]: {
      providers: PARAMS.B.RPC,
      confirmations: 1,
    },
  },
  DEPLOYER_WALLET,
  true,
);
}

/**
 * Get deployments needed for E2E test for the specified chain.
 * @param _chain - Local chain for which we are getting deployment addresses.
 * @returns Deployments object.
 */
export const getDeployments = (_chain: string | number): Deployments => {
  const chain = _chain.toString();
  let result: Deployments;
  if (chain === "1337") {
    result = {
      Connext: Connext_DiamondProxy_1337.address,
      TestERC20: TestERC20_1337.address,
    };
  } else if (chain === "1338") {
    result = {
      Connext: Connext_DiamondProxy_1338.address,
      TestERC20: TestERC20_1338.address,
    };
  } else {
    throw new Error(`Chain ${chain} not supported! Cannot retrieve contract deployment addresses for that chain.`);
  }
  console.log(`Retrieved deployments for chain ${chain}:`, result);
  return result;
};

const { requestContext, methodContext } = createLoggingContext("e2e");
describe("LOCAL:E2E", async () => {
  let sdkBase: NxtpSdkBase;
  let sdkUtils: NxtpSdkUtils;
  

  before(async () => {
    const PARAMS = await getParameters();
    const originProvider = new providers.JsonRpcProvider(PARAMS.A.RPC[0]);
    const destinationProvider = new providers.JsonRpcProvider(PARAMS.B.RPC[0]);
    // Ensure automine is off.
    await originProvider.send("evm_setAutomine", [false]);
    await destinationProvider.send("evm_setAutomine", [false]);

    // Fund the user and relayer agents some ETH.
    await originProvider.send("hardhat_setBalance", [PARAMS.AGENTS.USER.address, "0x84595161401484A000000"]);
    await originProvider.send("hardhat_setBalance", [PARAMS.AGENTS.RELAYER.address, "0x84595161401484A000000"]);
    await destinationProvider.send("hardhat_setBalance", [PARAMS.AGENTS.USER.address, "0x84595161401484A000000"]);
    await destinationProvider.send("hardhat_setBalance", [
      PARAMS.AGENTS.RELAYER.address,
      "0x84595161401484A000000",
    ]);

    // Sanity checks: make sure addresses configured are correct by checking to make sure contracts are deployed
    // at those addresses (using `getCode`).
    for (const key of ["A", "B"]) {
      const config = PARAMS[key as "A" | "B"];
      const { CHAIN: chain, DEPLOYMENTS: deployments } = config;
      for (const [deployment, address] of Object.entries(deployments)) {
        const deployerTxService = await deployerTxServiceFn();
        const code = await deployerTxService.getCode(chain, address);
        if (code === "0x") {
          throw new Error(`No contract found at given ${deployment} address: ${address} on chain ${chain}!`);
        }
      }
    }

    // Peripherals.
    logger.info("Setting up sdk...");
    const sdkConfig = {
      chains: {
        [PARAMS.A.DOMAIN]: {
          assets: [{ address: PARAMS.A.DEPLOYMENTS.TestERC20, name: "TestERC20", symbol: "TEST" }],
          providers: PARAMS.A.RPC,
          deployments: {
            connext: PARAMS.A.DEPLOYMENTS.Connext,
            stableSwap: constants.AddressZero,
          },
        },
        [PARAMS.B.DOMAIN]: {
          assets: [
            {
              address: PARAMS.B.DEPLOYMENTS.TestERC20,
              name: "TestERC20",
              symbol: "TEST",
            },
          ],
          providers: PARAMS.B.RPC,
          deployments: {
            connext: PARAMS.B.DEPLOYMENTS.Connext,
            stableSwap: constants.AddressZero,
          },
        },
      },
      cartographerUrl: PARAMS.AGENTS.CARTOGRAPHER.url,
      environment: PARAMS.ENVIRONMENT as "production" | "staging",
      signerAddress: PARAMS.AGENTS.USER.address,
    };
    sdkBase = await NxtpSdkBase.create(sdkConfig);
    sdkUtils = await NxtpSdkUtils.create(sdkConfig);
    logger.info("Set up sdk.");

    // On-chain / contracts configuration, approvals, etc.
    // await onchainSetup(sdkBase);
  });

  it("add 1 + 1", async () => { 
    expect(1 + 1).to.equal(2);
  });
});
