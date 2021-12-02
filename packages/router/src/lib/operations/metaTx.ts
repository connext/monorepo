import {
  ajv,
  createLoggingContext,
  InvariantTransactionData,
  InvariantTransactionDataSchema,
  RequestContext,
} from "@connext/nxtp-utils";
import { providers, BigNumber, utils } from "ethers";

import { getContext } from "../../router";
import { FulfillInput, FulfillInputSchema, MetaTxInput, MetaTxInputSchema } from "../entities";
import { NoChainConfig, ParamsInvalid, NotEnoughRelayerFee } from "../errors";
import { NotAllowedFulfillRelay } from "../errors/fulfill";
import { calculateGasFeeInReceivingTokenForFulfill } from "../helpers/shared";

export const metaTx = async (
  input: MetaTxInput,
  _requestContext: RequestContext<string>,
): Promise<providers.TransactionReceipt | undefined> => {
  const { requestContext, methodContext } = createLoggingContext(metaTx.name, _requestContext);

  const { logger, contractWriter, config, chainData, txService, wallet } = getContext();
  logger.debug("Method start", requestContext, methodContext, { input });

  // Validate Input schema
  const validateInput = ajv.compile(MetaTxInputSchema);
  const validInput = validateInput(input);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      methodContext,
      requestContext,
      paramsError: msg,
    });
  }

  const { chainId, to, data, value } = input;

  if (!config.chainConfig[chainId]) {
    throw new NoChainConfig(chainId, { methodContext, requestContext, input });
  }

  // check for relayer fee, check sig
  // TODO:
  const receipt = await txService.sendTx(input, requestContext);

  logger.info("Method complete", requestContext, methodContext, { transactionHash: receipt.transactionHash });
  return receipt;
};
