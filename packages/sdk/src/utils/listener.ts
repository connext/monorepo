import {
  TransactionCancelledEvent,
  TransactionData,
  TransactionFulfilledEvent,
  TransactionPreparedEvent,
} from "@connext/nxtp-utils";
import { TransactionManager } from "@connext/nxtp-contracts/typechain";
import { providers } from "ethers";
import { Evt } from "evt";

import { getTransactionManagerContract } from "./contract";

export const TransactionManagerEvents = {
  TransactionPrepared: "TransactionPrepared",
  TransactionFulfilled: "TransactionFulfilled",
  TransactionCancelled: "TransactionCancelled",
} as const;
export type TransactionManagerEvent = typeof TransactionManagerEvents[keyof typeof TransactionManagerEvents];

export interface TransactionManagerEventPayloads {
  [TransactionManagerEvents.TransactionPrepared]: TransactionPreparedEvent;
  [TransactionManagerEvents.TransactionFulfilled]: TransactionFulfilledEvent;
  [TransactionManagerEvents.TransactionCancelled]: TransactionCancelledEvent;
}

export class TransactionManagerListener {
  private readonly evts = {
    [TransactionManagerEvents.TransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [TransactionManagerEvents.TransactionFulfilled]: Evt.create<TransactionFulfilledEvent>(),
    [TransactionManagerEvents.TransactionCancelled]: Evt.create<TransactionCancelledEvent>(),
  };
  public chainId?: number;

  private constructor(private readonly transactionManager: TransactionManager) {}

  static async connect(provider: providers.JsonRpcProvider): Promise<TransactionManagerListener> {
    const { chainId } = await provider.getNetwork();

    const { instance } = getTransactionManagerContract(chainId, provider);
    const listener = new TransactionManagerListener(instance);
    listener.chainId = chainId;
    await listener.establishListeners();
    return listener;
  }

  public getTransactionManager(): TransactionManager {
    return this.transactionManager;
  }

  private async establishListeners(): Promise<void> {
    const processTxData = (txData: any): TransactionData => {
      return {
        user: txData.user,
        router: txData.router,
        sendingAssetId: txData.sendingAssetId,
        receivingAssetId: txData.receivingAssetId,
        sendingChainFallback: txData.sendingChainFallback,
        callTo: txData.callTo,
        receivingAddress: txData.receivingAddress,
        sendingChainId: txData.sendingChainId.toNumber(),
        receivingChainId: txData.receivingChainId.toNumber(),
        callDataHash: txData.callDataHash,
        transactionId: txData.transactionId,
        preparedBlockNumber: txData.blockNumber.toNumber(),
        amount: txData.amount.toString(),
        expiry: txData.expiry.toString(),
      };
    };

    this.transactionManager.on(
      TransactionManagerEvents.TransactionPrepared,
      (txData, caller, encryptedCallData, encodedBid, bidSignature) => {
        const payload: TransactionPreparedEvent = {
          txData: processTxData(txData),
          caller,
          encryptedCallData,
          encodedBid,
          bidSignature,
        };
        this.evts[TransactionManagerEvents.TransactionPrepared].post(payload);
      },
    );

    this.transactionManager.on(
      TransactionManagerEvents.TransactionFulfilled,
      (txData, relayerFee, signature, callData, caller) => {
        const payload: TransactionFulfilledEvent = {
          txData: processTxData(txData),
          signature: signature,
          relayerFee: relayerFee.toString(),
          callData,
          caller,
        };
        this.evts[TransactionManagerEvents.TransactionFulfilled].post(payload);
      },
    );

    this.transactionManager.on(TransactionManagerEvents.TransactionCancelled, (txData, relayerFee, caller) => {
      const payload: TransactionCancelledEvent = {
        txData: processTxData(txData),
        relayerFee: relayerFee.toString(),
        caller,
      };
      this.evts[TransactionManagerEvents.TransactionCancelled].post(payload);
    });
  }

  public attach<T extends TransactionManagerEvent>(
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x) as [number, (data: TransactionManagerEventPayloads[T]) => void];
    this.evts[event].pipe(filter).attach(...args);
  }

  public attachOnce<T extends TransactionManagerEvent>(
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x) as [number, (data: TransactionManagerEventPayloads[T]) => void];
    this.evts[event].pipe(filter).attachOnce(...args);
  }

  public detach<T extends TransactionManagerEvent>(event?: T): void {
    if (event) {
      this.evts[event].detach();
      return;
    }
    Object.values(this.evts).forEach((evt) => evt.detach());
  }

  public waitFor<T extends TransactionManagerEvent>(
    event: T,
    timeout: number,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
  ): Promise<TransactionManagerEventPayloads[T]> {
    return this.evts[event].pipe(filter).waitFor(timeout);
  }
}
