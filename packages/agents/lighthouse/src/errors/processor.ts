import { NxtpError } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

export class ArbitrumNodeCreatedEventsNotFound extends NxtpError {
  constructor(startBlock: BigNumber, context: any = {}) {
    super(
      `Could not find any NodeCreated events in range`,
      { startBlock: startBlock.toNumber(), ...context },
      ArbitrumNodeCreatedEventsNotFound.name,
    );
  }
}
