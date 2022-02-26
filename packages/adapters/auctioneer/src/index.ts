import axios, { AxiosResponse } from "axios";
import { SignedBid } from "@connext/nxtp-utils";

import { AuctioneerAPIConfig } from "./lib/entities";

export class AuctioneerAPI {
  constructor(private readonly config: AuctioneerAPIConfig) {}

  /**
   * Send a bid to the auctioneer for the given transaction.
   * @param bid - Bid and signature.
   */
  public async sendBid(bid: SignedBid): Promise<AxiosResponse> {
    return await axios.post(this.config.url, bid);
  }

  public async getAuctionCycleTime(): Promise<number> {
    // TODO: Should be cached locally, this value will reflect the period for which a
    // transaction's auction will last, i.e. 30s.
    throw new Error("Not implemented");
  }
}
