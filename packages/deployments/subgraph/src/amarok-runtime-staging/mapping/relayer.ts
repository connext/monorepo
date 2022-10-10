/* eslint-disable prefer-const */
import { RelayerAdded, RelayerRemoved } from "../../../generated/Connext/Connext";
import { Relayer } from "../../../generated/schema";
/// MARK - Relayers
export function handleRelayerAdded(event: RelayerAdded): void {
  let relayerId = event.params.relayer.toHex();
  let relayer = Relayer.load(relayerId);

  if (relayer == null) {
    relayer = new Relayer(relayerId);
    relayer.isActive = true;
    relayer.relayer = event.params.relayer;
    relayer.save();
  }
}

export function handleRelayerRemoved(event: RelayerRemoved): void {
  let relayerId = event.params.relayer.toHex();
  let relayer = Relayer.load(relayerId);

  if (relayer == null) {
    relayer = new Relayer(event.params.relayer.toHex());
    relayer.isActive = false;
    relayer.save();
  }
}
