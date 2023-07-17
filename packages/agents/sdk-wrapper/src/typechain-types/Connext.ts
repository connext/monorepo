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
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";

export type TransferInfoStruct = {
  originDomain: PromiseOrValue<BigNumberish>;
  destinationDomain: PromiseOrValue<BigNumberish>;
  canonicalDomain: PromiseOrValue<BigNumberish>;
  to: PromiseOrValue<string>;
  delegate: PromiseOrValue<string>;
  receiveLocal: PromiseOrValue<boolean>;
  callData: PromiseOrValue<BytesLike>;
  slippage: PromiseOrValue<BigNumberish>;
  originSender: PromiseOrValue<string>;
  bridgedAmt: PromiseOrValue<BigNumberish>;
  normalizedIn: PromiseOrValue<BigNumberish>;
  nonce: PromiseOrValue<BigNumberish>;
  canonicalId: PromiseOrValue<BytesLike>;
};

export type TransferInfoStructOutput = [
  number,
  number,
  number,
  string,
  string,
  boolean,
  string,
  BigNumber,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  string,
] & {
  originDomain: number;
  destinationDomain: number;
  canonicalDomain: number;
  to: string;
  delegate: string;
  receiveLocal: boolean;
  callData: string;
  slippage: BigNumber;
  originSender: string;
  bridgedAmt: BigNumber;
  normalizedIn: BigNumber;
  nonce: BigNumber;
  canonicalId: string;
};

export type ExecuteArgsStruct = {
  params: TransferInfoStruct;
  routers: PromiseOrValue<string>[];
  routerSignatures: PromiseOrValue<BytesLike>[];
  sequencer: PromiseOrValue<string>;
  sequencerSignature: PromiseOrValue<BytesLike>;
};

export type ExecuteArgsStructOutput = [TransferInfoStructOutput, string[], string[], string, string] & {
  params: TransferInfoStructOutput;
  routers: string[];
  routerSignatures: string[];
  sequencer: string;
  sequencerSignature: string;
};

export type TokenIdStruct = {
  domain: PromiseOrValue<BigNumberish>;
  id: PromiseOrValue<BytesLike>;
};

export type TokenIdStructOutput = [number, string] & {
  domain: number;
  id: string;
};

export declare namespace IDiamondCut {
  export type FacetCutStruct = {
    facetAddress: PromiseOrValue<string>;
    action: PromiseOrValue<BigNumberish>;
    functionSelectors: PromiseOrValue<BytesLike>[];
  };

  export type FacetCutStructOutput = [string, number, string[]] & {
    facetAddress: string;
    action: number;
    functionSelectors: string[];
  };
}

export declare namespace IDiamondLoupe {
  export type FacetStruct = {
    facetAddress: PromiseOrValue<string>;
    functionSelectors: PromiseOrValue<BytesLike>[];
  };

  export type FacetStructOutput = [string, string[]] & {
    facetAddress: string;
    functionSelectors: string[];
  };
}

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
    BigNumber,
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

