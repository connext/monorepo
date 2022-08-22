import tracer from "dd-trace";

import { makeExecutor } from "./executor";

tracer.init({ profiling: true, runtimeMetrics: true });
makeExecutor();
