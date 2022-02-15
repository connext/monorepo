import { AppContext } from "../../context";

export class Auctioneer {
  constructor(private readonly context: AppContext) {
    if (this.context.adapters.auctioneer) {
      throw new Error("Instance already exists.");
    }
  }

  async sendBid() {
    throw new Error("Not implemented");
  }
}
