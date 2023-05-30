import { getChainData } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { getConfig } from "../config";

import { makeProverPublisher, makeProverSubscriber } from "./prover";
import { makePropagate } from "./propagate";
import { makeProcessFromRoot } from "./processFromRoot";
import { makeSendOutboundRoot } from "./sendOutboundRoot";

export const makeLighthouse = async () => {
  const chainData = await getChainData();
  if (!chainData) {
    throw new Error("Could not get chain data");
  }
  const config = await getConfig(chainData, contractDeployments);
  switch (process.env.LIGHTHOUSE_SERVICE) {
    case "prover-pub":
      await makeProverPublisher(config, chainData);
      break;
    case "prover-sub":
      await makeProverSubscriber(config, chainData);
      break;
    case "propagate":
      await makePropagate(config, chainData);
      break;
    case "process":
      await makeProcessFromRoot(config, chainData);
      break;
    case "sendoutboundroot":
      await makeSendOutboundRoot(config, chainData);
      break;
  }
};
