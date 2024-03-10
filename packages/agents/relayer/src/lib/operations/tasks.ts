import { constants } from "ethers";
import {
  RequestContext,
  createLoggingContext,
  RelayerApiPostTaskRequestParams,
  ajv,
  RelayerApiPostTaskRequestParamsSchema,
} from "@connext/nxtp-utils";

import { getContext } from "../../make";
import { ChainNotSupported, ParamsInvalid } from "../errors/tasks";

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
  logger.info("Method start", requestContext, methodContext, { chain, params });

  const { data, fee, to, keeper } = params;

  // Validate execute arguments.
  const validateInput = ajv.compile(RelayerApiPostTaskRequestParamsSchema);
  const validInput = validateInput(params);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      paramsError: msg,
      params,
    });
  }

  if (fee.token !== constants.AddressZero) {
    throw new Error("Only ETH is supported for now.");
  }

  if (!chainToDomainMap.has(chain)) {
    throw new ChainNotSupported(chain);
  }

  const taskId: string = await cache.tasks.createTask({
    chain,
    to,
    data,
    fee,
    keeper: keeper ?? false,
  });
  logger.info("Created a new task.", requestContext, methodContext, { taskId });
  return taskId;
};
