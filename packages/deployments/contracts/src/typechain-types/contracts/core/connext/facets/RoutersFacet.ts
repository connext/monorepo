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
  PayableOverrides,
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
} from "../../../../common";

export interface RoutersFacetInterface extends utils.Interface {
  functions: {
    "LIQUIDITY_FEE_DENOMINATOR()": FunctionFragment;
    "LIQUIDITY_FEE_NUMERATOR()": FunctionFragment;
    "acceptProposedRouterOwner(address)": FunctionFragment;
    "addRouterLiquidity(uint256,address)": FunctionFragment;
    "addRouterLiquidityFor(uint256,address,address)": FunctionFragment;
    "approveRouterForPortal(address)": FunctionFragment;
    "getProposedRouterOwner(address)": FunctionFragment;
    "getProposedRouterOwnerTimestamp(address)": FunctionFragment;
    "getRouterApproval(address)": FunctionFragment;
    "getRouterApprovalForPortal(address)": FunctionFragment;
    "getRouterOwner(address)": FunctionFragment;
    "getRouterRecipient(address)": FunctionFragment;
    "maxRoutersPerTransfer()": FunctionFragment;
    "proposeRouterOwner(address,address)": FunctionFragment;
    "removeRouter(address)": FunctionFragment;
    "removeRouterLiquidity(uint256,address,address)": FunctionFragment;
    "removeRouterLiquidityFor(uint256,address,address,address)": FunctionFragment;
    "routerBalances(address,address)": FunctionFragment;
    "setLiquidityFeeNumerator(uint256)": FunctionFragment;
    "setMaxRoutersPerTransfer(uint256)": FunctionFragment;
    "setRouterRecipient(address,address)": FunctionFragment;
    "setupRouter(address,address,address)": FunctionFragment;
    "unapproveRouterForPortal(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "LIQUIDITY_FEE_DENOMINATOR"
      | "LIQUIDITY_FEE_NUMERATOR"
      | "acceptProposedRouterOwner"
      | "addRouterLiquidity"
      | "addRouterLiquidityFor"
      | "approveRouterForPortal"
      | "getProposedRouterOwner"
      | "getProposedRouterOwnerTimestamp"
      | "getRouterApproval"
      | "getRouterApprovalForPortal"
      | "getRouterOwner"
      | "getRouterRecipient"
      | "maxRoutersPerTransfer"
      | "proposeRouterOwner"
      | "removeRouter"
      | "removeRouterLiquidity"
      | "removeRouterLiquidityFor"
      | "routerBalances"
      | "setLiquidityFeeNumerator"
      | "setMaxRoutersPerTransfer"
      | "setRouterRecipient"
      | "setupRouter"
      | "unapproveRouterForPortal"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "LIQUIDITY_FEE_DENOMINATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "LIQUIDITY_FEE_NUMERATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "acceptProposedRouterOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "addRouterLiquidity",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "addRouterLiquidityFor",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "approveRouterForPortal",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getProposedRouterOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getProposedRouterOwnerTimestamp",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRouterApproval",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRouterApprovalForPortal",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRouterOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRouterRecipient",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "maxRoutersPerTransfer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proposeRouterOwner",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeRouter",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeRouterLiquidity",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "removeRouterLiquidityFor",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "routerBalances",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setLiquidityFeeNumerator",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setMaxRoutersPerTransfer",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRouterRecipient",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setupRouter",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "unapproveRouterForPortal",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "LIQUIDITY_FEE_DENOMINATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "LIQUIDITY_FEE_NUMERATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptProposedRouterOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addRouterLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addRouterLiquidityFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveRouterForPortal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProposedRouterOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProposedRouterOwnerTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRouterApproval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRouterApprovalForPortal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRouterOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRouterRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "maxRoutersPerTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposeRouterOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeRouter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeRouterLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeRouterLiquidityFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "routerBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setLiquidityFeeNumerator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMaxRoutersPerTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRouterRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setupRouter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unapproveRouterForPortal",
    data: BytesLike
  ): Result;

