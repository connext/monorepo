import tracer from "dd-trace";

import { makeProcessFromRoot } from "./processFromRoot";

tracer.init({ profiling: true, runtimeMetrics: true });
makeProcessFromRoot();
