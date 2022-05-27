import {
  Bid,
  createLoggingContext,
  DEFAULT_ROUTER_FEE,
  ajv,
  XTransferSchema,
  OriginTransfer,
} from "@connext/nxtp-utils";

import { MissingXCall, NomadHomeBlacklisted, NotEnoughAmount, ParamsInvalid } from "../errors";
import { getHelpers } from "../helpers";
import { getContext } from "../../router";

import { NomadContext } from "@nomad-xyz/sdk";
import { BridgeContext } from "@nomad-xyz/sdk-bridge";

// fee percentage paid to relayer. need to be updated later
export const RELAYER_FEE_PERCENTAGE = "1"; //  1%
//helper function to match our config environments with nomads
const nxtpEnvToNomadEnv = (envOverride?: string): string => {
  const nxtpConfig = envOverride ? envOverride : getContext().config.environment;
  switch (nxtpConfig) {
    case "production":
      return "production";
    case "staging":
      //is this possibly development?
      return "staging";
    default:
      return "staging";
  }
};
const env_type = nxtpEnvToNomadEnv();

/**
 * Router creates a new bid and sends it to auctioneer.
 *
 * @param params - The crosschain xcall params.
 */
export const execute = async (params: OriginTransfer): Promise<void> => {
  const { requestContext, methodContext } = createLoggingContext(execute.name);

  const {
    logger,
    adapters: { wallet, subgraph, txservice },
    routerAddress,
  } = getContext();
  const {
    auctions: { sendBid },
    shared: { getDestinationLocalAsset, signRouterPathPayload },
  } = getHelpers();

  logger.debug("Method start", requestContext, methodContext, { params });

  // Validate Input schema
  const validateInput = ajv.compile(XTransferSchema);
  const validInput = validateInput(params);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new ParamsInvalid({
      paramsError: msg,
      params,
    });
  }

  const {
    originDomain,
    destinationDomain,
    origin,
    transferId,
    xparams: { callData, to, forceSlow },
  } = params;

  if (forceSlow) {
    logger.debug("Opt for slow path", requestContext, methodContext, { transferId });
    return;
  }

  if (!origin) {
    throw new MissingXCall({ requestContext, methodContext });
  }

  const executeLocalAsset = await getDestinationLocalAsset(
    originDomain,
    origin.assets.bridged.asset,
    destinationDomain,
  );
  logger.debug("Got local asset", requestContext, methodContext, { executeLocalAsset });

  const receivingAmount = origin.assets.bridged.amount;

  // TODO: We should make a list of signatures that reflect which auction rounds we want to bid on,
  // based on a calculation of which rounds we can afford to bid on. For now, this is hardcoded to bid
  // only on the first auction round.
  // Produce the router path signatures for each auction round we want to bid on.
  const signatures = {
    "1": await signRouterPathPayload(transferId, "1", wallet),
  };

  logger.debug("Signed payloads", requestContext, methodContext, {
    rounds: Object.keys(signatures),
    // Sanitized with ellipsis.
    sigs: Object.values(signatures).map((s) => s.slice(0, 6) + ".."),
  });

  // sanity check
  const balance = await subgraph.getAssetBalance(destinationDomain, routerAddress, executeLocalAsset);
  if (balance.lt(receivingAmount)) {
    throw new NotEnoughAmount({
      balance: balance.toString(),
      receivingAmount: receivingAmount.toString(),
      executeLocalAsset,
      routerAddress,
      destinationDomain: destinationDomain,
      requestContext,
      methodContext,
    });
  }

  const context = BridgeContext.fromNomadContext(new NomadContext(env_type));
  //todo: look for higher level import of this class
  //push them to blacklist if not there already
  await context.checkHomes([originDomain, destinationDomain]);

  //get blacklist
  const blacklist = context.blacklist();

  //determine if origin or destintion aren't connected to nomad
  const originBlacklisted = blacklist.has(Number(originDomain));
  const destinationBlacklisted = blacklist.has(Number(destinationDomain));

  if (originBlacklisted || destinationBlacklisted) {
    throw new NomadHomeBlacklisted({
      originDomainBlacklisted: originBlacklisted,
      destinationBlacklisted: destinationBlacklisted,
    });
  }

  logger.debug("Sanity checks passed", requestContext, methodContext, { liquidity: balance.toString() });

  const fee = DEFAULT_ROUTER_FEE;
  const bid: Bid = {
    transferId,
    origin: originDomain,
    router: routerAddress.toLowerCase(),
    fee,
    signatures,
  };

  await sendBid(bid, requestContext);
};
