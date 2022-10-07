/* eslint-disable prefer-const */
import { SequencerAdded, SequencerRemoved } from "../../../generated/Connext/Connext";
import { Sequencer } from "../../../generated/schema";
/// MARK - Sequencers
export function handleSequencerAdded(event: SequencerAdded): void {
  let sequencerId = event.params.sequencer.toHex();
  let sequencer = Sequencer.load(sequencerId);

  if (sequencer == null) {
    sequencer = new Sequencer(sequencerId);
    sequencer.isActive = true;
    sequencer.sequencer = event.params.sequencer;
    sequencer.save();
  }
}

export function handleSequencerRemoved(event: SequencerRemoved): void {
  let sequencerId = event.params.sequencer.toHex();
  let sequencer = Sequencer.load(sequencerId);

  if (sequencer == null) {
    sequencer = new Sequencer(event.params.sequencer.toHex());
    sequencer.isActive = false;
    sequencer.save();
  }
}
