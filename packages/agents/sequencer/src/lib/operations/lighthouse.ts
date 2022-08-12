import { compare } from "compare-versions";
import {
  LightHouseData,
  RequestContext,
  createLoggingContext,
  ajv,
  LightHouseDataSchema,
  LightHouseDataStatus,
} from "@connext/nxtp-utils";
import { getContext } from "../../sequencer";
import { ParamsInvalid, LightHouseVersionInvalid, LightHouseDataExpired, MissingXCall } from "../errors";

export const storeLightHouseData = async (
  lighthouseData: LightHouseData,
  _requestContext: RequestContext,
): Promise<void> => {
  const {
    logger,
    config,
    adapters: { cache, subgraph, mqClient },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(storeLightHouseData.name, _requestContext);
  logger.debug(`Method start: ${storeLightHouseData.name}`, requestContext, methodContext, { lighthouseData });

  const { transferId, relayerFee, encodedData, lighthouseVersion, origin } = lighthouseData;

  // Validate Input schema
  const validateInput = ajv.compile(LightHouseDataSchema);
  const validInput = validateInput(lighthouseData);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      paramsError: msg,
      lighthouseData,
    });
  }

  // check if bid router version is compatible with hosted sequencer
  const checkVersion = compare(lighthouseVersion, config.supportedVersion!, "<");
  if (checkVersion) {
    throw new LightHouseVersionInvalid({
      supportedVersion: config.supportedVersion,
      lighthouseData,
    });
  }

  // Ensure that the auction for this transfer hasn't expired.
  const status = await cache.lighthousetxs.getLightHouseDataStatus(transferId);
  if (status !== LightHouseDataStatus.None && status !== LightHouseDataStatus.Cancelled) {
    throw new LightHouseDataExpired(status, {
      transferId,
      lighthouseData,
    });
  }

  // Check to see if we have the XCall data saved locally for this.
  let transfer = await cache.transfers.getTransfer(transferId);
  if (!transfer || !transfer.origin) {
    // Get the XCall from the subgraph for this transfer.
    transfer = await subgraph.getOriginTransferById(origin, transferId);
    if (!transfer || !transfer.origin) {
      throw new MissingXCall(origin, transferId, {
        lighthouseData,
      });
    }
    // Store the transfer locally. We will use this as a reference later when we execute this transfer
    // in the auction cycle, for both encoding data and passing relayer fee to the relayer.
    await cache.transfers.storeTransfers([transfer]);
  }
};
