import { ethers } from "ethers";

import { Action, ResultListenerData } from "../../lib/Action";


export class OnChainTransaction extends Action {
    private tx = ethers.Wallet.createRandom();
  
    public init(): void {
      super.setTerminal(true);
    }
  
    public returnName(): string {
      return "On Chain Tx";
    }
  
    public do() {
      const res: ResultListenerData = { Results: { msg: "Results", data: this.tx } };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      super.emitResult(res);
    }
  }
  