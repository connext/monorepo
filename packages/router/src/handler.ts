import { TransactionService } from "@connext/nxtp-txservice";
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
import { BigNumber, Wallet } from "ethers";
import hyperid from "hyperid";
import { BaseLogger } from "pino";

import { getConfig } from "./config";
import { TransactionManager } from "./contract";
import { Subgraph } from "./subgraph";

/**
 * Handler.ts

  The goal of this file is to handle all inbound events and dispatch messages
  or new onchain txs as needed.

  Each handler method should do the following:
  1. Log what it's doing
  2. Validate the event data (in some cases not necessary if onchain validation)
  3. Prepare parameters for next action
  4. Dispatch a new message or tx to chain
  5. Update metrics
 */

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

/**
 * Returns the amount * SWAP_RATE to deduct fees when going from sending -> recieving chain to incentivize routing.
 *
 * @param amount The amount of the transaction on the sending chain
 * @returns The amount, less fees as determined by the SWAP_RATE
 *
 * @remarks
 * Router fulfills on sending chain, so gets `amount`, and user fulfills on receiving chain so gets `amount * SWAP_RATE`
 */
export const mutateAmount = (amount: string): string => {
  return calculateExchangeAmount(amount, SWAP_RATE);
};

/**
 * Returns the expiry - EXPIRY_DECREMENT to ensure the receiving-side transfer expires prior to the sending-side transfer.
 *
 * @param expiry The expiry of the transaction on the sending chain
 * @returns The expiry for the receiving-chain transaction (expires sooner than the sending-chain transaction)
 *
 * @remarks
 * Recieiving chain expires first to force the secret to be revealed on the receiving side before the sending side expires
 */
export const mutateExpiry = (expiry: number): number => {
  const rxExpiry = expiry - EXPIRY_DECREMENT;
  if (rxExpiry < Date.now() / 1000) {
    throw new Error("Expiration already happened, cant prepare");
  }
  return rxExpiry;
};

/**
 * Contains all callback logic for events and messages received by the router
 */
export class Handler {
  constructor(
    private readonly messagingService: RouterNxtpNatsMessagingService,
    private readonly subgraph: Subgraph,
    private readonly txManager: TransactionManager,
    private readonly txService: TransactionService,
    private readonly signer: Wallet,
    private readonly logger: BaseLogger,
  ) {
    // log to get rid of unused build errors
  }

  // HandleNewAuction
  /**
   * Responds to new auctions with a bid if the router has sufficient funds for the transfer being auctioned.
   *
   * @param data.user - The user who wants to transfer
   * @param data.sendingChainId - The originating chain (where router will claim funds from)
   * @param data.sendingAssetId - The originating asset (identifier of assets router will claim)
   * @param data.amount - The amount to be transferred
   * @param data.receivingChainId - The destination chain (where router will provide liquidity)
   * @param data.receivingAssetId - The destination asset (identifier of assets router will claim)
   * @param data.receivingAddress - Where the funds will be sent to directly on the receiving chain (if callTo is address(0)), or as a fallback if the calldata fails
   * @param data.expiry - The expiry of the transaction on the originating chain
   * @param data.transactionId - The unique identifier of the transaction
   * @param data.encryptedCallData - The user-encrypted calldata to execute on the receiving chain
   * @param data.callDataHash - The hash of the unencrypted calldata to execute on the receiving chain
   * @param data.callTo - The contract address to execute the calldata on
   * @param inbox - The inbox to publish the auction response to (where the initiator of the auction will be listening for bids)
   * @returns An empty promise
   */
  public async handleNewAuction(data: AuctionPayload, inbox: string): Promise<void> {
    const method = "handleNewAuction";
    const methodId = hId();
    this.logger.info({ method, methodId, data, inbox }, "Method start");

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

    let senderBalance: BigNumber;
    try {
      senderBalance = await this.txService.getBalance(sendingChainId, this.signer.address);
    } catch (error) {
      this.logger.error(
        {
          method,
          methodId,
          sendingChainId,
          err: jsonifyError(error),
        },
        "Could not get sender balance",
      );
      return;
    }

    let receiverBalance: BigNumber;
    try {
      receiverBalance = await this.txService.getBalance(sendingChainId, this.signer.address);
    } catch (error) {
      this.logger.error(
        {
          method,
          methodId,
          receivingChainId,
          err: jsonifyError(error),
        },
        "Could not get receiver balance",
      );
      return;
    }
    if (senderBalance.lt(sendingConfig.minGas) || receiverBalance.lt(receivingConfig.minGas)) {
      this.logger.error(
        {
          method,
          methodId,
          sendingChainId,
        },
        "Not enough gas",
      );
      return;
    }

    this.logger.info({ method, methodId }, "Auction validation complete, generating bid");

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
    this.logger.info({ method, methodId, bid, bidSignature }, "Bid sent");
    // Last, update metrics
  }

