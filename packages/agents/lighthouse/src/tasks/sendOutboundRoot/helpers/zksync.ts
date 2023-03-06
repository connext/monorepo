import { ExtraSendOutboundRootParam } from "../operations/sendOutboundRoot";

export const getSendOutboundRootParams = async (_l2domain: string): Promise<ExtraSendOutboundRootParam> => {
  return { _fee: "0", _encodedData: "0x" };
};
