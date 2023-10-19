import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";
import { utils } from "ethers";

import { getContext } from "../propagate";
import { ExtraPropagateParam } from "../operations/propagate";

// example at https://github.com/OffchainLabs/arbitrum-tutorials/blob/master/packages/greeter/scripts/exec.js
export const getPropagateParams = async (
  l2domain: string,
  l2ChainId: number,
  l1ChainId: number,
  _requestContext: RequestContext,
): Promise<ExtraPropagateParam> => {
  const { logger } = getContext();
  const { methodContext, requestContext } = createLoggingContext(getPropagateParams.name, _requestContext);
  logger.info("Getting propagate params for Linea", requestContext, methodContext, {
    l2domain,
    l1ChainId,
    l2ChainId,
  });

  // the additional optional "postman" fee = 0 currently
  const _fee = utils.parseEther("0").toString();

  return { _connector: "", _fee, _encodedData: "0x" };
};