export interface ConnextInterface extends utils.Interface {
  functions: {
    "addSequencer(address)": FunctionFragment;
    "approvedSequencers(address)": FunctionFragment;
    "bumpTransfer(bytes32)": FunctionFragment;
    "bumpTransfer(bytes32,address,uint256)": FunctionFragment;
    "domain()": FunctionFragment;
    "enrollRemoteRouter(uint32,bytes32)": FunctionFragment;
    "execute(((uint32,uint32,uint32,address,address,bool,bytes,uint256,address,uint256,uint256,uint256,bytes32),address[],bytes[],address,bytes))": FunctionFragment;
    "forceReceiveLocal((uint32,uint32,uint32,address,address,bool,bytes,uint256,address,uint256,uint256,uint256,bytes32))": FunctionFragment;
    "forceUpdateSlippage((uint32,uint32,uint32,address,address,bool,bytes,uint256,address,uint256,uint256,uint256,bytes32),uint256)": FunctionFragment;
    "nonce()": FunctionFragment;
    "remote(uint32)": FunctionFragment;
    "removeSequencer(address)": FunctionFragment;
    "routedTransfers(bytes32)": FunctionFragment;
    "setXAppConnectionManager(address)": FunctionFragment;
    "transferStatus(bytes32)": FunctionFragment;
    "xAppConnectionManager()": FunctionFragment;
    "xcall(uint32,address,address,address,uint256,uint256,bytes)": FunctionFragment;
    "xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)": FunctionFragment;
    "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes,uint256)": FunctionFragment;
    "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)": FunctionFragment;
    "diamondCut((address,uint8,bytes4[])[],address,bytes)": FunctionFragment;
    "getAcceptanceTime((address,uint8,bytes4[])[],address,bytes)": FunctionFragment;
    "proposeDiamondCut((address,uint8,bytes4[])[],address,bytes)": FunctionFragment;
    "rescindDiamondCut((address,uint8,bytes4[])[],address,bytes)": FunctionFragment;
    "facetAddress(bytes4)": FunctionFragment;
    "facetAddresses()": FunctionFragment;
    "facetFunctionSelectors(address)": FunctionFragment;
    "facets()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "aavePool()": FunctionFragment;
    "aavePortalFee()": FunctionFragment;
    "getAavePortalDebt(bytes32)": FunctionFragment;
    "getAavePortalFeeDebt(bytes32)": FunctionFragment;
    "repayAavePortal((uint32,uint32,uint32,address,address,bool,bytes,uint256,address,uint256,uint256,uint256,bytes32),uint256,uint256,uint256)": FunctionFragment;
    "repayAavePortalFor((uint32,uint32,uint32,address,address,bool,bytes,uint256,address,uint256,uint256,uint256,bytes32),address,uint256,uint256)": FunctionFragment;
    "setAavePool(address)": FunctionFragment;
    "setAavePortalFee(uint256)": FunctionFragment;
    "acceptProposedOwner()": FunctionFragment;
    "assignRoleAdmin(address)": FunctionFragment;
    "assignRoleRouterAdmin(address)": FunctionFragment;
    "assignRoleWatcher(address)": FunctionFragment;
    "delay()": FunctionFragment;
    "owner()": FunctionFragment;
    "pause()": FunctionFragment;
    "paused()": FunctionFragment;
    "proposeNewOwner(address)": FunctionFragment;
    "proposeRouterAllowlistRemoval()": FunctionFragment;
    "proposed()": FunctionFragment;
    "proposedTimestamp()": FunctionFragment;
    "queryRole(address)": FunctionFragment;
    "removeRouterAllowlist()": FunctionFragment;
    "revokeRole(address)": FunctionFragment;
    "routerAllowlistRemoved()": FunctionFragment;
    "routerAllowlistTimestamp()": FunctionFragment;
    "unpause()": FunctionFragment;
    "addRelayer(address)": FunctionFragment;
    "approvedRelayers(address)": FunctionFragment;
    "relayerFeeVault()": FunctionFragment;
    "removeRelayer(address)": FunctionFragment;
    "setRelayerFeeVault(address)": FunctionFragment;
    "LIQUIDITY_FEE_DENOMINATOR()": FunctionFragment;
    "LIQUIDITY_FEE_NUMERATOR()": FunctionFragment;
    "acceptProposedRouterOwner(address)": FunctionFragment;
    "addRouterLiquidity(uint256,address)": FunctionFragment;
    "addRouterLiquidityFor(uint256,address,address)": FunctionFragment;
    "approveRouter(address)": FunctionFragment;
    "approveRouterForPortal(address)": FunctionFragment;
    "getProposedRouterOwner(address)": FunctionFragment;
    "getProposedRouterOwnerTimestamp(address)": FunctionFragment;
    "getRouterApproval(address)": FunctionFragment;
    "getRouterApprovalForPortal(address)": FunctionFragment;
    "getRouterOwner(address)": FunctionFragment;
    "getRouterRecipient(address)": FunctionFragment;
    "initializeRouter(address,address)": FunctionFragment;
    "maxRoutersPerTransfer()": FunctionFragment;
    "proposeRouterOwner(address,address)": FunctionFragment;
    "removeRouterLiquidity((uint32,bytes32),uint256,address)": FunctionFragment;
    "removeRouterLiquidityFor((uint32,bytes32),uint256,address,address)": FunctionFragment;
    "routerBalances(address,address)": FunctionFragment;
    "setLiquidityFeeNumerator(uint256)": FunctionFragment;
    "setMaxRoutersPerTransfer(uint256)": FunctionFragment;
    "setRouterRecipient(address,address)": FunctionFragment;
    "unapproveRouter(address)": FunctionFragment;
    "unapproveRouterForPortal(address)": FunctionFragment;
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
    "addStableSwapPool((uint32,bytes32),address)": FunctionFragment;
    "adoptedToCanonical(address)": FunctionFragment;
    "adoptedToLocalExternalPools((uint32,bytes32))": FunctionFragment;
    "adoptedToLocalExternalPools(bytes32)": FunctionFragment;
    "approvedAssets(bytes32)": FunctionFragment;
    "approvedAssets((uint32,bytes32))": FunctionFragment;
    "canonicalToAdopted(bytes32)": FunctionFragment;
    "canonicalToAdopted((uint32,bytes32))": FunctionFragment;
    "canonicalToRepresentation(bytes32)": FunctionFragment;
    "canonicalToRepresentation((uint32,bytes32))": FunctionFragment;
    "getCustodiedAmount(bytes32)": FunctionFragment;
    "getLocalAndAdoptedToken(bytes32,uint32)": FunctionFragment;
    "getTokenId(address)": FunctionFragment;
    "removeAssetId((uint32,bytes32),address,address)": FunctionFragment;
    "removeAssetId(bytes32,address,address)": FunctionFragment;
    "representationToCanonical(address)": FunctionFragment;
    "setupAsset((uint32,bytes32),uint8,string,string,address,address,uint256)": FunctionFragment;
    "setupAssetWithDeployedRepresentation((uint32,bytes32),address,address,address)": FunctionFragment;
    "updateDetails((uint32,bytes32),string,string)": FunctionFragment;
    "updateLiquidityCap((uint32,bytes32),uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addSequencer"
      | "approvedSequencers"
      | "bumpTransfer(bytes32)"
      | "bumpTransfer(bytes32,address,uint256)"
      | "domain"
      | "enrollRemoteRouter"
      | "execute"
      | "forceReceiveLocal"
      | "forceUpdateSlippage"
      | "nonce"
      | "remote"
      | "removeSequencer"
      | "routedTransfers"
      | "setXAppConnectionManager"
      | "transferStatus"
      | "xAppConnectionManager"
      | "xcall(uint32,address,address,address,uint256,uint256,bytes)"
      | "xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)"
      | "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes,uint256)"
      | "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)"
      | "diamondCut"
      | "getAcceptanceTime"
      | "proposeDiamondCut"
      | "rescindDiamondCut"
      | "facetAddress"
      | "facetAddresses"
      | "facetFunctionSelectors"
      | "facets"
      | "supportsInterface"
      | "aavePool"
      | "aavePortalFee"
      | "getAavePortalDebt"
      | "getAavePortalFeeDebt"
      | "repayAavePortal"
      | "repayAavePortalFor"
      | "setAavePool"
      | "setAavePortalFee"
      | "acceptProposedOwner"
      | "assignRoleAdmin"
      | "assignRoleRouterAdmin"
      | "assignRoleWatcher"
      | "delay"
      | "owner"
      | "pause"
      | "paused"
      | "proposeNewOwner"
      | "proposeRouterAllowlistRemoval"
      | "proposed"
      | "proposedTimestamp"
      | "queryRole"
      | "removeRouterAllowlist"
      | "revokeRole"
      | "routerAllowlistRemoved"
      | "routerAllowlistTimestamp"
      | "unpause"
      | "addRelayer"
      | "approvedRelayers"
      | "relayerFeeVault"
      | "removeRelayer"
      | "setRelayerFeeVault"
      | "LIQUIDITY_FEE_DENOMINATOR"
      | "LIQUIDITY_FEE_NUMERATOR"
      | "acceptProposedRouterOwner"
      | "addRouterLiquidity"
      | "addRouterLiquidityFor"
      | "approveRouter"
      | "approveRouterForPortal"
      | "getProposedRouterOwner"
      | "getProposedRouterOwnerTimestamp"
      | "getRouterApproval"
      | "getRouterApprovalForPortal"
      | "getRouterOwner"
      | "getRouterRecipient"
      | "initializeRouter"
      | "maxRoutersPerTransfer"
      | "proposeRouterOwner"
      | "removeRouterLiquidity"
      | "removeRouterLiquidityFor"
      | "routerBalances"
      | "setLiquidityFeeNumerator"
      | "setMaxRoutersPerTransfer"
      | "setRouterRecipient"
      | "unapproveRouter"
      | "unapproveRouterForPortal"
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
      | "addStableSwapPool"
      | "adoptedToCanonical"
      | "adoptedToLocalExternalPools((uint32,bytes32))"
      | "adoptedToLocalExternalPools(bytes32)"
      | "approvedAssets(bytes32)"
      | "approvedAssets((uint32,bytes32))"
      | "canonicalToAdopted(bytes32)"
      | "canonicalToAdopted((uint32,bytes32))"
      | "canonicalToRepresentation(bytes32)"
      | "canonicalToRepresentation((uint32,bytes32))"
      | "getCustodiedAmount"
      | "getLocalAndAdoptedToken"
      | "getTokenId"
      | "removeAssetId((uint32,bytes32),address,address)"
      | "removeAssetId(bytes32,address,address)"
      | "representationToCanonical"
      | "setupAsset"
      | "setupAssetWithDeployedRepresentation"
      | "updateDetails"
      | "updateLiquidityCap",
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "addSequencer", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "approvedSequencers", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "bumpTransfer(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "bumpTransfer(bytes32,address,uint256)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: "domain", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "enrollRemoteRouter",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(functionFragment: "execute", values: [ExecuteArgsStruct]): string;
  encodeFunctionData(functionFragment: "forceReceiveLocal", values: [TransferInfoStruct]): string;
  encodeFunctionData(
    functionFragment: "forceUpdateSlippage",
    values: [TransferInfoStruct, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(functionFragment: "remote", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "removeSequencer", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "routedTransfers", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "setXAppConnectionManager", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "transferStatus", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "xAppConnectionManager", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "xcall(uint32,address,address,address,uint256,uint256,bytes)",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes,uint256)",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "diamondCut",
    values: [IDiamondCut.FacetCutStruct[], PromiseOrValue<string>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(
    functionFragment: "getAcceptanceTime",
    values: [IDiamondCut.FacetCutStruct[], PromiseOrValue<string>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(
    functionFragment: "proposeDiamondCut",
    values: [IDiamondCut.FacetCutStruct[], PromiseOrValue<string>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(
    functionFragment: "rescindDiamondCut",
    values: [IDiamondCut.FacetCutStruct[], PromiseOrValue<string>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(functionFragment: "facetAddress", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "facetAddresses", values?: undefined): string;
  encodeFunctionData(functionFragment: "facetFunctionSelectors", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "facets", values?: undefined): string;
  encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "aavePool", values?: undefined): string;
  encodeFunctionData(functionFragment: "aavePortalFee", values?: undefined): string;
  encodeFunctionData(functionFragment: "getAavePortalDebt", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getAavePortalFeeDebt", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "repayAavePortal",
    values: [
      TransferInfoStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "repayAavePortalFor",
    values: [TransferInfoStruct, PromiseOrValue<string>, PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: "setAavePool", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "setAavePortalFee", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "acceptProposedOwner", values?: undefined): string;
  encodeFunctionData(functionFragment: "assignRoleAdmin", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "assignRoleRouterAdmin", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "assignRoleWatcher", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "delay", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(functionFragment: "proposeNewOwner", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "proposeRouterAllowlistRemoval", values?: undefined): string;
  encodeFunctionData(functionFragment: "proposed", values?: undefined): string;
  encodeFunctionData(functionFragment: "proposedTimestamp", values?: undefined): string;
  encodeFunctionData(functionFragment: "queryRole", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "removeRouterAllowlist", values?: undefined): string;
  encodeFunctionData(functionFragment: "revokeRole", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "routerAllowlistRemoved", values?: undefined): string;
  encodeFunctionData(functionFragment: "routerAllowlistTimestamp", values?: undefined): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(functionFragment: "addRelayer", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "approvedRelayers", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "relayerFeeVault", values?: undefined): string;
  encodeFunctionData(functionFragment: "removeRelayer", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "setRelayerFeeVault", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "LIQUIDITY_FEE_DENOMINATOR", values?: undefined): string;
  encodeFunctionData(functionFragment: "LIQUIDITY_FEE_NUMERATOR", values?: undefined): string;
  encodeFunctionData(functionFragment: "acceptProposedRouterOwner", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: "addRouterLiquidity",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(
    functionFragment: "addRouterLiquidityFor",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(functionFragment: "approveRouter", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "approveRouterForPortal", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "getProposedRouterOwner", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "getProposedRouterOwnerTimestamp", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "getRouterApproval", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "getRouterApprovalForPortal", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "getRouterOwner", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "getRouterRecipient", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: "initializeRouter",
    values: [PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(functionFragment: "maxRoutersPerTransfer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proposeRouterOwner",
    values: [PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(
    functionFragment: "removeRouterLiquidity",
    values: [TokenIdStruct, PromiseOrValue<BigNumberish>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(
    functionFragment: "removeRouterLiquidityFor",
    values: [TokenIdStruct, PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(
    functionFragment: "routerBalances",
    values: [PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(functionFragment: "setLiquidityFeeNumerator", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: "setMaxRoutersPerTransfer", values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(
    functionFragment: "setRouterRecipient",
    values: [PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(functionFragment: "unapproveRouter", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "unapproveRouterForPortal", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: "addSwapLiquidity",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "calculateRemoveSwapLiquidity",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: "calculateRemoveSwapLiquidityOneToken",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: "calculateSwap",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "calculateSwapTokenAmount",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>[], PromiseOrValue<boolean>],
  ): string;
  encodeFunctionData(functionFragment: "getSwapA", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getSwapAPrecise", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "getSwapAdminBalance",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: "getSwapLPToken", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "getSwapStorage", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "getSwapToken",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapTokenBalance",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapTokenIndex",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(functionFragment: "getSwapVirtualPrice", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "removeSwapLiquidity",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "removeSwapLiquidityImbalance",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "removeSwapLiquidityOneToken",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "swapExact",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactOut",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(functionFragment: "addStableSwapPool", values: [TokenIdStruct, PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: "adoptedToCanonical", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: "adoptedToLocalExternalPools((uint32,bytes32))",
    values: [TokenIdStruct],
  ): string;
  encodeFunctionData(
    functionFragment: "adoptedToLocalExternalPools(bytes32)",
    values: [PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(functionFragment: "approvedAssets(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "approvedAssets((uint32,bytes32))", values: [TokenIdStruct]): string;
  encodeFunctionData(functionFragment: "canonicalToAdopted(bytes32)", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: "canonicalToAdopted((uint32,bytes32))", values: [TokenIdStruct]): string;
  encodeFunctionData(
    functionFragment: "canonicalToRepresentation(bytes32)",
    values: [PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(functionFragment: "canonicalToRepresentation((uint32,bytes32))", values: [TokenIdStruct]): string;
  encodeFunctionData(functionFragment: "getCustodiedAmount", values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: "getLocalAndAdoptedToken",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: "getTokenId", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: "removeAssetId((uint32,bytes32),address,address)",
    values: [TokenIdStruct, PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(
    functionFragment: "removeAssetId(bytes32,address,address)",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(functionFragment: "representationToCanonical", values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: "setupAsset",
    values: [
      TokenIdStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: "setupAssetWithDeployedRepresentation",
    values: [TokenIdStruct, PromiseOrValue<string>, PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(
    functionFragment: "updateDetails",
    values: [TokenIdStruct, PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(
    functionFragment: "updateLiquidityCap",
    values: [TokenIdStruct, PromiseOrValue<BigNumberish>],
  ): string;

  decodeFunctionResult(functionFragment: "addSequencer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approvedSequencers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bumpTransfer(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bumpTransfer(bytes32,address,uint256)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "domain", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "enrollRemoteRouter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "forceReceiveLocal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "forceUpdateSlippage", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "remote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeSequencer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "routedTransfers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setXAppConnectionManager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transferStatus", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "xAppConnectionManager", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "xcall(uint32,address,address,address,uint256,uint256,bytes)",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes,uint256)",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)",
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: "diamondCut", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getAcceptanceTime", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proposeDiamondCut", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rescindDiamondCut", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "facetAddress", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "facetAddresses", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "facetFunctionSelectors", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "facets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "aavePool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "aavePortalFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getAavePortalDebt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getAavePortalFeeDebt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "repayAavePortal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "repayAavePortalFor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setAavePool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setAavePortalFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "acceptProposedOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "assignRoleAdmin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "assignRoleRouterAdmin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "assignRoleWatcher", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "delay", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proposeNewOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proposeRouterAllowlistRemoval", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proposed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proposedTimestamp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "queryRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeRouterAllowlist", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "routerAllowlistRemoved", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "routerAllowlistTimestamp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addRelayer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approvedRelayers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "relayerFeeVault", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeRelayer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRelayerFeeVault", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "LIQUIDITY_FEE_DENOMINATOR", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "LIQUIDITY_FEE_NUMERATOR", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "acceptProposedRouterOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addRouterLiquidity", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addRouterLiquidityFor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approveRouter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approveRouterForPortal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getProposedRouterOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getProposedRouterOwnerTimestamp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRouterApproval", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRouterApprovalForPortal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRouterOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRouterRecipient", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initializeRouter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxRoutersPerTransfer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "proposeRouterOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeRouterLiquidity", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeRouterLiquidityFor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "routerBalances", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setLiquidityFeeNumerator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setMaxRoutersPerTransfer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRouterRecipient", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unapproveRouter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unapproveRouterForPortal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addSwapLiquidity", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "calculateRemoveSwapLiquidity", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "calculateRemoveSwapLiquidityOneToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "calculateSwap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "calculateSwapTokenAmount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSwapA", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSwapAPrecise", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSwapAdminBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSwapLPToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSwapStorage", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSwapToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSwapTokenBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSwapTokenIndex", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSwapVirtualPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeSwapLiquidity", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeSwapLiquidityImbalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeSwapLiquidityOneToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swapExact", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swapExactOut", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addStableSwapPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "adoptedToCanonical", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "adoptedToLocalExternalPools((uint32,bytes32))", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "adoptedToLocalExternalPools(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approvedAssets(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approvedAssets((uint32,bytes32))", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "canonicalToAdopted(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "canonicalToAdopted((uint32,bytes32))", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "canonicalToRepresentation(bytes32)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "canonicalToRepresentation((uint32,bytes32))", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getCustodiedAmount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getLocalAndAdoptedToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTokenId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeAssetId((uint32,bytes32),address,address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "removeAssetId(bytes32,address,address)", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "representationToCanonical", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setupAsset", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setupAssetWithDeployedRepresentation", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "updateDetails", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "updateLiquidityCap", data: BytesLike): Result;

  events: {
    "AavePortalMintUnbacked(bytes32,address,address,uint256)": EventFragment;
    "Executed(bytes32,address,address,tuple,address,uint256,address)": EventFragment;
    "ExternalCalldataExecuted(bytes32,bool,bytes)": EventFragment;
    "ForceReceiveLocal(bytes32)": EventFragment;
    "RemoteAdded(uint32,address,address)": EventFragment;
    "SequencerAdded(address,address)": EventFragment;
    "SequencerRemoved(address,address)": EventFragment;
    "SlippageUpdated(bytes32,uint256)": EventFragment;
    "TransferRelayerFeesIncreased(bytes32,uint256,address,address)": EventFragment;
    "XAppConnectionManagerSet(address,address)": EventFragment;
    "XCalled(bytes32,uint256,bytes32,tuple,address,uint256,address,bytes)": EventFragment;
    "DiamondCut(tuple[],address,bytes)": EventFragment;
    "DiamondCutProposed(tuple[],address,bytes,uint256)": EventFragment;
    "DiamondCutRescinded(tuple[],address,bytes)": EventFragment;
    "AavePoolUpdated(address,address)": EventFragment;
    "AavePortalFeeUpdated(uint256,address)": EventFragment;
    "AavePortalRepayment(bytes32,address,uint256,uint256,address)": EventFragment;
    "AssignRoleAdmin(address)": EventFragment;
    "AssignRoleRouter(address)": EventFragment;
    "AssignRoleWatcher(address)": EventFragment;
    "OwnershipProposed(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused()": EventFragment;
    "RevokeRole(address,uint8)": EventFragment;
    "RouterAllowlistRemovalProposed(uint256)": EventFragment;
    "RouterAllowlistRemoved(bool)": EventFragment;
    "Unpaused()": EventFragment;
    "RelayerAdded(address,address)": EventFragment;
    "RelayerFeeVaultUpdated(address,address,address)": EventFragment;
    "RelayerRemoved(address,address)": EventFragment;
    "LiquidityFeeNumeratorUpdated(uint256,address)": EventFragment;
    "MaxRoutersPerTransferUpdated(uint256,address)": EventFragment;
    "RouterAdded(address,address)": EventFragment;
    "RouterApprovedForPortal(address,address)": EventFragment;
    "RouterInitialized(address)": EventFragment;
    "RouterLiquidityAdded(address,address,bytes32,uint256,address)": EventFragment;
    "RouterLiquidityRemoved(address,address,address,bytes32,uint256,address)": EventFragment;
    "RouterOwnerAccepted(address,address,address)": EventFragment;
    "RouterOwnerProposed(address,address,address)": EventFragment;
    "RouterRecipientSet(address,address,address)": EventFragment;
    "RouterRemoved(address,address)": EventFragment;
    "RouterUnapprovedForPortal(address,address)": EventFragment;
    "AddLiquidity(bytes32,address,uint256[],uint256[],uint256,uint256)": EventFragment;
    "NewAdminFee(bytes32,uint256)": EventFragment;
    "NewSwapFee(bytes32,uint256)": EventFragment;
    "RemoveLiquidity(bytes32,address,uint256[],uint256)": EventFragment;
    "RemoveLiquidityImbalance(bytes32,address,uint256[],uint256[],uint256,uint256)": EventFragment;
    "RemoveLiquidityOne(bytes32,address,uint256,uint256,uint256,uint256)": EventFragment;
    "TokenSwap(bytes32,address,uint256,uint256,uint128,uint128)": EventFragment;
    "AssetAdded(bytes32,bytes32,uint32,address,address,address)": EventFragment;
    "AssetRemoved(bytes32,address)": EventFragment;
    "LiquidityCapUpdated(bytes32,bytes32,uint32,uint256,address)": EventFragment;
    "StableSwapAdded(bytes32,bytes32,uint32,address,address)": EventFragment;
    "TokenDeployed(uint32,bytes32,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AavePortalMintUnbacked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Executed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ExternalCalldataExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ForceReceiveLocal"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoteAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SequencerAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SequencerRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SlippageUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferRelayerFeesIncreased"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "XAppConnectionManagerSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "XCalled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DiamondCut"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DiamondCutProposed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DiamondCutRescinded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AavePoolUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AavePortalFeeUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AavePortalRepayment"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssignRoleAdmin"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssignRoleRouter"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssignRoleWatcher"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipProposed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevokeRole"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterAllowlistRemovalProposed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterAllowlistRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RelayerAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RelayerFeeVaultUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RelayerRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LiquidityFeeNumeratorUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MaxRoutersPerTransferUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterApprovedForPortal"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterInitialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterLiquidityAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterLiquidityRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterOwnerAccepted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterOwnerProposed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterRecipientSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RouterUnapprovedForPortal"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AddLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewAdminFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewSwapFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidityImbalance"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidityOne"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenSwap"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LiquidityCapUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StableSwapAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenDeployed"): EventFragment;
}

export interface AavePortalMintUnbackedEventObject {
  transferId: string;
  router: string;
  asset: string;
  amount: BigNumber;
}
export type AavePortalMintUnbackedEvent = TypedEvent<
  [string, string, string, BigNumber],
  AavePortalMintUnbackedEventObject
>;

export type AavePortalMintUnbackedEventFilter = TypedEventFilter<AavePortalMintUnbackedEvent>;

export interface ExecutedEventObject {
  transferId: string;
  to: string;
  asset: string;
  args: ExecuteArgsStructOutput;
  local: string;
  amount: BigNumber;
  caller: string;
}
export type ExecutedEvent = TypedEvent<
  [string, string, string, ExecuteArgsStructOutput, string, BigNumber, string],
  ExecutedEventObject
>;

export type ExecutedEventFilter = TypedEventFilter<ExecutedEvent>;

export interface ExternalCalldataExecutedEventObject {
  transferId: string;
  success: boolean;
  returnData: string;
}
export type ExternalCalldataExecutedEvent = TypedEvent<[string, boolean, string], ExternalCalldataExecutedEventObject>;

export type ExternalCalldataExecutedEventFilter = TypedEventFilter<ExternalCalldataExecutedEvent>;

export interface ForceReceiveLocalEventObject {
  transferId: string;
}
export type ForceReceiveLocalEvent = TypedEvent<[string], ForceReceiveLocalEventObject>;

export type ForceReceiveLocalEventFilter = TypedEventFilter<ForceReceiveLocalEvent>;

export interface RemoteAddedEventObject {
  domain: number;
  remote: string;
  caller: string;
}
export type RemoteAddedEvent = TypedEvent<[number, string, string], RemoteAddedEventObject>;

export type RemoteAddedEventFilter = TypedEventFilter<RemoteAddedEvent>;

export interface SequencerAddedEventObject {
  sequencer: string;
  caller: string;
}
export type SequencerAddedEvent = TypedEvent<[string, string], SequencerAddedEventObject>;

export type SequencerAddedEventFilter = TypedEventFilter<SequencerAddedEvent>;

export interface SequencerRemovedEventObject {
  sequencer: string;
  caller: string;
}
export type SequencerRemovedEvent = TypedEvent<[string, string], SequencerRemovedEventObject>;

export type SequencerRemovedEventFilter = TypedEventFilter<SequencerRemovedEvent>;

export interface SlippageUpdatedEventObject {
  transferId: string;
  slippage: BigNumber;
}
export type SlippageUpdatedEvent = TypedEvent<[string, BigNumber], SlippageUpdatedEventObject>;

export type SlippageUpdatedEventFilter = TypedEventFilter<SlippageUpdatedEvent>;

export interface TransferRelayerFeesIncreasedEventObject {
  transferId: string;
  increase: BigNumber;
  asset: string;
  caller: string;
}
export type TransferRelayerFeesIncreasedEvent = TypedEvent<
  [string, BigNumber, string, string],
  TransferRelayerFeesIncreasedEventObject
>;

export type TransferRelayerFeesIncreasedEventFilter = TypedEventFilter<TransferRelayerFeesIncreasedEvent>;

export interface XAppConnectionManagerSetEventObject {
  updated: string;
  caller: string;
}
export type XAppConnectionManagerSetEvent = TypedEvent<[string, string], XAppConnectionManagerSetEventObject>;

export type XAppConnectionManagerSetEventFilter = TypedEventFilter<XAppConnectionManagerSetEvent>;

export interface XCalledEventObject {
  transferId: string;
  nonce: BigNumber;
  messageHash: string;
  params: TransferInfoStructOutput;
  asset: string;
  amount: BigNumber;
  local: string;
  messageBody: string;
}
export type XCalledEvent = TypedEvent<
  [string, BigNumber, string, TransferInfoStructOutput, string, BigNumber, string, string],
  XCalledEventObject
>;

export type XCalledEventFilter = TypedEventFilter<XCalledEvent>;

export interface DiamondCutEventObject {
  _diamondCut: IDiamondCut.FacetCutStructOutput[];
  _init: string;
  _calldata: string;
}
export type DiamondCutEvent = TypedEvent<[IDiamondCut.FacetCutStructOutput[], string, string], DiamondCutEventObject>;

export type DiamondCutEventFilter = TypedEventFilter<DiamondCutEvent>;

export interface DiamondCutProposedEventObject {
  _diamondCut: IDiamondCut.FacetCutStructOutput[];
  _init: string;
  _calldata: string;
  deadline: BigNumber;
}
export type DiamondCutProposedEvent = TypedEvent<
  [IDiamondCut.FacetCutStructOutput[], string, string, BigNumber],
  DiamondCutProposedEventObject
>;

export type DiamondCutProposedEventFilter = TypedEventFilter<DiamondCutProposedEvent>;

export interface DiamondCutRescindedEventObject {
  _diamondCut: IDiamondCut.FacetCutStructOutput[];
  _init: string;
  _calldata: string;
}
export type DiamondCutRescindedEvent = TypedEvent<
  [IDiamondCut.FacetCutStructOutput[], string, string],
  DiamondCutRescindedEventObject
>;

export type DiamondCutRescindedEventFilter = TypedEventFilter<DiamondCutRescindedEvent>;

export interface AavePoolUpdatedEventObject {
  updated: string;
  caller: string;
}
export type AavePoolUpdatedEvent = TypedEvent<[string, string], AavePoolUpdatedEventObject>;

export type AavePoolUpdatedEventFilter = TypedEventFilter<AavePoolUpdatedEvent>;

export interface AavePortalFeeUpdatedEventObject {
  updated: BigNumber;
  caller: string;
}
export type AavePortalFeeUpdatedEvent = TypedEvent<[BigNumber, string], AavePortalFeeUpdatedEventObject>;

export type AavePortalFeeUpdatedEventFilter = TypedEventFilter<AavePortalFeeUpdatedEvent>;

export interface AavePortalRepaymentEventObject {
  transferId: string;
  asset: string;
  amount: BigNumber;
  fee: BigNumber;
  caller: string;
}
export type AavePortalRepaymentEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, string],
  AavePortalRepaymentEventObject
>;

export type AavePortalRepaymentEventFilter = TypedEventFilter<AavePortalRepaymentEvent>;

export interface AssignRoleAdminEventObject {
  admin: string;
}
export type AssignRoleAdminEvent = TypedEvent<[string], AssignRoleAdminEventObject>;

export type AssignRoleAdminEventFilter = TypedEventFilter<AssignRoleAdminEvent>;

export interface AssignRoleRouterEventObject {
  router: string;
}
export type AssignRoleRouterEvent = TypedEvent<[string], AssignRoleRouterEventObject>;

export type AssignRoleRouterEventFilter = TypedEventFilter<AssignRoleRouterEvent>;

export interface AssignRoleWatcherEventObject {
  watcher: string;
}
export type AssignRoleWatcherEvent = TypedEvent<[string], AssignRoleWatcherEventObject>;

export type AssignRoleWatcherEventFilter = TypedEventFilter<AssignRoleWatcherEvent>;

export interface OwnershipProposedEventObject {
  proposedOwner: string;
}
export type OwnershipProposedEvent = TypedEvent<[string], OwnershipProposedEventObject>;

export type OwnershipProposedEventFilter = TypedEventFilter<OwnershipProposedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<[string, string], OwnershipTransferredEventObject>;

export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;

export interface PausedEventObject {}
export type PausedEvent = TypedEvent<[], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface RevokeRoleEventObject {
  revokedAddress: string;
  revokedRole: number;
}
export type RevokeRoleEvent = TypedEvent<[string, number], RevokeRoleEventObject>;

export type RevokeRoleEventFilter = TypedEventFilter<RevokeRoleEvent>;

export interface RouterAllowlistRemovalProposedEventObject {
  timestamp: BigNumber;
}
export type RouterAllowlistRemovalProposedEvent = TypedEvent<[BigNumber], RouterAllowlistRemovalProposedEventObject>;

export type RouterAllowlistRemovalProposedEventFilter = TypedEventFilter<RouterAllowlistRemovalProposedEvent>;

export interface RouterAllowlistRemovedEventObject {
  renounced: boolean;
}
export type RouterAllowlistRemovedEvent = TypedEvent<[boolean], RouterAllowlistRemovedEventObject>;

export type RouterAllowlistRemovedEventFilter = TypedEventFilter<RouterAllowlistRemovedEvent>;

export interface UnpausedEventObject {}
export type UnpausedEvent = TypedEvent<[], UnpausedEventObject>;

export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;

export interface RelayerAddedEventObject {
  relayer: string;
  caller: string;
}
export type RelayerAddedEvent = TypedEvent<[string, string], RelayerAddedEventObject>;

export type RelayerAddedEventFilter = TypedEventFilter<RelayerAddedEvent>;

export interface RelayerFeeVaultUpdatedEventObject {
  oldVault: string;
  newVault: string;
  caller: string;
}
export type RelayerFeeVaultUpdatedEvent = TypedEvent<[string, string, string], RelayerFeeVaultUpdatedEventObject>;

export type RelayerFeeVaultUpdatedEventFilter = TypedEventFilter<RelayerFeeVaultUpdatedEvent>;

export interface RelayerRemovedEventObject {
  relayer: string;
  caller: string;
}
export type RelayerRemovedEvent = TypedEvent<[string, string], RelayerRemovedEventObject>;

export type RelayerRemovedEventFilter = TypedEventFilter<RelayerRemovedEvent>;

export interface LiquidityFeeNumeratorUpdatedEventObject {
  liquidityFeeNumerator: BigNumber;
  caller: string;
}
export type LiquidityFeeNumeratorUpdatedEvent = TypedEvent<
  [BigNumber, string],
  LiquidityFeeNumeratorUpdatedEventObject
>;

export type LiquidityFeeNumeratorUpdatedEventFilter = TypedEventFilter<LiquidityFeeNumeratorUpdatedEvent>;

export interface MaxRoutersPerTransferUpdatedEventObject {
  maxRoutersPerTransfer: BigNumber;
  caller: string;
}
export type MaxRoutersPerTransferUpdatedEvent = TypedEvent<
  [BigNumber, string],
  MaxRoutersPerTransferUpdatedEventObject
>;

export type MaxRoutersPerTransferUpdatedEventFilter = TypedEventFilter<MaxRoutersPerTransferUpdatedEvent>;

export interface RouterAddedEventObject {
  router: string;
  caller: string;
}
export type RouterAddedEvent = TypedEvent<[string, string], RouterAddedEventObject>;

export type RouterAddedEventFilter = TypedEventFilter<RouterAddedEvent>;

export interface RouterApprovedForPortalEventObject {
  router: string;
  caller: string;
}
export type RouterApprovedForPortalEvent = TypedEvent<[string, string], RouterApprovedForPortalEventObject>;

export type RouterApprovedForPortalEventFilter = TypedEventFilter<RouterApprovedForPortalEvent>;

export interface RouterInitializedEventObject {
  router: string;
}
export type RouterInitializedEvent = TypedEvent<[string], RouterInitializedEventObject>;

export type RouterInitializedEventFilter = TypedEventFilter<RouterInitializedEvent>;

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

export type RouterLiquidityAddedEventFilter = TypedEventFilter<RouterLiquidityAddedEvent>;

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

export type RouterLiquidityRemovedEventFilter = TypedEventFilter<RouterLiquidityRemovedEvent>;

export interface RouterOwnerAcceptedEventObject {
  router: string;
  prevOwner: string;
  newOwner: string;
}
export type RouterOwnerAcceptedEvent = TypedEvent<[string, string, string], RouterOwnerAcceptedEventObject>;

export type RouterOwnerAcceptedEventFilter = TypedEventFilter<RouterOwnerAcceptedEvent>;

export interface RouterOwnerProposedEventObject {
  router: string;
  prevProposed: string;
  newProposed: string;
}
export type RouterOwnerProposedEvent = TypedEvent<[string, string, string], RouterOwnerProposedEventObject>;

export type RouterOwnerProposedEventFilter = TypedEventFilter<RouterOwnerProposedEvent>;

export interface RouterRecipientSetEventObject {
  router: string;
  prevRecipient: string;
  newRecipient: string;
}
export type RouterRecipientSetEvent = TypedEvent<[string, string, string], RouterRecipientSetEventObject>;

export type RouterRecipientSetEventFilter = TypedEventFilter<RouterRecipientSetEvent>;

export interface RouterRemovedEventObject {
  router: string;
  caller: string;
}
export type RouterRemovedEvent = TypedEvent<[string, string], RouterRemovedEventObject>;

export type RouterRemovedEventFilter = TypedEventFilter<RouterRemovedEvent>;

export interface RouterUnapprovedForPortalEventObject {
  router: string;
  caller: string;
}
export type RouterUnapprovedForPortalEvent = TypedEvent<[string, string], RouterUnapprovedForPortalEventObject>;

export type RouterUnapprovedForPortalEventFilter = TypedEventFilter<RouterUnapprovedForPortalEvent>;

export interface AddLiquidityEventObject {
  key: string;
  provider: string;
  tokenAmounts: BigNumber[];
  fees: BigNumber[];
  invariant: BigNumber;
  lpTokenSupply: BigNumber;
}
export type AddLiquidityEvent = TypedEvent<
  [string, string, BigNumber[], BigNumber[], BigNumber, BigNumber],
  AddLiquidityEventObject
>;

export type AddLiquidityEventFilter = TypedEventFilter<AddLiquidityEvent>;

export interface NewAdminFeeEventObject {
  key: string;
  newAdminFee: BigNumber;
}
export type NewAdminFeeEvent = TypedEvent<[string, BigNumber], NewAdminFeeEventObject>;

export type NewAdminFeeEventFilter = TypedEventFilter<NewAdminFeeEvent>;

export interface NewSwapFeeEventObject {
  key: string;
  newSwapFee: BigNumber;
}
export type NewSwapFeeEvent = TypedEvent<[string, BigNumber], NewSwapFeeEventObject>;

export type NewSwapFeeEventFilter = TypedEventFilter<NewSwapFeeEvent>;

export interface RemoveLiquidityEventObject {
  key: string;
  provider: string;
  tokenAmounts: BigNumber[];
  lpTokenSupply: BigNumber;
}
export type RemoveLiquidityEvent = TypedEvent<[string, string, BigNumber[], BigNumber], RemoveLiquidityEventObject>;

export type RemoveLiquidityEventFilter = TypedEventFilter<RemoveLiquidityEvent>;

export interface RemoveLiquidityImbalanceEventObject {
  key: string;
  provider: string;
  tokenAmounts: BigNumber[];
  fees: BigNumber[];
  invariant: BigNumber;
  lpTokenSupply: BigNumber;
}
export type RemoveLiquidityImbalanceEvent = TypedEvent<
  [string, string, BigNumber[], BigNumber[], BigNumber, BigNumber],
  RemoveLiquidityImbalanceEventObject
>;

export type RemoveLiquidityImbalanceEventFilter = TypedEventFilter<RemoveLiquidityImbalanceEvent>;

export interface RemoveLiquidityOneEventObject {
  key: string;
  provider: string;
  lpTokenAmount: BigNumber;
  lpTokenSupply: BigNumber;
  boughtId: BigNumber;
  tokensBought: BigNumber;
}
export type RemoveLiquidityOneEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, BigNumber, BigNumber],
  RemoveLiquidityOneEventObject
>;

export type RemoveLiquidityOneEventFilter = TypedEventFilter<RemoveLiquidityOneEvent>;

export interface TokenSwapEventObject {
  key: string;
  buyer: string;
  tokensSold: BigNumber;
  tokensBought: BigNumber;
  soldId: BigNumber;
  boughtId: BigNumber;
}
export type TokenSwapEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, BigNumber, BigNumber],
  TokenSwapEventObject
>;

export type TokenSwapEventFilter = TypedEventFilter<TokenSwapEvent>;

export interface AssetAddedEventObject {
  key: string;
  canonicalId: string;
  domain: number;
  adoptedAsset: string;
  localAsset: string;
  caller: string;
}
export type AssetAddedEvent = TypedEvent<[string, string, number, string, string, string], AssetAddedEventObject>;

export type AssetAddedEventFilter = TypedEventFilter<AssetAddedEvent>;

export interface AssetRemovedEventObject {
  key: string;
  caller: string;
}
export type AssetRemovedEvent = TypedEvent<[string, string], AssetRemovedEventObject>;

export type AssetRemovedEventFilter = TypedEventFilter<AssetRemovedEvent>;

export interface LiquidityCapUpdatedEventObject {
  key: string;
  canonicalId: string;
  domain: number;
  cap: BigNumber;
  caller: string;
}
export type LiquidityCapUpdatedEvent = TypedEvent<
  [string, string, number, BigNumber, string],
  LiquidityCapUpdatedEventObject
>;

export type LiquidityCapUpdatedEventFilter = TypedEventFilter<LiquidityCapUpdatedEvent>;

export interface StableSwapAddedEventObject {
  key: string;
  canonicalId: string;
  domain: number;
  swapPool: string;
  caller: string;
}
export type StableSwapAddedEvent = TypedEvent<[string, string, number, string, string], StableSwapAddedEventObject>;

export type StableSwapAddedEventFilter = TypedEventFilter<StableSwapAddedEvent>;

export interface TokenDeployedEventObject {
  domain: number;
  id: string;
  representation: string;
}
export type TokenDeployedEvent = TypedEvent<[number, string, string], TokenDeployedEventObject>;

export type TokenDeployedEventFilter = TypedEventFilter<TokenDeployedEvent>;

export interface Connext extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ConnextInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addSequencer(
      _sequencer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    approvedSequencers(_sequencer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    "bumpTransfer(bytes32)"(
      _transferId: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    "bumpTransfer(bytes32,address,uint256)"(
      _transferId: PromiseOrValue<BytesLike>,
      _relayerFeeAsset: PromiseOrValue<string>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    domain(overrides?: CallOverrides): Promise<[number]>;

    enrollRemoteRouter(
      _domain: PromiseOrValue<BigNumberish>,
      _router: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    execute(
      _args: ExecuteArgsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    forceReceiveLocal(
      _params: TransferInfoStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    forceUpdateSlippage(
      _params: TransferInfoStruct,
      _slippage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    nonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    remote(_domain: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;

    removeSequencer(
      _sequencer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    routedTransfers(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string[]]>;

    setXAppConnectionManager(
      _xAppConnectionManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    transferStatus(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[number]>;

    xAppConnectionManager(overrides?: CallOverrides): Promise<[string]>;

    "xcall(uint32,address,address,address,uint256,uint256,bytes)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    "xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes,uint256)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    diamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    getAcceptanceTime(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;

    proposeDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    rescindDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    facetAddress(
      _functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<[string] & { facetAddress_: string }>;

    facetAddresses(overrides?: CallOverrides): Promise<[string[]] & { facetAddresses_: string[] }>;

    facetFunctionSelectors(
      _facet: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<[string[]] & { facetFunctionSelectors_: string[] }>;

    facets(overrides?: CallOverrides): Promise<
      [IDiamondLoupe.FacetStructOutput[]] & {
        facets_: IDiamondLoupe.FacetStructOutput[];
      }
    >;

    supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;

    aavePool(overrides?: CallOverrides): Promise<[string]>;

    aavePortalFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getAavePortalDebt(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;

    getAavePortalFeeDebt(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;

    repayAavePortal(
      _params: TransferInfoStruct,
      _backingAmount: PromiseOrValue<BigNumberish>,
      _feeAmount: PromiseOrValue<BigNumberish>,
      _maxIn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    repayAavePortalFor(
      _params: TransferInfoStruct,
      _portalAsset: PromiseOrValue<string>,
      _backingAmount: PromiseOrValue<BigNumberish>,
      _feeAmount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setAavePool(
      _aavePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setAavePortalFee(
      _aavePortalFeeNumerator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    acceptProposedOwner(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

    assignRoleAdmin(
      _admin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    assignRoleRouterAdmin(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    assignRoleWatcher(
      _watcher: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    delay(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    proposeNewOwner(
      newlyProposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    proposeRouterAllowlistRemoval(
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    proposed(overrides?: CallOverrides): Promise<[string]>;

    proposedTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    queryRole(_role: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number]>;

    removeRouterAllowlist(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

    revokeRole(
      _revoke: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    routerAllowlistRemoved(overrides?: CallOverrides): Promise<[boolean]>;

    routerAllowlistTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    unpause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

    addRelayer(
      _relayer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    approvedRelayers(_relayer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    relayerFeeVault(overrides?: CallOverrides): Promise<[string]>;

    removeRelayer(
      _relayer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setRelayerFeeVault(
      _relayerFeeVault: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    LIQUIDITY_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    LIQUIDITY_FEE_NUMERATOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    acceptProposedRouterOwner(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    addRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    addRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    approveRouter(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    approveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    getProposedRouterOwner(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;

    getProposedRouterOwnerTimestamp(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;

    getRouterApproval(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    getRouterApprovalForPortal(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    getRouterOwner(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;

    getRouterRecipient(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;

    initializeRouter(
      _owner: PromiseOrValue<string>,
      _recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    maxRoutersPerTransfer(overrides?: CallOverrides): Promise<[BigNumber]>;

    proposeRouterOwner(
      _router: PromiseOrValue<string>,
      _proposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    removeRouterLiquidity(
      _canonical: TokenIdStruct,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    removeRouterLiquidityFor(
      _canonical: TokenIdStruct,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    routerBalances(
      _router: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;

    setLiquidityFeeNumerator(
      _numerator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setMaxRoutersPerTransfer(
      _newMaxRouters: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setRouterRecipient(
      _router: PromiseOrValue<string>,
      _recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    unapproveRouter(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    unapproveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    addSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      minToMint: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    calculateRemoveSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber[]]>;

    calculateRemoveSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber] & { availableTokenAmount: BigNumber }>;

    calculateSwap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;

    calculateSwapTokenAmount(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      deposit: PromiseOrValue<boolean>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;

    getSwapA(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;

    getSwapAPrecise(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;

    getSwapAdminBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;

    getSwapLPToken(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;

    getSwapStorage(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[SwapUtils.SwapStructOutput]>;

    getSwapToken(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    getSwapTokenBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;

    getSwapTokenIndex(
      key: PromiseOrValue<BytesLike>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<[number]>;

    getSwapVirtualPrice(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;

    removeSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      minAmounts: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    removeSwapLiquidityImbalance(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      maxBurnAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    removeSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      minAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    swap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      minDy: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    swapExact(
      key: PromiseOrValue<BytesLike>,
      amountIn: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      minAmountOut: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    swapExactOut(
      key: PromiseOrValue<BytesLike>,
      amountOut: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      maxAmountIn: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    addStableSwapPool(
      _canonical: TokenIdStruct,
      _stableSwapPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    adoptedToCanonical(_adopted: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[TokenIdStructOutput]>;

    "adoptedToLocalExternalPools((uint32,bytes32))"(
      _canonical: TokenIdStruct,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    "adoptedToLocalExternalPools(bytes32)"(
      _key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    "approvedAssets(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;

    "approvedAssets((uint32,bytes32))"(_canonical: TokenIdStruct, overrides?: CallOverrides): Promise<[boolean]>;

    "canonicalToAdopted(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;

    "canonicalToAdopted((uint32,bytes32))"(_canonical: TokenIdStruct, overrides?: CallOverrides): Promise<[string]>;

    "canonicalToRepresentation(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;

    "canonicalToRepresentation((uint32,bytes32))"(
      _canonical: TokenIdStruct,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    getCustodiedAmount(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[BigNumber]>;

    getLocalAndAdoptedToken(
      _id: PromiseOrValue<BytesLike>,
      _domain: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[string, string]>;

    getTokenId(_candidate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[TokenIdStructOutput]>;

    "removeAssetId((uint32,bytes32),address,address)"(
      _canonical: TokenIdStruct,
      _adoptedAssetId: PromiseOrValue<string>,
      _representation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    "removeAssetId(bytes32,address,address)"(
      _key: PromiseOrValue<BytesLike>,
      _adoptedAssetId: PromiseOrValue<string>,
      _representation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    representationToCanonical(
      _representation: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<[TokenIdStructOutput]>;

    setupAsset(
      _canonical: TokenIdStruct,
      _canonicalDecimals: PromiseOrValue<BigNumberish>,
      _representationName: PromiseOrValue<string>,
      _representationSymbol: PromiseOrValue<string>,
      _adoptedAssetId: PromiseOrValue<string>,
      _stableSwapPool: PromiseOrValue<string>,
      _cap: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setupAssetWithDeployedRepresentation(
      _canonical: TokenIdStruct,
      _representation: PromiseOrValue<string>,
      _adoptedAssetId: PromiseOrValue<string>,
      _stableSwapPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    updateDetails(
      _canonical: TokenIdStruct,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    updateLiquidityCap(
      _canonical: TokenIdStruct,
      _updated: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;
  };

  addSequencer(
    _sequencer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  approvedSequencers(_sequencer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  "bumpTransfer(bytes32)"(
    _transferId: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  "bumpTransfer(bytes32,address,uint256)"(
    _transferId: PromiseOrValue<BytesLike>,
    _relayerFeeAsset: PromiseOrValue<string>,
    _relayerFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  domain(overrides?: CallOverrides): Promise<number>;

  enrollRemoteRouter(
    _domain: PromiseOrValue<BigNumberish>,
    _router: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  execute(
    _args: ExecuteArgsStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  forceReceiveLocal(
    _params: TransferInfoStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  forceUpdateSlippage(
    _params: TransferInfoStruct,
    _slippage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  nonce(overrides?: CallOverrides): Promise<BigNumber>;

  remote(_domain: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

  removeSequencer(
    _sequencer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  routedTransfers(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;

  setXAppConnectionManager(
    _xAppConnectionManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  transferStatus(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<number>;

  xAppConnectionManager(overrides?: CallOverrides): Promise<string>;

  "xcall(uint32,address,address,address,uint256,uint256,bytes)"(
    _destination: PromiseOrValue<BigNumberish>,
    _to: PromiseOrValue<string>,
    _asset: PromiseOrValue<string>,
    _delegate: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _slippage: PromiseOrValue<BigNumberish>,
    _callData: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  "xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)"(
    _destination: PromiseOrValue<BigNumberish>,
    _to: PromiseOrValue<string>,
    _asset: PromiseOrValue<string>,
    _delegate: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _slippage: PromiseOrValue<BigNumberish>,
    _callData: PromiseOrValue<BytesLike>,
    _relayerFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes,uint256)"(
    _destination: PromiseOrValue<BigNumberish>,
    _to: PromiseOrValue<string>,
    _asset: PromiseOrValue<string>,
    _delegate: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _slippage: PromiseOrValue<BigNumberish>,
    _callData: PromiseOrValue<BytesLike>,
    _relayerFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)"(
    _destination: PromiseOrValue<BigNumberish>,
    _to: PromiseOrValue<string>,
    _asset: PromiseOrValue<string>,
    _delegate: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _slippage: PromiseOrValue<BigNumberish>,
    _callData: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  diamondCut(
    _diamondCut: IDiamondCut.FacetCutStruct[],
    _init: PromiseOrValue<string>,
    _calldata: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  getAcceptanceTime(
    _diamondCut: IDiamondCut.FacetCutStruct[],
    _init: PromiseOrValue<string>,
    _calldata: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;

  proposeDiamondCut(
    _diamondCut: IDiamondCut.FacetCutStruct[],
    _init: PromiseOrValue<string>,
    _calldata: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  rescindDiamondCut(
    _diamondCut: IDiamondCut.FacetCutStruct[],
    _init: PromiseOrValue<string>,
    _calldata: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  facetAddress(_functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

  facetAddresses(overrides?: CallOverrides): Promise<string[]>;

  facetFunctionSelectors(_facet: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string[]>;

  facets(overrides?: CallOverrides): Promise<IDiamondLoupe.FacetStructOutput[]>;

  supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;

  aavePool(overrides?: CallOverrides): Promise<string>;

  aavePortalFee(overrides?: CallOverrides): Promise<BigNumber>;

  getAavePortalDebt(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

  getAavePortalFeeDebt(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

  repayAavePortal(
    _params: TransferInfoStruct,
    _backingAmount: PromiseOrValue<BigNumberish>,
    _feeAmount: PromiseOrValue<BigNumberish>,
    _maxIn: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  repayAavePortalFor(
    _params: TransferInfoStruct,
    _portalAsset: PromiseOrValue<string>,
    _backingAmount: PromiseOrValue<BigNumberish>,
    _feeAmount: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setAavePool(
    _aavePool: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setAavePortalFee(
    _aavePortalFeeNumerator: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  acceptProposedOwner(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  assignRoleAdmin(
    _admin: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  assignRoleRouterAdmin(
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  assignRoleWatcher(
    _watcher: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  delay(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  pause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  proposeNewOwner(
    newlyProposed: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  proposeRouterAllowlistRemoval(
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  proposed(overrides?: CallOverrides): Promise<string>;

  proposedTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  queryRole(_role: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;

  removeRouterAllowlist(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  revokeRole(
    _revoke: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  routerAllowlistRemoved(overrides?: CallOverrides): Promise<boolean>;

  routerAllowlistTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  unpause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  addRelayer(
    _relayer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  approvedRelayers(_relayer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  relayerFeeVault(overrides?: CallOverrides): Promise<string>;

  removeRelayer(
    _relayer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setRelayerFeeVault(
    _relayerFeeVault: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  LIQUIDITY_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

  LIQUIDITY_FEE_NUMERATOR(overrides?: CallOverrides): Promise<BigNumber>;

  acceptProposedRouterOwner(
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  addRouterLiquidity(
    _amount: PromiseOrValue<BigNumberish>,
    _local: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  addRouterLiquidityFor(
    _amount: PromiseOrValue<BigNumberish>,
    _local: PromiseOrValue<string>,
    _router: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  approveRouter(
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  approveRouterForPortal(
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  getProposedRouterOwner(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

  getProposedRouterOwnerTimestamp(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

  getRouterApproval(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  getRouterApprovalForPortal(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  getRouterOwner(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

  getRouterRecipient(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

  initializeRouter(
    _owner: PromiseOrValue<string>,
    _recipient: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  maxRoutersPerTransfer(overrides?: CallOverrides): Promise<BigNumber>;

  proposeRouterOwner(
    _router: PromiseOrValue<string>,
    _proposed: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  removeRouterLiquidity(
    _canonical: TokenIdStruct,
    _amount: PromiseOrValue<BigNumberish>,
    _to: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  removeRouterLiquidityFor(
    _canonical: TokenIdStruct,
    _amount: PromiseOrValue<BigNumberish>,
    _to: PromiseOrValue<string>,
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  routerBalances(
    _router: PromiseOrValue<string>,
    _asset: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;

  setLiquidityFeeNumerator(
    _numerator: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setMaxRoutersPerTransfer(
    _newMaxRouters: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setRouterRecipient(
    _router: PromiseOrValue<string>,
    _recipient: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  unapproveRouter(
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  unapproveRouterForPortal(
    _router: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  addSwapLiquidity(
    key: PromiseOrValue<BytesLike>,
    amounts: PromiseOrValue<BigNumberish>[],
    minToMint: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  calculateRemoveSwapLiquidity(
    key: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>;

  calculateRemoveSwapLiquidityOneToken(
    key: PromiseOrValue<BytesLike>,
    tokenAmount: PromiseOrValue<BigNumberish>,
    tokenIndex: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;

  calculateSwap(
    key: PromiseOrValue<BytesLike>,
    tokenIndexFrom: PromiseOrValue<BigNumberish>,
    tokenIndexTo: PromiseOrValue<BigNumberish>,
    dx: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;

  calculateSwapTokenAmount(
    key: PromiseOrValue<BytesLike>,
    amounts: PromiseOrValue<BigNumberish>[],
    deposit: PromiseOrValue<boolean>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;

  getSwapA(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

  getSwapAPrecise(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

  getSwapAdminBalance(
    key: PromiseOrValue<BytesLike>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;

  getSwapLPToken(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

  getSwapStorage(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<SwapUtils.SwapStructOutput>;

  getSwapToken(
    key: PromiseOrValue<BytesLike>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<string>;

  getSwapTokenBalance(
    key: PromiseOrValue<BytesLike>,
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<BigNumber>;

  getSwapTokenIndex(
    key: PromiseOrValue<BytesLike>,
    tokenAddress: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<number>;

  getSwapVirtualPrice(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

  removeSwapLiquidity(
    key: PromiseOrValue<BytesLike>,
    amount: PromiseOrValue<BigNumberish>,
    minAmounts: PromiseOrValue<BigNumberish>[],
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  removeSwapLiquidityImbalance(
    key: PromiseOrValue<BytesLike>,
    amounts: PromiseOrValue<BigNumberish>[],
    maxBurnAmount: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  removeSwapLiquidityOneToken(
    key: PromiseOrValue<BytesLike>,
    tokenAmount: PromiseOrValue<BigNumberish>,
    tokenIndex: PromiseOrValue<BigNumberish>,
    minAmount: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  swap(
    key: PromiseOrValue<BytesLike>,
    tokenIndexFrom: PromiseOrValue<BigNumberish>,
    tokenIndexTo: PromiseOrValue<BigNumberish>,
    dx: PromiseOrValue<BigNumberish>,
    minDy: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  swapExact(
    key: PromiseOrValue<BytesLike>,
    amountIn: PromiseOrValue<BigNumberish>,
    assetIn: PromiseOrValue<string>,
    assetOut: PromiseOrValue<string>,
    minAmountOut: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  swapExactOut(
    key: PromiseOrValue<BytesLike>,
    amountOut: PromiseOrValue<BigNumberish>,
    assetIn: PromiseOrValue<string>,
    assetOut: PromiseOrValue<string>,
    maxAmountIn: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  addStableSwapPool(
    _canonical: TokenIdStruct,
    _stableSwapPool: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  adoptedToCanonical(_adopted: PromiseOrValue<string>, overrides?: CallOverrides): Promise<TokenIdStructOutput>;

  "adoptedToLocalExternalPools((uint32,bytes32))"(
    _canonical: TokenIdStruct,
    overrides?: CallOverrides,
  ): Promise<string>;

  "adoptedToLocalExternalPools(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

  "approvedAssets(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;

  "approvedAssets((uint32,bytes32))"(_canonical: TokenIdStruct, overrides?: CallOverrides): Promise<boolean>;

  "canonicalToAdopted(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

  "canonicalToAdopted((uint32,bytes32))"(_canonical: TokenIdStruct, overrides?: CallOverrides): Promise<string>;

  "canonicalToRepresentation(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

  "canonicalToRepresentation((uint32,bytes32))"(_canonical: TokenIdStruct, overrides?: CallOverrides): Promise<string>;

  getCustodiedAmount(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

  getLocalAndAdoptedToken(
    _id: PromiseOrValue<BytesLike>,
    _domain: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<[string, string]>;

  getTokenId(_candidate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<TokenIdStructOutput>;

  "removeAssetId((uint32,bytes32),address,address)"(
    _canonical: TokenIdStruct,
    _adoptedAssetId: PromiseOrValue<string>,
    _representation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  "removeAssetId(bytes32,address,address)"(
    _key: PromiseOrValue<BytesLike>,
    _adoptedAssetId: PromiseOrValue<string>,
    _representation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  representationToCanonical(
    _representation: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<TokenIdStructOutput>;

  setupAsset(
    _canonical: TokenIdStruct,
    _canonicalDecimals: PromiseOrValue<BigNumberish>,
    _representationName: PromiseOrValue<string>,
    _representationSymbol: PromiseOrValue<string>,
    _adoptedAssetId: PromiseOrValue<string>,
    _stableSwapPool: PromiseOrValue<string>,
    _cap: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setupAssetWithDeployedRepresentation(
    _canonical: TokenIdStruct,
    _representation: PromiseOrValue<string>,
    _adoptedAssetId: PromiseOrValue<string>,
    _stableSwapPool: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  updateDetails(
    _canonical: TokenIdStruct,
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  updateLiquidityCap(
    _canonical: TokenIdStruct,
    _updated: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  callStatic: {
    addSequencer(_sequencer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    approvedSequencers(_sequencer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    "bumpTransfer(bytes32)"(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;

    "bumpTransfer(bytes32,address,uint256)"(
      _transferId: PromiseOrValue<BytesLike>,
      _relayerFeeAsset: PromiseOrValue<string>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    domain(overrides?: CallOverrides): Promise<number>;

    enrollRemoteRouter(
      _domain: PromiseOrValue<BigNumberish>,
      _router: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>;

    execute(_args: ExecuteArgsStruct, overrides?: CallOverrides): Promise<string>;

    forceReceiveLocal(_params: TransferInfoStruct, overrides?: CallOverrides): Promise<void>;

    forceUpdateSlippage(
      _params: TransferInfoStruct,
      _slippage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    remote(_domain: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;

    removeSequencer(_sequencer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    routedTransfers(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string[]>;

    setXAppConnectionManager(_xAppConnectionManager: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    transferStatus(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<number>;

    xAppConnectionManager(overrides?: CallOverrides): Promise<string>;

    "xcall(uint32,address,address,address,uint256,uint256,bytes)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<string>;

    "xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<string>;

    "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes,uint256)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<string>;

    "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<string>;

    diamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>;

    getAcceptanceTime(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    proposeDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>;

    rescindDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>;

    facetAddress(_functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

    facetAddresses(overrides?: CallOverrides): Promise<string[]>;

    facetFunctionSelectors(_facet: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string[]>;

    facets(overrides?: CallOverrides): Promise<IDiamondLoupe.FacetStructOutput[]>;

    supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;

    aavePool(overrides?: CallOverrides): Promise<string>;

    aavePortalFee(overrides?: CallOverrides): Promise<BigNumber>;

    getAavePortalDebt(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getAavePortalFeeDebt(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    repayAavePortal(
      _params: TransferInfoStruct,
      _backingAmount: PromiseOrValue<BigNumberish>,
      _feeAmount: PromiseOrValue<BigNumberish>,
      _maxIn: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    repayAavePortalFor(
      _params: TransferInfoStruct,
      _portalAsset: PromiseOrValue<string>,
      _backingAmount: PromiseOrValue<BigNumberish>,
      _feeAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    setAavePool(_aavePool: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setAavePortalFee(_aavePortalFeeNumerator: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;

    acceptProposedOwner(overrides?: CallOverrides): Promise<void>;

    assignRoleAdmin(_admin: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    assignRoleRouterAdmin(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    assignRoleWatcher(_watcher: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    delay(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    pause(overrides?: CallOverrides): Promise<void>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    proposeNewOwner(newlyProposed: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    proposeRouterAllowlistRemoval(overrides?: CallOverrides): Promise<void>;

    proposed(overrides?: CallOverrides): Promise<string>;

    proposedTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    queryRole(_role: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;

    removeRouterAllowlist(overrides?: CallOverrides): Promise<void>;

    revokeRole(_revoke: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    routerAllowlistRemoved(overrides?: CallOverrides): Promise<boolean>;

    routerAllowlistTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    unpause(overrides?: CallOverrides): Promise<void>;

    addRelayer(_relayer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    approvedRelayers(_relayer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    relayerFeeVault(overrides?: CallOverrides): Promise<string>;

    removeRelayer(_relayer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setRelayerFeeVault(_relayerFeeVault: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    LIQUIDITY_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    LIQUIDITY_FEE_NUMERATOR(overrides?: CallOverrides): Promise<BigNumber>;

    acceptProposedRouterOwner(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    addRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    addRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    approveRouter(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    approveRouterForPortal(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    getProposedRouterOwner(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

    getProposedRouterOwnerTimestamp(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getRouterApproval(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    getRouterApprovalForPortal(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    getRouterOwner(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

    getRouterRecipient(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

    initializeRouter(
      _owner: PromiseOrValue<string>,
      _recipient: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    maxRoutersPerTransfer(overrides?: CallOverrides): Promise<BigNumber>;

    proposeRouterOwner(
      _router: PromiseOrValue<string>,
      _proposed: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    removeRouterLiquidity(
      _canonical: TokenIdStruct,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    removeRouterLiquidityFor(
      _canonical: TokenIdStruct,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    routerBalances(
      _router: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    setLiquidityFeeNumerator(_numerator: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;

    setMaxRoutersPerTransfer(_newMaxRouters: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;

    setRouterRecipient(
      _router: PromiseOrValue<string>,
      _recipient: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    unapproveRouter(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    unapproveRouterForPortal(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    addSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      minToMint: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    calculateRemoveSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>;

    calculateRemoveSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    calculateSwap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    calculateSwapTokenAmount(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      deposit: PromiseOrValue<boolean>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getSwapA(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getSwapAPrecise(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getSwapAdminBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getSwapLPToken(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

    getSwapStorage(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<SwapUtils.SwapStructOutput>;

    getSwapToken(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<string>;

    getSwapTokenBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getSwapTokenIndex(
      key: PromiseOrValue<BytesLike>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<number>;

    getSwapVirtualPrice(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    removeSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      minAmounts: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>;

    removeSwapLiquidityImbalance(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      maxBurnAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    removeSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      minAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    swap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      minDy: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    swapExact(
      key: PromiseOrValue<BytesLike>,
      amountIn: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      minAmountOut: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    swapExactOut(
      key: PromiseOrValue<BytesLike>,
      amountOut: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      maxAmountIn: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    addStableSwapPool(
      _canonical: TokenIdStruct,
      _stableSwapPool: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    adoptedToCanonical(_adopted: PromiseOrValue<string>, overrides?: CallOverrides): Promise<TokenIdStructOutput>;

    "adoptedToLocalExternalPools((uint32,bytes32))"(
      _canonical: TokenIdStruct,
      overrides?: CallOverrides,
    ): Promise<string>;

    "adoptedToLocalExternalPools(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

    "approvedAssets(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;

    "approvedAssets((uint32,bytes32))"(_canonical: TokenIdStruct, overrides?: CallOverrides): Promise<boolean>;

    "canonicalToAdopted(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

    "canonicalToAdopted((uint32,bytes32))"(_canonical: TokenIdStruct, overrides?: CallOverrides): Promise<string>;

    "canonicalToRepresentation(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

    "canonicalToRepresentation((uint32,bytes32))"(
      _canonical: TokenIdStruct,
      overrides?: CallOverrides,
    ): Promise<string>;

    getCustodiedAmount(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getLocalAndAdoptedToken(
      _id: PromiseOrValue<BytesLike>,
      _domain: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[string, string]>;

    getTokenId(_candidate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<TokenIdStructOutput>;

    "removeAssetId((uint32,bytes32),address,address)"(
      _canonical: TokenIdStruct,
      _adoptedAssetId: PromiseOrValue<string>,
      _representation: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    "removeAssetId(bytes32,address,address)"(
      _key: PromiseOrValue<BytesLike>,
      _adoptedAssetId: PromiseOrValue<string>,
      _representation: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    representationToCanonical(
      _representation: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<TokenIdStructOutput>;

    setupAsset(
      _canonical: TokenIdStruct,
      _canonicalDecimals: PromiseOrValue<BigNumberish>,
      _representationName: PromiseOrValue<string>,
      _representationSymbol: PromiseOrValue<string>,
      _adoptedAssetId: PromiseOrValue<string>,
      _stableSwapPool: PromiseOrValue<string>,
      _cap: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<string>;

    setupAssetWithDeployedRepresentation(
      _canonical: TokenIdStruct,
      _representation: PromiseOrValue<string>,
      _adoptedAssetId: PromiseOrValue<string>,
      _stableSwapPool: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<string>;

    updateDetails(
      _canonical: TokenIdStruct,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    updateLiquidityCap(
      _canonical: TokenIdStruct,
      _updated: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;
  };

  filters: {
    "AavePortalMintUnbacked(bytes32,address,address,uint256)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      router?: PromiseOrValue<string> | null,
      asset?: null,
      amount?: null,
    ): AavePortalMintUnbackedEventFilter;
    AavePortalMintUnbacked(
      transferId?: PromiseOrValue<BytesLike> | null,
      router?: PromiseOrValue<string> | null,
      asset?: null,
      amount?: null,
    ): AavePortalMintUnbackedEventFilter;

    "Executed(bytes32,address,address,tuple,address,uint256,address)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      to?: PromiseOrValue<string> | null,
      asset?: PromiseOrValue<string> | null,
      args?: null,
      local?: null,
      amount?: null,
      caller?: null,
    ): ExecutedEventFilter;
    Executed(
      transferId?: PromiseOrValue<BytesLike> | null,
      to?: PromiseOrValue<string> | null,
      asset?: PromiseOrValue<string> | null,
      args?: null,
      local?: null,
      amount?: null,
      caller?: null,
    ): ExecutedEventFilter;

    "ExternalCalldataExecuted(bytes32,bool,bytes)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      success?: null,
      returnData?: null,
    ): ExternalCalldataExecutedEventFilter;
    ExternalCalldataExecuted(
      transferId?: PromiseOrValue<BytesLike> | null,
      success?: null,
      returnData?: null,
    ): ExternalCalldataExecutedEventFilter;

    "ForceReceiveLocal(bytes32)"(transferId?: PromiseOrValue<BytesLike> | null): ForceReceiveLocalEventFilter;
    ForceReceiveLocal(transferId?: PromiseOrValue<BytesLike> | null): ForceReceiveLocalEventFilter;

    "RemoteAdded(uint32,address,address)"(domain?: null, remote?: null, caller?: null): RemoteAddedEventFilter;
    RemoteAdded(domain?: null, remote?: null, caller?: null): RemoteAddedEventFilter;

    "SequencerAdded(address,address)"(sequencer?: null, caller?: null): SequencerAddedEventFilter;
    SequencerAdded(sequencer?: null, caller?: null): SequencerAddedEventFilter;

    "SequencerRemoved(address,address)"(sequencer?: null, caller?: null): SequencerRemovedEventFilter;
    SequencerRemoved(sequencer?: null, caller?: null): SequencerRemovedEventFilter;

    "SlippageUpdated(bytes32,uint256)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      slippage?: null,
    ): SlippageUpdatedEventFilter;
    SlippageUpdated(transferId?: PromiseOrValue<BytesLike> | null, slippage?: null): SlippageUpdatedEventFilter;

    "TransferRelayerFeesIncreased(bytes32,uint256,address,address)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      increase?: null,
      asset?: null,
      caller?: null,
    ): TransferRelayerFeesIncreasedEventFilter;
    TransferRelayerFeesIncreased(
      transferId?: PromiseOrValue<BytesLike> | null,
      increase?: null,
      asset?: null,
      caller?: null,
    ): TransferRelayerFeesIncreasedEventFilter;

    "XAppConnectionManagerSet(address,address)"(updated?: null, caller?: null): XAppConnectionManagerSetEventFilter;
    XAppConnectionManagerSet(updated?: null, caller?: null): XAppConnectionManagerSetEventFilter;

    "XCalled(bytes32,uint256,bytes32,tuple,address,uint256,address,bytes)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      nonce?: PromiseOrValue<BigNumberish> | null,
      messageHash?: PromiseOrValue<BytesLike> | null,
      params?: null,
      asset?: null,
      amount?: null,
      local?: null,
      messageBody?: null,
    ): XCalledEventFilter;
    XCalled(
      transferId?: PromiseOrValue<BytesLike> | null,
      nonce?: PromiseOrValue<BigNumberish> | null,
      messageHash?: PromiseOrValue<BytesLike> | null,
      params?: null,
      asset?: null,
      amount?: null,
      local?: null,
      messageBody?: null,
    ): XCalledEventFilter;

    "DiamondCut(tuple[],address,bytes)"(_diamondCut?: null, _init?: null, _calldata?: null): DiamondCutEventFilter;
    DiamondCut(_diamondCut?: null, _init?: null, _calldata?: null): DiamondCutEventFilter;

    "DiamondCutProposed(tuple[],address,bytes,uint256)"(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null,
      deadline?: null,
    ): DiamondCutProposedEventFilter;
    DiamondCutProposed(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null,
      deadline?: null,
    ): DiamondCutProposedEventFilter;

    "DiamondCutRescinded(tuple[],address,bytes)"(
      _diamondCut?: null,
      _init?: null,
      _calldata?: null,
    ): DiamondCutRescindedEventFilter;
    DiamondCutRescinded(_diamondCut?: null, _init?: null, _calldata?: null): DiamondCutRescindedEventFilter;

    "AavePoolUpdated(address,address)"(updated?: null, caller?: null): AavePoolUpdatedEventFilter;
    AavePoolUpdated(updated?: null, caller?: null): AavePoolUpdatedEventFilter;

    "AavePortalFeeUpdated(uint256,address)"(updated?: null, caller?: null): AavePortalFeeUpdatedEventFilter;
    AavePortalFeeUpdated(updated?: null, caller?: null): AavePortalFeeUpdatedEventFilter;

    "AavePortalRepayment(bytes32,address,uint256,uint256,address)"(
      transferId?: PromiseOrValue<BytesLike> | null,
      asset?: null,
      amount?: null,
      fee?: null,
      caller?: null,
    ): AavePortalRepaymentEventFilter;
    AavePortalRepayment(
      transferId?: PromiseOrValue<BytesLike> | null,
      asset?: null,
      amount?: null,
      fee?: null,
      caller?: null,
    ): AavePortalRepaymentEventFilter;

    "AssignRoleAdmin(address)"(admin?: null): AssignRoleAdminEventFilter;
    AssignRoleAdmin(admin?: null): AssignRoleAdminEventFilter;

    "AssignRoleRouter(address)"(router?: null): AssignRoleRouterEventFilter;
    AssignRoleRouter(router?: null): AssignRoleRouterEventFilter;

    "AssignRoleWatcher(address)"(watcher?: null): AssignRoleWatcherEventFilter;
    AssignRoleWatcher(watcher?: null): AssignRoleWatcherEventFilter;

    "OwnershipProposed(address)"(proposedOwner?: PromiseOrValue<string> | null): OwnershipProposedEventFilter;
    OwnershipProposed(proposedOwner?: PromiseOrValue<string> | null): OwnershipProposedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null,
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null,
    ): OwnershipTransferredEventFilter;

    "Paused()"(): PausedEventFilter;
    Paused(): PausedEventFilter;

    "RevokeRole(address,uint8)"(revokedAddress?: null, revokedRole?: null): RevokeRoleEventFilter;
    RevokeRole(revokedAddress?: null, revokedRole?: null): RevokeRoleEventFilter;

    "RouterAllowlistRemovalProposed(uint256)"(timestamp?: null): RouterAllowlistRemovalProposedEventFilter;
    RouterAllowlistRemovalProposed(timestamp?: null): RouterAllowlistRemovalProposedEventFilter;

    "RouterAllowlistRemoved(bool)"(renounced?: null): RouterAllowlistRemovedEventFilter;
    RouterAllowlistRemoved(renounced?: null): RouterAllowlistRemovedEventFilter;

    "Unpaused()"(): UnpausedEventFilter;
    Unpaused(): UnpausedEventFilter;

    "RelayerAdded(address,address)"(relayer?: null, caller?: null): RelayerAddedEventFilter;
    RelayerAdded(relayer?: null, caller?: null): RelayerAddedEventFilter;

    "RelayerFeeVaultUpdated(address,address,address)"(
      oldVault?: null,
      newVault?: null,
      caller?: null,
    ): RelayerFeeVaultUpdatedEventFilter;
    RelayerFeeVaultUpdated(oldVault?: null, newVault?: null, caller?: null): RelayerFeeVaultUpdatedEventFilter;

    "RelayerRemoved(address,address)"(relayer?: null, caller?: null): RelayerRemovedEventFilter;
    RelayerRemoved(relayer?: null, caller?: null): RelayerRemovedEventFilter;

    "LiquidityFeeNumeratorUpdated(uint256,address)"(
      liquidityFeeNumerator?: null,
      caller?: null,
    ): LiquidityFeeNumeratorUpdatedEventFilter;
    LiquidityFeeNumeratorUpdated(liquidityFeeNumerator?: null, caller?: null): LiquidityFeeNumeratorUpdatedEventFilter;

    "MaxRoutersPerTransferUpdated(uint256,address)"(
      maxRoutersPerTransfer?: null,
      caller?: null,
    ): MaxRoutersPerTransferUpdatedEventFilter;
    MaxRoutersPerTransferUpdated(maxRoutersPerTransfer?: null, caller?: null): MaxRoutersPerTransferUpdatedEventFilter;

    "RouterAdded(address,address)"(router?: PromiseOrValue<string> | null, caller?: null): RouterAddedEventFilter;
    RouterAdded(router?: PromiseOrValue<string> | null, caller?: null): RouterAddedEventFilter;

    "RouterApprovedForPortal(address,address)"(router?: null, caller?: null): RouterApprovedForPortalEventFilter;
    RouterApprovedForPortal(router?: null, caller?: null): RouterApprovedForPortalEventFilter;

    "RouterInitialized(address)"(router?: PromiseOrValue<string> | null): RouterInitializedEventFilter;
    RouterInitialized(router?: PromiseOrValue<string> | null): RouterInitializedEventFilter;

    "RouterLiquidityAdded(address,address,bytes32,uint256,address)"(
      router?: PromiseOrValue<string> | null,
      local?: null,
      key?: null,
      amount?: null,
      caller?: null,
    ): RouterLiquidityAddedEventFilter;
    RouterLiquidityAdded(
      router?: PromiseOrValue<string> | null,
      local?: null,
      key?: null,
      amount?: null,
      caller?: null,
    ): RouterLiquidityAddedEventFilter;

    "RouterLiquidityRemoved(address,address,address,bytes32,uint256,address)"(
      router?: PromiseOrValue<string> | null,
      to?: null,
      local?: null,
      key?: null,
      amount?: null,
      caller?: null,
    ): RouterLiquidityRemovedEventFilter;
    RouterLiquidityRemoved(
      router?: PromiseOrValue<string> | null,
      to?: null,
      local?: null,
      key?: null,
      amount?: null,
      caller?: null,
    ): RouterLiquidityRemovedEventFilter;

    "RouterOwnerAccepted(address,address,address)"(
      router?: PromiseOrValue<string> | null,
      prevOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null,
    ): RouterOwnerAcceptedEventFilter;
    RouterOwnerAccepted(
      router?: PromiseOrValue<string> | null,
      prevOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null,
    ): RouterOwnerAcceptedEventFilter;

    "RouterOwnerProposed(address,address,address)"(
      router?: PromiseOrValue<string> | null,
      prevProposed?: PromiseOrValue<string> | null,
      newProposed?: PromiseOrValue<string> | null,
    ): RouterOwnerProposedEventFilter;
    RouterOwnerProposed(
      router?: PromiseOrValue<string> | null,
      prevProposed?: PromiseOrValue<string> | null,
      newProposed?: PromiseOrValue<string> | null,
    ): RouterOwnerProposedEventFilter;

    "RouterRecipientSet(address,address,address)"(
      router?: PromiseOrValue<string> | null,
      prevRecipient?: PromiseOrValue<string> | null,
      newRecipient?: PromiseOrValue<string> | null,
    ): RouterRecipientSetEventFilter;
    RouterRecipientSet(
      router?: PromiseOrValue<string> | null,
      prevRecipient?: PromiseOrValue<string> | null,
      newRecipient?: PromiseOrValue<string> | null,
    ): RouterRecipientSetEventFilter;

    "RouterRemoved(address,address)"(router?: PromiseOrValue<string> | null, caller?: null): RouterRemovedEventFilter;
    RouterRemoved(router?: PromiseOrValue<string> | null, caller?: null): RouterRemovedEventFilter;

    "RouterUnapprovedForPortal(address,address)"(router?: null, caller?: null): RouterUnapprovedForPortalEventFilter;
    RouterUnapprovedForPortal(router?: null, caller?: null): RouterUnapprovedForPortalEventFilter;

    "AddLiquidity(bytes32,address,uint256[],uint256[],uint256,uint256)"(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      fees?: null,
      invariant?: null,
      lpTokenSupply?: null,
    ): AddLiquidityEventFilter;
    AddLiquidity(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      fees?: null,
      invariant?: null,
      lpTokenSupply?: null,
    ): AddLiquidityEventFilter;

    "NewAdminFee(bytes32,uint256)"(key?: PromiseOrValue<BytesLike> | null, newAdminFee?: null): NewAdminFeeEventFilter;
    NewAdminFee(key?: PromiseOrValue<BytesLike> | null, newAdminFee?: null): NewAdminFeeEventFilter;

    "NewSwapFee(bytes32,uint256)"(key?: PromiseOrValue<BytesLike> | null, newSwapFee?: null): NewSwapFeeEventFilter;
    NewSwapFee(key?: PromiseOrValue<BytesLike> | null, newSwapFee?: null): NewSwapFeeEventFilter;

    "RemoveLiquidity(bytes32,address,uint256[],uint256)"(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      lpTokenSupply?: null,
    ): RemoveLiquidityEventFilter;
    RemoveLiquidity(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      lpTokenSupply?: null,
    ): RemoveLiquidityEventFilter;

    "RemoveLiquidityImbalance(bytes32,address,uint256[],uint256[],uint256,uint256)"(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      fees?: null,
      invariant?: null,
      lpTokenSupply?: null,
    ): RemoveLiquidityImbalanceEventFilter;
    RemoveLiquidityImbalance(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      tokenAmounts?: null,
      fees?: null,
      invariant?: null,
      lpTokenSupply?: null,
    ): RemoveLiquidityImbalanceEventFilter;

    "RemoveLiquidityOne(bytes32,address,uint256,uint256,uint256,uint256)"(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      lpTokenAmount?: null,
      lpTokenSupply?: null,
      boughtId?: null,
      tokensBought?: null,
    ): RemoveLiquidityOneEventFilter;
    RemoveLiquidityOne(
      key?: PromiseOrValue<BytesLike> | null,
      provider?: PromiseOrValue<string> | null,
      lpTokenAmount?: null,
      lpTokenSupply?: null,
      boughtId?: null,
      tokensBought?: null,
    ): RemoveLiquidityOneEventFilter;

    "TokenSwap(bytes32,address,uint256,uint256,uint128,uint128)"(
      key?: PromiseOrValue<BytesLike> | null,
      buyer?: PromiseOrValue<string> | null,
      tokensSold?: null,
      tokensBought?: null,
      soldId?: null,
      boughtId?: null,
    ): TokenSwapEventFilter;
    TokenSwap(
      key?: PromiseOrValue<BytesLike> | null,
      buyer?: PromiseOrValue<string> | null,
      tokensSold?: null,
      tokensBought?: null,
      soldId?: null,
      boughtId?: null,
    ): TokenSwapEventFilter;

    "AssetAdded(bytes32,bytes32,uint32,address,address,address)"(
      key?: PromiseOrValue<BytesLike> | null,
      canonicalId?: PromiseOrValue<BytesLike> | null,
      domain?: PromiseOrValue<BigNumberish> | null,
      adoptedAsset?: null,
      localAsset?: null,
      caller?: null,
    ): AssetAddedEventFilter;
    AssetAdded(
      key?: PromiseOrValue<BytesLike> | null,
      canonicalId?: PromiseOrValue<BytesLike> | null,
      domain?: PromiseOrValue<BigNumberish> | null,
      adoptedAsset?: null,
      localAsset?: null,
      caller?: null,
    ): AssetAddedEventFilter;

    "AssetRemoved(bytes32,address)"(key?: PromiseOrValue<BytesLike> | null, caller?: null): AssetRemovedEventFilter;
    AssetRemoved(key?: PromiseOrValue<BytesLike> | null, caller?: null): AssetRemovedEventFilter;

    "LiquidityCapUpdated(bytes32,bytes32,uint32,uint256,address)"(
      key?: PromiseOrValue<BytesLike> | null,
      canonicalId?: PromiseOrValue<BytesLike> | null,
      domain?: PromiseOrValue<BigNumberish> | null,
      cap?: null,
      caller?: null,
    ): LiquidityCapUpdatedEventFilter;
    LiquidityCapUpdated(
      key?: PromiseOrValue<BytesLike> | null,
      canonicalId?: PromiseOrValue<BytesLike> | null,
      domain?: PromiseOrValue<BigNumberish> | null,
      cap?: null,
      caller?: null,
    ): LiquidityCapUpdatedEventFilter;

    "StableSwapAdded(bytes32,bytes32,uint32,address,address)"(
      key?: PromiseOrValue<BytesLike> | null,
      canonicalId?: PromiseOrValue<BytesLike> | null,
      domain?: PromiseOrValue<BigNumberish> | null,
      swapPool?: null,
      caller?: null,
    ): StableSwapAddedEventFilter;
    StableSwapAdded(
      key?: PromiseOrValue<BytesLike> | null,
      canonicalId?: PromiseOrValue<BytesLike> | null,
      domain?: PromiseOrValue<BigNumberish> | null,
      swapPool?: null,
      caller?: null,
    ): StableSwapAddedEventFilter;

    "TokenDeployed(uint32,bytes32,address)"(
      domain?: PromiseOrValue<BigNumberish> | null,
      id?: PromiseOrValue<BytesLike> | null,
      representation?: PromiseOrValue<string> | null,
    ): TokenDeployedEventFilter;
    TokenDeployed(
      domain?: PromiseOrValue<BigNumberish> | null,
      id?: PromiseOrValue<BytesLike> | null,
      representation?: PromiseOrValue<string> | null,
    ): TokenDeployedEventFilter;
  };

  estimateGas: {
    addSequencer(
      _sequencer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    approvedSequencers(_sequencer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    "bumpTransfer(bytes32)"(
      _transferId: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    "bumpTransfer(bytes32,address,uint256)"(
      _transferId: PromiseOrValue<BytesLike>,
      _relayerFeeAsset: PromiseOrValue<string>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    domain(overrides?: CallOverrides): Promise<BigNumber>;

    enrollRemoteRouter(
      _domain: PromiseOrValue<BigNumberish>,
      _router: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    execute(_args: ExecuteArgsStruct, overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    forceReceiveLocal(
      _params: TransferInfoStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    forceUpdateSlippage(
      _params: TransferInfoStruct,
      _slippage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    remote(_domain: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    removeSequencer(
      _sequencer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    routedTransfers(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    setXAppConnectionManager(
      _xAppConnectionManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    transferStatus(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    xAppConnectionManager(overrides?: CallOverrides): Promise<BigNumber>;

    "xcall(uint32,address,address,address,uint256,uint256,bytes)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    "xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes,uint256)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    diamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    getAcceptanceTime(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    proposeDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    rescindDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    facetAddress(_functionSelector: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    facetAddresses(overrides?: CallOverrides): Promise<BigNumber>;

    facetFunctionSelectors(_facet: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    facets(overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    aavePool(overrides?: CallOverrides): Promise<BigNumber>;

    aavePortalFee(overrides?: CallOverrides): Promise<BigNumber>;

    getAavePortalDebt(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getAavePortalFeeDebt(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    repayAavePortal(
      _params: TransferInfoStruct,
      _backingAmount: PromiseOrValue<BigNumberish>,
      _feeAmount: PromiseOrValue<BigNumberish>,
      _maxIn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    repayAavePortalFor(
      _params: TransferInfoStruct,
      _portalAsset: PromiseOrValue<string>,
      _backingAmount: PromiseOrValue<BigNumberish>,
      _feeAmount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setAavePool(
      _aavePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setAavePortalFee(
      _aavePortalFeeNumerator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    acceptProposedOwner(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    assignRoleAdmin(
      _admin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    assignRoleRouterAdmin(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    assignRoleWatcher(
      _watcher: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    delay(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    proposeNewOwner(
      newlyProposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    proposeRouterAllowlistRemoval(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    proposed(overrides?: CallOverrides): Promise<BigNumber>;

    proposedTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    queryRole(_role: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    removeRouterAllowlist(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    revokeRole(
      _revoke: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    routerAllowlistRemoved(overrides?: CallOverrides): Promise<BigNumber>;

    routerAllowlistTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    unpause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;

    addRelayer(
      _relayer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    approvedRelayers(_relayer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    relayerFeeVault(overrides?: CallOverrides): Promise<BigNumber>;

    removeRelayer(
      _relayer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setRelayerFeeVault(
      _relayerFeeVault: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    LIQUIDITY_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    LIQUIDITY_FEE_NUMERATOR(overrides?: CallOverrides): Promise<BigNumber>;

    acceptProposedRouterOwner(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    addRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    addRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    approveRouter(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    approveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    getProposedRouterOwner(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getProposedRouterOwnerTimestamp(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getRouterApproval(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getRouterApprovalForPortal(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getRouterOwner(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getRouterRecipient(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    initializeRouter(
      _owner: PromiseOrValue<string>,
      _recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    maxRoutersPerTransfer(overrides?: CallOverrides): Promise<BigNumber>;

    proposeRouterOwner(
      _router: PromiseOrValue<string>,
      _proposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    removeRouterLiquidity(
      _canonical: TokenIdStruct,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    removeRouterLiquidityFor(
      _canonical: TokenIdStruct,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    routerBalances(
      _router: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    setLiquidityFeeNumerator(
      _numerator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setMaxRoutersPerTransfer(
      _newMaxRouters: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setRouterRecipient(
      _router: PromiseOrValue<string>,
      _recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    unapproveRouter(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    unapproveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    addSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      minToMint: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    calculateRemoveSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    calculateRemoveSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    calculateSwap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    calculateSwapTokenAmount(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      deposit: PromiseOrValue<boolean>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getSwapA(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getSwapAPrecise(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getSwapAdminBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getSwapLPToken(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getSwapStorage(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getSwapToken(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getSwapTokenBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getSwapTokenIndex(
      key: PromiseOrValue<BytesLike>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getSwapVirtualPrice(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    removeSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      minAmounts: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    removeSwapLiquidityImbalance(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      maxBurnAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    removeSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      minAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    swap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      minDy: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    swapExact(
      key: PromiseOrValue<BytesLike>,
      amountIn: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      minAmountOut: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    swapExactOut(
      key: PromiseOrValue<BytesLike>,
      amountOut: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      maxAmountIn: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    addStableSwapPool(
      _canonical: TokenIdStruct,
      _stableSwapPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    adoptedToCanonical(_adopted: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    "adoptedToLocalExternalPools((uint32,bytes32))"(
      _canonical: TokenIdStruct,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    "adoptedToLocalExternalPools(bytes32)"(
      _key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    "approvedAssets(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    "approvedAssets((uint32,bytes32))"(_canonical: TokenIdStruct, overrides?: CallOverrides): Promise<BigNumber>;

    "canonicalToAdopted(bytes32)"(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    "canonicalToAdopted((uint32,bytes32))"(_canonical: TokenIdStruct, overrides?: CallOverrides): Promise<BigNumber>;

    "canonicalToRepresentation(bytes32)"(
      _key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    "canonicalToRepresentation((uint32,bytes32))"(
      _canonical: TokenIdStruct,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getCustodiedAmount(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    getLocalAndAdoptedToken(
      _id: PromiseOrValue<BytesLike>,
      _domain: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    getTokenId(_candidate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    "removeAssetId((uint32,bytes32),address,address)"(
      _canonical: TokenIdStruct,
      _adoptedAssetId: PromiseOrValue<string>,
      _representation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    "removeAssetId(bytes32,address,address)"(
      _key: PromiseOrValue<BytesLike>,
      _adoptedAssetId: PromiseOrValue<string>,
      _representation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    representationToCanonical(_representation: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    setupAsset(
      _canonical: TokenIdStruct,
      _canonicalDecimals: PromiseOrValue<BigNumberish>,
      _representationName: PromiseOrValue<string>,
      _representationSymbol: PromiseOrValue<string>,
      _adoptedAssetId: PromiseOrValue<string>,
      _stableSwapPool: PromiseOrValue<string>,
      _cap: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setupAssetWithDeployedRepresentation(
      _canonical: TokenIdStruct,
      _representation: PromiseOrValue<string>,
      _adoptedAssetId: PromiseOrValue<string>,
      _stableSwapPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    updateDetails(
      _canonical: TokenIdStruct,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    updateLiquidityCap(
      _canonical: TokenIdStruct,
      _updated: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addSequencer(
      _sequencer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    approvedSequencers(_sequencer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "bumpTransfer(bytes32)"(
      _transferId: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    "bumpTransfer(bytes32,address,uint256)"(
      _transferId: PromiseOrValue<BytesLike>,
      _relayerFeeAsset: PromiseOrValue<string>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    domain(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    enrollRemoteRouter(
      _domain: PromiseOrValue<BigNumberish>,
      _router: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    execute(
      _args: ExecuteArgsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    forceReceiveLocal(
      _params: TransferInfoStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    forceUpdateSlippage(
      _params: TransferInfoStruct,
      _slippage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    nonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    remote(_domain: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeSequencer(
      _sequencer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    routedTransfers(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setXAppConnectionManager(
      _xAppConnectionManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    transferStatus(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    xAppConnectionManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "xcall(uint32,address,address,address,uint256,uint256,bytes)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    "xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes,uint256)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      _relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)"(
      _destination: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      _delegate: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _slippage: PromiseOrValue<BigNumberish>,
      _callData: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    diamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    getAcceptanceTime(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    proposeDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    rescindDiamondCut(
      _diamondCut: IDiamondCut.FacetCutStruct[],
      _init: PromiseOrValue<string>,
      _calldata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    facetAddress(
      _functionSelector: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    facetAddresses(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    facetFunctionSelectors(_facet: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    facets(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    supportsInterface(
      _interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    aavePool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    aavePortalFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAavePortalDebt(_transferId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAavePortalFeeDebt(
      _transferId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    repayAavePortal(
      _params: TransferInfoStruct,
      _backingAmount: PromiseOrValue<BigNumberish>,
      _feeAmount: PromiseOrValue<BigNumberish>,
      _maxIn: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    repayAavePortalFor(
      _params: TransferInfoStruct,
      _portalAsset: PromiseOrValue<string>,
      _backingAmount: PromiseOrValue<BigNumberish>,
      _feeAmount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setAavePool(
      _aavePool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setAavePortalFee(
      _aavePortalFeeNumerator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    acceptProposedOwner(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<PopulatedTransaction>;

    assignRoleAdmin(
      _admin: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    assignRoleRouterAdmin(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    assignRoleWatcher(
      _watcher: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    delay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposeNewOwner(
      newlyProposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    proposeRouterAllowlistRemoval(
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    proposed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposedTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    queryRole(_role: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeRouterAllowlist(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<PopulatedTransaction>;

    revokeRole(
      _revoke: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    routerAllowlistRemoved(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    routerAllowlistTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    unpause(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<PopulatedTransaction>;

    addRelayer(
      _relayer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    approvedRelayers(_relayer: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    relayerFeeVault(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeRelayer(
      _relayer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setRelayerFeeVault(
      _relayerFeeVault: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    LIQUIDITY_FEE_DENOMINATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    LIQUIDITY_FEE_NUMERATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    acceptProposedRouterOwner(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    addRouterLiquidity(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    addRouterLiquidityFor(
      _amount: PromiseOrValue<BigNumberish>,
      _local: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    approveRouter(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    approveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    getProposedRouterOwner(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getProposedRouterOwnerTimestamp(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getRouterApproval(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRouterApprovalForPortal(
      _router: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getRouterOwner(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRouterRecipient(_router: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initializeRouter(
      _owner: PromiseOrValue<string>,
      _recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    maxRoutersPerTransfer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposeRouterOwner(
      _router: PromiseOrValue<string>,
      _proposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    removeRouterLiquidity(
      _canonical: TokenIdStruct,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    removeRouterLiquidityFor(
      _canonical: TokenIdStruct,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    routerBalances(
      _router: PromiseOrValue<string>,
      _asset: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    setLiquidityFeeNumerator(
      _numerator: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setMaxRoutersPerTransfer(
      _newMaxRouters: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setRouterRecipient(
      _router: PromiseOrValue<string>,
      _recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    unapproveRouter(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    unapproveRouterForPortal(
      _router: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    addSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      minToMint: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    calculateRemoveSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    calculateRemoveSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    calculateSwap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    calculateSwapTokenAmount(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      deposit: PromiseOrValue<boolean>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getSwapA(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSwapAPrecise(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSwapAdminBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getSwapLPToken(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSwapStorage(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSwapToken(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getSwapTokenBalance(
      key: PromiseOrValue<BytesLike>,
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getSwapTokenIndex(
      key: PromiseOrValue<BytesLike>,
      tokenAddress: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getSwapVirtualPrice(key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeSwapLiquidity(
      key: PromiseOrValue<BytesLike>,
      amount: PromiseOrValue<BigNumberish>,
      minAmounts: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    removeSwapLiquidityImbalance(
      key: PromiseOrValue<BytesLike>,
      amounts: PromiseOrValue<BigNumberish>[],
      maxBurnAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    removeSwapLiquidityOneToken(
      key: PromiseOrValue<BytesLike>,
      tokenAmount: PromiseOrValue<BigNumberish>,
      tokenIndex: PromiseOrValue<BigNumberish>,
      minAmount: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    swap(
      key: PromiseOrValue<BytesLike>,
      tokenIndexFrom: PromiseOrValue<BigNumberish>,
      tokenIndexTo: PromiseOrValue<BigNumberish>,
      dx: PromiseOrValue<BigNumberish>,
      minDy: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    swapExact(
      key: PromiseOrValue<BytesLike>,
      amountIn: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      minAmountOut: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    swapExactOut(
      key: PromiseOrValue<BytesLike>,
      amountOut: PromiseOrValue<BigNumberish>,
      assetIn: PromiseOrValue<string>,
      assetOut: PromiseOrValue<string>,
      maxAmountIn: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    addStableSwapPool(
      _canonical: TokenIdStruct,
      _stableSwapPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    adoptedToCanonical(_adopted: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "adoptedToLocalExternalPools((uint32,bytes32))"(
      _canonical: TokenIdStruct,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    "adoptedToLocalExternalPools(bytes32)"(
      _key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    "approvedAssets(bytes32)"(
      _key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    "approvedAssets((uint32,bytes32))"(
      _canonical: TokenIdStruct,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    "canonicalToAdopted(bytes32)"(
      _key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    "canonicalToAdopted((uint32,bytes32))"(
      _canonical: TokenIdStruct,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    "canonicalToRepresentation(bytes32)"(
      _key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    "canonicalToRepresentation((uint32,bytes32))"(
      _canonical: TokenIdStruct,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getCustodiedAmount(_key: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLocalAndAdoptedToken(
      _id: PromiseOrValue<BytesLike>,
      _domain: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getTokenId(_candidate: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "removeAssetId((uint32,bytes32),address,address)"(
      _canonical: TokenIdStruct,
      _adoptedAssetId: PromiseOrValue<string>,
      _representation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    "removeAssetId(bytes32,address,address)"(
      _key: PromiseOrValue<BytesLike>,
      _adoptedAssetId: PromiseOrValue<string>,
      _representation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    representationToCanonical(
      _representation: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    setupAsset(
      _canonical: TokenIdStruct,
      _canonicalDecimals: PromiseOrValue<BigNumberish>,
      _representationName: PromiseOrValue<string>,
      _representationSymbol: PromiseOrValue<string>,
      _adoptedAssetId: PromiseOrValue<string>,
      _stableSwapPool: PromiseOrValue<string>,
      _cap: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setupAssetWithDeployedRepresentation(
      _canonical: TokenIdStruct,
      _representation: PromiseOrValue<string>,
      _adoptedAssetId: PromiseOrValue<string>,
      _stableSwapPool: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    updateDetails(
      _canonical: TokenIdStruct,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    updateLiquidityCap(
      _canonical: TokenIdStruct,
      _updated: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;
  };
}
