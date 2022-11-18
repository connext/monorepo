import { makePublisher as _makePublisher, makeSubscriber as _makeSubscriber, setupContext } from "./sequencer";
import { SequencerConfig } from "./lib/entities";

export const makeSubscriber = async (_configOverride?: SequencerConfig) => {
  /// MARK - Context
  try {
    await setupContext(_configOverride);

    await _makeSubscriber();
  } catch (err: unknown) {
    console.error("Error starting sequencer :(", err);
    process.exit(1);
  }
};

export const makePublisher = async (_configOverride?: SequencerConfig) => {
  /// MARK - Context
  try {
    await setupContext(_configOverride);

    await _makePublisher();
  } catch (err: unknown) {
    console.error("Error starting sequencer :(", err);
    process.exit(1);
  }
};

export const makeSequencer = async (_configOverride?: SequencerConfig) => {
  try {
    /// MARK - Context
    await setupContext(_configOverride);

    await _makeSubscriber();
    await _makePublisher();
  } catch (err: unknown) {
    console.error("Error starting sequencer :(", err);
    process.exit(1);
  }
};
