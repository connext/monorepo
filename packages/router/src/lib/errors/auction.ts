import { NxtpError } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { SubgraphSyncRecord } from "../entities";

export class NotEnoughAmount extends NxtpError {
  cancellable = true;
  constructor(context: any = {}) {
    super(`Not enough amount for swap`, context, "NotEnoughAmount");
  }
}

export class NotEnoughLiquidity extends NxtpError {
  cancellable = true;
  constructor(chainId: number, context: any = {}) {
    super(`Not enough liquidity for chainId ${chainId}`, context, "NotEnoughLiquidity");
  }
}

export class ZeroValueBid extends NxtpError {
  constructor(context: any = {}) {
    super("Amount for request was invalid: must be integer greater than 0", context, "ZeroAmountRequest");
  }
}

export class AuctionExpired extends NxtpError {
  constructor(expiry: number, context: any = {}) {
    super(`Auction is past (or too close to) expiry: ${expiry}`, context, "AuctionExpired");
  }
}

export class AuctionRateExceeded extends NxtpError {
  constructor(duration: number, context: any = {}) {
    super(`Auction rate exceeded duration: ${duration}`, context, "AuctionRateExceeded");
  }
}

export class ProvidersNotAvailable extends NxtpError {
  constructor(chainIds: number[], context: any = {}) {
    super(`Providers not available for chainIds ${chainIds.join(",")}`, context, ProvidersNotAvailable.name);
  }
}

export class SubgraphNotSynced extends NxtpError {
  static getMessage(chainId: number, record: SubgraphSyncRecord) {
    return `Subgraph on ${chainId} not synced. Synced block: ${record.syncedBlock}, latest: ${record.latestBlock}`;
  }
  constructor(chainId: number, record: SubgraphSyncRecord, context: any = {}) {
    super(SubgraphNotSynced.getMessage(chainId, record), context, SubgraphNotSynced.name);
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
