import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "ethers/lib/utils";

// The min percentage to bump gas.
export const GAS_BUMP_PERCENT = 20;
// 1M gas should cover all Connext txs. Gas won't exceed this amount.
export const BIG_GAS_LIMIT = BigNumber.from(2_000_000);
// nothing should ever be this expensive... _should_
export const BIG_GAS_PRICE = parseUnits("1500", "gwei");

export class txService extends iTxService {
    private signer: Signer; // TODO does this need to be mapped to chainId?
    private subgraph: Subgraph;
    private log: BaseLogger,
    private config: Config // Should contain rpcs + required confs

    
}