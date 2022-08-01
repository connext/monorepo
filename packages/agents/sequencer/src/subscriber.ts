import tracer from "dd-trace";

import { makeSubscriber } from "./sequencer";

export { SequencerConfig, ChainConfig } from "./lib/entities";
export { makeSubscriber };

tracer.init({ profiling: true, runtimeMetrics: true });
makeSubscriber();
