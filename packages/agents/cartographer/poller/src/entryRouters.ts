import tracer from "dd-trace";

import { makeRoutersPoller } from "./pollers/routersPoller";

tracer.init({ profiling: true, runtimeMetrics: true });
makeRoutersPoller();
