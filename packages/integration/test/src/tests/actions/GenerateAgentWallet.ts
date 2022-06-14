import { ethers } from "ethers";

import { Action, ResultListenerData } from "../../lib/Action";

export class GenerateAgentWallet extends Action {
  public init(): void {
    super.setTerminal(true);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    super.registerResultListener(this.successCallback);
  }

  private successCallback(data: ResultListenerData) {
    console.log("successcb", data);
  }

  public returnName(): string {
    return "On Chain Tx";
  }

  public do() {
    const w = ethers.Wallet.createRandom();
    const res: ResultListenerData = { Results: { msg: "Results", data: { wallet: w.address } } };
    super.emitResult(res);
    super.deregister();
  }
}
