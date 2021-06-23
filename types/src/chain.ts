import { BigNumberish } from "@ethersproject/bignumber";

import { Address, HexString } from "./basic";

export type MinimalTransaction = {
  to: Address;
  value: BigNumberish;
  data: HexString;
};
