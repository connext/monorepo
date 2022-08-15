import { ajv, createLoggingContext, ExecuteArgs, ExecuteArgsSchema } from "@connext/nxtp-utils";

import { DomainNotSupported } from "../errors";
import { getOperations } from "../operations";
import { getContext } from "../../lighthouse";

/**
 * Lighthouse creates a new bid and sends it to sequencer.
 *
 * @param args - The crosschain xcall params.
 */
export const execute = async (args: ExecuteArgs, transferId: string): Promise<void> => {
  const { requestContext, methodContext } = createLoggingContext(execute.name, undefined, transferId);
  const {
    logger,
    adapters: { contracts },
    config,
  } = getContext();
  const { sendExecuteFastToSequencer } = getOperations();

  logger.info(`Method start: ${execute.name}`, requestContext, methodContext, { args });

  // Ensure we support the target domain (i.e. it's been configured).
  if (!config.chains[args.params.destinationDomain]) {
    throw new DomainNotSupported(args.params.destinationDomain, transferId, {
      supportedDomains: Object.keys(config.chains),
    });
  }

  // Validate input schema
  const validate = ajv.compile(ExecuteArgsSchema);
  const valid = validate(args);
  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  const encodedData = contracts.connext.encodeFunctionData("execute", [args]);
  await sendExecuteFastToSequencer(args, encodedData, transferId, requestContext);
};
