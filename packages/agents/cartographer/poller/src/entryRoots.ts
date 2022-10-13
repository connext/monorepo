import tracer from "dd-trace";

import { makeRootsPoller } from "./pollers/rootsPoller";

tracer.init({ profiling: true, runtimeMetrics: true });
makeRootsPoller();
