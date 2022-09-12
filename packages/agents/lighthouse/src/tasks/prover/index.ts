import tracer from "dd-trace";

import { makeProver } from "./prover";

tracer.init({ profiling: true, runtimeMetrics: true });
makeProver();
