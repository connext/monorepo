import { BigNumberish } from "@ethersproject/bignumber";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Signer } from "@ethersproject/abstract-signer";
import PriorityQueue from "p-queue";

import { Address, HexString } from "./basic";

export type MinimalTransaction = {
  to: Address;
  value: BigNumberish;
  data: HexString;
};

export type ChainUtils = {
  signer: Signer;
  queue: PriorityQueue;
  provider: JsonRpcProvider;
  confirmationsRequired: number;
};
