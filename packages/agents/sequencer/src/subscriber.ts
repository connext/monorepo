import tracer from "dd-trace";

import { makeSubscriber } from "./make";

export { SequencerConfig, ChainConfig } from "./lib/entities";
export { makeSubscriber };

tracer.init({ profiling: true, runtimeMetrics: true });
makeSubscriber();
