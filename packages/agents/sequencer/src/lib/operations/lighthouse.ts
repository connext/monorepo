import { compare } from "compare-versions";
import {
  LightHouseData,
  RequestContext,
  createLoggingContext,
  ajv,
  LightHouseDataSchema,
  LightHouseDataStatus,
  getChainIdFromDomain,
} from "@connext/nxtp-utils";
import { getContext } from "../../sequencer";
import {
  ParamsInvalid,
  LightHouseVersionInvalid,
  LightHouseDataExpired,
  MissingXCall,
  InvalidSlowLiqTransfer,
  GasEstimationFailed,
  MissingTransfer,
  MissingLightHouseData,
} from "../errors";
import { getHelpers } from "../helpers";
import { Message, MessageType } from "../entities";
import { getOperations } from ".";

export const storeLightHouseData = async (
  lighthouseData: LightHouseData,
  _requestContext: RequestContext,
): Promise<void> => {
  const {
    logger,
    config,
    chainData,
    adapters: { cache, subgraph, mqClient, chainreader },
  } = getContext();
  const {
    relayer: { getGelatoRelayerAddress },
  } = getHelpers();
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

  // Ensure that the lighthouse data for this transfer hasn't expired.
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
    // in the cycle, for both encoding data and passing relayer fee to the relayer.
    await cache.transfers.storeTransfers([transfer]);
  }

  if (!transfer.destination?.reconcile || transfer.destination?.execute) {
    // This transfer has already been Executed or not Reconciled yet, so slow liquidity is no longer valid.
    throw new InvalidSlowLiqTransfer({
      transferId,
      lighthouseData,
    });
  }

  // Lighthouse data needs to be transferred to relayer directly
  // so we need to estimate tx here to make sure it will not revert
  try {
    const destinationDomain = transfer.xparams.destinationDomain;
    const destinationChainId = await getChainIdFromDomain(destinationDomain, chainData);
    const relayerAddress = await getGelatoRelayerAddress(destinationChainId);
    const destinationConnextAddress = config.chains[destinationDomain].deployments.connext;

    const gas = await chainreader.getGasEstimateWithRevertCode(Number(destinationDomain), {
      chainId: destinationChainId,
      to: destinationConnextAddress,
      data: encodedData,
      from: relayerAddress,
    });

    logger.info("Estimating a tx success!", requestContext, methodContext, {
      relayer: relayerAddress,
      connext: destinationConnextAddress,
      domain: destinationDomain,
      gas: gas.toString(),
      relayerFee,
      transferId: transferId,
    });
  } catch (error: unknown) {
    throw new GasEstimationFailed({ transferId, lighthouseData });
  }

  // Create the lighthouse tx in the cache if necessary.
  await cache.lighthousetxs.setLightHouseDataStatus(transferId, LightHouseDataStatus.Pending);
  await cache.lighthousetxs.storeLightHouseData(lighthouseData);
  logger.info("Created a lighthouse tx", requestContext, methodContext, { transferId, lighthouseData });

  const message: Message = {
    transferId: transfer.transferId,
    originDomain: transfer.xparams!.originDomain,
    type: MessageType.SlowPath,
  };

  await mqClient.publish(config.messageQueue.publisher!, {
    type: transfer.xparams!.originDomain,
    body: message,
    routingKey: transfer.xparams!.originDomain,
    persistent: true,
  });
  logger.info("Enqueued transfer", requestContext, methodContext, {
    message: message,
  });
};

/**
 * Send any slow-path data from the lighthouse to the relayer directly once sanity checks passes
 * @param transferId - The transfer id you're gonna send
 * @param _requestContext - The parant request context instance
 */
export const executeSlowPathData = async (
  transferId: string,
  type: string,
  _requestContext: RequestContext,
): Promise<void> => {
  const {
    logger,
    adapters: { cache },
  } = getContext();

  const {
    relayer: { sendExecuteSlowToRelayer },
  } = getOperations();

  const { requestContext, methodContext } = createLoggingContext(storeLightHouseData.name, _requestContext);
  logger.debug(`Method start: ${executeSlowPathData.name}`, requestContext, methodContext, { transferId, type });

  let transfer = await cache.transfers.getTransfer(transferId);
  if (!transfer) {
    throw new MissingTransfer({ transferId });
  }

  if (!transfer.destination?.reconcile || transfer.destination?.execute) {
    // This transfer has already been Executed or not Reconciled yet, so slow liquidity is no longer valid.
    throw new InvalidSlowLiqTransfer({
      transfer,
    });
  }

  let lighthouseData = await cache.lighthousetxs.getLightHouseData(transferId);
  if (!lighthouseData) {
    throw new MissingLightHouseData({ transfer });
  }

  // Ensure that the lighthouse data for this transfer hasn't expired.
  const status = await cache.lighthousetxs.getLightHouseDataStatus(transferId);
  if (status !== LightHouseDataStatus.None && status !== LightHouseDataStatus.Cancelled) {
    throw new LightHouseDataExpired(status, {
      transferId,
      lighthouseData,
    });
  }

  const taskId = await sendExecuteSlowToRelayer(lighthouseData, requestContext);
  if (!taskId) {
    await cache.lighthousetxs.setLightHouseDataStatus(transferId, LightHouseDataStatus.Pending);
    await cache.lighthousetxs.upsertTask({ transferId, taskId });
  }
};
