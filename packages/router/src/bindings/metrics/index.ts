// TODO: need to keep last block height? contractReader has done it already.
// TODO: export transactions with timestamps to Prometheus
import { collectDefaultMetrics } from "prom-client";

export const bindMetrics = async () => {
  collectDefaultMetrics({ prefix: "router_" });
};
