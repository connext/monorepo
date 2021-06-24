import { Web3Provider } from "@ethersproject/providers";
import { BigNumber, BigNumberish } from "ethers";

export type PrepareParamType = {
  userWebProvider: Web3Provider;
  routerAddress: string;
  sendingChainId: number;
  receivingChainId: number;
  sendingAssetId: string;
  receivingAssetId: string;
  receivingAddress: string;
  amount: BigNumberish;
  expiry: string;
  callData?: string;
};

export type listenRouterPrepareParamType = {
  userWebProvider: Web3Provider;
  receivingChainId: number;
  relayerFee: BigNumberish;
};

export type listenRouterFulfillParamType = {
  receivingChainId: number;
};

export type CrossChainParamType = {
  userWebProvider: Web3Provider;
  routerAddress: string;
  sendingChainId: number;
  receivingChainId: number;
  sendingAssetId: string;
  receivingAssetId: string;
  sendingRpcProvider: URL;
  receivingRpcProvider: URL;
  receivingAddress: string;
  amount: BigNumberish;
  expiry: string;
  callData?: string;
};
