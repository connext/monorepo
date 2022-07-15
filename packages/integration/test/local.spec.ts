import axios, { AxiosResponse } from "axios";
import {
  createLoggingContext,
  getChainData,
  Logger,
  OriginTransfer,
  DestinationTransfer,
  ChainData,
  AuctionsApiGetAuctionStatusResponse,
  AuctionsApiErrorResponse,
  XCallArgs,
  CallParams,
  ERC20Abi,
} from "@connext/nxtp-utils";
import { TransactionService, getConnextInterface } from "@connext/nxtp-txservice";
import { NxtpSdkBase } from "@connext/nxtp-sdk";
import { BigNumber, constants, Contract, providers, utils, Wallet } from "ethers";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

import { pollSomething } from "./helpers/shared";
import { enrollHandlers, enrollCustom, setupRouter, setupAsset, addLiquidity } from "./helpers/local";
import { DEPLOYER_WALLET, PARAMETERS, SUBG_POLL_PARITY, USER_WALLET } from "./constants/local";

const logger = new Logger({ name: "e2e" });

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
  sdk: NxtpSdkBase,
  xparams: Partial<CallParams> = {},
  signer?: Wallet,
): Promise<{
  receipt: providers.TransactionReceipt;
  xcallData: XCallArgs;
}> => {
  logger.info("Formatting XCall.");
  const xcallData = {
    amount: "1000",
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
      slippageTol: "0",
      ...xparams,
    },
    transactingAssetId: PARAMETERS.ASSET.address,
  };
  const tx = await sdk.xcall(xcallData);

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

const getOriginTransfer = async (
  subgraphReader: SubgraphReader,
  domain: string,
  transactionHash: string,
): Promise<OriginTransfer> => {
  logger.info(`Polling origin subgraph for added transfer...`, requestContext, methodContext, {
    domain,
    txHash: transactionHash,
  });

  const startTime = Date.now();
  const originTransfer: OriginTransfer | undefined = await pollSomething({
    // Attempts will be made for 1 minute.
    attempts: Math.floor(60_000 / SUBG_POLL_PARITY),
    parity: SUBG_POLL_PARITY,
    method: async () => {
      try {
        const transfer = await subgraphReader.getOriginTransferByHash(domain, transactionHash);
        if (transfer?.origin.xcall?.transactionHash) {
          return transfer;
        }
      } catch (e: unknown) {
        console.log("Waiting for next loop...");
      }
      return undefined;
    },
  });
  const endTime = Date.now();

  if (!originTransfer) {
    logger.info("Failed to retrieve xcalled transfer from the origin subgraph.", requestContext, methodContext, {
      domain: domain,
      etc: {
        polled: `${(endTime - startTime) / 1_000}s.`,
      },
    });
    throw new Error("Failed to retrieve xcalled transfer from the origin subgraph.");
  }

  logger.info("XCall retrieved.", requestContext, methodContext, {
    domain,
    etc: {
      took: `${endTime - startTime}ms.`,
      transferID: originTransfer?.transferId,
      originTransfer,
    },
  });
  return originTransfer;
};

const getDestinationTransfer = async (
  subgraphReader: SubgraphReader,
  domain: string,
  transferId: string,
): Promise<DestinationTransfer> => {
  logger.info("Polling destination subgraph for execute tx...", requestContext, methodContext, {
    domain,
    transferId,
  });

  const startTime = Date.now();
  const destinationTransfer: DestinationTransfer | undefined = await pollSomething({
    // Attempts will be made for 3 minutes.
    attempts: Math.floor(180_000 / SUBG_POLL_PARITY),
    parity: SUBG_POLL_PARITY,
    method: async () => {
      const transfer = await subgraphReader.getDestinationTransferById(domain, transferId);
      if (transfer?.destination.reconcile?.transactionHash) {
        logger.info("Transfer was reconciled.", requestContext, methodContext, {
          domain,
          hash: transfer.destination.reconcile.transactionHash,
        });
      }

      if (transfer?.destination.execute?.transactionHash) {
        return transfer;
      }
      return undefined;
    },
  });
  const endTime = Date.now();

  if (!destinationTransfer) {
    logger.info("Failed to retrieve execute transfer from the destination subgraph.", requestContext, methodContext, {
      domain,
      etc: {
        polled: `${(endTime - startTime) / 1_000}s`,
      },
    });
    throw new Error("Failed to retrieve execute transfer from the destination subgraph.");
  }

  logger.info("Execute transaction found.", requestContext, methodContext, {
    domain,
    hash: destinationTransfer.destination.execute?.transactionHash,
    etc: {
      took: `${(endTime - startTime) / 1_000}s`,
    },
  });
  return destinationTransfer;
};

