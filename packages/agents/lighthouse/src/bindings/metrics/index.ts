import { collectDefaultMetrics } from "prom-client";

export const bindMetrics = async () => {
  // TODO: need to keep last block height? contractReader has done it already.
  // TODO: export transactions with timestamps to Prometheus
  collectDefaultMetrics({ prefix: "router_" });
};
