import axios, { AxiosResponse } from "axios";
import {
  createLoggingContext,
  Logger,
  AuctionsApiGetAuctionStatusResponse,
  AuctionsApiErrorResponse,
  XCallArgs,
  CallParams,
  ERC20Abi,
  convertFromDbTransfer,
  XTransfer,
  XTransferStatus,
} from "@connext/nxtp-utils";
import { TransactionService, getConnextInterface } from "@connext/nxtp-txservice";
import { NxtpSdkBase, NxtpSdkUtils } from "@connext/nxtp-sdk";
import { BigNumber, constants, Contract, providers, utils, Wallet } from "ethers";
import { expect } from "chai";

import { pollSomething } from "./helpers/shared";
import { enrollHandlers, enrollCustom, setupRouter, setupAsset, addLiquidity, addRelayer } from "./helpers/local";
import { DEPLOYER_WALLET, PARAMETERS, SUBG_POLL_PARITY, USER_WALLET } from "./constants/local";

export const logger = new Logger({ name: "e2e" });

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

const sendXCall = async (
  sdkBase: NxtpSdkBase,
  xparams: Partial<CallParams> = {},
  signer?: Wallet,
): Promise<{
  receipt: providers.TransactionReceipt;
  xcallData: XCallArgs;
}> => {
  logger.info("Formatting XCall.");
  const xcallData: XCallArgs = {
    params: {
      to: PARAMETERS.AGENTS.USER.address,
      originDomain: PARAMETERS.A.DOMAIN,
      destinationDomain: PARAMETERS.B.DOMAIN,
      agent: constants.AddressZero,
      callback: constants.AddressZero,
      callbackFee: "0",
      callData: "0x",
      forceSlow: false,
      receiveLocal: false,
      recovery: PARAMETERS.AGENTS.USER.address,
      relayerFee: "0",
      destinationMinOut: "0",
      ...xparams,
    },
    transactingAsset: PARAMETERS.A.DEPLOYMENTS.TestERC20,
    transactingAmount: "1000",
    originMinOut: "0",
  };
  const tx = await sdkBase.xcall(xcallData);

  logger.info("Sending XCall...");
  let receipt: providers.TransactionReceipt;
  if (signer) {
    const res = await signer.sendTransaction({
      to: tx.to!,
      value: tx.value ?? 0,
      data: utils.hexlify(tx.data!),
      chainId: 1337,
    });
    receipt = await res.wait(1);
  } else {
    receipt = await userTxService.sendTx(
      { to: tx.to!, value: tx.value ?? 0, data: utils.hexlify(tx.data!), chainId: 1337 },
      requestContext,
    );
  }
  logger.info("XCall sent!");
  return { receipt, xcallData };
};

