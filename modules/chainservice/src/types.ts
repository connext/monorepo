import { Signer, providers, BigNumberish } from "ethers";
import PriorityQueue from "p-queue";

export type MinimalTransaction = {
  chainId: number;
  to: string;
  value: BigNumberish;
  data: string;
  from?: string;
};

// TODO: Move to types
export interface IChainService {}

export type ChainUtils = {
  signer: Signer;
  queue: PriorityQueue;
  provider: providers.JsonRpcProvider;
  confirmationsRequired: number;
};