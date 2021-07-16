import {
  RouterNxtpNatsMessagingService,
  MetaTxPayload,
  MetaTxFulfillPayload,
  jsonifyError,
  TransactionPreparedEvent,
  TransactionFulfilledEvent,
  calculateExchangeAmount,
  AuctionPayload,
  AuctionBid,
  signAuctionBid,
} from "@connext/nxtp-utils";
import { providers, Wallet } from "ethers";
import hyperid from "hyperid";
import { BaseLogger } from "pino";

import { getConfig } from "./config";
import { TransactionManager } from "./contract";
import { TransactionStatus } from "./graphqlsdk";
import { SubgraphTransactionManagerListener } from "./transactionManagerListener";

const hId = hyperid();

export const tidy = (str: string): string => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;
export const EXPIRY_DECREMENT = 3600 * 24;
export const SWAP_RATE = "0.9995"; // 0.05% fee

export interface TransactionDataParams {
  user: string;
  router: string;
  sendingAssetId: string;
  receivingAssetId: string;
  receivingAddress: string;
  callData: string;
  transactionId: string;
  sendingChainId: number;
  receivingChainId: number;
  amount: string;
  expiry: number;
  blockNumber: number;
}

/*
  Handler.ts

  The goal of this file is to handle all inbound events and dispatch messages
  or new onchain txs as needed.

  Each handler method should do the following:
  1. Log what it's doing
  2. Validate the event data (in some cases not necessary if onchain validation)
  3. Prepare parameters for next action
  4. Dispatch a new message or tx to chain
  5. Update metrics
*/

export const mutateAmount = (amount: string) => {
  return calculateExchangeAmount(amount, SWAP_RATE);
};

export const mutateExpiry = (expiry: number) => {
  const rxExpiry = expiry - EXPIRY_DECREMENT;
  if (rxExpiry < Date.now() / 1000) {
    throw new Error("Expiration already happened, cant prepare");
  }
  return rxExpiry;
};

export class Handler {
  constructor(
    private readonly messagingService: RouterNxtpNatsMessagingService,
    private readonly subgraph: SubgraphTransactionManagerListener,
    private readonly txManager: TransactionManager,
    private readonly signer: Wallet,
    private readonly logger: BaseLogger,
  ) {
    // log to get rid of unused build errors
  }

  // HandleNewAuction
  // Purpose: Respond to auction with bid if router has sufficient funds for transfer
  // NOTE: This does not need to be implemented as part of MVP
  public async handleNewAuction(data: AuctionPayload, inbox: string): Promise<void> {
    const method = "handleNewAuction";
    const methodId = hId();
    this.logger.info({ method, methodId, data }, "Method start");

    const {
      user,
      sendingChainId,
      sendingAssetId,
      amount,
      receivingAssetId,
      receivingChainId,
      expiry,
      encryptedCallData,
      callDataHash,
      callTo,
      transactionId,
      receivingAddress,
    } = data;

    // validate that assets/chains are supported and there is enough liquidity
    // and gas on both sender and receiver side.
    // TODO: will need to track this offchain
    const amountReceived = mutateAmount(amount);
    const availableLiquidity = await this.subgraph.getAssetBalance(receivingAssetId, receivingChainId);
    if (!availableLiquidity || availableLiquidity.lt(amountReceived)) {
      this.logger.warn(
        {
          method,
          methodId,
          availableLiquidity: availableLiquidity?.toString(),
          amount,
          receivingAssetId,
          receivingChainId,
        },
        "Not enough availble liquidity for auction",
      );
      return;
    }

    const config = getConfig();
    const sendingConfig = config.chainConfig[sendingChainId];
    const receivingConfig = config.chainConfig[receivingChainId];
    if (!sendingConfig.provider || !receivingConfig.provider) {
      this.logger.warn(
        {
          method,
          methodId,
          sendingChainId,
          receivingAssetId,
        },
        "Providers not available for both chains",
      );
      return;
    }
    const senderProvider = new providers.FallbackProvider(
      sendingConfig.provider.map((p) => new providers.JsonRpcProvider(p)),
      1,
    );
    const senderBalance = await senderProvider.getBalance(this.signer.address);

    const receiverProvider = new providers.FallbackProvider(
      receivingConfig.provider.map((p) => new providers.JsonRpcProvider(p)),
      1,
    );
    const receiverBalance = await receiverProvider.getBalance(this.signer.address);
    if (senderBalance.lt(sendingConfig.minGas) || receiverBalance.lt(receivingConfig.minGas)) {
      this.logger.error(
        {
          method,
          methodId,
          sendingChainId,
          receivingAssetId,
        },
        "Not enough gas",
      );
      return;
    }

    // (TODO in what other scenarios would auction fail here? We should make sure
    // that router does not bid unless it is *sure* it's doing ok)
    // If you can support the transfer:
    // Next, prepare bid
    // - TODO: Get price from AMM

    // - TODO: Get fee rate
    // estimate gas for contract
    // amountReceived = amountReceived.sub(gasFee)

    // - Create bid object
    const bid: AuctionBid = {
      user,
      router: this.signer.address,
      sendingChainId,
      sendingAssetId,
      amount,
      receivingChainId,
      receivingAssetId,
      amountReceived,
      receivingAddress,
      transactionId,
      expiry,
      callDataHash,
      callTo,
      encryptedCallData,
      sendingChainTxManagerAddress: sendingConfig.transactionManagerAddress,
      receivingChainTxManagerAddress: receivingConfig.transactionManagerAddress,
    };
    // - Sign bid data
    const bidSignature = await signAuctionBid(bid, this.signer);
    // Next, dispatch bid to messaging service with the user address
    await this.messagingService.publishAuctionResponse({ bid, bidSignature }, inbox);
    // Last, update metrics
  }

