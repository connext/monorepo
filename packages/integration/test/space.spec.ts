import { createLoggingContext, Logger, ERC20Abi } from "@connext/nxtp-utils";
import { TransactionService, getConnextInterface } from "@connext/nxtp-txservice";
import { NxtpSdkBase, NxtpSdkUtils } from "@connext/nxtp-sdk";
import { setupRouter, setupAsset, addLiquidity, addRelayer, addSequencer } from "./helpers/local";
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
import Connext_DiamondProxy_1338 from "@connext/nxtp-contracts/cicdResources/deployments/local_1338/Connext_DiamondProxy.json";
import TestERC20_1338 from "@connext/nxtp-contracts/cicdResources/deployments/local_1338/TestERC20.json";
// Local 1337 deployment imports:
import Connext_DiamondProxy_1337 from "@connext/nxtp-contracts/cicdResources/deployments/local_1337/Connext_DiamondProxy.json";
import TestERC20_1337 from "@connext/nxtp-contracts/cicdResources/deployments/local_1337/TestERC20.json";

import { DEPLOYER_WALLET, USER_WALLET, getParams } from "./constants/local";

export const logger = new Logger({ name: "e2e" });

type Deployments = {
  Connext: string;
  TestERC20: string;
};

const getParameters = async () => {
  const _params = await getParams();
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
};

const deployerTxServiceFn = async () => {
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
};

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

