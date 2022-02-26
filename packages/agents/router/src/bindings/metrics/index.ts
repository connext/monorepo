import { collectDefaultMetrics } from "prom-client";

import { AppContext } from "../../context";

export const bindMetrics = async (_: AppContext) => {
  // TODO: need to keep last block height? contractReader has done it already.
  // TODO: export transactions with timestamps to Prometheus
  collectDefaultMetrics({ prefix: "router_" });
};
