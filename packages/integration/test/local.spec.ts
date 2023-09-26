import axios, { AxiosResponse } from "axios";
import {
  createLoggingContext,
  Logger,
  ExecuteFastApiGetExecStatusResponse,
  SequencerApiErrorResponse,
  ERC20Abi,
  convertFromDbTransfer,
  XTransfer,
  XTransferStatus,
  createRequestContext,
} from "@connext/nxtp-utils";
import { TransactionService, getConnextInterface } from "@connext/nxtp-txservice";
import { SdkBase, SdkUtils } from "@connext/sdk-core";
import { BigNumber, constants, Contract, ContractInterface, providers, utils, Wallet } from "ethers";
import { expect } from "chai";
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

import {
  ConnextInterface,
  AdminSpokeConnectorInterface,
  AdminHubConnectorInterface,
  RootManagerInterface,
  canonizeId,
} from "@connext/smart-contracts";

import { pollSomething } from "./helpers/shared";
import { setupRouter, addLiquidity, addRelayer, sendXCall } from "./helpers/local";
import {
  DEPLOYER_WALLET,
  ROUTER_WALLET,
  PARAMETERS as _PARAMETERS,
  SUBG_POLL_PARITY,
  USER_WALLET,
} from "./constants/local";
import { addSequencer } from "./helpers/local/addSequencer";

export const logger = new Logger({ name: "e2e" });

type Deployments = {
  Connext: string;
  TestERC20: string;
  SpokeConnector: string;
  HubConnectorA?: string;
  HubConnectorB?: string;
  RootManager?: string;
};

