import tracer from "dd-trace";

import { makePublisher } from "./make";

export { SequencerConfig, ChainConfig } from "./lib/entities";
export { makePublisher };

tracer.init({ profiling: true, runtimeMetrics: true });
makePublisher();
