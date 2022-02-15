/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
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
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface BridgeRouterInterface extends utils.Interface {
  contractName: "BridgeRouter";
  functions: {
    "DUST_AMOUNT()": FunctionFragment;
    "PRE_FILL_FEE_DENOMINATOR()": FunctionFragment;
    "PRE_FILL_FEE_NUMERATOR()": FunctionFragment;
    "VERSION()": FunctionFragment;
    "enrollCustom(uint32,bytes32,address)": FunctionFragment;
    "enrollRemoteRouter(uint32,bytes32)": FunctionFragment;
    "handle(uint32,uint32,bytes32,bytes)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "liquidityProvider(bytes32)": FunctionFragment;
    "migrate(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "preFill(uint32,uint32,bytes)": FunctionFragment;
    "remotes(uint32)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "send(address,uint256,uint32,bytes32,bool,bytes32,bytes32)": FunctionFragment;
    "setXAppConnectionManager(address)": FunctionFragment;
    "tokenRegistry()": FunctionFragment;
    "transactionManager()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "xAppConnectionManager()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DUST_AMOUNT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PRE_FILL_FEE_DENOMINATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PRE_FILL_FEE_NUMERATOR",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "enrollCustom",
    values: [BigNumberish, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "enrollRemoteRouter",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "handle",
    values: [BigNumberish, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "liquidityProvider",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "migrate", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "preFill",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "remotes",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "send",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BytesLike,
      boolean,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setXAppConnectionManager",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenRegistry",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transactionManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "xAppConnectionManager",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "DUST_AMOUNT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PRE_FILL_FEE_DENOMINATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PRE_FILL_FEE_NUMERATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "enrollCustom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enrollRemoteRouter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "handle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "liquidityProvider",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "migrate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "preFill", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "remotes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "send", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setXAppConnectionManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactionManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "xAppConnectionManager",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Receive(uint64,address,address,address,uint256)": EventFragment;
    "Send(address,address,uint32,bytes32,uint256,bool,bytes32,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Receive"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Send"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type ReceiveEvent = TypedEvent<
  [BigNumber, string, string, string, BigNumber],
  {
    originAndNonce: BigNumber;
    token: string;
    recipient: string;
    liquidityProvider: string;
    amount: BigNumber;
  }
>;

export type ReceiveEventFilter = TypedEventFilter<ReceiveEvent>;

export type SendEvent = TypedEvent<
  [string, string, number, string, BigNumber, boolean, string, string],
  {
    token: string;
    from: string;
    toDomain: number;
    toId: string;
    amount: BigNumber;
    fastLiquidityEnabled: boolean;
    externalHash: string;
    message: string;
  }
>;

export type SendEventFilter = TypedEventFilter<SendEvent>;

export interface BridgeRouter extends BaseContract {
  contractName: "BridgeRouter";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BridgeRouterInterface;

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
    DUST_AMOUNT(overrides?: CallOverrides): Promise<[BigNumber]>;

    PRE_FILL_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    PRE_FILL_FEE_NUMERATOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    VERSION(overrides?: CallOverrides): Promise<[number]>;

    enrollCustom(
      _domain: BigNumberish,
      _id: BytesLike,
      _custom: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    enrollRemoteRouter(
      _domain: BigNumberish,
      _router: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    handle(
      _origin: BigNumberish,
      _nonce: BigNumberish,
      _sender: BytesLike,
      _message: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      _tokenRegistry: string,
      _xAppConnectionManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    liquidityProvider(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    migrate(
      _oldRepr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    preFill(
      _origin: BigNumberish,
      _nonce: BigNumberish,
      _message: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    remotes(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    send(
      _token: string,
      _amount: BigNumberish,
      _destination: BigNumberish,
      _recipient: BytesLike,
      _enableFast: boolean,
      _externalId: BytesLike,
      _externalHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setXAppConnectionManager(
      _xAppConnectionManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokenRegistry(overrides?: CallOverrides): Promise<[string]>;

    transactionManager(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    xAppConnectionManager(overrides?: CallOverrides): Promise<[string]>;
  };

  DUST_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;

  PRE_FILL_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

  PRE_FILL_FEE_NUMERATOR(overrides?: CallOverrides): Promise<BigNumber>;

  VERSION(overrides?: CallOverrides): Promise<number>;

  enrollCustom(
    _domain: BigNumberish,
    _id: BytesLike,
    _custom: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  enrollRemoteRouter(
    _domain: BigNumberish,
    _router: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  handle(
    _origin: BigNumberish,
    _nonce: BigNumberish,
    _sender: BytesLike,
    _message: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    _tokenRegistry: string,
    _xAppConnectionManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  liquidityProvider(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  migrate(
    _oldRepr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  preFill(
    _origin: BigNumberish,
    _nonce: BigNumberish,
    _message: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  remotes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  send(
    _token: string,
    _amount: BigNumberish,
    _destination: BigNumberish,
    _recipient: BytesLike,
    _enableFast: boolean,
    _externalId: BytesLike,
    _externalHash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setXAppConnectionManager(
    _xAppConnectionManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokenRegistry(overrides?: CallOverrides): Promise<string>;

  transactionManager(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  xAppConnectionManager(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    DUST_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;

    PRE_FILL_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    PRE_FILL_FEE_NUMERATOR(overrides?: CallOverrides): Promise<BigNumber>;

    VERSION(overrides?: CallOverrides): Promise<number>;

    enrollCustom(
      _domain: BigNumberish,
      _id: BytesLike,
      _custom: string,
      overrides?: CallOverrides
    ): Promise<void>;

    enrollRemoteRouter(
      _domain: BigNumberish,
      _router: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    handle(
      _origin: BigNumberish,
      _nonce: BigNumberish,
      _sender: BytesLike,
      _message: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(
      _tokenRegistry: string,
      _xAppConnectionManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    liquidityProvider(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    migrate(_oldRepr: string, overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    preFill(
      _origin: BigNumberish,
      _nonce: BigNumberish,
      _message: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    remotes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    send(
      _token: string,
      _amount: BigNumberish,
      _destination: BigNumberish,
      _recipient: BytesLike,
      _enableFast: boolean,
      _externalId: BytesLike,
      _externalHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setXAppConnectionManager(
      _xAppConnectionManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenRegistry(overrides?: CallOverrides): Promise<string>;

    transactionManager(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    xAppConnectionManager(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Receive(uint64,address,address,address,uint256)"(
      originAndNonce?: BigNumberish | null,
      token?: string | null,
      recipient?: string | null,
      liquidityProvider?: null,
      amount?: null
    ): ReceiveEventFilter;
    Receive(
      originAndNonce?: BigNumberish | null,
      token?: string | null,
      recipient?: string | null,
      liquidityProvider?: null,
      amount?: null
    ): ReceiveEventFilter;

    "Send(address,address,uint32,bytes32,uint256,bool,bytes32,bytes)"(
      token?: string | null,
      from?: string | null,
      toDomain?: BigNumberish | null,
      toId?: null,
      amount?: null,
      fastLiquidityEnabled?: null,
      externalHash?: null,
      message?: null
    ): SendEventFilter;
    Send(
      token?: string | null,
      from?: string | null,
      toDomain?: BigNumberish | null,
      toId?: null,
      amount?: null,
      fastLiquidityEnabled?: null,
      externalHash?: null,
      message?: null
    ): SendEventFilter;
  };

  estimateGas: {
    DUST_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;

    PRE_FILL_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    PRE_FILL_FEE_NUMERATOR(overrides?: CallOverrides): Promise<BigNumber>;

    VERSION(overrides?: CallOverrides): Promise<BigNumber>;

    enrollCustom(
      _domain: BigNumberish,
      _id: BytesLike,
      _custom: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    enrollRemoteRouter(
      _domain: BigNumberish,
      _router: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    handle(
      _origin: BigNumberish,
      _nonce: BigNumberish,
      _sender: BytesLike,
      _message: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      _tokenRegistry: string,
      _xAppConnectionManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    liquidityProvider(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    migrate(
      _oldRepr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    preFill(
      _origin: BigNumberish,
      _nonce: BigNumberish,
      _message: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    remotes(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    send(
      _token: string,
      _amount: BigNumberish,
      _destination: BigNumberish,
      _recipient: BytesLike,
      _enableFast: boolean,
      _externalId: BytesLike,
      _externalHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setXAppConnectionManager(
      _xAppConnectionManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokenRegistry(overrides?: CallOverrides): Promise<BigNumber>;

    transactionManager(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    xAppConnectionManager(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    DUST_AMOUNT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PRE_FILL_FEE_DENOMINATOR(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PRE_FILL_FEE_NUMERATOR(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    enrollCustom(
      _domain: BigNumberish,
      _id: BytesLike,
      _custom: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    enrollRemoteRouter(
      _domain: BigNumberish,
      _router: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    handle(
      _origin: BigNumberish,
      _nonce: BigNumberish,
      _sender: BytesLike,
      _message: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      _tokenRegistry: string,
      _xAppConnectionManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    liquidityProvider(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    migrate(
      _oldRepr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    preFill(
      _origin: BigNumberish,
      _nonce: BigNumberish,
      _message: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    remotes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    send(
      _token: string,
      _amount: BigNumberish,
      _destination: BigNumberish,
      _recipient: BytesLike,
      _enableFast: boolean,
      _externalId: BytesLike,
      _externalHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setXAppConnectionManager(
      _xAppConnectionManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokenRegistry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transactionManager(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    xAppConnectionManager(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
