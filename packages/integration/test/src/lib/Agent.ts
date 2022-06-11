import { BigNumber } from "ethers";

enum AgentEvents { 
    BalanceUpdated = "BalanceUpdated",
}

type AgentBalanceUpdatedData = {
    
    [key: string]: { prevBalance: BigNumber, newBalance: BigNumber };
}

type AgentEventDataTypes = AgentBalanceUpdatedData;

type AgentEventData = {
    event: {event:AgentEvents, data: AgentEventDataTypes}
}

export class Agent {
    private mnemonic;
    constructor(mnemonic: string) {
        this.mnemonic = mnemonic;
    }
    
}