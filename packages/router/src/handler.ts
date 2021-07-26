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
  NxtpError,
  Values,
  NxtpErrorJson,
  getUuid,
  RequestContext,
} from "@connext/nxtp-utils";
import { BigNumber, utils, Wallet } from "ethers";
import { recoverAuctionBid, decodeAuctionBid } from "@connext/nxtp-utils";
import { combine, err, errAsync, ok, okAsync, Result, ResultAsync } from "neverthrow";
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

export class HandlerError extends NxtpError {
  static readonly type = "HandlerError";
  static readonly reasons = {
    MessagingError: "Messaging Service error",
    TxServiceError: "Error from Transaction Service",
    TxAlreadyPrepared: "Transaction already prepared",
    AuctionValidationError: "Error validating auction params",
    ConfigError: "Config error",
    EncodeError: "Error encoding",
    PrepareValidationError: "Error validating sender prepare",
  };

  constructor(
    public readonly message: Values<typeof HandlerError.reasons> | string,
    public readonly context: {
      auctionError?: NxtpErrorJson;
      messagingError?: NxtpErrorJson;
      txServiceError?: NxtpErrorJson;
      configError?: string;
      requestContext: RequestContext;
      encodingError?: NxtpErrorJson;
      prepareError?: string;
      methodId: string;
      method: string;
      calling: string;
    },
  ) {
    super(message, context, HandlerError.type);
  }
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
export const mutateAmount = (amount: string) => {
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
 * Gets the expiry on a given auction bid
 *
 * @returns Expiry time of a given bid in s
 */
export const getBidExpiry = () => Math.floor(Date.now() / 1000) + 60 * 5;

/**
 * Contains all callback logic for events and messages received by the router
 */
export class Handler {
  private receiverPreparing: Map<string, boolean> = new Map();
  private senderFulfilling: Map<string, boolean> = new Map();
  constructor(
    private readonly messagingService: RouterNxtpNatsMessagingService,
    private readonly _subgraph: Subgraph,
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
   * @param data - The payload broadcast when starting an auction
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
  public async handleNewAuction(data: AuctionPayload, inbox: string, requestContext: RequestContext): Promise<void> {
    const method = this.handleNewAuction.name;
    const methodId = getUuid();
    this.logger.info({ method, methodId, requestContext, data, inbox }, "Method start");

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
      dryRun,
    } = data;

    // validate that assets/chains are supported and there is enough liquidity
    // and gas on both sender and receiver side.
    // TODO: will need to track this offchain
    const amountReceived = mutateAmount(amount);

    const config = getConfig();
    const sendingConfig = config.chainConfig[sendingChainId];
    const receivingConfig = config.chainConfig[receivingChainId];
    let bid: AuctionBid;
    const result = await this._subgraph
      .getAssetBalance(receivingAssetId, receivingChainId)
      .andThen((balance) => {
        // validate liquidity
        if (balance.lt(amountReceived)) {
          return errAsync(
            new HandlerError(HandlerError.reasons.AuctionValidationError, {
              calling: "",
              methodId,
              method,
              requestContext,
              auctionError: {
                message: "Not enough availble liquidity for auction",
                type: "Validation",
                context: {
                  balance: balance.toString(),
                  amount,
                  receivingAssetId,
                  receivingChainId,
                },
              },
            }),
          );
        }

        // validate config
        const config = getConfig();
        const sendingConfig = config.chainConfig[sendingChainId];
        const receivingConfig = config.chainConfig[receivingChainId];
        if (
          !sendingConfig.providers ||
          sendingConfig.providers.length === 0 ||
          !receivingConfig.providers ||
          receivingConfig.providers.length === 0
        ) {
          return errAsync(
            new HandlerError(HandlerError.reasons.AuctionValidationError, {
              calling: "",
              methodId,
              method,
              requestContext,
              auctionError: {
                message: "Providers not available for both chains",
                type: "Validation",
                context: {
                  sendingChainId,
                  receivingChainId,
                },
              },
            }),
          );
        }

        const allowedSwap = config.swapPools.find(
          (pool) =>
            pool.assets.find(
              (a) => utils.getAddress(a.assetId) === utils.getAddress(sendingAssetId) && a.chainId === sendingChainId,
            ) &&
            pool.assets.find(
              (a) =>
                utils.getAddress(a.assetId) === utils.getAddress(receivingAssetId) && a.chainId === receivingChainId,
            ),
        );
        if (!allowedSwap) {
          return errAsync(
            new HandlerError(HandlerError.reasons.AuctionValidationError, {
              calling: "",
              methodId,
              method,
              requestContext,
              auctionError: {
                message: "Allowed swap not part of config",
                type: "Validation",
                context: {
                  sendingAssetId,
                  sendingChainId,
                  receivingChainId,
                  receivingAssetId,
                },
              },
            }),
          );
        }

        return combine([
          ResultAsync.fromPromise(
            this.txService.getBalance(sendingChainId, this.signer.address),
            (err) =>
              new HandlerError(HandlerError.reasons.TxServiceError, {
                calling: "txService.getBalance => sending",
                method,
                methodId,
                requestContext,
                txServiceError: jsonifyError(err as NxtpError),
              }),
          ),
          ResultAsync.fromPromise(
            this.txService.getBalance(receivingChainId, this.signer.address),
            (err) =>
              new HandlerError(HandlerError.reasons.TxServiceError, {
                calling: "txService.getBalance => receiving",
                method,
                methodId,
                requestContext,
                txServiceError: jsonifyError(err as NxtpError),
              }),
          ),
        ]);
      })
      .andThen((balances) => {
        const [senderBalance, receiverBalance] = balances as BigNumber[];
        if (senderBalance.lt(sendingConfig.minGas) || receiverBalance.lt(receivingConfig.minGas)) {
          return errAsync(
            new HandlerError(HandlerError.reasons.AuctionValidationError, {
              calling: "",
              methodId,
              method,
              requestContext,
              auctionError: {
                message: "Not enough gas",
                type: "Validation",
                context: {
                  sendingChainId,
                  receivingChainId,
                },
              },
            }),
          );
        }
        return okAsync({ senderBalance, receiverBalance });
      })
      .andThen(() => {
        this.logger.info({ method, methodId, requestContext }, "Auction validation complete, generating bid");
        // (TODO in what other scenarios would auction fail here? We should make sure
        // that router does not bid unless it is *sure* it's doing ok)
        // If you can support the transfer:
        // Next, prepare bid
        // - TODO: Get price from AMM
        // - TODO: Get fee rate
        // estimate gas for contract
        // amountReceived = amountReceived.sub(gasFee)

        // - Create bid object
        bid = {
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
          bidExpiry: getBidExpiry(),
        };
        this.logger.info({ methodId, method, requestContext, bid }, "Generated bid");

        return ResultAsync.fromPromise(
          signAuctionBid(bid, this.signer),
          (err) =>
            new HandlerError(HandlerError.reasons.AuctionValidationError, {
              calling: "signAuctionBid",
              methodId,
              requestContext,
              method,
              auctionError: jsonifyError(err as Error),
            }),
        );
      })
      .andThen((bidSignature) => {
        this.logger.info({ methodId, method, requestContext, bidSignature }, "Signed bid");
        return ResultAsync.fromPromise(
          this.messagingService.publishAuctionResponse(inbox, { bid, bidSignature: dryRun ? undefined : bidSignature }),
          (err) =>
            new HandlerError(HandlerError.reasons.MessagingError, {
              calling: "messagingService.publishAuctionResponse",
              methodId,
              requestContext,
              method,
              messagingError: jsonifyError(err as Error),
            }),
        );
      });

    if (result.isOk()) {
      // Last, update metrics
      this.logger.info({ method, methodId, requestContext, result: result.value }, "Method complete");
    } else {
      this.logger.error({ method, methodId, requestContext, transactionId, err: result.error }, "Error in method");
    }
  }

  // HandleMetatxRequest
  /**
   * Handles requests for transaction relayers. I.e. if a user sends a fulfill payload, submit it to chain on their behalf.
   *
   * @param data - The payload broadcast for submitting the meta transaction
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
   */
  public async handleMetaTxRequest(
    data: MetaTxPayload<any>,
    inbox: string,
    requestContext: RequestContext,
  ): Promise<void> {
    // First log
    const method = this.handleMetaTxRequest.name;
    const methodId = getUuid();
    this.logger.info({ method, methodId, requestContext, data }, "Method start");

    const { chainId } = data;
    const config = getConfig();
    const chainConfig = config.chainConfig[chainId];
    if (!chainConfig) {
      const err = new HandlerError(HandlerError.reasons.ConfigError, {
        requestContext,
        calling: "getConfig",
        methodId,
        method,
        configError: `No chainConfig for ${chainId}`,
      });
      this.logger.error({ method, methodId, requestContext, err: err.toJson() }, "Error in config");
    }

    if (data.type === "Fulfill") {
      if (utils.getAddress(data.to) !== utils.getAddress(chainConfig.transactionManagerAddress)) {
        const err = new HandlerError(HandlerError.reasons.ConfigError, {
          requestContext,
          calling: "chainConfig.transactionManagerAddress",
          methodId,
          method,
          configError: `Provided transactionManagerAddress does not map to our configured transactionManagerAddress`,
        });
        this.logger.error({ method, methodId, requestContext, err: err.toJson() }, "Error in config");
      }

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

      this.logger.info({ method, methodId, requestContext, chainId, data }, "Submitting tx");
      const res = await this.txManager
        .fulfill(
          chainId,
          {
            txData: fulfillData.txData,
            relayerFee: fulfillData.relayerFee,
            signature: fulfillData.signature,
            callData: fulfillData.callData,
          },
          requestContext,
        )
        .andThen((tx) => {
          this.logger.info(
            { method, methodId, requestContext, transactionHash: tx.transactionHash },
            "Relayed transaction",
          );
          return ResultAsync.fromPromise(
            this.messagingService.publishMetaTxResponse(inbox, { chainId, transactionHash: tx.transactionHash }),
            (err) =>
              new HandlerError(HandlerError.reasons.MessagingError, {
                method,
                methodId,
                requestContext,
                calling: "messagingService.publishMetaTxResponse",
                messagingError: jsonifyError(err as Error),
              }),
          );
        })
        .orElse((err) => {
          this.logger.error({ method, methodId, requestContext }, "Error relaying transaction");
          const _err = new HandlerError(HandlerError.reasons.TxServiceError, {
            method,
            methodId,
            requestContext,
            calling: "txManager.fulfill",
            txServiceError: jsonifyError(err),
          });
          return ResultAsync.fromPromise(
            this.messagingService.publishMetaTxResponse(inbox, { chainId, transactionHash: "" }, jsonifyError(_err)),
            (err) =>
              new HandlerError(HandlerError.reasons.MessagingError, {
                method,
                requestContext,
                methodId,
                calling: "messagingService.publishMetaTxResponse",
                messagingError: jsonifyError(err as Error),
              }),
          );
        });

      if (res.isOk()) {
        this.logger.info({ method, methodId, requestContext }, "Method complete");
      } else {
        this.logger.error({ method, methodId, requestContext, err: jsonifyError(res.error) }, "Error occurred");
      }
    }
  }

  // HandleSenderPrepare
  /**
   * On sender prepare, router should mirror the data to receiver chain
   *
   * @param inboundData - The TransactionManager emitted event
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
  public async handleSenderPrepare(
    inboundData: TransactionPreparedEvent,
    requestContext: RequestContext,
  ): Promise<void> {
    const method = "handleSenderPrepare";
    const methodId = getUuid();
    this.logger.info({ method, methodId, inboundData, requestContext }, "Method start");

    const { txData, bidSignature, encodedBid, encryptedCallData } = inboundData;

    if (this.receiverPreparing.get(txData.transactionId)) {
      this.logger.info({ methodId, method, requestContext, transactionId: txData.transactionId }, "Already fulfilling");
      return;
    }

    // TODO: what if theres never a fulfill, where does receiver cancellation
    // get handled? sender + receiver cancellation?

    // Validate the prepare data
    // TODO what needs to be validated here? Is this necessary? Assumption
    // that user is only sending stuff that makes sense is possibly ok since otherwise
    // they're losing gas costs

    let bid: AuctionBid;
    const validationRes = Result.fromThrowable(
      decodeAuctionBid,
      (err) =>
        new HandlerError(HandlerError.reasons.EncodeError, {
          method,
          methodId,
          calling: "decodeAuctionBid",
          requestContext,
          encodingError: jsonifyError(err as Error),
        }),
    )(encodedBid)
      .andThen((_bid) => {
        bid = _bid;
        this.logger.info({ method, methodId, requestContext }, "Decoded bid from event");
        return Result.fromThrowable(
          recoverAuctionBid,
          (err) =>
            new HandlerError(HandlerError.reasons.EncodeError, {
              method,
              methodId,
              calling: "recoverAuctionBid",
              requestContext,
              encodingError: jsonifyError(err as Error),
            }),
        )(bid, bidSignature);
      })
      .andThen((recovered) => {
        if (recovered !== this.signer.address) {
          return err(
            new HandlerError(HandlerError.reasons.PrepareValidationError, {
              method,
              methodId,
              calling: "",
              requestContext,
              prepareError: "recovered !== this.signer.address",
            }),
          );
        }
        return ok(undefined);
      })
      .andThen(() => {
        // TODO: anything else? seems unnecessary to validate everything
        if (bid.amount !== txData.amount || bid.transactionId !== txData.transactionId) {
          return err(
            new HandlerError(HandlerError.reasons.PrepareValidationError, {
              method,
              methodId,
              calling: "",
              requestContext,
              prepareError: "Bid params not equal to tx data",
            }),
          );
        }
        return ok(undefined);
      });

    if (validationRes.isOk()) {
      this.logger.info({ method, methodId, requestContext }, "Validated input");
    } else {
      this.logger.error(
        {
          method,
          methodId,
          requestContext,
          transactionId: txData.transactionId,
          err: jsonifyError(validationRes.error as Error),
        },
        "Error during validation",
      );
      return;
    }

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
    this.receiverPreparing.set(txData.transactionId, true);
    this.logger.info(
      { method, methodId, requestContext, transactionId: txData.transactionId },
      "Sending receiver prepare tx",
    );
    const res = await this.txManager.prepare(
      txData.receivingChainId,
      {
        txData,
        amount: mutateAmount(txData.amount),
        expiry: mutateExpiry(txData.expiry),
        bidSignature,
        encodedBid,
        encryptedCallData,
      },
      requestContext,
    );
    this.logger.info({ method, methodId, transactionId: txData.transactionId }, "Sending receiver prepare tx");

    if (res.isOk()) {
      this.logger.info(
        { method, methodId, requestContext, transactionHash: res.value.transactionHash },
        "Prepared transaction",
      );
      // If success, update metrics
    } else {
      if (res.error.message.includes("#P:015")) {
        this.logger.warn(
          {
            method,
            methodId,
            requestContext,
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
            requestContext,
            transactionId: txData.transactionId,
            prepareError: jsonifyError(res.error),
          },
          "Could not prepare tx",
        );
        this.logger.error(
          {
            method,
            methodId,
            requestContext,
          },
          "Do not cancel ATM, figure out why we are in this case first",
        );
        // const cancelRes = await this.txManager.cancel(txData.sendingChainId, {
        //   txData,
        //   signature: "0x",
        //   relayerFee: "0",
        // });
        // if (cancelRes.isOk()) {
        //   this.logger.warn(
        //     { method, methodId, transactionHash: cancelRes.value.transactionHash },
        //     "Cancelled transaction",
        //   );
        // } else {
        //   this.logger.error({ method, methodId }, "Could not cancel transaction after error!");
        // }
      }
    }
    this.receiverPreparing.delete(txData.transactionId);
  }

  // HandleReceiverFulfill
  // Purpose: Router should mirror the receiver fulfill data back to sender side
  /**
   *
   * Router should mirror the receiver fulfill data back to sender side to claim funds from the transaction (net gain should be the fee).
   *
   * @param senderEvent - The sending chain TransactionPrepared event
   * @param senderEvent.txData - The transaction (invariant + variant) data submitted to the sending chain
   * @param senderEvent.caller - The person who submitted the sender `prepare` event
   * @param senderEvent.encryptedCallData - The user-encrypted calldata
   * @param senderEvent.encodedBid - The encoded winning auction bid for the transaction
   * @param senderEvent.bidSignature - The signature on the winning auction bid
   * @param receiverEvent - The receiving chain TransactionFulfilled event
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
    requestContext: RequestContext,
  ): Promise<void> {
    const method = this.handleReceiverFulfill.name;
    const methodId = getUuid();
    this.logger.info({ method, methodId, requestContext, senderEvent, receiverEvent }, "Method start");

    const { txData, signature, callData, relayerFee } = receiverEvent;

    if (this.senderFulfilling.get(txData.transactionId)) {
      this.logger.info({ methodId, method, requestContext, transactionId: txData.transactionId }, "Already fulfilling");
      return;
    }

    this.senderFulfilling.set(txData.transactionId, true);

    // Send to tx service
    this.logger.info(
      { method, methodId, requestContext, transactionId: txData.transactionId, signature },
      "Sending sender fulfill tx",
    );

    const res = await this.txManager.fulfill(
      txData.sendingChainId,
      {
        txData: senderEvent.txData,
        signature,
        relayerFee,
        callData,
      },
      requestContext,
    );

    if (res.isOk()) {
      this.logger.info(
        { method, methodId, requestContext, transactionHash: res.value.transactionHash },
        "Fulfilled transaction",
      );
      // If success, update metrics
    } else {
      this.logger.error(
        { method, methodId, requestContext, err: jsonifyError(res.error) },
        "Error fulfilling transaction",
      );
    }

    this.senderFulfilling.delete(txData.transactionId);
  }
}
