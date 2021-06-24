import { Web3Provider } from "@ethersproject/providers";
import { BigNumberish } from "ethers";

export type PrepareParamType = {
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
  blockNumber: string;
  callData?: string;
};
