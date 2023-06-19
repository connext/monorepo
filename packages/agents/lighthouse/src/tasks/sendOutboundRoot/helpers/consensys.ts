import { utils } from "ethers";

import { ExtraSendOutboundRootParam } from "../operations/sendOutboundRoot";

export const getSendOutboundRootParams = async (_l2domain: string): Promise<ExtraSendOutboundRootParam> => {
  // the mandatory L2->L1 anti-DDoS (or service) fee, currently fixed at 0.001
  // the additional optional "postman" fee = 0 currently
  const _fee = utils.parseEther("0.001").toString();

  return { _fee, _encodedData: "0x" };
};
