import { TransactionData } from "@connext/nxtp-utils";
import { Contract, providers } from "ethers";
import { Evt } from "evt";

import { getTransactionManagerContract } from "./contract";
// Define event types
// TODO: liquidity events?
export type TransactionPreparedEvent = {
  txData: TransactionData;
  caller: string;
  encodedBid: string;
  bidSignature: string;
  chainId: number;
};

export type TransactionFulfilledEvent = {
  txData: TransactionData;
  signature: string;
  relayerFee: string;
  caller: string;
  chainId: number;
};

export type TransactionCancelledEvent = {
  txData: TransactionData;
  caller: string;
  chainId: number;
};

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
  private readonly evts: { [K in TransactionManagerEvent]: Evt<TransactionManagerEventPayloads[K]> } = {
    [TransactionManagerEvents.TransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [TransactionManagerEvents.TransactionFulfilled]: Evt.create<TransactionFulfilledEvent>(),
    [TransactionManagerEvents.TransactionCancelled]: Evt.create<TransactionCancelledEvent>(),
  };

  private constructor(
    private readonly provider: providers.JsonRpcProvider,
    private readonly transactionManager: Contract,
  ) {}

  static async connect(provider: providers.JsonRpcProvider): Promise<TransactionManagerListener> {
    const { chainId } = await provider.getNetwork();

    const { instance } = getTransactionManagerContract(chainId, provider);
    const listener = new TransactionManagerListener(provider, instance);
    await listener.establishListeners();
    return listener;
  }

  public getTransactionManager(): Contract {
    return this.transactionManager;
  }

  private async establishListeners(): Promise<void> {
    const { chainId } = await this.provider.getNetwork();

    const processTxData = (txData: any): TransactionData => {
      return {
        user: txData.user,
        router: txData.router,
        sendingAssetId: txData.sendingAssetId,
        receivingAssetId: txData.receivingAssetId,
        receivingAddress: txData.receivingAddress,
        sendingChainId: txData.sendingChainId.toNumber(),
        receivingChainId: txData.receivingChainId.toNumber(),
        callData: txData.callData,
        transactionId: txData.transactionId,
        blockNumber: txData.blockNumber.toNumber(),
        amount: txData.amount.toString(),
        expiry: txData.expiry.toString(),
      };
    };

    this.transactionManager.on(
      TransactionManagerEvents.TransactionPrepared,
      (txData, caller, encodedBid, bidSignature) => {
        const payload: TransactionPreparedEvent = {
          caller,
          txData: processTxData(txData),
          chainId,
          encodedBid,
          bidSignature,
        };
        this.evts[TransactionManagerEvents.TransactionPrepared].post(payload);
      },
    );

    this.transactionManager.on(
      TransactionManagerEvents.TransactionFulfilled,
      (txData, relayerFee, signature, caller) => {
        const payload: TransactionFulfilledEvent = {
          caller,
          relayerFee: relayerFee.toString(),
          signature: signature,
          txData: processTxData(txData),
          chainId,
        };
        this.evts[TransactionManagerEvents.TransactionFulfilled].post(payload);
      },
    );

    this.transactionManager.on(TransactionManagerEvents.TransactionCancelled, (txData, caller) => {
      const payload: TransactionCancelledEvent = {
        caller,
        txData: processTxData(txData),
        chainId,
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
    const args = [timeout, callback].filter(x => !!x) as [number, (data: TransactionManagerEventPayloads[T]) => void];
    this.evts[event].pipe(filter).attach(...args);
  }

  public attachOnce<T extends TransactionManagerEvent>(
    event: T,
    callback: (data: TransactionManagerEventPayloads[T]) => void,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter(x => !!x) as [number, (data: TransactionManagerEventPayloads[T]) => void];
    this.evts[event].pipe(filter).attachOnce(...args);
  }

  public detach<T extends TransactionManagerEvent>(event?: T): void {
    if (event) {
      this.evts[event].detach();
      return;
    }
    Object.values(this.evts).forEach(evt => evt.detach());
  }

  public waitFor<T extends TransactionManagerEvent>(
    event: T,
    timeout: number,
    filter: (data: TransactionManagerEventPayloads[T]) => boolean = (_data: TransactionManagerEventPayloads[T]) => true,
  ): Promise<TransactionManagerEventPayloads[T]> {
    return this.evts[event].pipe(filter).waitFor(timeout);
  }
}
