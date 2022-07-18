import tracer from "dd-trace";

import { execute } from "./sequencer";

export { SequencerConfig, ChainConfig } from "./lib/entities";
export { execute };

tracer.init({ profiling: true, runtimeMetrics: true });
execute();
