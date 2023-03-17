/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface ConnextPoolLiquidityInterface extends utils.Interface {
  functions: {
    "connext()": FunctionFragment;
    "xReceive(bytes32,uint256,address,address,uint32,bytes)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "connext" | "xReceive"): FunctionFragment;

  encodeFunctionData(functionFragment: "connext", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "xReceive",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "connext", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "xReceive", data: BytesLike): Result;

  events: {
    "CrossLiquidityAdded(bytes32,address,address,uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CrossLiquidityAdded"): EventFragment;
}

export interface CrossLiquidityAddedEventObject {
  transferId: string;
  recipient: string;
  lp: string;
  received: BigNumber;
  deposited: string;
  depositedAmount: BigNumber;
}
export type CrossLiquidityAddedEvent = TypedEvent<
  [string, string, string, BigNumber, string, BigNumber],
  CrossLiquidityAddedEventObject
>;

export type CrossLiquidityAddedEventFilter =
  TypedEventFilter<CrossLiquidityAddedEvent>;

export interface ConnextPoolLiquidity extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ConnextPoolLiquidityInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    connext(overrides?: CallOverrides): Promise<[string]>;

    xReceive(
      _transferId: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _asset: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  connext(overrides?: CallOverrides): Promise<string>;

  xReceive(
    _transferId: PromiseOrValue<BytesLike>,
    _amount: PromiseOrValue<BigNumberish>,
    _asset: PromiseOrValue<string>,
    arg3: PromiseOrValue<string>,
    arg4: PromiseOrValue<BigNumberish>,
    _callData: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    connext(overrides?: CallOverrides): Promise<string>;

    xReceive(
      _transferId: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _asset: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "CrossLiquidityAdded(bytes32,address,address,uint256,address,uint256)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      recipient?: PromiseOrValue<string> | null,
      lp?: PromiseOrValue<string> | null,
      received?: null,
      deposited?: null,
      depositedAmount?: null
    ): CrossLiquidityAddedEventFilter;
    CrossLiquidityAdded(
      transferId?: PromiseOrValue<BytesLike> | null,
      recipient?: PromiseOrValue<string> | null,
      lp?: PromiseOrValue<string> | null,
      received?: null,
      deposited?: null,
      depositedAmount?: null
    ): CrossLiquidityAddedEventFilter;
  };

  estimateGas: {
    connext(overrides?: CallOverrides): Promise<BigNumber>;

    xReceive(
      _transferId: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _asset: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    connext(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    xReceive(
      _transferId: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      _asset: PromiseOrValue<string>,
      arg3: PromiseOrValue<string>,
      arg4: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
