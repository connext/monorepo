import tracer from "dd-trace";

import { makeProver } from "./prover";
import { makePropagate } from "./propagate";
import { makeProcessFromRoot } from "./processFromRoot";

tracer.init();

export const makeLighthouse = async () => {
  switch (process.env.LIGHTHOUSE_SERVICE) {
    case "prover":
      await makeProver();
      break;
    case "propagate":
      await makePropagate();
      break;
    case "processFromRoot":
      await makeProcessFromRoot();
      break;
  }
};