  // HandleMetatxRequest
  /**
   * Handles requests for transaction relayers. I.e. if a user sends a fulfill payload, submit it to chain on their behalf.
   *
   * @param data.type - The type of transaction they are submitting
   * @param data.relayerFee - The fee for submission
   * @param data.to - The `TransactionManager` address
   * // TODO: is ^^ even correct
   * @param data.data - The payload for the given `type` of transaction
   * @param data.chainId - The chain to send the transaction on
   * @param inbox - The inbox to publish the metatx response to
   * @returns Empty promise
   *
   * @remarks
   * The transaction should be broadcast to an entire network of relayers who will race to claim the fee. If it is only broadcast to a *single* relayer, then they could collude with the transaction's router to cancel the receiver-side payment and fulfill the sender-side payment (since the signature has been revealed)
   *
   * TODO: Make ^^ happen
   */
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

        // TODO: this will wait for confirmation, we should respond before tx is fully confirmed, i.e. in flight
        await this.messagingService.publishMetaTxResponse({ transactionHash: tx.transactionHash, chainId }, inbox);
      } catch (e) {
        this.logger.error({ method, methodId, e: jsonifyError(e) }, "Error relaying transaction");
        // TODO: error response
        await this.messagingService.publishMetaTxResponse({ transactionHash: "", chainId }, inbox);
      }
    }
  }

  // HandleSenderPrepare
  /**
   * On sender prepare, router should mirror the data to receiver chain
   *
   * @param inboundData.txData - The transaction (invariant + variant) data submitted to the sending chain
   * @param inboundData.caller - The person who submitted the sender `prepare` event
   * @param inboundData.encryptedCallData - The user-encrypted calldata
   * @param inboundData.encodedBid - The encoded winning auction bid for the transaction
   * @param inboundData.bidSignature - The signature on the winning auction bid
   * @returns Empty promise
   *
   * @remarks
   * Should cancel the transsaction on the sending chain if it fails to prepare on the receiving chain. Will also prepare with a lower amount and lower expiry then what was prepared with on the receiving chain.
   */
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
        expiry: mutateExpiry(txData.expiry),
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
      // prepare: DIGEST_EXISTS
      if ((e.message as string).includes("#P:015")) {
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
  /**
   *
   * Router should mirror the receiver fulfill data back to sender side to claim funds from the transaction (net gain should be the fee).
   *
   * @param senderEvent.txData - The transaction (invariant + variant) data submitted to the sending chain
   * @param senderEvent.caller - The person who submitted the sender `prepare` event
   * @param senderEvent.encryptedCallData - The user-encrypted calldata
   * @param senderEvent.encodedBid - The encoded winning auction bid for the transaction
   * @param senderEvent.bidSignature - The signature on the winning auction bid
   * @param receiverEvent.txData - The transaction (invariant + variant) data submitted to the receiving chain
   * @param receiverEvent.signature - The signature on the receiving chain (used to unlock the sending chain)
   * @param receiverEvent.callData - The unencrypted calldata submitted on the receiving chain (will be disregarded on sending chain)
   * @param receiverEvent.caller - The msg.sender from the receiving chain `fulfill` transaction
   * @returns Empty promise
   *
   * @remarks
   * At this point, router cannot cancel. The router must submit the transaction to reclaim the funds.
   */
  public async handleReceiverFulfill(
    senderEvent: TransactionPreparedEvent,
    receiverEvent: TransactionFulfilledEvent,
  ): Promise<void> {
    const method = "handleReceiverFulfill";
    const methodId = hId();
    this.logger.info({ method, methodId, senderEvent, receiverEvent }, "Method start");

    const { txData, signature, callData, relayerFee } = receiverEvent;

    // Send to tx service
    this.logger.info({ method, methodId, transactionId: txData.transactionId, signature }, "Sending sender fulfill tx");
    const txReceipt = await this.txManager.fulfill(txData.sendingChainId, {
      txData: senderEvent.txData,
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