  // HandleMetatxRequest
  // Purpose: If a user sends a FULFILL payload, submit it to chain on their behalf
  // NOTE: One consideration here is that it's technically possible for router to
  // just directly fulfill the sender side and leave the user hanging.
  // How can we protect against this case? Maybe broadcast to all routers?
  public async handleMetaTxRequest(data: MetaTxPayload<any>, inbox: string): Promise<void> {
    // First log
    const method = "handleMetaTxRequest";
    const methodId = hId();
    this.logger.info({ method, methodId, data }, "Method start");

    const { chainId } = data;

    if (data.type === "Fulfill") {
      const fulfillData: MetaTxFulfillPayload = data.data;
      // Validate that metatx request matches with known data about fulfill
      // Is this needed? Can we just submit to chain without validating?
      // Technically this is ok, but perhaps we want to validate only for our own
      // logging purposes.
      // Would also be bad if router had no gas here
      // Next, prepare the tx object
      // - Get chainId from data
      // - Get fulfill fee from data and validate it covers gas
      // - etc.
      // Send to txService
      // Update metrics

      // TODO: make sure fee is something we want to accept

      this.logger.info({ method, methodId, chainId, data }, "Submitting tx");
      try {
        const tx = await this.txManager.fulfill(chainId, {
          txData: fulfillData.txData,
          relayerFee: fulfillData.relayerFee,
          signature: fulfillData.signature,
          callData: fulfillData.callData,
        });
        this.logger.info({ method, methodId, transactionHash: tx.transactionHash }, "Relayed transaction");

        // TODO: this will wait for conformation, we should respond before tx is fully confirmed, i.e. in flight
        await this.messagingService.publishMetaTxResponse({ transactionHash: tx.transactionHash, chainId }, inbox);
      } catch (e) {
        this.logger.error({ method, methodId, e: jsonifyError(e) }, "Error relaying transaction");
        // TODO: error response
        await this.messagingService.publishMetaTxResponse({ transactionHash: "", chainId }, inbox);
      }
    }
  }

