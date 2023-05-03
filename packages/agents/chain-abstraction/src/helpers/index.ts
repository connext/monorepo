export * from "./abis";
import { Swapper } from "../types";

import {
  // Origin
  OriginSwapDataCallback,
  getOriginSwapDataForUniV2,
  getOriginSwapDataForUniV3,
  getOriginSwapDataForOneInch,

  // Destination
  DestinationSwapDataCallback,
  getDestinationSwapDataForUniV2,
  getDestinationSwapDataForUniV3,
  getDestinationSwapDataForOneInch,
} from "./swapdata";

export const OriginSwapDataFns: Record<Swapper, OriginSwapDataCallback> = {
  UniV2: getOriginSwapDataForUniV2,
  UniV3: getOriginSwapDataForUniV3,
  OneInch: getOriginSwapDataForOneInch,
};

export const DestinationSwapDataFns: Record<Swapper, DestinationSwapDataCallback> = {
  UniV2: getDestinationSwapDataForUniV2,
  UniV3: getDestinationSwapDataForUniV3,
  OneInch: getDestinationSwapDataForOneInch,
};

export const OriginSwapperPerDomain: Record<string, { type: Swapper; address: string }> = {
  "6648936": {
    type: Swapper.OneInch,
    address: "",
  }, // ETH mainnet
  "1869640809": {
    type: Swapper.OneInch,
    address: "",
  }, // Optimism
  "6450786": {
    type: Swapper.OneInch,
    address: "0x1111111254EEB25477B68fb85Ed929f73A960582", // 1inch AggregationRouterV5
  }, // BNB Chain
  "6778479": {
    type: Swapper.OneInch,
    address: "",
  }, // Gnosis Chain
  "1886350457": {
    type: Swapper.OneInch,
    address: "0x1111111254EEB25477B68fb85Ed929f73A960582", // 1inch AggregationRouterV5
  }, // Polygon
  "1634886255": {
    type: Swapper.OneInch,
    address: "",
  }, // Arbitrum One
  "2053862243": {
    type: Swapper.OneInch,
    address: "",
  }, // zkSync2 mainnet
  "1887071085": {
    type: Swapper.OneInch,
    address: "",
  }, // Polygon zkEVM
};

export const DestinationSwapperPerDomain: Record<string, { type: Swapper; address: string }> = {
  "6648936": {
    type: Swapper.UniV3,
    address: "",
  }, // ETH mainnet
  "1869640809": {
    type: Swapper.UniV3,
    address: "",
  }, // Optimism
  "6450786": {
    type: Swapper.UniV3,
    address: "0x73D53460fc1ead8Eb4A7771Bc5023159E8730E68", // UniV3 Swapper
  }, // BNB Chain
  "6778479": {
    type: Swapper.UniV3,
    address: "",
  }, // Gnosis Chain
  "1886350457": {
    type: Swapper.UniV3,
    address: "0xd92fd008bb2a1B74C9De29B7a68d9822Cc8c9868", // UniV3 Swapper
  }, // Polygon
  "1634886255": {
    type: Swapper.UniV3,
    address: "",
  }, // Arbitrum One
  "2053862243": {
    type: Swapper.UniV3,
    address: "",
  }, // zkSync2 mainnet
  "1887071085": {
    type: Swapper.UniV3,
    address: "",
  }, // Polygon zkEVM
};
