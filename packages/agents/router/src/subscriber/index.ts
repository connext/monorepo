import tracer from "dd-trace";

import { makeSubscriber } from "./subscriber";

tracer.init({ profiling: true, runtimeMetrics: true });
makeSubscriber();
