import tracer from "dd-trace";

import { makeMessagesPoller } from "./pollers/messagePoller";

tracer.init({ profiling: true, runtimeMetrics: true });
makeMessagesPoller();
