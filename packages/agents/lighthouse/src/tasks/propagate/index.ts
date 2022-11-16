import tracer from "dd-trace";

import { makePropagate } from "./propagate";

tracer.init({ profiling: true, runtimeMetrics: true });
makePropagate();