const getTransferByTransactionHash = async (
  sdkUtils: NxtpSdkUtils,
  domain: string,
  transactionHash: string,
): Promise<XTransfer> => {
  logger.info(`Fetching the origin transfer using sdk...`, requestContext, methodContext, {
    domain,
    txHash: transactionHash,
  });

  const startTime = Date.now();
  const xTransfer: XTransfer | undefined = await pollSomething({
    // Attempts will be made for 2 minute.
    attempts: Math.floor(120_000 / SUBG_POLL_PARITY),
    parity: SUBG_POLL_PARITY,
    method: async () => {
      try {
        const dbTransfer = await sdkUtils.getTransferByTransactionHash(transactionHash);
        const transfer = convertFromDbTransfer(dbTransfer[0]);
        if (transfer.origin!.xcall!.transactionHash) {
          return transfer;
        }
      } catch (e: unknown) {
        console.log("Waiting for next loop...");
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

const getTransferById = async (sdkUtils: NxtpSdkUtils, domain: string, transferId: string): Promise<XTransfer> => {
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
      const dbTransfer = await sdkUtils.getTransferById(transferId);
      const transfer = convertFromDbTransfer(dbTransfer[0]);
      if (transfer.destination?.reconcile?.transactionHash) {
        logger.info("Transfer was reconciled.", requestContext, methodContext, {
          domain,
          hash: transfer.destination!.reconcile!.transactionHash,
        });
      }

      if (transfer.destination?.execute?.transactionHash) {
        return transfer;
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

const onchainSetup = async (sdkBase: NxtpSdkBase) => {
  logger.info("Enrolling handlers...");
  await enrollHandlers(
    [
      {
        chain: PARAMETERS.A.CHAIN,
        domain: PARAMETERS.A.DOMAIN,
        ...PARAMETERS.A.DEPLOYMENTS,
      },
      {
        chain: PARAMETERS.B.CHAIN,
        domain: PARAMETERS.B.DOMAIN,
        ...PARAMETERS.B.DEPLOYMENTS,
      },
    ],
    deployerTxService,
  );
  logger.info("Enrolled handlers.");

  logger.info("Enrolling custom asset with TokenRegistry...");
  await enrollCustom(
    {
      domain: PARAMETERS.A.DOMAIN,
      tokenAddress: PARAMETERS.A.DEPLOYMENTS.TestERC20,
    },
    [
      {
        domain: PARAMETERS.B.DOMAIN,
        tokenAddress: PARAMETERS.B.DEPLOYMENTS.TestERC20,
        TokenRegistry: PARAMETERS.B.DEPLOYMENTS.TokenRegistryUpgradeBeaconProxy,
      },
    ],
    deployerTxService,
  );
  logger.info("Enrolled custom asset.");

  logger.info("Setting up router...");
  await setupRouter(
    PARAMETERS.AGENTS.ROUTER.address,
    [
      { ConnextHandler: PARAMETERS.A.DEPLOYMENTS.ConnextHandler, domain: PARAMETERS.A.DOMAIN },
      { ConnextHandler: PARAMETERS.B.DEPLOYMENTS.ConnextHandler, domain: PARAMETERS.B.DOMAIN },
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
        ConnextHandler: PARAMETERS.A.DEPLOYMENTS.ConnextHandler,
        // NOTE: Same as local; this means we won't be doing any swaps.
        adopted: PARAMETERS.A.DEPLOYMENTS.TestERC20,
      },
      {
        domain: PARAMETERS.B.DOMAIN,
        ConnextHandler: PARAMETERS.B.DEPLOYMENTS.ConnextHandler,
        // NOTE: Same as local; this means we won't be doing any swaps.
        adopted: PARAMETERS.B.DEPLOYMENTS.TestERC20,
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
        ConnextHandler: PARAMETERS.A.DEPLOYMENTS.ConnextHandler,
      },
      {
        domain: PARAMETERS.B.DOMAIN,
        amount: utils.parseEther("100").toString(),
        router: PARAMETERS.AGENTS.ROUTER.address,
        asset: PARAMETERS.B.DEPLOYMENTS.TestERC20,
        ConnextHandler: PARAMETERS.B.DEPLOYMENTS.ConnextHandler,
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
        ConnextHandler: PARAMETERS.A.DEPLOYMENTS.ConnextHandler,
      },
      {
        domain: PARAMETERS.B.DOMAIN,
        relayer: PARAMETERS.AGENTS.RELAYER.address,
        ConnextHandler: PARAMETERS.B.DEPLOYMENTS.ConnextHandler,
      },
    ],
    deployerTxService,
    logger,
  );

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
describe("LOCAL:E2E", () => {
  let sdkBase: NxtpSdkBase;
  let sdkUtils: NxtpSdkUtils;

  before(async () => {
    // Ensure automine is off. Additionally, fund the user agent address some ETH.
    const originProvider = new providers.JsonRpcProvider(PARAMETERS.A.RPC[0]);
    await originProvider.send("evm_setAutomine", [false]);
    await originProvider.send("hardhat_setBalance", [PARAMETERS.AGENTS.USER.address, "0x84595161401484A000000"]);
    const destinationProvider = new providers.JsonRpcProvider(PARAMETERS.B.RPC[0]);
    await destinationProvider.send("evm_setAutomine", [false]);
    await destinationProvider.send("hardhat_setBalance", [PARAMETERS.AGENTS.USER.address, "0x84595161401484A000000"]);

    // Peripherals.
    logger.info("Setting up sdk...");
    const sdkConfig = {
      chains: {
        [PARAMETERS.A.DOMAIN]: {
          assets: [{ address: PARAMETERS.A.DEPLOYMENTS.TestERC20, name: "TestERC20", symbol: "TEST" }],
          providers: PARAMETERS.A.RPC,
          deployments: {
            connext: PARAMETERS.A.DEPLOYMENTS.ConnextHandler,
            tokenRegistry: PARAMETERS.A.DEPLOYMENTS.TokenRegistryUpgradeBeaconProxy,
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
            connext: PARAMETERS.B.DEPLOYMENTS.ConnextHandler,
            tokenRegistry: PARAMETERS.B.DEPLOYMENTS.TokenRegistryUpgradeBeaconProxy,
            stableSwap: constants.AddressZero,
          },
        },
      },
      cartographerUrl: PARAMETERS.AGENTS.CARTOGRAPHER.url,
      environment: PARAMETERS.ENVIRONMENT as "production" | "staging",
      signerAddress: PARAMETERS.AGENTS.USER.address,
    };
    sdkBase = await NxtpSdkBase.create(sdkConfig);
    sdkUtils = await NxtpSdkUtils.create(sdkConfig);
    logger.info("Set up sdk.");

    // On-chain / contracts configuration, approvals, etc.
    await onchainSetup(sdkBase);
  });

  it.only("handles fast liquidity transfer", async () => {
    const originProvider = new providers.JsonRpcProvider(PARAMETERS.A.RPC[0]);
    const { receipt, xcallData } = await sendXCall(
      sdkBase,
      { forceSlow: false },
      PARAMETERS.AGENTS.USER.signer.connect(originProvider),
    );
    const originTransfer = await getTransferByTransactionHash(sdkUtils, PARAMETERS.A.DOMAIN, receipt.transactionHash);

    // TODO: Check user funds, assert tokens were deducted.

    logger.info("Waiting for execution on the destination domain.", requestContext, methodContext, {
      domain: xcallData.params.destinationDomain,
      transferId: originTransfer?.transferId,
    });

    const sequencerUrl = process.env.SEQUENCER_URL;
    if (sequencerUrl) {
      logger.info("Polling sequencer for auction status...");
      let error: any | undefined;
      const status: AxiosResponse<AuctionsApiGetAuctionStatusResponse> | undefined = await pollSomething({
        attempts: Math.floor(60_000 / SUBG_POLL_PARITY),
        parity: SUBG_POLL_PARITY,
        method: async () => {
          return await axios
            .request<AuctionsApiGetAuctionStatusResponse>({
              method: "get",
              baseURL: sequencerUrl,
              url: `/auctions/${originTransfer.transferId}`,
            })
            .catch((e: AxiosResponse<AuctionsApiErrorResponse>) => {
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
          originDomain: xcallData.params.originDomain,
          destinationDomain: xcallData.params.destinationDomain,
          etc: { status: status.data },
        });
      }
    }

    const destinationTransfer = await getTransferById(sdkUtils, PARAMETERS.B.DOMAIN, originTransfer.transferId);
    expect(destinationTransfer.destination?.status).to.be.eq(XTransferStatus.Executed);

    // TODO: Check router liquidity on-chain, assert funds were deducted.
    logger.info("Fast-liquidity transfer completed successfully!", requestContext, methodContext, {
      originDomain: xcallData.params.originDomain,
      destinationDomain: xcallData.params.destinationDomain,
      etc: {
        transfer: {
          ...originTransfer,
          destination: destinationTransfer.destination,
        },
      },
    });
  });

  it("handles slow liquidity transfer", async () => {
    // Get the remote router ID for the `handle` call.
    const destinationProvider = new providers.JsonRpcProvider(PARAMETERS.B.RPC[0]);
    const deployer = PARAMETERS.AGENTS.DEPLOYER.signer.connect(destinationProvider);

    // Enroll an EOA (the deployer) as the replica address for this domain.
    // NOTE: In a production environment the replica address will always be a contract. We're using an EOA here in order
    // to circumvent the nomad message lifecycle / nomad ecosystem.
    // await enrollReplica(deployer);

    const originProvider = new providers.JsonRpcProvider(PARAMETERS.A.RPC[0]);
    const { receipt, xcallData } = await sendXCall(
      sdkBase,
      { forceSlow: true },
      PARAMETERS.AGENTS.USER.signer.connect(originProvider),
    );

    const iface = getConnextInterface();
    const connext = new Contract(PARAMETERS.B.DEPLOYMENTS.ConnextHandler, iface, deployer);

    // Extract the xchain nomad message bytes from the XCalled event logged.
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
      originDomain: xcallData.params.originDomain,
      destinationDomain: xcallData.params.destinationDomain,
      etc: {
        transfer: {
          ...originTransfer,
          destination: destinationTransfer.destination,
        },
      },
    });
  });
});
