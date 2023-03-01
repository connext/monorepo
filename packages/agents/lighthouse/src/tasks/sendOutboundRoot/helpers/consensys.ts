import { utils } from "ethers";

import { ExtraSendOutboundRootParam } from "../operations/sendOutboundRoot";

export const getSendOutboundRootParams = async (_l2domain: string): Promise<ExtraSendOutboundRootParam> => {
  const _fee = utils.parseEther("0.01").toString();

  return { _fee, _encodedData: "0x" };
};
