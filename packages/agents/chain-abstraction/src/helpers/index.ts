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
import {
  SwapQuoteCallback,
  getSwapQuoteForOneInch,
  getSwapQuoteForUniV2,
  getSwapQuoteForUniV3,
  initCoreSDK as _initCoreSDK,
} from "./swapquote";
import { DEPLOYED_ADDRESSES as _DEPLOYED_ADDRESSES } from "./address";
import {
  getSupportedAssets as _getSupportedAssets,
  getCoingeckoIDs as _getCoingeckoIDs,
  getTokenPricesInUsd as _getTokenPricesInUsd,
} from "./asset";

export const getSupportedAssetsForDomain = _getSupportedAssets;
export const getCoingeckoIDs = _getCoingeckoIDs;
export const getTokenPricesInUsd = _getTokenPricesInUsd;

export const DEPLOYED_ADDRESSES = _DEPLOYED_ADDRESSES;
export const initCoreSDK = _initCoreSDK;

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

export const SwapQuoteFns: Record<Swapper, SwapQuoteCallback> = {
  UniV2: getSwapQuoteForUniV2,
  UniV3: getSwapQuoteForUniV3,
  OneInch: getSwapQuoteForOneInch,
};

export const OriginSwapperPerDomain: Record<string, { type: Swapper; address: string; quoter: string }> = {
  "6648936": {
    type: Swapper.OneInch,
    address: "0x1111111254EEB25477B68fb85Ed929f73A960582", // 1inch AggregationRouterV5
    quoter: "",
  }, // ETH mainnet
  "1869640809": {
    type: Swapper.OneInch,
    address: "0x1111111254EEB25477B68fb85Ed929f73A960582", // 1inch AggregationRouterV5
    quoter: "",
  }, // Optimism
  "6450786": {
    type: Swapper.OneInch,
    address: "0x1111111254EEB25477B68fb85Ed929f73A960582", // 1inch AggregationRouterV5
    quoter: "",
  }, // BNB Chain
  "6778479": {
    type: Swapper.OneInch,
    address: "0x1111111254EEB25477B68fb85Ed929f73A960582", // 1inch AggregationRouterV5
    quoter: "",
  }, // Gnosis Chain
  "1886350457": {
    type: Swapper.OneInch,
    address: "0x1111111254EEB25477B68fb85Ed929f73A960582", // 1inch AggregationRouterV5
    quoter: "",
  }, // Polygon
  "1634886255": {
    type: Swapper.OneInch,
    address: "0x1111111254EEB25477B68fb85Ed929f73A960582", // 1inch AggregationRouterV5
    quoter: "",
  }, // Arbitrum One
  "2053862243": {
    type: Swapper.OneInch,
    address: "",
    quoter: "",
  }, // zkSync2 mainnet
  "1887071085": {
    type: Swapper.OneInch,
    address: "",
    quoter: "",
  }, // Polygon zkEVM
};

export const DestinationSwapperPerDomain: Record<string, { type: Swapper; address: string; quoter: string }> = {
  "6648936": {
    type: Swapper.UniV3,
    address: "",
    quoter: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  }, // ETH mainnet
  "1869640809": {
    type: Swapper.UniV3,
    address: "0x1135Cc96A7E9d8f161BE8B6bDB74F896A9658a08",
    quoter: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  }, // Optimism
  "6450786": {
    type: Swapper.UniV3,
    address: "0x0b081b724CDC4DD9186E64F259b5fC589a4Fd7D0", // PancakeV3 Swapper
    quoter: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  }, // BNB Chain
  "6778479": {
    type: Swapper.UniV2,
    address: "0x7b659eF70e18C01d88F305042ae916D235cb8648",
    quoter: "0x7b659eF70e18C01d88F305042ae916D235cb8648",
  }, // Gnosis Chain
  "1886350457": {
    type: Swapper.UniV3,
    address: "0xeC345E9be52f0Fca8aAd6aec3254Ed86151b060d", // UniV3 Swapper
    quoter: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  }, // Polygon
  "1634886255": {
    type: Swapper.UniV3,
    address: "0x924E679c3c23017aef214c9ea1fBC22e97ff9E2e",
    quoter: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  }, // Arbitrum One
  "2053862243": {
    type: Swapper.UniV3,
    address: "",
    quoter: "",
  }, // zkSync2 mainnet
  "1887071085": {
    type: Swapper.UniV3,
    address: "",
    quoter: "",
  }, // Polygon zkEVM
};
