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
} from "@connext/nxtp-utils";
import { TransactionService, getErc20Interface } from "@connext/nxtp-txservice";
import { NxtpSdkBase } from "@connext/nxtp-sdk";
import { constants, providers, utils } from "ethers";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

import { pollSomething } from "./helpers/shared";
import { enrollHandlers, enrollCustom, setupRouter, setupAsset, addLiquidity } from "./helpers/local";
import { WALLET, PARAMETERS, SUBG_POLL_PARITY } from "./constants/local";

const logger = new Logger({ name: "e2e" });

const txService = new TransactionService(
  logger,
  {
    [PARAMETERS.A.DOMAIN]: {
      providers: PARAMETERS.A.RPC,
    },
    [PARAMETERS.B.DOMAIN]: {
      providers: PARAMETERS.B.RPC,
    },
  },
  WALLET,
);

const { requestContext, methodContext } = createLoggingContext("e2e");
describe("LOCAL:E2E", () => {
  let sdk: NxtpSdkBase;
  let subgraphReader: SubgraphReader;
  before(async () => {
    // Ensure automine is off.
    const originProvider = new providers.JsonRpcProvider(PARAMETERS.A.RPC[0]);
    await originProvider.send("evm_setAutomine", [false]);
    const destinationProvider = new providers.JsonRpcProvider(PARAMETERS.B.RPC[0]);
    await destinationProvider.send("evm_setAutomine", [false]);

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
      txService,
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
      txService,
    );
    logger.info("Enrolled custom asset.");

    logger.info("Setting up router...");
    await setupRouter(
      PARAMETERS.AGENTS.ROUTER.address,
      [
        { ConnextHandler: PARAMETERS.A.DEPLOYMENTS.ConnextHandler, domain: PARAMETERS.A.DOMAIN },
        { ConnextHandler: PARAMETERS.B.DEPLOYMENTS.ConnextHandler, domain: PARAMETERS.B.DOMAIN },
      ],
      txService,
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
      txService,
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
      txService,
    );

    logger.info("Added liquidity.");

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

    logger.info("Setup sdk.");

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
    logger.info("Setup subgraph reader.");

    let tx = await sdk.approveIfNeeded(PARAMETERS.A.DOMAIN, PARAMETERS.ASSET.address, "1", true);
    if (tx) {
      await txService.sendTx({ chainId: 1337, to: tx.to!, value: 0, data: utils.hexlify(tx.data!) }, requestContext);
    }
    if (tx) {
      tx = await sdk.approveIfNeeded(PARAMETERS.B.DOMAIN, PARAMETERS.ASSET.address, "1", true);
    }
  });

  it.only("sends a simple transfer with fast path", async () => {
    const balanceOfData = getErc20Interface().encodeFunctionData("balanceOf", [PARAMETERS.AGENTS.USER.address]);
    const encoded = await txService.readTx({
      chainId: +PARAMETERS.A.DOMAIN,
      data: balanceOfData,
      to: PARAMETERS.ASSET.address,
    });
    const [tokenBalance] = getErc20Interface().decodeFunctionResult("balanceOf", encoded);
    logger.info(`> sender token balance: ${tokenBalance.toString()}`);
    logger.info("Sending xcall...");
    const xcallData = {
      amount: "1000",
      params: {
        originDomain: PARAMETERS.A.DOMAIN,
        destinationDomain: PARAMETERS.B.DOMAIN,
        to: PARAMETERS.AGENTS.USER.address,
        callback: constants.AddressZero,
        callbackFee: "0",
        callData: "0x",
        forceSlow: false,
        receiveLocal: false,
        recovery: PARAMETERS.AGENTS.USER.address,
        relayerFee: "0",
        slippageTol: "0",
        agent: PARAMETERS.AGENTS.USER.address,
      },
      transactingAssetId: PARAMETERS.ASSET.address,
    };
    const tx = await sdk.xcall(xcallData);

    const receipt = await txService.sendTx(
      { to: tx.to!, value: tx.value ?? 0, data: utils.hexlify(tx.data!), chainId: 1337 },
      requestContext,
    );

    logger.info("xcall sent!");
    logger.info(`Polling origin subgraph for added transfer...`, requestContext, methodContext, {
      domain: xcallData.params.originDomain,
      txHash: receipt.transactionHash,
    });
    let startTime = Date.now();
    const originTransfer: OriginTransfer | undefined = await pollSomething({
      // Attempts will be made for 1 minute.
      attempts: Math.floor(60_000 / SUBG_POLL_PARITY),
      parity: SUBG_POLL_PARITY,
      method: async () => {
        try {
          const transfer = await subgraphReader.getOriginTransferByHash(
            xcallData.params.originDomain,
            receipt.transactionHash,
          );
          if (transfer?.origin.xcall?.transactionHash) {
            return transfer;
          }
        } catch (e: unknown) {
          console.log("Waiting for next loop...");
        }
        return undefined;
      },
    });
    let endTime = Date.now();

    if (!originTransfer) {
      logger.info("Failed to retrieve xcalled transfer from the origin subgraph.", requestContext, methodContext, {
        domain: xcallData.params.originDomain,
        etc: {
          polled: `${(endTime - startTime) / 1_000}s.`,
        },
      });
      throw new Error("Failed to retrieve xcalled transfer from the origin subgraph.");
    }

    logger.info("XCall retrieved.", requestContext, methodContext, {
      domain: xcallData.params.originDomain,
      etc: {
        took: `${endTime - startTime}ms.`,
        transferID: originTransfer?.transferId,
        originTransfer,
      },
    });

    logger.info("Waiting for execution on the destination domain", requestContext, methodContext, {
      domain: xcallData.params.destinationDomain,
      transferId: originTransfer?.transferId,
    });

    const sequencerUrl = process.env.SEQUENCER_URL;
    if (sequencerUrl) {
      logger.info("Polling sequencer for autction status...");
      let error: any | undefined;
      const status: AxiosResponse<AuctionsApiGetAuctionStatusResponse> | undefined = await pollSomething({
        attempts: Math.floor(60_000 / SUBG_POLL_PARITY),
        parity: SUBG_POLL_PARITY,
        method: async () => {
          return await axios
            .request<AuctionsApiGetAuctionStatusResponse>({
              method: "get",
              baseURL: sequencerUrl,
              url: `/auctions/${originTransfer?.transferId}`,
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

    logger.info("Polling destination subgraph for execute tx...", requestContext, methodContext, {
      domain: xcallData.params.destinationDomain,
      transferId: originTransfer?.transferId,
    });

    startTime = Date.now();

    const destinationTransfer: DestinationTransfer | undefined = await pollSomething({
      // Attempts will be made for 3 minutes.
      attempts: Math.floor(180_000 / SUBG_POLL_PARITY),
      parity: SUBG_POLL_PARITY,
      method: async () => {
        const transfer = await subgraphReader.getDestinationTransferById(
          xcallData.params.destinationDomain,
          originTransfer.transferId,
        );
        if (transfer?.destination.reconcile?.transactionHash) {
          logger.info("Transfer was reconciled.", requestContext, methodContext, {
            domain: xcallData.params.destinationDomain,
            hash: transfer.destination.reconcile.transactionHash,
          });
        }

        if (transfer?.destination.execute?.transactionHash) {
          return transfer;
        }
        return undefined;
      },
    });

    endTime = Date.now();

    if (!destinationTransfer) {
      logger.info("Failed to retrieve execute transfer from the destination subgraph.", requestContext, methodContext, {
        domain: xcallData.params.destinationDomain,
        etc: {
          polled: `${(endTime - startTime) / 1_000}s`,
        },
      });
      throw new Error("Failed to retrieve execute transfer from the destination subgraph.");
    }

    logger.info("Execute transaction found.", requestContext, methodContext, {
      domain: xcallData.params.destinationDomain,
      hash: destinationTransfer.destination.execute?.transactionHash,
      etc: {
        took: `${(endTime - startTime) / 1_000}s`,
      },
    });

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
});
