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
} from "../../../../../common";

export interface BaseGnosisConnectorInterface extends utils.Interface {
  functions: {
    "AMB()": FunctionFragment;
    "DOMAIN()": FunctionFragment;
    "PROCESS_GAS()": FunctionFragment;
    "RESERVE_GAS()": FunctionFragment;
    "ROOT_MANAGER()": FunctionFragment;
    "acceptProposedOwner()": FunctionFragment;
    "addSender(address)": FunctionFragment;
    "aggregateRoot()": FunctionFragment;
    "count()": FunctionFragment;
    "delay()": FunctionFragment;
    "dispatch(uint32,bytes32,bytes)": FunctionFragment;
    "domain()": FunctionFragment;
    "home()": FunctionFragment;
    "isReplica(address)": FunctionFragment;
    "localDomain()": FunctionFragment;
    "messages(bytes32)": FunctionFragment;
    "mirrorConnector()": FunctionFragment;
    "mirrorDomain()": FunctionFragment;
    "mirrorProcessGas()": FunctionFragment;
    "nonces(uint32)": FunctionFragment;
    "outboundRoot()": FunctionFragment;
    "owner()": FunctionFragment;
    "processMessage(address,bytes)": FunctionFragment;
    "proposeNewOwner(address)": FunctionFragment;
    "proposed()": FunctionFragment;
    "proposedTimestamp()": FunctionFragment;
    "proveAndProcess(bytes,bytes32[32],uint256)": FunctionFragment;
    "provenRoots(bytes32)": FunctionFragment;
    "removeSender(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "renounced()": FunctionFragment;
    "root()": FunctionFragment;
    "send()": FunctionFragment;
    "sendMessage(bytes)": FunctionFragment;
    "setMirrorConnector(address)": FunctionFragment;
    "tree()": FunctionFragment;
    "verifySender(address)": FunctionFragment;
    "whitelistedSenders(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "AMB"
      | "DOMAIN"
      | "PROCESS_GAS"
      | "RESERVE_GAS"
      | "ROOT_MANAGER"
      | "acceptProposedOwner"
      | "addSender"
      | "aggregateRoot"
      | "count"
      | "delay"
      | "dispatch"
      | "domain"
      | "home"
      | "isReplica"
      | "localDomain"
      | "messages"
      | "mirrorConnector"
      | "mirrorDomain"
      | "mirrorProcessGas"
      | "nonces"
      | "outboundRoot"
      | "owner"
      | "processMessage"
      | "proposeNewOwner"
      | "proposed"
      | "proposedTimestamp"
      | "proveAndProcess"
      | "provenRoots"
      | "removeSender"
      | "renounceOwnership"
      | "renounced"
      | "root"
      | "send"
      | "sendMessage"
      | "setMirrorConnector"
      | "tree"
      | "verifySender"
      | "whitelistedSenders"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "AMB", values?: undefined): string;
  encodeFunctionData(functionFragment: "DOMAIN", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "PROCESS_GAS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "RESERVE_GAS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ROOT_MANAGER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "acceptProposedOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addSender",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "aggregateRoot",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "count", values?: undefined): string;
  encodeFunctionData(functionFragment: "delay", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "dispatch",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: "domain", values?: undefined): string;
  encodeFunctionData(functionFragment: "home", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isReplica",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "localDomain",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "messages",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "mirrorConnector",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mirrorDomain",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mirrorProcessGas",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nonces",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "outboundRoot",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "processMessage",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "proposeNewOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "proposed", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proposedTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proveAndProcess",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "provenRoots",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeSender",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "renounced", values?: undefined): string;
  encodeFunctionData(functionFragment: "root", values?: undefined): string;
  encodeFunctionData(functionFragment: "send", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sendMessage",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "setMirrorConnector",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "tree", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "verifySender",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "whitelistedSenders",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "AMB", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "DOMAIN", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "PROCESS_GAS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "RESERVE_GAS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ROOT_MANAGER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptProposedOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addSender", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "aggregateRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "count", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "delay", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "dispatch", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "domain", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "home", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isReplica", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "localDomain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "messages", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mirrorConnector",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mirrorDomain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mirrorProcessGas",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "outboundRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "processMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposeNewOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "proposed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proposedTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proveAndProcess",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "provenRoots",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "renounced", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "root", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "send", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sendMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMirrorConnector",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tree", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifySender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "whitelistedSenders",
    data: BytesLike
  ): Result;

  events: {
    "Dispatch(bytes32,uint256,bytes32,uint32,bytes)": EventFragment;
    "MessageProcessed(address,bytes,address)": EventFragment;
    "MessageSent(bytes,address)": EventFragment;
    "MirrorConnectorUpdated(address,address)": EventFragment;
    "OwnershipProposed(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Process(bytes32,bool,bytes)": EventFragment;
    "SenderAdded(address)": EventFragment;
    "SenderRemoved(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Dispatch"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MessageProcessed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MessageSent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MirrorConnectorUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipProposed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Process"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SenderAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SenderRemoved"): EventFragment;
}

export interface DispatchEventObject {
  leaf: string;
  index: BigNumber;
  root: string;
  destinationDomain: number;
  message: string;
}
export type DispatchEvent = TypedEvent<
  [string, BigNumber, string, number, string],
  DispatchEventObject
>;

export type DispatchEventFilter = TypedEventFilter<DispatchEvent>;

export interface MessageProcessedEventObject {
  from: string;
  data: string;
  caller: string;
}
export type MessageProcessedEvent = TypedEvent<
  [string, string, string],
  MessageProcessedEventObject
>;

export type MessageProcessedEventFilter =
  TypedEventFilter<MessageProcessedEvent>;

export interface MessageSentEventObject {
  data: string;
  caller: string;
}
export type MessageSentEvent = TypedEvent<
  [string, string],
  MessageSentEventObject
>;

export type MessageSentEventFilter = TypedEventFilter<MessageSentEvent>;

export interface MirrorConnectorUpdatedEventObject {
  previous: string;
  current: string;
}
export type MirrorConnectorUpdatedEvent = TypedEvent<
  [string, string],
  MirrorConnectorUpdatedEventObject
>;

export type MirrorConnectorUpdatedEventFilter =
  TypedEventFilter<MirrorConnectorUpdatedEvent>;

export interface OwnershipProposedEventObject {
  proposedOwner: string;
}
export type OwnershipProposedEvent = TypedEvent<
  [string],
  OwnershipProposedEventObject
>;

export type OwnershipProposedEventFilter =
  TypedEventFilter<OwnershipProposedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface ProcessEventObject {
  leaf: string;
  success: boolean;
  returnData: string;
}
export type ProcessEvent = TypedEvent<
  [string, boolean, string],
  ProcessEventObject
>;

export type ProcessEventFilter = TypedEventFilter<ProcessEvent>;

export interface SenderAddedEventObject {
  sender: string;
}
export type SenderAddedEvent = TypedEvent<[string], SenderAddedEventObject>;

export type SenderAddedEventFilter = TypedEventFilter<SenderAddedEvent>;

export interface SenderRemovedEventObject {
  sender: string;
}
export type SenderRemovedEvent = TypedEvent<[string], SenderRemovedEventObject>;

export type SenderRemovedEventFilter = TypedEventFilter<SenderRemovedEvent>;

export interface BaseGnosisConnector extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BaseGnosisConnectorInterface;

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
    AMB(overrides?: CallOverrides): Promise<[string]>;

