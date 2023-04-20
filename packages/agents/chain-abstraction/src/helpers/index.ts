export * from "./abis";
import { Swapper } from "../types";

import { SwapDataCallback, getSwapDataForOneInch } from "./swapdata";

export const SwapperMapping: Record<string, { type: Swapper; address: string; swapDataCallback: SwapDataCallback }> = {
  "6648936": {
    type: Swapper.OneInch,
    address: "",
    swapDataCallback: getSwapDataForOneInch,
  }, // ETH mainnet
  "1869640809": {
    type: Swapper.OneInch,
    address: "",
    swapDataCallback: getSwapDataForOneInch,
  }, // Optimism
  "6450786": {
    type: Swapper.OneInch,
    address: "",
    swapDataCallback: getSwapDataForOneInch,
  }, // BNB Chain
  "6778479": {
    type: Swapper.OneInch,
    address: "",
    swapDataCallback: getSwapDataForOneInch,
  }, // Gnosis Chain
  "1886350457": {
    type: Swapper.OneInch,
    address: "",
    swapDataCallback: getSwapDataForOneInch,
  }, // Polygon
  "1634886255": {
    type: Swapper.OneInch,
    address: "",
    swapDataCallback: getSwapDataForOneInch,
  }, // Arbitrum One
  "2053862243": {
    type: Swapper.OneInch,
    address: "",
    swapDataCallback: getSwapDataForOneInch,
  }, // zkSync2 mainnet
  "1887071085": {
    type: Swapper.OneInch,
    address: "",
    swapDataCallback: getSwapDataForOneInch,
  }, // Polygon zkEVM
};
