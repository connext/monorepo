import { BigNumber } from "@ethersproject/bignumber";
import { Signer } from "@ethersproject/abstract-signer";
import { Wallet } from "@ethersproject/wallet";
import { Contract } from "@ethersproject/contracts";
import { parseUnits } from "ethers/lib/utils";
import { BaseLogger } from "pino";
import PriorityQueue from "p-queue";

// The min percentage to bump gas.
export const GAS_BUMP_PERCENT = 20;
// 1M gas should cover all Connext txs. Gas won't exceed this amount.
export const BIG_GAS_LIMIT = BigNumber.from(2_000_000);
// nothing should ever be this expensive... _should_
export const BIG_GAS_PRICE = parseUnits("1500", "gwei");

interface ITxService {

}

export class TxService implements ITxService {
  private signers: Map<number, Signer>;
  private queues: Map<number, PriorityQueue> = new Map();
  private subgraph: Subgraph;
  private log: BaseLogger,
  private config: Config // Should contain rpcs + required confs

  // TODO: Add an object/dictionary statically to the class (to the prototype)
  // mapping the signer to whether there is an instance using that signer.
  // This will prevent two queue instances using the same signer and therefore colliding.

  constructor(
    chainProviders: { [chainId: string]: JsonRpcProvider },
    log: BaseLogger,
    signer: string | Signer,
  ) {
    super(chainProviders, log);
    Object.entries(chainProviders).forEach(([chainId, provider]) => {
      this.signers.set(
        parseInt(chainId),
        typeof signer === "string" ? new Wallet(signer, provider) : (signer.connect(provider) as Signer),
      );
      this.queues.set(parseInt(chainId), new PriorityQueue({ concurrency: 1 }));
    });
  }

}