import { NxtpError } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

export class NotEnoughLiquidity extends NxtpError {
  cancellable = true;
  constructor(chainId: number, context: any = {}) {
    super(`Not enough liquidity for chainId ${chainId}`, context, "NotEnoughLiquidity");
  }
}

export class ZeroValueBid extends NxtpError {
  constructor(context: any = {}) {
    super("Amount for request was invalid: it must be greater than 0", context, "ZeroAmountRequest");
  }
}

export class AuctionExpired extends NxtpError {
  constructor(expiry: number, context: any = {}) {
    super(`Auction is past (or too close to) expiry: ${expiry}`, context, "AuctionExpired");
  }
}

export class ProvidersNotAvailable extends NxtpError {
  constructor(chainIds: number[], context: any = {}) {
    super(`Providers not available for chainIds ${chainIds.join(",")}`, context, "ProvidersNotAvailable");
  }
}

export class SwapInvalid extends NxtpError {
  constructor(
    sendingChainId: number,
    sendingAssetId: string,
    receivingChainId: number,
    receivingAssetId: string,
    context: any = {},
  ) {
    super(
      `${sendingChainId},${sendingAssetId}->${receivingChainId},${receivingAssetId} swap not allowed`,
      { ...context, sendingChainId, sendingAssetId, receivingChainId, receivingAssetId },
      "SwapInvalid",
    );
  }
}

export class NotEnoughGas extends NxtpError {
  constructor(
    sendingChainId: number,
    sendingGas: BigNumber,
    receivingChainId: number,
    receivingGas: BigNumber,
    context: any = {},
  ) {
    super(
      `Not enough gas on sending or receiving chains: ${sendingChainId} - ${sendingGas.toString()}, ${receivingChainId} - ${receivingGas.toString()}`,
      { ...context, sendingChainId, sendingGas, receivingChainId, receivingGas },
      "NotEnoughGas",
    );
  }
}
