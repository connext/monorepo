import tracer from "dd-trace";

import { makePublisher } from "./publisher";

tracer.init({ profiling: true, runtimeMetrics: true });
makePublisher();
