import { ExtraPropagateParams } from "../operations/propagate";

export const getPropagateParams = async (
  l2domain: string,
  l2ChainId: number,
  l1ChainId: number,
  _requestContext: RequestContext,
): Promise<ExtraPropagateParams> => {
  throw new Error("Started!!!");
};
