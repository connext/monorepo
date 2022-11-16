import tracer from "dd-trace";

import { makePublisher, makeSubscriber, makeSequencer } from "./make";

export { SequencerConfig, ChainConfig } from "./lib/entities";
export { makePublisher, makeSubscriber, makeSequencer };

tracer.init({ profiling: true, runtimeMetrics: true });
makeSequencer();
