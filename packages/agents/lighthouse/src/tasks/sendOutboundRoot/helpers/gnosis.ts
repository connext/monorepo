import { ExtraSendOutboundRootParam } from "../operations/sendOutboundRoot";

export const getSendOutboundRootParams = async (_l2domain: string): Promise<ExtraSendOutboundRootParam> => {
  // hardcoded value we have been using
  const _encodedData = "0x0000000000000000000000000000000000000000000000000000000002000000";

  return { _fee: "0", _encodedData };
};
