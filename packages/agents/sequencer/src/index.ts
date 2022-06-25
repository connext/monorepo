import tracer from "dd-trace";

import { makeSequencer } from "./sequencer";

export { SequencerConfig, ChainConfig } from "./lib/entities";
export { makeSequencer };

tracer.init({ profiling: true, runtimeMetrics: true });
makeSequencer();
