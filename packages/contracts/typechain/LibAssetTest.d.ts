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

interface LibAssetTestInterface extends ethers.utils.Interface {
  functions: {
    "decreaseERC20Allowance(address,address,uint256)": FunctionFragment;
    "getOwnBalance(address)": FunctionFragment;
    "increaseERC20Allowance(address,address,uint256)": FunctionFragment;
    "isNativeAsset(address)": FunctionFragment;
    "transferAsset(address,address,uint256)": FunctionFragment;
    "transferERC20(address,address,uint256)": FunctionFragment;
    "transferNativeAsset(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "decreaseERC20Allowance",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getOwnBalance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseERC20Allowance",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isNativeAsset",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferAsset",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferERC20",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferNativeAsset",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "decreaseERC20Allowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOwnBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseERC20Allowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isNativeAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferNativeAsset",
    data: BytesLike
  ): Result;

  events: {};
}

export class LibAssetTest extends BaseContract {
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

  interface: LibAssetTestInterface;

  functions: {
    decreaseERC20Allowance(
      assetId: string,
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getOwnBalance(
      assetId: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    increaseERC20Allowance(
      assetId: string,
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isNativeAsset(
      assetId: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferAsset(
      assetId: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferERC20(
      assetId: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferNativeAsset(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  decreaseERC20Allowance(
    assetId: string,
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getOwnBalance(assetId: string, overrides?: CallOverrides): Promise<BigNumber>;

  increaseERC20Allowance(
    assetId: string,
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isNativeAsset(assetId: string, overrides?: CallOverrides): Promise<boolean>;

  transferAsset(
    assetId: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferERC20(
    assetId: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferNativeAsset(
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    decreaseERC20Allowance(
      assetId: string,
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getOwnBalance(
      assetId: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increaseERC20Allowance(
      assetId: string,
      spender: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    isNativeAsset(assetId: string, overrides?: CallOverrides): Promise<boolean>;

    transferAsset(
      assetId: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferERC20(
      assetId: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferNativeAsset(
      recipient: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    decreaseERC20Allowance(
      assetId: string,
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getOwnBalance(
      assetId: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increaseERC20Allowance(
      assetId: string,
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isNativeAsset(
      assetId: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferAsset(
      assetId: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferERC20(
      assetId: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferNativeAsset(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    decreaseERC20Allowance(
      assetId: string,
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getOwnBalance(
      assetId: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    increaseERC20Allowance(
      assetId: string,
      spender: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isNativeAsset(
      assetId: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferAsset(
      assetId: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferERC20(
      assetId: string,
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferNativeAsset(
      recipient: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
