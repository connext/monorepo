/* eslint-disable prefer-const */
import { StableSwapAdded } from "../../../generated/Connext/Connext";
import { StableSwap } from "../../../generated/schema";

export function handleStableSwapAdded(event: StableSwapAdded): void {
  // StableSwapAdded: bytes32 canonicalId, uint32 domain, address swapPool, address caller
  let stableSwapId = `${event.params.canonicalId.toHex()}-${event.params.domain.toHex()}-${event.params.swapPool.toHex()}`;
  let stableSwap = StableSwap.load(stableSwapId);

  if (stableSwap == null) {
    stableSwap = new StableSwap(stableSwapId);
    stableSwap.canonicalId = event.params.canonicalId;
    stableSwap.domain = event.params.domain;
    stableSwap.swapPool = event.params.swapPool;
    stableSwap.save();
  }
}
