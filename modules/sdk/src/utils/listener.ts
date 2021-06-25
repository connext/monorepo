import { InvariantTransactionData } from "@connext/nxtp-utils";
import { Contract, providers } from "ethers";
import { Evt } from "evt";
import { getTransactionManagerContract } from "./contract";
// Define event types
// TODO: liquidity events?
export type TransactionPreparedEvent = {
  txData: InvariantTransactionData;
  amount: string;
  expiry: string;
  blockNumber: number;
  caller: string;
};

export type TransactionFulfilledEvent = {
  txData: InvariantTransactionData;
  amount: string;
  expiry: string;
  blockNumber: number;
  signature: string;
  relayerFee: string;
  caller: string;
};

export type TransactionCancelledEvent = {
  txData: InvariantTransactionData;
  amount: string;
  expiry: string;
  blockNumber: number;
  caller: string;
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
    private readonly provider: providers.Web3Provider,
    private readonly transactionManager: Contract,
  ) {}

  static async connect(provider: providers.Web3Provider): Promise<TransactionManagerListener> {
    const { chainId } = await provider.getNetwork();

    const { instance } = getTransactionManagerContract(chainId, provider);
    console.log("trying to create contract");
    console.log("");
    const listener = new TransactionManagerListener(provider, instance);
    await listener.establishListeners();
    return listener;
  }

  public getTransactionManager(): Contract {
    return this.transactionManager;
  }

  private async establishListeners(): Promise<void> {
    const { chainId } = await this.provider.getNetwork();

    const { address, abi } = getTransactionManagerContract(chainId, this.provider);
    console.log("trying to create contract");
    console.log("");
    const contract = new Contract(address, abi, this.provider);
    console.log("contract created");

    const processTxData = (txData: any): InvariantTransactionData => {
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
      };
    };

    contract.on(TransactionManagerEvents.TransactionPrepared, (txData, amount, expiry, block, caller) => {
      const payload: TransactionPreparedEvent = {
        caller,
        blockNumber: block.toString(),
        amount: amount.toString(),
        expiry: expiry.toString(),
        txData: processTxData(txData),
      };
      this.evts[TransactionManagerEvents.TransactionPrepared].post(payload);
    });

    contract.on(
      TransactionManagerEvents.TransactionFulfilled,
      (txData, amount, expiry, block, relayerFee, signature, caller) => {
        const payload: TransactionFulfilledEvent = {
          caller,
          blockNumber: block.toString(),
          amount: amount.toString(),
          expiry: expiry.toString(),
          relayerFee: relayerFee.toString(),
          signature: signature,
          txData: processTxData(txData),
        };
        this.evts[TransactionManagerEvents.TransactionFulfilled].post(payload);
      },
    );

    contract.on(TransactionManagerEvents.TransactionCancelled, (txData, amount, expiry, block, caller) => {
      const payload: TransactionCancelledEvent = {
        caller,
        blockNumber: block.toString(),
        amount: amount.toString(),
        expiry: expiry.toString(),
        txData: processTxData(txData),
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
