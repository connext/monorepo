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
  recoverAuctionBid,
  decodeAuctionBid,
} from "@connext/nxtp-utils";
import { BigNumber, utils, Wallet } from "ethers";
import hyperid from "hyperid";
import { combine, err, errAsync, ok, okAsync, Result, ResultAsync } from "neverthrow";
import { BaseLogger } from "pino";

import { getConfig } from "./config";
import { TransactionManager } from "./contract";
import { Subgraph } from "./subgraph";

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

export class HandlerError extends NxtpError {
  static readonly type = "HandlerError";
  static readonly reasons = {
    MessagingError: "Messaging Service error",
    TxServiceError: "Error from Transaction Service",
    TxAlreadyPrepared: "Transaction already prepared",
    AuctionValidationError: "Error validating auction params",
    EncodeError: "Error encoding",
    PrepareValidationError: "Error validating sender prepare",
  };

  constructor(
    public readonly message: Values<typeof HandlerError.reasons> | string,
    public readonly context: {
      auctionError?: NxtpErrorJson;
      messagingError?: NxtpErrorJson;
      txServiceError?: NxtpErrorJson;
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

export const getBidExpiry = () => Math.floor(Date.now() / 1000) + 60 * 5;

export class Handler {
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
  // Purpose: Respond to auction with bid if router has sufficient funds for transfer
  // NOTE: This does not need to be implemented as part of MVP
  public async handleNewAuction(data: AuctionPayload, inbox: string): Promise<void> {
    const method = this.handleNewAuction.name;
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
    const result = await this.txManager
      .getRouterBalance(receivingChainId, receivingAssetId) // TODO: try to use subgraph or something else
      .andThen((balance) => {
        // validate liquidity
        if (balance.lt(amountReceived)) {
          return errAsync(
            new HandlerError(HandlerError.reasons.AuctionValidationError, {
              calling: "",
              methodId,
              method,
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
        this.logger.info({ methodId, method, bid }, "Generated bid");

        return ResultAsync.fromPromise(
          signAuctionBid(bid, this.signer),
          (err) =>
            new HandlerError(HandlerError.reasons.AuctionValidationError, {
              calling: "signAuctionBid",
              methodId,
              method,
              auctionError: jsonifyError(err as Error),
            }),
        );
      })
      .andThen((bidSignature) => {
        this.logger.info({ methodId, method, bidSignature }, "Signed bid");
        return ResultAsync.fromPromise(
          this.messagingService.publishAuctionResponse(inbox, { bid, bidSignature: dryRun ? undefined : bidSignature }),
          (err) =>
            new HandlerError(HandlerError.reasons.MessagingError, {
              calling: "messagingService.publishAuctionResponse",
              methodId,
              method,
              messagingError: jsonifyError(err as Error),
            }),
        );
      });

    if (result.isOk()) {
      // Last, update metrics
      this.logger.info({ method, methodId, result: result.value }, "Method complete");
    } else {
      this.logger.error({ method, methodId, transactionId, err: result.error });
    }
  }

  // HandleMetatxRequest
  // Purpose: If a user sends a FULFILL payload, submit it to chain on their behalf
  public async handleMetaTxRequest(data: MetaTxPayload<any>, inbox: string): Promise<void> {
    // First log
    const method = this.handleMetaTxRequest.name;
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
      const res = await this.txManager
        .fulfill(chainId, {
          txData: fulfillData.txData,
          relayerFee: fulfillData.relayerFee,
          signature: fulfillData.signature,
          callData: fulfillData.callData,
        })
        .andThen((tx) => {
          this.logger.info({ method, methodId, transactionHash: tx.transactionHash }, "Relayed transaction");
          return ResultAsync.fromPromise(
            this.messagingService.publishMetaTxResponse(inbox, { chainId, transactionHash: tx.transactionHash }),
            (err) =>
              new HandlerError(HandlerError.reasons.MessagingError, {
                method,
                methodId,
                calling: "messagingService.publishMetaTxResponse",
                messagingError: jsonifyError(err as Error),
              }),
          );
        })
        .orElse((err) => {
          this.logger.info({ method, methodId, transactionHash: "" }, "Error relaying transaction");
          const _err = new HandlerError(HandlerError.reasons.TxServiceError, {
            method,
            methodId,
            calling: "txManager.fulfill",
            txServiceError: jsonifyError(err),
          });
          return ResultAsync.fromPromise(
            this.messagingService.publishMetaTxResponse(inbox, { chainId, transactionHash: "" }, jsonifyError(_err)),
            (err) =>
              new HandlerError(HandlerError.reasons.MessagingError, {
                method,
                methodId,
                calling: "messagingService.publishMetaTxResponse",
                messagingError: jsonifyError(err as Error),
              }),
          );
        });

      if (res.isOk()) {
        this.logger.info({ method, methodId }, "Method complete");
      } else {
        this.logger.error({ method, methodId, err: jsonifyError(res.error) }, "Error occurred");
      }
    }
  }

  // HandleSenderPrepare
  // Purpose: On sender PREPARE, router should mirror the data to receiver chain
  public async handleSenderPrepare(inboundData: TransactionPreparedEvent): Promise<void> {
    const method = "handleSenderPrepare";
    const methodId = hId();
    this.logger.info({ method, methodId, inboundData }, "Method start");

    const { txData, bidSignature, encodedBid, encryptedCallData, amount } = inboundData;

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
          encodingError: jsonifyError(err as Error),
        }),
    )(encodedBid)
      .andThen((_bid) => {
        bid = _bid;
        return Result.fromThrowable(
          recoverAuctionBid,
          (err) =>
            new HandlerError(HandlerError.reasons.EncodeError, {
              method,
              methodId,
              calling: "recoverAuctionBid",
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
              prepareError: "recovered !== this.signer.address",
            }),
          );
        }
        return ok(undefined);
      })
      .andThen(() => {
        // TODO: anything else? seems unnecessary to validate everything
        if (bid.amount !== amount || bid.transactionId !== txData.transactionId) {
          return err(
            new HandlerError(HandlerError.reasons.PrepareValidationError, {
              method,
              methodId,
              calling: "",
              prepareError: "Bid params not equal to tx data",
            }),
          );
        }
        return ok(undefined);
      });

    if (validationRes.isOk()) {
      //
    } else {
      this.logger.error(
        { method, methodId, transactionId: txData.transactionId, err: jsonifyError(validationRes.error as Error) },
        "Error during validation",
      );
      // TODO: maybe cancel here
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
    this.logger.info({ method, methodId, transactionId: txData.transactionId }, "Sending receiver prepare tx");
    const res = await this.txManager.prepare(txData.receivingChainId, {
      txData,
      amount: mutateAmount(amount),
      expiry: mutateExpiry(txData.expiry),
      bidSignature,
      encodedBid,
      encryptedCallData,
    });

    if (res.isOk()) {
      this.logger.info({ method, methodId, transactionHash: res.value.transactionHash }, "Prepared transaction");
      // If success, update metrics
    } else {
      if (res.error.message.includes("#P:015")) {
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
            prepareError: jsonifyError(res.error),
          },
          "Could not prepare tx",
        );
        this.logger.error(
          {
            method,
            methodId,
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
  }

  // HandleReceiverFulfill
  // Purpose: Router should mirror the receiver fulfill data back to sender side
  public async handleReceiverFulfill(
    senderEvent: TransactionPreparedEvent,
    receiverEvent: TransactionFulfilledEvent,
  ): Promise<void> {
    const method = this.handleReceiverFulfill.name;
    const methodId = hId();
    this.logger.info({ method, methodId, senderEvent, receiverEvent }, "Method start");

    const { txData, signature, callData, relayerFee } = receiverEvent;

    // Send to tx service
    this.logger.info({ method, methodId, transactionId: txData.transactionId, signature }, "Sending sender fulfill tx");

    const res = await this.txManager.fulfill(txData.sendingChainId, {
      txData: senderEvent.txData,
      signature,
      relayerFee,
      callData,
    });

    if (res.isOk()) {
      this.logger.info({ method, methodId, transactionHash: res.value.transactionHash }, "Fulfilled transaction");
      // If success, update metrics
    } else {
      this.logger.error({ method, methodId, err: jsonifyError(res.error) }, "Fulfilled transaction");
    }
  }
}
