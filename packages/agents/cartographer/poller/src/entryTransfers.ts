import tracer from "dd-trace";

import { makeTransfersPoller } from "./pollers/transfersPoller";

tracer.init({ profiling: true, runtimeMetrics: true });
makeTransfersPoller();