const LocalDeployments: Record<string, Deployments> = {
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
const PARAMETERS = {
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
const routerTxService = new TransactionService(
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
  ROUTER_WALLET,
  true,
);

const getTransferByTransactionHash = async (
  sdkUtils: SdkUtils,
  domain: string,
  transactionHash: string,
): Promise<XTransfer> => {
  logger.info(`Fetching the origin transfer using sdk...`, requestContext, methodContext, {
    domain,
    txHash: transactionHash,
  });

  const startTime = Date.now();
  const xTransfer: XTransfer | undefined = await pollSomething({
    // Attempts will be made for 2 minutes.
    attempts: Math.floor(120_000 / SUBG_POLL_PARITY),
    parity: SUBG_POLL_PARITY,
    method: async () => {
      try {
        const dbTransfer = await sdkUtils.getTransferByTransactionHash(transactionHash);
        if (dbTransfer.length === 0) {
          logger.info("No results! Waiting for next loop...");
          return undefined;
        }
        const transfer = convertFromDbTransfer(dbTransfer[0]);
        logger.info("Transfer found!", undefined, undefined, { transfer });
        if (transfer.origin!.xcall!.transactionHash) {
          return transfer;
        }
      } catch (e: unknown) {
        console.warn(e);
        logger.info("Waiting for next loop...");
      }
      return undefined;
    },
  });
  const endTime = Date.now();

  if (!xTransfer) {
    logger.info("Failed to retrieve xcalled transfer from the cartographer-api.", requestContext, methodContext, {
      domain: domain,
      etc: {
        polled: `${(endTime - startTime) / 1_000}s.`,
      },
    });
    throw new Error("Failed to retrieve xcalled transfer from the cartographer-api.");
  }

  logger.info("XCall retrieved.", requestContext, methodContext, {
    domain,
    etc: {
      took: `${endTime - startTime}ms.`,
      transferID: xTransfer?.transferId,
      xTransfer,
    },
  });
  return xTransfer;
};

const getTransferById = async (sdkUtils: SdkUtils, domain: string, transferId: string): Promise<XTransfer> => {
  logger.info("Fetching the destination transfer using sdk...", requestContext, methodContext, {
    domain,
    transferId,
  });

  const startTime = Date.now();
  const xTransfer: XTransfer | undefined = await pollSomething({
    // Attempts will be made for 3 minutes.
    attempts: Math.floor(180_000 / SUBG_POLL_PARITY),
    parity: SUBG_POLL_PARITY,
    method: async () => {
      try {
        const dbTransfer = await sdkUtils.getTransferById(transferId);
        if (dbTransfer.length === 0) {
          logger.info("No results! Waiting for next loop...");
          return undefined;
        }
        const transfer = convertFromDbTransfer(dbTransfer[0]);

        if (transfer.destination?.reconcile?.transactionHash) {
          logger.info("Transfer was reconciled.", requestContext, methodContext, {
            domain,
            hash: transfer.destination!.reconcile!.transactionHash,
          });
        }

        if (transfer.destination?.execute?.transactionHash) {
          logger.info("Transfer was executed.", requestContext, methodContext, {
            domain,
            hash: transfer.destination!.reconcile!.transactionHash,
          });
          return transfer;
        }
      } catch (e: unknown) {
        console.warn(e);
        logger.info("Waiting for next loop...");
      }
      return undefined;
    },
  });
  const endTime = Date.now();

  if (!xTransfer) {
    logger.info("Failed to retrieve execute transfer from the cartographer-api.", requestContext, methodContext, {
      domain,
      etc: {
        polled: `${(endTime - startTime) / 1_000}s`,
      },
    });
    throw new Error("Failed to retrieve execute transfer from the cartographer-api.");
  }

  logger.info("Execute transaction found.", requestContext, methodContext, {
    domain,
    hash: xTransfer.destination?.execute?.transactionHash,
    etc: {
      took: `${(endTime - startTime) / 1_000}s`,
    },
  });
  return xTransfer;
};

const addSpokeRootToAggregate = async (data: string) => {
  const requestContext = createRequestContext(addSpokeRootToAggregate.name);

  const sendMessageData = AdminHubConnectorInterface.encodeFunctionData("addSpokeRootToAggregate", [data]);

  await deployerTxService.sendTx(
    { to: PARAMETERS.HUB.DEPLOYMENTS.HubConnectorA!, data: sendMessageData, value: 0, domain: +PARAMETERS.HUB.DOMAIN },
    requestContext,
  );
};

const propagate = async () => {
  const requestContext = createRequestContext(propagate.name);
  const propagateData = RootManagerInterface.encodeFunctionData("propagate", [
    [PARAMETERS.A.DEPLOYMENTS.SpokeConnector, PARAMETERS.B.DEPLOYMENTS.SpokeConnector],
    ["0", "0"],
    ["0x", "0x"],
  ]);

  await deployerTxService.sendTx(
    { to: PARAMETERS.HUB.DEPLOYMENTS.RootManager!, data: propagateData, value: 0, domain: +PARAMETERS.HUB.DOMAIN },
    requestContext,
  );
};

const receiveHubAggregateRoot = async (data: string) => {
  const requestContext = createRequestContext(receiveHubAggregateRoot.name);
  const sendMessageData = AdminSpokeConnectorInterface.encodeFunctionData("receiveHubAggregateRoot", [data]);

  await deployerTxService.sendTx(
    { to: PARAMETERS.B.DEPLOYMENTS.SpokeConnector, data: sendMessageData, value: 0, domain: +PARAMETERS.B.DOMAIN },
    requestContext,
  );
};

const onchainSetup = async (sdkBase: SdkBase) => {
  logger.info("Trying `xcallIntoLocal` to get the local assets on spoke domains");
  const mainnetDeployments = getDeployments(PARAMETERS.HUB.DOMAIN);
  const optimismDeployments = getDeployments(PARAMETERS.A.DOMAIN);
  const arbitrumDeployments = getDeployments(PARAMETERS.B.DOMAIN);
  const xcallParams = {
    // TransferInfo
    destination: PARAMETERS.A.DOMAIN,
    to: PARAMETERS.AGENTS.DEPLOYER.address,
    asset: mainnetDeployments.TestERC20,
    delegate: PARAMETERS.AGENTS.DEPLOYER.address,
    amount: utils.parseEther("10000").toString(),
    slippage: "300",
    callData: "0x",
    relayerFee: utils.parseUnits("1", 17).toString(),
    receiveLocal: true,
  };
  const { receipt, xcallData } = await sendXCall(
    sdkBase,
    { receiveLocal: true },
    PARAMETERS.AGENTS.USER.signer.connect(originProvider),
  );

  console.log(receipt, xcallData);

  logger.info("add the spokeRoot at hub(Note: Admin Connector");
  /// TODO: get the data from the above xcall, i.e message root of spoke domain
  const spokeRootData = "0x";
  await addSpokeRootToAggregate(spokeRootData);

  logger.info("propagate the aggregated root to spoke domains");
  await propagate();

  logger.info("Receive the aggregated root on both spoke domains on AdminSpokeConnector");
  /// TODO: figure out the data required for this function
  const aggregateRootData = "0x";
  await receiveHubAggregateRoot(aggregateRootData);

  logger.info("Setting up router...");
  // Setup router for both the owner and recipient. MUST be called with the router account.
  await setupRouter(
    PARAMETERS.AGENTS.ROUTER.address,
    [
      { Connext: PARAMETERS.A.DEPLOYMENTS.Connext, domain: PARAMETERS.A.DOMAIN },
      { Connext: PARAMETERS.B.DEPLOYMENTS.Connext, domain: PARAMETERS.B.DOMAIN },
    ],
    routerTxService,
  );
  logger.info("Set up router done!");

  logger.info(`Adding liquidity for router: ${PARAMETERS.AGENTS.ROUTER.address}...`);
  const canonicalId = utils.hexlify(canonizeId(PARAMETERS.HUB.DEPLOYMENTS.TestERC20));
  await addLiquidity(
    [
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
        domain: +PARAMETERS.A.DOMAIN,
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
      domain: PARAMETERS.A.CHAIN,
      data: balanceOfData,
      to: PARAMETERS.A.DEPLOYMENTS.TestERC20,
    });
    const [tokenBalance] = erc20.decodeFunctionResult("balanceOf", res);
    logger.info(`New user token balance: ${tokenBalance.toString()}`);
  }

  let tx = await sdkBase.approveIfNeeded(PARAMETERS.A.DOMAIN, PARAMETERS.A.DEPLOYMENTS.TestERC20, "1", true);
  if (tx) {
    await userTxService.sendTx(
      { domain: PARAMETERS.A.DOMAIN, to: tx.to!, value: 0, data: utils.hexlify(tx.data!) },
      requestContext,
    );
  }
  tx = await sdkBase.approveIfNeeded(PARAMETERS.B.DOMAIN, PARAMETERS.B.DEPLOYMENTS.TestERC20, "1", true);
  if (tx) {
    await userTxService.sendTx(
      { domain: PARAMETERS.B.DOMAIN, to: tx.to!, value: 0, data: utils.hexlify(tx.data!) },
      requestContext,
    );
  }
};

const { requestContext, methodContext } = createLoggingContext("e2e");
describe("LOCAL:E2E", () => {
  let sdkBase: SdkBase;
  let sdkUtils: SdkUtils;

  before(async () => {
    const originProvider = new providers.JsonRpcProvider(PARAMETERS.A.RPC[0]);
    const destinationProvider = new providers.JsonRpcProvider(PARAMETERS.B.RPC[0]);
    // Ensure automine is off.
    // await originProvider.send("evm_setAutomine", [true]);
    // await destinationProvider.send("evm_setAutomine", [true]);

    // Fund the user and relayer agents some ETH.
    await originProvider.send("anvil_setBalance", [PARAMETERS.AGENTS.USER.address, "0x84595161401484A000000"]);
    await originProvider.send("anvil_setBalance", [PARAMETERS.AGENTS.RELAYER.address, "0x84595161401484A000000"]);
    await destinationProvider.send("anvil_setBalance", [PARAMETERS.AGENTS.USER.address, "0x84595161401484A000000"]);
    await destinationProvider.send("anvil_setBalance", [PARAMETERS.AGENTS.RELAYER.address, "0x84595161401484A000000"]);

    // Sanity checks: make sure addresses configured are correct by checking to make sure contracts are deployed
    // at those addresses (using `getCode`).
    for (const key of ["A", "B"]) {
      const config = PARAMETERS[key as "A" | "B"];
      const { CHAIN: chain, DEPLOYMENTS: deployments } = config;
      for (const [deployment, address] of Object.entries(deployments)) {
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
        [PARAMETERS.A.DOMAIN]: {
          assets: [{ address: PARAMETERS.A.DEPLOYMENTS.TestERC20, name: "TestERC20", symbol: "TEST" }],
          providers: PARAMETERS.A.RPC,
          deployments: {
            connext: PARAMETERS.A.DEPLOYMENTS.Connext,
            stableSwap: constants.AddressZero,
          },
        },
        [PARAMETERS.B.DOMAIN]: {
          assets: [
            {
              address: PARAMETERS.B.DEPLOYMENTS.TestERC20,
              name: "TestERC20",
              symbol: "TEST",
            },
          ],
          providers: PARAMETERS.B.RPC,
          deployments: {
            connext: PARAMETERS.B.DEPLOYMENTS.Connext,
            stableSwap: constants.AddressZero,
          },
        },
      },
      cartographerUrl: PARAMETERS.AGENTS.CARTOGRAPHER.url,
      environment: PARAMETERS.ENVIRONMENT as "production" | "staging",
      signerAddress: PARAMETERS.AGENTS.USER.address,
    };
    sdkBase = await SdkBase.create(sdkConfig);
    sdkUtils = await SdkUtils.create(sdkConfig);
    logger.info("Set up sdk.");

    // On-chain / contracts configuration, approvals, etc.
    await onchainSetup(sdkBase);
  });

  it.only("handles fast liquidity transfer", async () => {
    const originProvider = new providers.JsonRpcProvider(PARAMETERS.A.RPC[0]);
    const { receipt, xcallData } = await sendXCall(
      sdkBase,
      undefined,
      PARAMETERS.AGENTS.USER.signer.connect(originProvider),
    );
    const originTransfer = await getTransferByTransactionHash(sdkUtils, PARAMETERS.A.DOMAIN, receipt.transactionHash);

    // TODO: Check user funds, assert tokens were deducted.

    logger.info("Waiting for execution on the destination domain.", requestContext, methodContext, {
      domain: xcallData.destination,
      transferId: originTransfer?.transferId,
    });

    const sequencerUrl = process.env.SEQUENCER_URL;
    if (sequencerUrl) {
      logger.info("Polling sequencer for auction status...");
      let error: any | undefined;
      const status: AxiosResponse<ExecuteFastApiGetExecStatusResponse> | undefined = await pollSomething({
        attempts: Math.floor(60_000 / SUBG_POLL_PARITY),
        parity: SUBG_POLL_PARITY,
        method: async () => {
          return await axios
            .request<ExecuteFastApiGetExecStatusResponse>({
              method: "get",
              baseURL: sequencerUrl,
              url: `/auctions/${originTransfer.transferId}`,
            })
            .catch((e: AxiosResponse<SequencerApiErrorResponse>) => {
              error = e.data ? (e.data.error ? e.data.error.message : e.data) : e;
              return undefined;
            });
        },
      });
      if (!status) {
        logger.info("Unable to retrieve auction status from Sequencer.", requestContext, methodContext, {
          etc: {
            error,
          },
        });
      } else {
        logger.info(`Retrieved auction status from Sequencer.`, requestContext, methodContext, {
          originDomain: xcallData.origin,
          destinationDomain: xcallData.destination,
          etc: { status: status.data },
        });
      }
    }

    const destinationTransfer = await getTransferById(sdkUtils, PARAMETERS.B.DOMAIN, originTransfer.transferId);
    expect(destinationTransfer.destination?.status).to.be.eq(XTransferStatus.Executed);

    // TODO: Check router liquidity on-chain, assert funds were deducted.
    logger.info("Fast-liquidity transfer completed successfully!", requestContext, methodContext, {
      originDomain: xcallData.origin,
      destinationDomain: xcallData.destination,
      etc: {
        transfer: {
          ...originTransfer,
          destination: destinationTransfer.destination,
        },
      },
    });
  });

  it.only("works for address(0) and 0-value transfers", async () => {
    const originProvider = new providers.JsonRpcProvider(PARAMETERS.A.RPC[0]);
    const { receipt, xcallData } = await sendXCall(
      sdkBase,
      { amount: "0", asset: constants.AddressZero },
      PARAMETERS.AGENTS.USER.signer.connect(originProvider),
    );
    const originTransfer = await getTransferByTransactionHash(sdkUtils, PARAMETERS.A.DOMAIN, receipt.transactionHash);

    // TODO: Check user funds, assert tokens were deducted.

    logger.info("Waiting for execution on the destination domain.", requestContext, methodContext, {
      domain: xcallData.destination,
      transferId: originTransfer?.transferId,
    });

    const sequencerUrl = process.env.SEQUENCER_URL;
    if (sequencerUrl) {
      logger.info("Polling sequencer for auction status...");
      let error: any | undefined;
      const status: AxiosResponse<ExecuteFastApiGetExecStatusResponse> | undefined = await pollSomething({
        attempts: Math.floor(60_000 / SUBG_POLL_PARITY),
        parity: SUBG_POLL_PARITY,
        method: async () => {
          return await axios
            .request<ExecuteFastApiGetExecStatusResponse>({
              method: "get",
              baseURL: sequencerUrl,
              url: `/auctions/${originTransfer.transferId}`,
            })
            .catch((e: AxiosResponse<SequencerApiErrorResponse>) => {
              error = e.data ? (e.data.error ? e.data.error.message : e.data) : e;
              return undefined;
            });
        },
      });
      if (!status) {
        logger.info("Unable to retrieve auction status from Sequencer.", requestContext, methodContext, {
          etc: {
            error,
          },
        });
      } else {
        logger.info(`Retrieved auction status from Sequencer.`, requestContext, methodContext, {
          originDomain: xcallData.origin,
          destinationDomain: xcallData.destination,
          etc: { status: status.data },
        });
      }
    }

    const destinationTransfer = await getTransferById(sdkUtils, PARAMETERS.B.DOMAIN, originTransfer.transferId);
    expect(destinationTransfer.destination?.status).to.be.eq(XTransferStatus.Executed);

    // TODO: Check router liquidity on-chain, assert funds were deducted.
    logger.info("Fast-liquidity transfer completed successfully!", requestContext, methodContext, {
      originDomain: xcallData.origin,
      destinationDomain: xcallData.destination,
      etc: {
        transfer: {
          ...originTransfer,
          destination: destinationTransfer.destination,
        },
      },
    });
  });

  it.skip("handles slow liquidity transfer", async () => {
    // Get the remote router ID for the `handle` call.
    const destinationProvider = new providers.JsonRpcProvider(PARAMETERS.B.RPC[0]);
    const deployer = PARAMETERS.AGENTS.DEPLOYER.signer.connect(destinationProvider);

    // Enroll an EOA (the deployer) as the replica address for this domain.
    // NOTE: In a production environment the replica address will always be a contract. We're using an EOA here in order
    // to circumvent the message lifecycle
    // await enrollReplica(deployer);

    const originProvider = new providers.JsonRpcProvider(PARAMETERS.A.RPC[0]);
    const { receipt, xcallData } = await sendXCall(
      sdkBase,
      undefined,
      PARAMETERS.AGENTS.USER.signer.connect(originProvider),
    );

    const iface = getConnextInterface();
    const connext = new Contract(PARAMETERS.B.DEPLOYMENTS.Connext, iface as ContractInterface, deployer);

    // Extract the xchain message bytes from the XCalled event logged.
    const xcalledEvent = connext.filters.XCalled(null).address;
    let message: string | undefined = undefined;
    for (const log of receipt.logs) {
      if (log.address == xcalledEvent) {
        const event = iface.decodeEventLog("XCalled", log.data);
        message = event.message;
      }
    }
    if (!message) {
      throw new Error("Did not find XCalled event (or event was missing `message` arguments)!");
    }

    const poll = getTransferByTransactionHash(sdkUtils, PARAMETERS.A.DOMAIN, receipt.transactionHash);
    // TODO: Read remote from contract directly?
    const remote = "0x000000000000000000000000f08df3efdd854fede77ed3b2e515090eee765154";
    const res = await connext.handle(PARAMETERS.A.DOMAIN, 0, remote, message);
    logger.info("Sent `handle` (i.e. `reconcile`) transaction.", requestContext, methodContext, {
      txHash: res.transactionHash,
    });

    // Lighthouse should pick up the xcall once it's been reconciled.
    const originTransfer = await poll;
    const destinationTransfer = await getTransferById(sdkUtils, PARAMETERS.B.DOMAIN, originTransfer.transferId);

    expect(destinationTransfer.destination?.status).to.be.eq(XTransferStatus.CompletedSlow);

    logger.info("Slow-liquidity transfer completed successfully!", requestContext, methodContext, {
      originDomain: xcallData.origin,
      destinationDomain: xcallData.destination,
      etc: {
        transfer: {
          ...originTransfer,
          destination: destinationTransfer.destination,
        },
      },
    });
  });
});
