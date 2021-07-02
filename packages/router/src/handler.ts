import { RouterNxtpNatsMessagingService, MetaTxPayload, MetaTxFulfillPayload, jsonifyError } from "@connext/nxtp-utils";
import { v4 } from "uuid";
import { Signer } from "ethers";
import { BaseLogger } from "pino";
import { TransactionService } from "@connext/nxtp-txservice";

import { TransactionManager } from "./contract";
import {
  ReceiverFulfillData,
  ReceiverPrepareData,
  SenderFulfillData,
  SenderPrepareData,
  SubgraphTransactionManagerListener,
} from "./transactionManagerListener";
import { TransactionStatus } from "./graphqlsdk";

export const tidy = (str: string): string => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;
export const EXPIRY_DECREMENT = 3600 * 24;

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

//look @ ethers Contract instantiation for abiEncode

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

// TODO should this be a class? Would be much easier to test, and remove the need
// to pass in dependencies into every single function from the listener.

export interface Handler {
  handleNewAuction(data: AuctionData): Promise<void>;
  handleMetaTxRequest(data: MetaTxPayload<any>): Promise<void>;
  handleSenderPrepare(inboundData: SenderPrepareData): Promise<void>;
  handleReceiverPrepare(data: ReceiverPrepareData): Promise<void>;
  handleSenderFulfill(data: SenderFulfillData): Promise<void>;
  handleReceiverFulfill(data: ReceiverFulfillData): Promise<void>;
}

export type AuctionData = any;

export class Handler implements Handler {
  constructor(
    private readonly messagingService: RouterNxtpNatsMessagingService,
    private readonly subgraph: SubgraphTransactionManagerListener,
    private readonly signer: Signer,
    private readonly txService: TransactionService,
    private readonly logger: BaseLogger,
    private readonly txManager: TransactionManager,
  ) {
    // log to get rid of unused build errors
    console.log(typeof this.messagingService);
    console.log(typeof this.subgraph);
    console.log(typeof this.signer);
  }

  // HandleNewAuction
  // Purpose: Respond to auction with bid if router has sufficient funds for transfer
  // NOTE: This does not need to be implemented as part of MVP
  public async handleNewAuction(_data: AuctionData): Promise<void> {
    // First, log
    // TODO
    // Next, validate that assets/chains are supported and there is enough liquidity
    // and gas on both sender and receiver side.
    // (TODO in what other scenarios would auction fail here? We should make sure
    // that router does not bid unless it is *sure* it's doing ok)
    // If you can support the transfer:
    // Next, prepare bid
    // - Get price from AMM (TODO)
    // - Get fee rate
    // - Sign bid data
    // - Create bid object
    // Next, dispatch bid to messaging service with the user address
    // Last, update metrics
    // TODO (also need to discuss what data is most needed here)
  }

  // HandleMetatxRequest
  // Purpose: If a user sends a FULFILL payload, submit it to chain on their behalf
  // NOTE: One consideration here is that it's technically possible for router to
  // just directly fulfill the sender side and leave the user hanging.
  // How can we protect against this case? Maybe broadcast to all routers?
  public async handleMetaTxRequest(data: MetaTxPayload<any>): Promise<void> {
    // First log
    const method = "handleMetaTxRequest";
    const methodId = v4();
    this.logger.info({ method, methodId, data }, "Method start");

    const { chainId, responseInbox } = data;

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

      this.logger.info({ method, methodId, chainId, responseInbox, data }, "Submitting tx");
      try {
        const tx = await this.txManager.fulfill(chainId, {
          relayerFee: fulfillData.relayerFee,
          signature: fulfillData.signature,
          txData: fulfillData.txData,
        });
        this.logger.info({ method, methodId, transactionHash: tx.transactionHash }, "Relayed transaction");
        await this.messagingService.publishMetaTxResponse(
          { transactionHash: tx.transactionHash, chainId },
          responseInbox,
        );
      } catch (e) {
        this.logger.error({ method, methodId, e: jsonifyError(e) }, "Error relaying transaction");
        // TODO: error response
        await this.messagingService.publishMetaTxResponse({ transactionHash: "", chainId }, responseInbox);
      }
    }
  }

  // HandleSenderPrepare
  // Purpose: On sender PREPARE, router should mirror the data to receiver chain
  public async handleSenderPrepare(inboundData: SenderPrepareData): Promise<void> {
    const method = "handleSenderPrepare";
    const methodId = v4();
    this.logger.info({ method, methodId, inboundData }, "Method start");

    // TODO: where should sender cancellation be handled / evaluated?
    // RS: sender cannot cancel the tx, only the receiver (router) can

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
    this.logger.info({ method, methodId, transactionId: inboundData.transactionId }, "Sending receiver prepare tx");
    const txReceipt = await this.txManager.prepare(inboundData);
    if (txReceipt) {
      this.logger.info(
        {
          method,
          methodId,
          txHash: txReceipt.transactionHash,
          transactionId: inboundData.transactionId,
          chainId: inboundData.receivingChainId,
        },
        "Receiver prepare tx confirmed",
      );
    }
    // If success, update metrics
  }
  // if the prepare tx fails, cancel the sender

  // HandleReceiverPrepare
  // Purpose: On this method, no action is needed from the router except to update
  // metrics
  public async handleReceiverPrepare(_data: ReceiverPrepareData): Promise<void> {
    // First log
    // Update metrics
  }

  // HandleSenderFulfill
  // Purpose: No action is needed here from router except to update metrics
  public async handleSenderFulfill(_data: SenderFulfillData): Promise<void> {
    // First log
    // Update metrics
  }

  // HandleReceiverFulfill
  // Purpose: Router should mirror the receiver fulfill data back to sender side
  public async handleReceiverFulfill(data: ReceiverFulfillData): Promise<void> {
    const method = "handleSenderPrepare";
    const methodId = v4();
    this.logger.info({ method, methodId, data }, "Method start");

    const senderTransaction = await this.subgraph.getSenderTransaction(data.transactionId, data.sendingChainId);
    if (!senderTransaction) {
      this.logger.error(
        {
          transactionId: data.transactionId,
          sendingChainId: data.sendingChainId,
          receivingChainId: data.receivingChainId,
        },
        "Failed to find sender tx on receiver fulfill",
      );
      return;
    }
    if (senderTransaction.status === TransactionStatus.Fulfilled) {
      this.logger.warn({ method, methodId, senderTransaction }, "Sender transaction already fulfilled");
      return;
    }
    // Send to tx service
    this.logger.info(
      { method, methodId, transactionId: data.transactionId, signature: data.signature },
      "Sending sender fulfill tx",
    );
    const txReceipt = await this.txManager.fulfill(data.sendingChainId, {
      relayerFee: data.relayerFee,
      signature: data.signature,
      txData: {
        amount: data.amount,
        blockNumber: data.blockNumber,
        callData: data.callData,
        user: data.user,
        transactionId: data.transactionId,
        sendingChainId: data.sendingChainId,
        sendingAssetId: data.sendingAssetId,
        router: data.router,
        receivingChainId: data.receivingChainId,
        receivingAssetId: data.receivingAssetId,
        receivingAddress: data.receivingAddress,
        expiry: data.expiry.toString(),
      },
    });
    if (txReceipt) {
      this.logger.info(
        {
          method,
          methodId,
          txHash: txReceipt.transactionHash,
          transactionId: data.transactionId,
          chainId: data.receivingChainId,
        },
        "Receiver fulfill tx confirmed",
      );
    }
    // If success, update metrics
  }
}
