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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export declare namespace SwapUtils {
  export type SwapStruct = {
    key: PromiseOrValue<BytesLike>;
    initialA: PromiseOrValue<BigNumberish>;
    futureA: PromiseOrValue<BigNumberish>;
    initialATime: PromiseOrValue<BigNumberish>;
    futureATime: PromiseOrValue<BigNumberish>;
    swapFee: PromiseOrValue<BigNumberish>;
    adminFee: PromiseOrValue<BigNumberish>;
    lpToken: PromiseOrValue<string>;
    pooledTokens: PromiseOrValue<string>[];
    tokenPrecisionMultipliers: PromiseOrValue<BigNumberish>[];
    balances: PromiseOrValue<BigNumberish>[];
    adminFees: PromiseOrValue<BigNumberish>[];
    disabled: PromiseOrValue<boolean>;
    removeTime: PromiseOrValue<BigNumberish>;
  };

  export type SwapStructOutput = [
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string[],
    BigNumber[],
    BigNumber[],
    BigNumber[],
    boolean,
    BigNumber
  ] & {
    key: string;
    initialA: BigNumber;
    futureA: BigNumber;
    initialATime: BigNumber;
    futureATime: BigNumber;
    swapFee: BigNumber;
    adminFee: BigNumber;
    lpToken: string;
    pooledTokens: string[];
    tokenPrecisionMultipliers: BigNumber[];
    balances: BigNumber[];
    adminFees: BigNumber[];
    disabled: boolean;
    removeTime: BigNumber;
  };
}

export interface StableSwapFacetInterface extends utils.Interface {
  functions: {
    "addSwapLiquidity(bytes32,uint256[],uint256,uint256)": FunctionFragment;
    "calculateRemoveSwapLiquidity(bytes32,uint256)": FunctionFragment;
    "calculateRemoveSwapLiquidityOneToken(bytes32,uint256,uint8)": FunctionFragment;
    "calculateSwap(bytes32,uint8,uint8,uint256)": FunctionFragment;
    "calculateSwapTokenAmount(bytes32,uint256[],bool)": FunctionFragment;
    "getSwapA(bytes32)": FunctionFragment;
    "getSwapAPrecise(bytes32)": FunctionFragment;
    "getSwapAdminBalance(bytes32,uint256)": FunctionFragment;
    "getSwapLPToken(bytes32)": FunctionFragment;
    "getSwapStorage(bytes32)": FunctionFragment;
    "getSwapToken(bytes32,uint8)": FunctionFragment;
    "getSwapTokenBalance(bytes32,uint8)": FunctionFragment;
    "getSwapTokenIndex(bytes32,address)": FunctionFragment;
    "getSwapVirtualPrice(bytes32)": FunctionFragment;
    "removeSwapLiquidity(bytes32,uint256,uint256[],uint256)": FunctionFragment;
    "removeSwapLiquidityImbalance(bytes32,uint256[],uint256,uint256)": FunctionFragment;
    "removeSwapLiquidityOneToken(bytes32,uint256,uint8,uint256,uint256)": FunctionFragment;
    "swap(bytes32,uint8,uint8,uint256,uint256,uint256)": FunctionFragment;
    "swapExact(bytes32,uint256,address,address,uint256,uint256)": FunctionFragment;
    "swapExactOut(bytes32,uint256,address,address,uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addSwapLiquidity"
      | "calculateRemoveSwapLiquidity"
      | "calculateRemoveSwapLiquidityOneToken"
      | "calculateSwap"
      | "calculateSwapTokenAmount"
      | "getSwapA"
      | "getSwapAPrecise"
      | "getSwapAdminBalance"
      | "getSwapLPToken"
      | "getSwapStorage"
      | "getSwapToken"
      | "getSwapTokenBalance"
      | "getSwapTokenIndex"
      | "getSwapVirtualPrice"
      | "removeSwapLiquidity"
      | "removeSwapLiquidityImbalance"
      | "removeSwapLiquidityOneToken"
      | "swap"
      | "swapExact"
      | "swapExactOut"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addSwapLiquidity",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateRemoveSwapLiquidity",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateRemoveSwapLiquidityOneToken",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateSwap",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateSwapTokenAmount",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapA",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapAPrecise",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapAdminBalance",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapLPToken",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapStorage",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapToken",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapTokenBalance",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapTokenIndex",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapVirtualPrice",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeSwapLiquidity",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "removeSwapLiquidityImbalance",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "removeSwapLiquidityOneToken",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExact",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactOut",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "addSwapLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateRemoveSwapLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateRemoveSwapLiquidityOneToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateSwap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateSwapTokenAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getSwapA", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSwapAPrecise",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSwapAdminBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSwapLPToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSwapStorage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSwapToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSwapTokenBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSwapTokenIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSwapVirtualPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeSwapLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeSwapLiquidityImbalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeSwapLiquidityOneToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swapExact", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "swapExactOut",
    data: BytesLike
  ): Result;

  events: {};
}

