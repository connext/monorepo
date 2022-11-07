import { makePublisher as _makePublisher, makeSubscriber as _makeSubscriber, setupContext } from "./sequencer";
import { SequencerConfig } from "./lib/entities";

export const makeSubscriber = async (_configOverride?: SequencerConfig) => {
  /// MARK - Context
  await setupContext(_configOverride);

  _makeSubscriber();
};

export const makePublisher = async (_configOverride?: SequencerConfig) => {
  /// MARK - Context
  await setupContext(_configOverride);

  _makePublisher();
};

export const makeSequencer = async (_configOverride?: SequencerConfig) => {
  /// MARK - Context
  await setupContext(_configOverride);

  _makeSubscriber();
  _makePublisher();
};