const onchainSetup = async (sdkBase: NxtpSdkBase) => {
  // TODO: Mirror connectors set up for messaging
  // TODO: Allowlist messaging routers as callers of dispatch?
  // TODO: Approve relayers as caller for connectors and root manager?
  const PARAMETERS = await getParameters();

  const deployerTxService = new TransactionService(
    logger,
    {
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
  const userTxService = new TransactionService(
    logger,
    {
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

  logger.info("Setting up router...");
  await setupRouter(
    PARAMETERS.AGENTS.ROUTER.address,
    [
      { Connext: PARAMETERS.A.DEPLOYMENTS.Connext, domain: PARAMETERS.A.DOMAIN },
      { Connext: PARAMETERS.B.DEPLOYMENTS.Connext, domain: PARAMETERS.B.DOMAIN },
    ],
    deployerTxService,
  );
  logger.info("Set up router.");

  logger.info("Setting up assets...");
  await setupAsset(
    { domain: PARAMETERS.A.DOMAIN, tokenAddress: PARAMETERS.A.DEPLOYMENTS.TestERC20 },
    [
      {
        domain: PARAMETERS.A.DOMAIN,
        Connext: PARAMETERS.A.DEPLOYMENTS.Connext,
        // NOTE: Same as local; this means we won't be doing any swaps.
        adopted: constants.AddressZero,
        local: PARAMETERS.A.DEPLOYMENTS.TestERC20,
      },
      {
        domain: PARAMETERS.B.DOMAIN,
        Connext: PARAMETERS.B.DEPLOYMENTS.Connext,
        // NOTE: Same as local; this means we won't be doing any swaps.
        adopted: constants.AddressZero,
        local: PARAMETERS.B.DEPLOYMENTS.TestERC20,
      },
    ],
    deployerTxService,
    logger,
  );
  logger.info("Set up assets.");

  logger.info(`Adding liquidity for router: ${PARAMETERS.AGENTS.ROUTER.address}...`);
  await addLiquidity(
    [
      {
        domain: PARAMETERS.A.DOMAIN,
        amount: utils.parseEther("100").toString(),
        router: PARAMETERS.AGENTS.ROUTER.address,
        asset: PARAMETERS.A.DEPLOYMENTS.TestERC20,
        Connext: PARAMETERS.A.DEPLOYMENTS.Connext,
      },
      {
        domain: PARAMETERS.B.DOMAIN,
        amount: utils.parseEther("100").toString(),
        router: PARAMETERS.AGENTS.ROUTER.address,
        asset: PARAMETERS.B.DEPLOYMENTS.TestERC20,
        Connext: PARAMETERS.B.DEPLOYMENTS.Connext,
      },
    ],
    deployerTxService,
    logger,
  );
  logger.info("Added liquidity.");

  logger.info(`Adding a relayer: ${PARAMETERS.AGENTS.RELAYER.address}`);
  await addRelayer(
    [
      {
        domain: PARAMETERS.A.DOMAIN,
        relayer: PARAMETERS.AGENTS.RELAYER.address,
        Connext: PARAMETERS.A.DEPLOYMENTS.Connext,
      },
      {
        domain: PARAMETERS.B.DOMAIN,
        relayer: PARAMETERS.AGENTS.RELAYER.address,
        Connext: PARAMETERS.B.DEPLOYMENTS.Connext,
      },
    ],
    deployerTxService,
    logger,
  );

  logger.info(`Adding a sequencer: ${PARAMETERS.AGENTS.SEQUENCER.address}`);
  await addSequencer(
    [
      {
        domain: PARAMETERS.A.DOMAIN,
        sequencer: PARAMETERS.AGENTS.SEQUENCER.address,
        Connext: PARAMETERS.A.DEPLOYMENTS.Connext,
      },
      {
        domain: PARAMETERS.B.DOMAIN,
        sequencer: PARAMETERS.AGENTS.SEQUENCER.address,
        Connext: PARAMETERS.B.DEPLOYMENTS.Connext,
      },
    ],
    deployerTxService,
    logger,
  );

  // TODO: Read user's balance and skip if they already have TEST tokens.
  logger.info("Minting tokens for user agent...");
  {
    const erc20 = new utils.Interface(ERC20Abi);
    const amount = BigNumber.from("1000000000000000");
    const encoded = erc20.encodeFunctionData("mint", [PARAMETERS.AGENTS.USER.address, amount]);
    const receipt = await deployerTxService.sendTx(
      {
        chainId: 1337,
        to: PARAMETERS.A.DEPLOYMENTS.TestERC20,
        data: encoded,
        value: BigNumber.from("0"),
      },
      requestContext,
    );
    logger.info("Minted tokens.", requestContext, methodContext, {
      amount: amount.toString(),
      asset: PARAMETERS.A.DEPLOYMENTS.TestERC20,
      txHash: receipt.transactionHash,
    });

    const balanceOfData = erc20.encodeFunctionData("balanceOf", [PARAMETERS.AGENTS.USER.address]);
    const res = await deployerTxService.readTx({
      chainId: PARAMETERS.A.CHAIN,
      data: balanceOfData,
      to: PARAMETERS.A.DEPLOYMENTS.TestERC20,
    });
    const [tokenBalance] = erc20.decodeFunctionResult("balanceOf", res);
    logger.info(`New user token balance: ${tokenBalance.toString()}`);
  }

  let tx = await sdkBase.approveIfNeeded(PARAMETERS.A.DOMAIN, PARAMETERS.A.DEPLOYMENTS.TestERC20, "1", true);
  if (tx) {
    await userTxService.sendTx(
      { chainId: PARAMETERS.A.CHAIN, to: tx.to!, value: 0, data: utils.hexlify(tx.data!) },
      requestContext,
    );
  }
  tx = await sdkBase.approveIfNeeded(PARAMETERS.B.DOMAIN, PARAMETERS.B.DEPLOYMENTS.TestERC20, "1", true);
  if (tx) {
    await userTxService.sendTx(
      { chainId: PARAMETERS.B.CHAIN, to: tx.to!, value: 0, data: utils.hexlify(tx.data!) },
      requestContext,
    );
  }
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
    await destinationProvider.send("hardhat_setBalance", [PARAMS.AGENTS.RELAYER.address, "0x84595161401484A000000"]);

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
    await onchainSetup(sdkBase);
  });

  it("add 1 + 1", async () => {
    expect(1 + 1).to.equal(2);
  });
});
