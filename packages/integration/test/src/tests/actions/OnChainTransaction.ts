import { ethers } from "ethers";

import { Action, ResultListenerData } from "../../lib/Action";

export class GenerateWallet extends Action {
  // eslint-disable-next-line @typescript-eslint/ban-types
  // constructor(listenerCb: Function) {
  //   super(listenerCb);

  //   this.successCallback = this.successCallback.bind(this);

  //   // eslint-disable-next-line @typescript-eslint/unbound-method
  //   super.registerResultListener(this.successCallback);
  // }
  public init(): void {
    super.setTerminal(true);
    this.successCallback = this.successCallback.bind(this);

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
    const res: ResultListenerData = { Results: { msg: "Results", data: { wallet:w } } };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super.emitResult(res);
  }
}
