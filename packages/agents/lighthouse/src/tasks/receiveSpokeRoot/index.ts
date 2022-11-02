import tracer from "dd-trace";

import { makeReceiveSpokeRoot } from "./receiveSpokeRoot";

tracer.init({ profiling: true, runtimeMetrics: true });
makeReceiveSpokeRoot();
