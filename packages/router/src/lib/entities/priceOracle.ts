import { InvariantTransactionData } from "@connext/nxtp-utils";

export type PriceOracle = {
  calculateRouterPrepareFee: (input: InvariantTransactionData) => Promise<string>;
  calculateRouterFulfillFee: (input: InvariantTransactionData) => Promise<string>;
};
