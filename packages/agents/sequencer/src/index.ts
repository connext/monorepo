import tracer from "dd-trace";

import { makePublisher, makeSubscriber } from "./sequencer";

export { SequencerConfig, ChainConfig } from "./lib/entities";
export { makePublisher, makeSubscriber };

tracer.init({ profiling: true, runtimeMetrics: true });
makeSubscriber();
makePublisher();
