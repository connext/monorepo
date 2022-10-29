import { constants } from "ethers";
import {
  RequestContext,
  createLoggingContext,
  RelayerApiPostTaskRequestParams,
  ExecuteArgs,
  ajv,
  ExecuteArgsSchema,
} from "@connext/nxtp-utils";
import { getDeployedConnextContract } from "@connext/nxtp-txservice";

import { getContext } from "../../relayer";
import { ChainNotSupported, ContractDeploymentMissing, DecodeExecuteError, ParamsInvalid } from "../errors/tasks";

/**
 * Creates a task based on passed-in params (assuming task doesn't already exist), and returns the taskId.
 * @param chain
 * @param params
 * @param _requestContext
 * @returns
 */
export const createTask = async (
  chain: number,
  params: RelayerApiPostTaskRequestParams,
  _requestContext: RequestContext,
): Promise<string> => {
  const {
    logger,
    adapters: { cache },
    chainToDomainMap,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(createTask.name, _requestContext);

  const { data, fee, to } = params;

  // TODO: Allow alternative shitcoins.
  if (fee.token !== constants.AddressZero) {
    throw new Error("Only ETH is supported for now.");
  }

  if (!chainToDomainMap.has(chain)) {
    throw new ChainNotSupported(chain);
  }

  // TODO: Sanity check: should have enough balance to pay for gas on the specified chain.

  const taskId: string = await cache.tasks.createTask({
    chain,
    to,
    data,
    fee,
  });
  logger.info("Created a new task.", requestContext, methodContext, { taskId });
  return taskId;
};
