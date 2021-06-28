import { RouterNxtpNatsMessagingService, calculateExchangeAmount, jsonifyError } from "@connext/nxtp-utils";
import { v4 } from "uuid";
import { constants, Signer, utils } from "ethers";
import { BaseLogger } from "pino";
import { TransactionManager } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";

import {
  ReceiverFulfillData,
  ReceiverPrepareData,
  SenderFulfillData,
  SenderPrepareData,
  SubgraphTransactionManagerListener,
} from "./transactionManagerListener";
import { getConfig } from "./config";
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
  handleMetaTxRequest(data: MetaTxData): Promise<void>;
  handleSenderPrepare(inboundData: SenderPrepareData): Promise<void>;
  handleReceiverPrepare(data: ReceiverPrepareData): Promise<void>;
  handleSenderFulfill(data: SenderFulfillData): Promise<void>;
  handleReceiverFulfill(data: ReceiverFulfillData): Promise<void>;
}

export type AuctionData = any;
export type MetaTxData = {
  relayerFee: string;
  to: string;
  data: string;
  chainId: number;
};

export class Handler implements Handler {
  constructor(
    private readonly messagingService: RouterNxtpNatsMessagingService,
    private readonly subgraph: SubgraphTransactionManagerListener,
    private readonly signer: Signer,
    private readonly txService: TransactionService,
    private readonly logger: BaseLogger,
  ) {
    // log to get rid of unused build errors
    console.log(typeof this.messagingService);
    console.log(typeof this.subgraph);
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
  public async handleMetaTxRequest(data: MetaTxData): Promise<void> {
    // First log
    const method = "handleSenderPrepare";
    const methodId = v4();
    this.logger.info({ method, methodId, data }, "Method start");

    const { relayerFee, to, data: txData, chainId } = data;

    // TODO:
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

    this.logger.info({ method, methodId, chainId, relayerFee }, "Submitting tx");
    const tx = await this.txService.sendAndConfirmTx(chainId, { to, value: "0", data: txData, chainId });
    this.logger.info({ method, methodId, transactionHash: tx.transactionHash }, "Relayed transaction");

    // TODO: publish response, whats the best way to do this? need a predictable
    // inbox for this tx only
  }

  // HandleSenderPrepare
  // Purpose: On sender PREPARE, router should mirror the data to receiver chain
  public async handleSenderPrepare(inboundData: SenderPrepareData): Promise<void> {
    const method = "handleSenderPrepare";
    const methodId = v4();
    this.logger.info({ method, methodId, inboundData }, "Method start");
    const signerAddress = await this.signer.getAddress();
    const config = getConfig();

    if (inboundData.status !== TransactionStatus.Prepared) {
      this.logger.error({ method, methodId, status: inboundData.status }, "Receiver tx cannot be prepared");
      return;
    }

    // TODO: where should sender cancellation be handled / evaluated?
    // TODO: what if theres never a fulfill, where does receiver cancellation
    // get handled? sender + receiver cancellation?

    const nxtpContract = new utils.Interface(TransactionManagerArtifact.abi) as TransactionManager["interface"];

    // Generate params
    const txParams = {
      callData: inboundData.callData,
      receivingAddress: inboundData.receivingAddress,
      receivingAssetId: inboundData.receivingAssetId,
      receivingChainId: inboundData.receivingChainId,
      router: inboundData.router,
      sendingAssetId: inboundData.sendingAssetId,
      sendingChainId: inboundData.sendingChainId,
      transactionId: inboundData.transactionId,
      user: inboundData.user,
    };

    // Make sure we didnt *already* prepare receiver tx
    // NOTE: if subgraph is out of date here, worst case is that the tx is
    // reverted. this is fine.
    const receiverTransaction = await this.subgraph.getReceiverTransaction(
      inboundData.transactionId,
      inboundData.receivingChainId,
    );
    if (receiverTransaction) {
      this.logger.info({ method, methodId, receiverTransaction }, "Receiver transaction already prepared");
      return;
    }

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
    const receiverAmount = calculateExchangeAmount(inboundData.amount, "0.995");
    const receiverExpiry = inboundData.expiry - EXPIRY_DECREMENT;

    if (receiverExpiry < Date.now() / 1000) {
      throw new Error("Expiry already happened");
    }

    // Then prepare tx object
    // Note tx object must have:
    // - Prepare fn params
    // - Destination chainId
    // - Amount
    // - AssetId
    // encode the data for contract call
    const encodedData = nxtpContract.encodeFunctionData("prepare", [txParams, receiverAmount, receiverExpiry]);
    // Send to txService
    try {
      this.logger.info({ method, methodId, transactionId: inboundData.transactionId }, "Sending receiver prepare tx");
      const txRes = await this.txService.sendAndConfirmTx(inboundData.receivingChainId, {
        to: config.chainConfig[inboundData.receivingChainId].transactionManagerAddress,
        data: encodedData,
        value: constants.Zero,
        chainId: inboundData.receivingChainId,
        from: signerAddress,
      });
      this.logger.info(
        {
          method,
          methodId,
          txHash: txRes.transactionHash,
          transactionId: inboundData.transactionId,
          chainId: inboundData.receivingChainId,
        },
        "Receiver prepare tx confirmed",
      );
    } catch (e) {
      if (e.message.includes("DUPLICATE_DIGEST")) {
        this.logger.warn(
          { methodId, method, transactionId: inboundData.transactionId },
          "Receiver tx already prepared, but resubmitted",
        );
        return;
      }
      this.logger.error(
        { methodId, method, error: jsonifyError(e), transactionId: inboundData.transactionId },
        "Error sending receiver prepare tx",
      );
      // TODO: cancel sender here?
      throw e;
    }

    // If success, update metrics
  }

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

    const signerAddress = await this.signer.getAddress();
    const config = getConfig();

    const senderTransaction = await this.subgraph.getSenderTransaction(data.transactionId, data.sendingChainId);
    if (senderTransaction?.status === TransactionStatus.Fulfilled) {
      this.logger.warn({ method, methodId, senderTransaction }, "Sender transaction already fulfilled");
      return;
    }

    // const nxtpContract = new utils.Interface(TransactionManagerArtifact.abi) as TransactionManager["interface"];
    const nxtpContract = new utils.Interface(TransactionManagerArtifact.abi) as TransactionManager["interface"];
    const encodedData = nxtpContract.encodeFunctionData("fulfill", [
      {
        callData: data.callData,
        receivingAddress: data.receivingAddress,
        receivingAssetId: data.receivingAssetId,
        receivingChainId: data.receivingChainId,
        router: data.router,
        sendingAssetId: data.sendingAssetId,
        sendingChainId: data.sendingChainId,
        transactionId: data.transactionId,
        user: data.user,
      },
      data.relayerFee,
      data.signature,
    ]);

    // Send to tx service
    try {
      this.logger.info(
        { method, methodId, transactionId: data.transactionId, signature: data.signature },
        "Sending sender fulfill tx",
      );
      const txRes = await this.txService.sendAndConfirmTx(data.sendingChainId, {
        to: config.chainConfig[data.sendingChainId].transactionManagerAddress,
        data: encodedData,
        value: 0,
        chainId: data.sendingChainId,
        from: signerAddress,
      });
      this.logger.info(
        { method, methodId, txHash: txRes.transactionHash, transactionId: data.transactionId },
        "Sender fulfill tx confirmed",
      );
    } catch (e) {
      // If fail -- something has gone really wrong here!! We need to figure out what ASAP.
      this.logger.error(
        { methodId, method, transactionId: data.transactionId, error: jsonifyError(e) },
        "Error sending sender fulfill tx",
      );
      // TODO discuss this case!!
      throw e;
    }
    // If success, update metrics
  }
}