  // HandleSenderPrepare
  // Purpose: On sender PREPARE, router should mirror the data to receiver chain
  public async handleSenderPrepare(inboundData: TransactionPreparedEvent): Promise<void> {
    const method = "handleSenderPrepare";
    const methodId = hId();
    this.logger.info({ method, methodId, inboundData }, "Method start");

    const { txData, bidSignature, encodedBid, encryptedCallData } = inboundData;

    // TODO: what if theres never a fulfill, where does receiver cancellation
    // get handled? sender + receiver cancellation?

    // Validate the prepare data
    // TODO what needs to be validated here? Is this necessary? Assumption
    // that user is only sending stuff that makes sense is possibly ok since otherwise
    // they're losing gas costs

    //calculateExchange

    // Next, prepare the outbound data
    // Must have:
    // - Sending and receiving chainId
    // - Sending and receiving assetId
    // - Sender address
    // - Router address
    // - Unique transferId (TODO: do we need this? How should we create this?)
    // - Price and fee quote (TODO: either we can agree upon this upfront)
    // - Amount sent by user
    // - Recipient (callTo) and callData

    // amount and expiry need to be modified

    // Then prepare tx object
    // Note tx object must have:
    // - Prepare fn params
    // - Destination chainId
    // - Amount
    // - AssetId
    // encode the data for contract call
    // Send to txService
    this.logger.info({ method, methodId, transactionId: txData.transactionId }, "Sending receiver prepare tx");
    try {
      const txReceipt = await this.txManager.prepare(txData.receivingChainId, {
        txData,
        amount: mutateAmount(txData.amount),
        expiry: mutateExpiry(parseInt(txData.expiry)).toString(),
        bidSignature,
        encodedBid,
        encryptedCallData,
      });
      if (txReceipt) {
        this.logger.info(
          {
            method,
            methodId,
            txHash: txReceipt.transactionHash,
            transactionId: txData.transactionId,
            chainId: txData.receivingChainId,
          },
          "Receiver prepare tx confirmed",
        );
      }
    } catch (e) {
      if ((e.message as string).includes("DIGEST_EXISTS")) {
        this.logger.warn(
          {
            method,
            methodId,
            transactionId: txData.transactionId,
          },
          "Tx Failed because it was already prepared, do not cancel",
        );
      } else {
        // if the prepare tx fails, cancel the sender
        this.logger.warn(
          {
            method,
            methodId,
            transactionId: txData.transactionId,
            prepareError: jsonifyError(e),
          },
          "Could not prepare tx, cancelling",
        );
        try {
          const cancelReceipt = await this.txManager.cancel(txData.sendingChainId, {
            txData,
            signature: "0x",
            relayerFee: "0",
          });
          this.logger.info(
            {
              method,
              methodId,
              txHash: cancelReceipt.transactionHash,
              transactionId: txData.transactionId,
              chainId: txData.receivingChainId,
            },
            "Sender cancel tx confirmed",
          );
        } catch (e) {
          this.logger.error(
            {
              method,
              methodId,
              transactionId: txData.transactionId,
              prepareError: jsonifyError(e),
            },
            "Could not cancel tx",
          );
        }
      }
    }
    // If success, update metrics
  }

  // HandleReceiverFulfill
  // Purpose: Router should mirror the receiver fulfill data back to sender side
  public async handleReceiverFulfill(data: TransactionFulfilledEvent): Promise<void> {
    const method = "handleSenderPrepare";
    const methodId = hId();
    this.logger.info({ method, methodId, data }, "Method start");

    const { txData, signature, callData, relayerFee } = data;

    // Send to tx service
    this.logger.info({ method, methodId, transactionId: txData.transactionId, signature }, "Sending sender fulfill tx");
    const senderTransaction = await this.subgraph.getTransactionForChain(
      txData.transactionId,
      txData.user,
      txData.sendingChainId,
    );
    if (!senderTransaction) {
      this.logger.error(
        {
          transactionId: txData.transactionId,
          sendingChainId: txData.sendingChainId,
          receivingChainId: txData.receivingChainId,
        },
        "Failed to find sender tx on receiver fulfill",
      );
      return;
    }
    if (senderTransaction.status !== TransactionStatus.Prepared) {
      this.logger.warn({ method, methodId, senderTransaction }, "Sender transaction already fulfilled");
      return;
    }
    const txReceipt = await this.txManager.fulfill(txData.sendingChainId, {
      txData: senderTransaction.txData,
      signature,
      relayerFee,
      callData,
    });
    if (txReceipt) {
      this.logger.info(
        {
          method,
          methodId,
          txHash: txReceipt.transactionHash,
          transactionId: txData.transactionId,
          chainId: txData.receivingChainId,
        },
        "Receiver fulfill tx confirmed",
      );
    }
    // If success, update metrics
  }
}