const enrollReplica = async (singer: Wallet) => {
  const xAppConnectionManager = new utils.Interface([
    {
      inputs: [
        {
          internalType: "address",
          name: "_replica",
          type: "address",
        },
        {
          internalType: "uint32",
          name: "_domain",
          type: "uint32",
        },
      ],
      name: "ownerEnrollReplica",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]);
  const encoded = xAppConnectionManager.encodeFunctionData("ownerEnrollReplica", [singer.address, PARAMETERS.B.DOMAIN]);

  const tx = await singer.sendTransaction({
    to: PARAMETERS.B.DEPLOYMENTS.XAppConnectionManager,
    data: encoded,
    chainId: PARAMETERS.B.CHAIN,
  });

  const receipt = await tx.wait(1);
  logger.info("Enrolled deployer as replica.", requestContext, methodContext, {
    deployer: singer.address,
    receipt,
  });
};

const { requestContext, methodContext } = createLoggingContext("e2e");
describe("LOCAL:E2E", () => {
  let sdk: NxtpSdkBase;
  let subgraphReader: SubgraphReader;

  const onchainSetup = async () => {
    logger.info("Enrolling handlers...");
    await enrollHandlers(
      [
        {
          domain: PARAMETERS.A.DOMAIN,
          ...PARAMETERS.A.DEPLOYMENTS,
        },
        {
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
        tokenAddress: PARAMETERS.ASSET.address,
      },
      [
        {
          domain: PARAMETERS.B.DOMAIN,
          tokenAddress: PARAMETERS.ASSET.address,
          TokenRegistry: PARAMETERS.B.DEPLOYMENTS.TokenRegistry,
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
      { domain: PARAMETERS.A.DOMAIN, tokenAddress: PARAMETERS.ASSET.address },
      [
        {
          domain: PARAMETERS.A.DOMAIN,
          ConnextHandler: PARAMETERS.A.DEPLOYMENTS.ConnextHandler,
          // NOTE: Same as local; this means we won't be doing any swaps.
          adopted: PARAMETERS.ASSET.address,
        },
        {
          domain: PARAMETERS.B.DOMAIN,
          ConnextHandler: PARAMETERS.B.DEPLOYMENTS.ConnextHandler,
          // NOTE: Same as local; this means we won't be doing any swaps.
          adopted: PARAMETERS.ASSET.address,
        },
      ],
      deployerTxService,
    );
    logger.info("Set up assets.");

    logger.info(`Adding liquidity for router: ${PARAMETERS.AGENTS.ROUTER.address}...`);
    await addLiquidity(
      [
        {
          domain: PARAMETERS.A.DOMAIN,
          amount: utils.parseEther("100").toString(),
          router: PARAMETERS.AGENTS.ROUTER.address,
          asset: PARAMETERS.ASSET.address,
          ConnextHandler: PARAMETERS.A.DEPLOYMENTS.ConnextHandler,
        },
        {
          domain: PARAMETERS.B.DOMAIN,
          amount: utils.parseEther("100").toString(),
          router: PARAMETERS.AGENTS.ROUTER.address,
          asset: PARAMETERS.ASSET.address,
          ConnextHandler: PARAMETERS.B.DEPLOYMENTS.ConnextHandler,
        },
      ],
      deployerTxService,
    );
    logger.info("Added liquidity.");

    logger.info("Minting tokens for user agent...");
    {
      const erc20 = new utils.Interface(ERC20Abi);
      const amount = BigNumber.from("1000000000000000");
      const encoded = erc20.encodeFunctionData("mint", [PARAMETERS.AGENTS.USER.address, amount]);
      const receipt = await deployerTxService.sendTx(
        {
          chainId: 1337,
          to: PARAMETERS.ASSET.address,
          data: encoded,
          value: BigNumber.from("0"),
        },
        requestContext,
      );
      logger.info("Minted tokens.", requestContext, methodContext, {
        amount: amount.toString(),
        asset: PARAMETERS.ASSET.address,
        txHash: receipt.transactionHash,
      });

      const balanceOfData = erc20.encodeFunctionData("balanceOf", [PARAMETERS.AGENTS.USER.address]);
      const res = await deployerTxService.readTx({
        chainId: PARAMETERS.A.CHAIN,
        data: balanceOfData,
        to: PARAMETERS.ASSET.address,
      });
      const [tokenBalance] = erc20.decodeFunctionResult("balanceOf", res);
      logger.info(`New user token balance: ${tokenBalance.toString()}`);
    }

    let tx = await sdk.approveIfNeeded(PARAMETERS.A.DOMAIN, PARAMETERS.ASSET.address, "1", true);
    if (tx) {
      await userTxService.sendTx(
        { chainId: 1337, to: tx.to!, value: 0, data: utils.hexlify(tx.data!) },
        requestContext,
      );
    }
    if (tx) {
      tx = await sdk.approveIfNeeded(PARAMETERS.B.DOMAIN, PARAMETERS.ASSET.address, "1", true);
    }
  };

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
    sdk = await NxtpSdkBase.create({
      chains: {
        [PARAMETERS.A.DOMAIN]: {
          assets: [{ address: PARAMETERS.ASSET.address, name: PARAMETERS.ASSET.name, symbol: PARAMETERS.ASSET.symbol }],
          providers: PARAMETERS.A.RPC,
          deployments: {
            connext: PARAMETERS.A.DEPLOYMENTS.ConnextHandler,
            tokenRegistry: PARAMETERS.A.DEPLOYMENTS.TokenRegistry,
            stableSwap: constants.AddressZero,
          },
        },
        [PARAMETERS.B.DOMAIN]: {
          assets: [{ address: PARAMETERS.ASSET.address, name: PARAMETERS.ASSET.name, symbol: PARAMETERS.ASSET.symbol }],
          providers: PARAMETERS.B.RPC,
          deployments: {
            connext: PARAMETERS.B.DEPLOYMENTS.ConnextHandler,
            tokenRegistry: PARAMETERS.B.DEPLOYMENTS.TokenRegistry,
            stableSwap: constants.AddressZero,
          },
        },
      },
      cartographerUrl: PARAMETERS.AGENTS.CARTOGRAPHER.url,
      environment: PARAMETERS.ENVIRONMENT as "production" | "staging",
      signerAddress: PARAMETERS.AGENTS.USER.address,
    });
    logger.info("Set up sdk.");

    logger.info("Setting up subgraph reader...");
    const chainData = await getChainData();
    const allowedDomains = ["1337", "1338"];
    const allowedChainData: Map<string, ChainData> = new Map();
    for (const allowedDomain of allowedDomains) {
      if (chainData.has(allowedDomain)) {
        allowedChainData.set(allowedDomain, chainData.get(allowedDomain)!);
      }
    }
    subgraphReader = await SubgraphReader.create(allowedChainData, "production");
    logger.info("Set up subgraph reader.");

    // On-chain / contracts configuration, approvals, etc.
    await onchainSetup();
  });

  it("handles fast liquidity transfer", async () => {
    const { receipt, xcallData } = await sendXCall(sdk);
    const originTransfer = await getOriginTransfer(subgraphReader, PARAMETERS.A.DOMAIN, receipt.transactionHash);

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

    const destinationTransfer = await getDestinationTransfer(
      subgraphReader,
      PARAMETERS.B.DOMAIN,
      originTransfer.transferId,
    );

    // TODO: Check router liquidity on-chain, assert funds were deducted.

    logger.info("Transfer completed successfully!", requestContext, methodContext, {
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

  it.only("handles slow liquidity transfer", async () => {
    // Get the remote router ID for the `handle` call.
    const destinationProvider = new providers.JsonRpcProvider(PARAMETERS.B.RPC[0]);
    const deployer = PARAMETERS.AGENTS.DEPLOYER.signer.connect(destinationProvider);

    // Enroll an EOA (the deployer) as the replica address for this domain.
    // NOTE: In a production environment the replica address will always be a contract. We're using an EOA here in order
    // to circumvent the nomad message lifecycle / nomad ecosystem.
    await enrollReplica(deployer);

    const originProvider = new providers.JsonRpcProvider(PARAMETERS.A.RPC[0]);
    // // TODO: Use retrieved abi.
    // const abi = [
    //   "event XCalled(bytes32 indexed transferId, XCallArgs xcallArgs, XCalledEventArgs args, uint256 nonce, bytes message, address caller)",
    // ];
    const { receipt, xcallData } = await sendXCall(
      sdk,
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

    const poll = getOriginTransfer(subgraphReader, PARAMETERS.A.DOMAIN, receipt.transactionHash);
    // TODO: Read remote from contract directly?
    const remote = "0x000000000000000000000000f08df3efdd854fede77ed3b2e515090eee765154";
    const res = await connext.handle(PARAMETERS.A.DOMAIN, 0, remote, message);
    logger.info("Sent `handle` (i.e. `reconcile`) transaction.", requestContext, methodContext, {
      txHash: res.transactionHash,
    });

    // Lighthouse should pick up the xcall once it's been reconciled.
    const originTransfer = await poll;
    const destinationTransfer = await getDestinationTransfer(
      subgraphReader,
      PARAMETERS.B.DOMAIN,
      originTransfer.transferId,
    );
    console.log(destinationTransfer);
  });
});
