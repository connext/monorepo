import tracer from "dd-trace";

import { makeRoutersPoller } from "./routersPoller";

tracer.init({ profiling: true, runtimeMetrics: true });
makeRoutersPoller();
