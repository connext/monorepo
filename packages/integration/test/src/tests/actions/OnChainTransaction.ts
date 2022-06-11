import { ethers } from "ethers";

import { Action, ResultListenerData } from "../../lib/Action";

export class GenerateWallet extends Action {
  public init(): void {
    super.setTerminal(true);
  }

  public returnName(): string {
    return "On Chain Tx";
  }

  public do() {
    const tx = ethers.Wallet.createRandom();

    const res: ResultListenerData = { Results: { msg: "Results", data: { tx } } };
    console.log("tx", tx);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super.emitResult(res);
  }
}