export interface StableSwapFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StableSwapFacetInterface;

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
    addSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      minToMint: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    calculateRemoveSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    calculateRemoveSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { availableTokenAmount: BigNumber }>;

    calculateSwap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calculateSwapTokenAmount(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      deposit: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSwapA(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSwapAPrecise(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSwapAdminBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSwapLPToken(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getSwapStorage(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[SwapUtils.SwapStructOutput]>;

    getSwapToken(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getSwapTokenBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSwapTokenIndex(
      key: PromiseOrValue<BytesLike>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    getSwapVirtualPrice(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    removeSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      minAmounts: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeSwapLiquidityImbalance(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      maxBurnAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      minAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      minDy: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swapExact(
      key: PromiseOrValue<BytesLike>,
      amountIn: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      minAmountOut: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swapExactOut(
      key: PromiseOrValue<BytesLike>,
      amountOut: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      maxAmountIn: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addSwapLiquidity(
    key: PromiseOrValue<BytesLike>,
    amounts: PromiseOrValue<BigNumberish>[],
    minToMint: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  calculateRemoveSwapLiquidity(
    key: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  calculateRemoveSwapLiquidityOneToken(
    key: PromiseOrValue<BytesLike>,
    tokenAmount: PromiseOrValue<BigNumberish>,
    tokenIndex: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateSwap(
    key: PromiseOrValue<BytesLike>,
    tokenIndexFrom: PromiseOrValue<BigNumberish>,
    tokenIndexTo: PromiseOrValue<BigNumberish>,
    dx: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateSwapTokenAmount(
    key: PromiseOrValue<BytesLike>,
    amounts: PromiseOrValue<BigNumberish>[],
    deposit: PromiseOrValue<boolean>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getSwapA(
    key: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getSwapAPrecise(
    key: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getSwapAdminBalance(
    key: PromiseOrValue<BytesLike>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getSwapLPToken(
    key: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getSwapStorage(
    key: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<SwapUtils.SwapStructOutput>;

  getSwapToken(
    key: PromiseOrValue<BytesLike>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getSwapTokenBalance(
    key: PromiseOrValue<BytesLike>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getSwapTokenIndex(
    key: PromiseOrValue<BytesLike>,
    tokenAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<number>;

  getSwapVirtualPrice(
    key: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  removeSwapLiquidity(
    key: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    minAmounts: PromiseOrValue<BigNumberish>[],
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeSwapLiquidityImbalance(
    key: PromiseOrValue<BytesLike>,
    amounts: PromiseOrValue<BigNumberish>[],
    maxBurnAmount: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeSwapLiquidityOneToken(
    key: PromiseOrValue<BytesLike>,
    tokenAmount: PromiseOrValue<BigNumberish>,
    tokenIndex: PromiseOrValue<BigNumberish>,
    minAmount: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swap(
    key: PromiseOrValue<BytesLike>,
    tokenIndexFrom: PromiseOrValue<BigNumberish>,
    tokenIndexTo: PromiseOrValue<BigNumberish>,
    dx: PromiseOrValue<BigNumberish>,
    minDy: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swapExact(
    key: PromiseOrValue<BytesLike>,
    amountIn: PromiseOrValue<BigNumberish>,
    assetIn: PromiseOrValue<string>,
    assetOut: PromiseOrValue<string>,
    minAmountOut: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swapExactOut(
    key: PromiseOrValue<BytesLike>,
    amountOut: PromiseOrValue<BigNumberish>,
    assetIn: PromiseOrValue<string>,
    assetOut: PromiseOrValue<string>,
    maxAmountIn: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      minToMint: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateRemoveSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    calculateRemoveSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateSwap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateSwapTokenAmount(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      deposit: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapA(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapAPrecise(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapAdminBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapLPToken(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getSwapStorage(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<SwapUtils.SwapStructOutput>;

    getSwapToken(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getSwapTokenBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapTokenIndex(
      key: PromiseOrValue<BytesLike>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<number>;

    getSwapVirtualPrice(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      minAmounts: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    removeSwapLiquidityImbalance(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      maxBurnAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      minAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      minDy: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapExact(
      key: PromiseOrValue<BytesLike>,
      amountIn: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      minAmountOut: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapExactOut(
      key: PromiseOrValue<BytesLike>,
      amountOut: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      maxAmountIn: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    addSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      minToMint: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    calculateRemoveSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateRemoveSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateSwap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateSwapTokenAmount(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      deposit: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapA(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapAPrecise(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapAdminBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapLPToken(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapStorage(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapToken(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapTokenBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapTokenIndex(
      key: PromiseOrValue<BytesLike>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSwapVirtualPrice(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      minAmounts: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeSwapLiquidityImbalance(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      maxBurnAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      minAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      minDy: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swapExact(
      key: PromiseOrValue<BytesLike>,
      amountIn: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      minAmountOut: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swapExactOut(
      key: PromiseOrValue<BytesLike>,
      amountOut: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      maxAmountIn: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      minToMint: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    calculateRemoveSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateRemoveSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateSwap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateSwapTokenAmount(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      deposit: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSwapA(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSwapAPrecise(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSwapAdminBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSwapLPToken(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSwapStorage(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSwapToken(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSwapTokenBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSwapTokenIndex(
      key: PromiseOrValue<BytesLike>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSwapVirtualPrice(
      key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      minAmounts: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeSwapLiquidityImbalance(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      maxBurnAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      minAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      minDy: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swapExact(
      key: PromiseOrValue<BytesLike>,
      amountIn: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      minAmountOut: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swapExactOut(
      key: PromiseOrValue<BytesLike>,
      amountOut: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      maxAmountIn: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