    DOMAIN(overrides?: CallOverrides): Promise<[number]>;

    PROCESS_GAS(overrides?: CallOverrides): Promise<[BigNumber]>;

    RESERVE_GAS(overrides?: CallOverrides): Promise<[BigNumber]>;

    ROOT_MANAGER(overrides?: CallOverrides): Promise<[string]>;

    acceptProposedOwner(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addSender(
      _sender: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    aggregateRoot(overrides?: CallOverrides): Promise<[string]>;

    count(overrides?: CallOverrides): Promise<[BigNumber]>;

    delay(overrides?: CallOverrides): Promise<[BigNumber]>;

    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    domain(overrides?: CallOverrides): Promise<[number]>;

    home(overrides?: CallOverrides): Promise<[string]>;

    isReplica(
      _potentialReplica: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    localDomain(overrides?: CallOverrides): Promise<[number]>;

    messages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    mirrorConnector(overrides?: CallOverrides): Promise<[string]>;

    mirrorDomain(overrides?: CallOverrides): Promise<[number]>;

    mirrorProcessGas(overrides?: CallOverrides): Promise<[BigNumber]>;

    nonces(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    outboundRoot(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    processMessage(
      _sender: PromiseOrValue<string>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    proposeNewOwner(
      newlyProposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    proposed(overrides?: CallOverrides): Promise<[string]>;

    proposedTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    proveAndProcess(
      _message: PromiseOrValue<BytesLike>,
      _proof: PromiseOrValue<BytesLike>[],
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    provenRoots(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    removeSender(
      _sender: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounced(overrides?: CallOverrides): Promise<[boolean]>;

    root(overrides?: CallOverrides): Promise<[string]>;

    send(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sendMessage(
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMirrorConnector(
      _mirrorConnector: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tree(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { count: BigNumber }>;

    verifySender(
      _expected: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    whitelistedSenders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  AMB(overrides?: CallOverrides): Promise<string>;

  DOMAIN(overrides?: CallOverrides): Promise<number>;

  PROCESS_GAS(overrides?: CallOverrides): Promise<BigNumber>;

  RESERVE_GAS(overrides?: CallOverrides): Promise<BigNumber>;

  ROOT_MANAGER(overrides?: CallOverrides): Promise<string>;

  acceptProposedOwner(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addSender(
    _sender: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  aggregateRoot(overrides?: CallOverrides): Promise<string>;

  count(overrides?: CallOverrides): Promise<BigNumber>;

  delay(overrides?: CallOverrides): Promise<BigNumber>;

  dispatch(
    _destinationDomain: PromiseOrValue<BigNumberish>,
    _recipientAddress: PromiseOrValue<BytesLike>,
    _messageBody: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  domain(overrides?: CallOverrides): Promise<number>;

  home(overrides?: CallOverrides): Promise<string>;

  isReplica(
    _potentialReplica: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  localDomain(overrides?: CallOverrides): Promise<number>;

  messages(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<number>;

  mirrorConnector(overrides?: CallOverrides): Promise<string>;

  mirrorDomain(overrides?: CallOverrides): Promise<number>;

  mirrorProcessGas(overrides?: CallOverrides): Promise<BigNumber>;

  nonces(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  outboundRoot(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  processMessage(
    _sender: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  proposeNewOwner(
    newlyProposed: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  proposed(overrides?: CallOverrides): Promise<string>;

  proposedTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  proveAndProcess(
    _message: PromiseOrValue<BytesLike>,
    _proof: PromiseOrValue<BytesLike>[],
    _index: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  provenRoots(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  removeSender(
    _sender: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounced(overrides?: CallOverrides): Promise<boolean>;

  root(overrides?: CallOverrides): Promise<string>;

  send(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sendMessage(
    _data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMirrorConnector(
    _mirrorConnector: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tree(overrides?: CallOverrides): Promise<BigNumber>;

  verifySender(
    _expected: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  whitelistedSenders(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    AMB(overrides?: CallOverrides): Promise<string>;

    DOMAIN(overrides?: CallOverrides): Promise<number>;

    PROCESS_GAS(overrides?: CallOverrides): Promise<BigNumber>;

    RESERVE_GAS(overrides?: CallOverrides): Promise<BigNumber>;

    ROOT_MANAGER(overrides?: CallOverrides): Promise<string>;

    acceptProposedOwner(overrides?: CallOverrides): Promise<void>;

    addSender(
      _sender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    aggregateRoot(overrides?: CallOverrides): Promise<string>;

    count(overrides?: CallOverrides): Promise<BigNumber>;

    delay(overrides?: CallOverrides): Promise<BigNumber>;

    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    domain(overrides?: CallOverrides): Promise<number>;

    home(overrides?: CallOverrides): Promise<string>;

    isReplica(
      _potentialReplica: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    localDomain(overrides?: CallOverrides): Promise<number>;

    messages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<number>;

    mirrorConnector(overrides?: CallOverrides): Promise<string>;

    mirrorDomain(overrides?: CallOverrides): Promise<number>;

    mirrorProcessGas(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    outboundRoot(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    processMessage(
      _sender: PromiseOrValue<string>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    proposeNewOwner(
      newlyProposed: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    proposed(overrides?: CallOverrides): Promise<string>;

    proposedTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    proveAndProcess(
      _message: PromiseOrValue<BytesLike>,
      _proof: PromiseOrValue<BytesLike>[],
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    provenRoots(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removeSender(
      _sender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    renounced(overrides?: CallOverrides): Promise<boolean>;

    root(overrides?: CallOverrides): Promise<string>;

    send(overrides?: CallOverrides): Promise<void>;

    sendMessage(
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    setMirrorConnector(
      _mirrorConnector: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    tree(overrides?: CallOverrides): Promise<BigNumber>;

    verifySender(
      _expected: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    whitelistedSenders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "Dispatch(bytes32,uint256,bytes32,uint32,bytes)"(
      leaf?: null,
      index?: null,
      root?: null,
      destinationDomain?: null,
      message?: null
    ): DispatchEventFilter;
    Dispatch(
      leaf?: null,
      index?: null,
      root?: null,
      destinationDomain?: null,
      message?: null
    ): DispatchEventFilter;

    "MessageProcessed(address,bytes,address)"(
      from?: null,
      data?: null,
      caller?: null
    ): MessageProcessedEventFilter;
    MessageProcessed(
      from?: null,
      data?: null,
      caller?: null
    ): MessageProcessedEventFilter;

    "MessageSent(bytes,address)"(
      data?: null,
      caller?: null
    ): MessageSentEventFilter;
    MessageSent(data?: null, caller?: null): MessageSentEventFilter;

    "MirrorConnectorUpdated(address,address)"(
      previous?: null,
      current?: null
    ): MirrorConnectorUpdatedEventFilter;
    MirrorConnectorUpdated(
      previous?: null,
      current?: null
    ): MirrorConnectorUpdatedEventFilter;

    "OwnershipProposed(address)"(
      proposedOwner?: PromiseOrValue<string> | null
    ): OwnershipProposedEventFilter;
    OwnershipProposed(
      proposedOwner?: PromiseOrValue<string> | null
    ): OwnershipProposedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Process(bytes32,bool,bytes)"(
      leaf?: null,
      success?: null,
      returnData?: null
    ): ProcessEventFilter;
    Process(leaf?: null, success?: null, returnData?: null): ProcessEventFilter;

    "SenderAdded(address)"(sender?: null): SenderAddedEventFilter;
    SenderAdded(sender?: null): SenderAddedEventFilter;

    "SenderRemoved(address)"(sender?: null): SenderRemovedEventFilter;
    SenderRemoved(sender?: null): SenderRemovedEventFilter;
  };

  estimateGas: {
    AMB(overrides?: CallOverrides): Promise<BigNumber>;

    DOMAIN(overrides?: CallOverrides): Promise<BigNumber>;

    PROCESS_GAS(overrides?: CallOverrides): Promise<BigNumber>;

    RESERVE_GAS(overrides?: CallOverrides): Promise<BigNumber>;

    ROOT_MANAGER(overrides?: CallOverrides): Promise<BigNumber>;

    acceptProposedOwner(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addSender(
      _sender: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    aggregateRoot(overrides?: CallOverrides): Promise<BigNumber>;

    count(overrides?: CallOverrides): Promise<BigNumber>;

    delay(overrides?: CallOverrides): Promise<BigNumber>;

    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    domain(overrides?: CallOverrides): Promise<BigNumber>;

    home(overrides?: CallOverrides): Promise<BigNumber>;

    isReplica(
      _potentialReplica: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    localDomain(overrides?: CallOverrides): Promise<BigNumber>;

    messages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mirrorConnector(overrides?: CallOverrides): Promise<BigNumber>;

    mirrorDomain(overrides?: CallOverrides): Promise<BigNumber>;

    mirrorProcessGas(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    outboundRoot(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    processMessage(
      _sender: PromiseOrValue<string>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    proposeNewOwner(
      newlyProposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    proposed(overrides?: CallOverrides): Promise<BigNumber>;

    proposedTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    proveAndProcess(
      _message: PromiseOrValue<BytesLike>,
      _proof: PromiseOrValue<BytesLike>[],
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    provenRoots(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeSender(
      _sender: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounced(overrides?: CallOverrides): Promise<BigNumber>;

    root(overrides?: CallOverrides): Promise<BigNumber>;

    send(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sendMessage(
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMirrorConnector(
      _mirrorConnector: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tree(overrides?: CallOverrides): Promise<BigNumber>;

    verifySender(
      _expected: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    whitelistedSenders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    AMB(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    DOMAIN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PROCESS_GAS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    RESERVE_GAS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ROOT_MANAGER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    acceptProposedOwner(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addSender(
      _sender: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    aggregateRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    count(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    delay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    dispatch(
      _destinationDomain: PromiseOrValue<BigNumberish>,
      _recipientAddress: PromiseOrValue<BytesLike>,
      _messageBody: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    domain(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    home(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isReplica(
      _potentialReplica: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    localDomain(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    messages(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mirrorConnector(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mirrorDomain(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mirrorProcessGas(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonces(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    outboundRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    processMessage(
      _sender: PromiseOrValue<string>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    proposeNewOwner(
      newlyProposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    proposed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposedTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proveAndProcess(
      _message: PromiseOrValue<BytesLike>,
      _proof: PromiseOrValue<BytesLike>[],
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    provenRoots(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeSender(
      _sender: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounced(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    root(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    send(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sendMessage(
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMirrorConnector(
      _mirrorConnector: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tree(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    verifySender(
      _expected: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    whitelistedSenders(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