  events: {
    "LiquidityFeeNumeratorUpdated(uint256,address)": EventFragment;
    "MaxRoutersPerTransferUpdated(uint256,address)": EventFragment;
    "RouterAdded(address,address)": EventFragment;
    "RouterApprovedForPortal(address,address)": EventFragment;
    "RouterLiquidityAdded(address,address,bytes32,uint256,address)": EventFragment;
    "RouterLiquidityRemoved(address,address,address,bytes32,uint256,address)": EventFragment;
    "RouterOwnerAccepted(address,address,address)": EventFragment;
    "RouterOwnerProposed(address,address,address)": EventFragment;
    "RouterRecipientSet(address,address,address)": EventFragment;
    "RouterRemoved(address,address)": EventFragment;
    "RouterUnapprovedForPortal(address,address)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "LiquidityFeeNumeratorUpdated"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "MaxRoutersPerTransferUpdated"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterApprovedForPortal"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterLiquidityAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterLiquidityRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterOwnerAccepted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterOwnerProposed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterRecipientSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterUnapprovedForPortal"): EventFragment;
}

export interface LiquidityFeeNumeratorUpdatedEventObject {
  liquidityFeeNumerator: BigNumber;
  caller: string;
}
export type LiquidityFeeNumeratorUpdatedEvent = TypedEvent<
  [BigNumber, string],
  LiquidityFeeNumeratorUpdatedEventObject
>;

export type LiquidityFeeNumeratorUpdatedEventFilter =
  TypedEventFilter<LiquidityFeeNumeratorUpdatedEvent>;

export interface MaxRoutersPerTransferUpdatedEventObject {
  maxRoutersPerTransfer: BigNumber;
  caller: string;
}
export type MaxRoutersPerTransferUpdatedEvent = TypedEvent<
  [BigNumber, string],
  MaxRoutersPerTransferUpdatedEventObject
>;

export type MaxRoutersPerTransferUpdatedEventFilter =
  TypedEventFilter<MaxRoutersPerTransferUpdatedEvent>;

export interface RouterAddedEventObject {
  router: string;
  caller: string;
}
export type RouterAddedEvent = TypedEvent<
  [string, string],
  RouterAddedEventObject
>;

export type RouterAddedEventFilter = TypedEventFilter<RouterAddedEvent>;

export interface RouterApprovedForPortalEventObject {
  router: string;
  caller: string;
}
export type RouterApprovedForPortalEvent = TypedEvent<
  [string, string],
  RouterApprovedForPortalEventObject
>;

export type RouterApprovedForPortalEventFilter =
  TypedEventFilter<RouterApprovedForPortalEvent>;

export interface RouterLiquidityAddedEventObject {
  router: string;
  local: string;
  key: string;
  amount: BigNumber;
  caller: string;
}
export type RouterLiquidityAddedEvent = TypedEvent<
  [string, string, string, BigNumber, string],
  RouterLiquidityAddedEventObject
>;

export type RouterLiquidityAddedEventFilter =
  TypedEventFilter<RouterLiquidityAddedEvent>;

export interface RouterLiquidityRemovedEventObject {
  router: string;
  to: string;
  local: string;
  key: string;
  amount: BigNumber;
  caller: string;
}
export type RouterLiquidityRemovedEvent = TypedEvent<
  [string, string, string, string, BigNumber, string],
  RouterLiquidityRemovedEventObject
>;

export type RouterLiquidityRemovedEventFilter =
  TypedEventFilter<RouterLiquidityRemovedEvent>;

export interface RouterOwnerAcceptedEventObject {
  router: string;
  prevOwner: string;
  newOwner: string;
}
export type RouterOwnerAcceptedEvent = TypedEvent<
  [string, string, string],
  RouterOwnerAcceptedEventObject
>;

export type RouterOwnerAcceptedEventFilter =
  TypedEventFilter<RouterOwnerAcceptedEvent>;

export interface RouterOwnerProposedEventObject {
  router: string;
  prevProposed: string;
  newProposed: string;
}
export type RouterOwnerProposedEvent = TypedEvent<
  [string, string, string],
  RouterOwnerProposedEventObject
>;

export type RouterOwnerProposedEventFilter =
  TypedEventFilter<RouterOwnerProposedEvent>;

export interface RouterRecipientSetEventObject {
  router: string;
  prevRecipient: string;
  newRecipient: string;
}
export type RouterRecipientSetEvent = TypedEvent<
  [string, string, string],
  RouterRecipientSetEventObject
>;

export type RouterRecipientSetEventFilter =
  TypedEventFilter<RouterRecipientSetEvent>;

export interface RouterRemovedEventObject {
  router: string;
  caller: string;
}
export type RouterRemovedEvent = TypedEvent<
  [string, string],
  RouterRemovedEventObject
>;

export type RouterRemovedEventFilter = TypedEventFilter<RouterRemovedEvent>;

export interface RouterUnapprovedForPortalEventObject {
  router: string;
  caller: string;
}
export type RouterUnapprovedForPortalEvent = TypedEvent<
  [string, string],
  RouterUnapprovedForPortalEventObject
>;

export type RouterUnapprovedForPortalEventFilter =
  TypedEventFilter<RouterUnapprovedForPortalEvent>;

export interface RoutersFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RoutersFacetInterface;

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
    LIQUIDITY_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    LIQUIDITY_FEE_NUMERATOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    acceptProposedRouterOwner(
      router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    approveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getProposedRouterOwner(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getProposedRouterOwnerTimestamp(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRouterApproval(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getRouterApprovalForPortal(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getRouterOwner(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRouterRecipient(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    maxRoutersPerTransfer(overrides?: CallOverrides): Promise<[BigNumber]>;

    proposeRouterOwner(
      router: PromiseOrValue<string>,
      proposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeRouter(
      router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    routerBalances(
      _router: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    setLiquidityFeeNumerator(
      _numerator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMaxRoutersPerTransfer(
      _newMaxRouters: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setRouterRecipient(
      router: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setupRouter(
      router: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unapproveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  LIQUIDITY_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

  LIQUIDITY_FEE_NUMERATOR(overrides?: CallOverrides): Promise<BigNumber>;

  acceptProposedRouterOwner(
    router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addRouterLiquidity(
    _amount: PromiseOrValue<BigNumberish>,
    _local: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addRouterLiquidityFor(
    _amount: PromiseOrValue<BigNumberish>,
    _local: PromiseOrValue<string>,
    _router: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  approveRouterForPortal(
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getProposedRouterOwner(
    _router: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getProposedRouterOwnerTimestamp(
    _router: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRouterApproval(
    _router: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getRouterApprovalForPortal(
    _router: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getRouterOwner(
    _router: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getRouterRecipient(
    _router: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  maxRoutersPerTransfer(overrides?: CallOverrides): Promise<BigNumber>;

  proposeRouterOwner(
    router: PromiseOrValue<string>,
    proposed: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeRouter(
    router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeRouterLiquidity(
    _amount: PromiseOrValue<BigNumberish>,
    _local: PromiseOrValue<string>,
    _to: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeRouterLiquidityFor(
    _amount: PromiseOrValue<BigNumberish>,
    _local: PromiseOrValue<string>,
    _to: PromiseOrValue<string>,
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  routerBalances(
    _router: PromiseOrValue<string>,
    _asset: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setLiquidityFeeNumerator(
    _numerator: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMaxRoutersPerTransfer(
    _newMaxRouters: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setRouterRecipient(
    router: PromiseOrValue<string>,
    recipient: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setupRouter(
    router: PromiseOrValue<string>,
    owner: PromiseOrValue<string>,
    recipient: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unapproveRouterForPortal(
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    LIQUIDITY_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    LIQUIDITY_FEE_NUMERATOR(overrides?: CallOverrides): Promise<BigNumber>;

    acceptProposedRouterOwner(
      router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    addRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    addRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    approveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getProposedRouterOwner(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getProposedRouterOwnerTimestamp(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRouterApproval(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getRouterApprovalForPortal(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getRouterOwner(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getRouterRecipient(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    maxRoutersPerTransfer(overrides?: CallOverrides): Promise<BigNumber>;

    proposeRouterOwner(
      router: PromiseOrValue<string>,
      proposed: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeRouter(
      router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    routerBalances(
      _router: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setLiquidityFeeNumerator(
      _numerator: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setMaxRoutersPerTransfer(
      _newMaxRouters: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setRouterRecipient(
      router: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setupRouter(
      router: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    unapproveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "LiquidityFeeNumeratorUpdated(uint256,address)"(
      liquidityFeeNumerator?: null,
      caller?: null
    ): LiquidityFeeNumeratorUpdatedEventFilter;
    LiquidityFeeNumeratorUpdated(
      liquidityFeeNumerator?: null,
      caller?: null
    ): LiquidityFeeNumeratorUpdatedEventFilter;

    "MaxRoutersPerTransferUpdated(uint256,address)"(
      maxRoutersPerTransfer?: null,
      caller?: null
    ): MaxRoutersPerTransferUpdatedEventFilter;
    MaxRoutersPerTransferUpdated(
      maxRoutersPerTransfer?: null,
      caller?: null
    ): MaxRoutersPerTransferUpdatedEventFilter;

    "RouterAdded(address,address)"(
      router?: PromiseOrValue<string> | null,
      caller?: null
    ): RouterAddedEventFilter;
    RouterAdded(
      router?: PromiseOrValue<string> | null,
      caller?: null
    ): RouterAddedEventFilter;

    "RouterApprovedForPortal(address,address)"(
      router?: null,
      caller?: null
    ): RouterApprovedForPortalEventFilter;
    RouterApprovedForPortal(
      router?: null,
      caller?: null
    ): RouterApprovedForPortalEventFilter;

    "RouterLiquidityAdded(address,address,bytes32,uint256,address)"(
      router?: PromiseOrValue<string> | null,
      local?: null,
      key?: null,
      amount?: null,
      caller?: null
    ): RouterLiquidityAddedEventFilter;
    RouterLiquidityAdded(
      router?: PromiseOrValue<string> | null,
      local?: null,
      key?: null,
      amount?: null,
      caller?: null
    ): RouterLiquidityAddedEventFilter;

    "RouterLiquidityRemoved(address,address,address,bytes32,uint256,address)"(
      router?: PromiseOrValue<string> | null,
      to?: null,
      local?: null,
      key?: null,
      amount?: null,
      caller?: null
    ): RouterLiquidityRemovedEventFilter;
    RouterLiquidityRemoved(
      router?: PromiseOrValue<string> | null,
      to?: null,
      local?: null,
      key?: null,
      amount?: null,
      caller?: null
    ): RouterLiquidityRemovedEventFilter;

    "RouterOwnerAccepted(address,address,address)"(
      router?: PromiseOrValue<string> | null,
      prevOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): RouterOwnerAcceptedEventFilter;
    RouterOwnerAccepted(
      router?: PromiseOrValue<string> | null,
      prevOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): RouterOwnerAcceptedEventFilter;

    "RouterOwnerProposed(address,address,address)"(
      router?: PromiseOrValue<string> | null,
      prevProposed?: PromiseOrValue<string> | null,
      newProposed?: PromiseOrValue<string> | null
    ): RouterOwnerProposedEventFilter;
    RouterOwnerProposed(
      router?: PromiseOrValue<string> | null,
      prevProposed?: PromiseOrValue<string> | null,
      newProposed?: PromiseOrValue<string> | null
    ): RouterOwnerProposedEventFilter;

    "RouterRecipientSet(address,address,address)"(
      router?: PromiseOrValue<string> | null,
      prevRecipient?: PromiseOrValue<string> | null,
      newRecipient?: PromiseOrValue<string> | null
    ): RouterRecipientSetEventFilter;
    RouterRecipientSet(
      router?: PromiseOrValue<string> | null,
      prevRecipient?: PromiseOrValue<string> | null,
      newRecipient?: PromiseOrValue<string> | null
    ): RouterRecipientSetEventFilter;

    "RouterRemoved(address,address)"(
      router?: PromiseOrValue<string> | null,
      caller?: null
    ): RouterRemovedEventFilter;
    RouterRemoved(
      router?: PromiseOrValue<string> | null,
      caller?: null
    ): RouterRemovedEventFilter;

    "RouterUnapprovedForPortal(address,address)"(
      router?: null,
      caller?: null
    ): RouterUnapprovedForPortalEventFilter;
    RouterUnapprovedForPortal(
      router?: null,
      caller?: null
    ): RouterUnapprovedForPortalEventFilter;
  };

  estimateGas: {
    LIQUIDITY_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    LIQUIDITY_FEE_NUMERATOR(overrides?: CallOverrides): Promise<BigNumber>;

    acceptProposedRouterOwner(
      router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    approveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getProposedRouterOwner(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getProposedRouterOwnerTimestamp(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRouterApproval(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRouterApprovalForPortal(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRouterOwner(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRouterRecipient(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxRoutersPerTransfer(overrides?: CallOverrides): Promise<BigNumber>;

    proposeRouterOwner(
      router: PromiseOrValue<string>,
      proposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeRouter(
      router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    routerBalances(
      _router: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setLiquidityFeeNumerator(
      _numerator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMaxRoutersPerTransfer(
      _newMaxRouters: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setRouterRecipient(
      router: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setupRouter(
      router: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unapproveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    LIQUIDITY_FEE_DENOMINATOR(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    LIQUIDITY_FEE_NUMERATOR(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    acceptProposedRouterOwner(
      router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    approveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getProposedRouterOwner(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getProposedRouterOwnerTimestamp(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRouterApproval(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRouterApprovalForPortal(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRouterOwner(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRouterRecipient(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxRoutersPerTransfer(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proposeRouterOwner(
      router: PromiseOrValue<string>,
      proposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeRouter(
      router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    routerBalances(
      _router: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setLiquidityFeeNumerator(
      _numerator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMaxRoutersPerTransfer(
      _newMaxRouters: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setRouterRecipient(
      router: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setupRouter(
      router: PromiseOrValue<string>,
      owner: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unapproveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
