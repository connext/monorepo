/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface IRouterFactoryInterface extends ethers.utils.Interface {
  functions: {
    "createRouter(address,address)": FunctionFragment;
    "getRouterAddress(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createRouter",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getRouterAddress",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "createRouter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRouterAddress",
    data: BytesLike
  ): Result;

  events: {
    "RouterCreated(address,address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RouterCreated"): EventFragment;
}

export class IRouterFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IRouterFactoryInterface;

  functions: {
    createRouter(
      router: string,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getRouterAddress(
      routerSigner: string,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  createRouter(
    router: string,
    recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getRouterAddress(
    routerSigner: string,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    createRouter(
      router: string,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getRouterAddress(
      routerSigner: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    RouterCreated(
      router?: null,
      routerSigner?: null,
      recipient?: null,
      transactionManager?: null
    ): TypedEventFilter<
      [string, string, string, string],
      {
        router: string;
        routerSigner: string;
        recipient: string;
        transactionManager: string;
      }
    >;
  };

  estimateGas: {
    createRouter(
      router: string,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getRouterAddress(
      routerSigner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createRouter(
      router: string,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getRouterAddress(
      routerSigner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
