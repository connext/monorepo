import { Bid, createLoggingContext, XTransfer, DEFAULT_ROUTER_FEE, ajv, XTransferSchema } from "@connext/nxtp-utils";

import { MissingXCall, NotEnoughAmount, ParamsInvalid } from "../errors";
import { getHelpers } from "../helpers";
import { getContext } from "../../router";

// fee percentage paid to relayer. need to be updated later
export const RELAYER_FEE_PERCENTAGE = "1"; //  1%

/**
 * Router creates a new bid and sends it to auctioneer.
 *
 * @param params - The crosschain xcall params.
 */
export const execute = async (params: XTransfer): Promise<void> => {
  const { requestContext, methodContext } = createLoggingContext(execute.name);

  const {
    logger,
    adapters: { wallet, subgraph },
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

  const { origin, destination, transferId } = params;
  if (!origin.xcall || !origin.assets) {
    throw new MissingXCall({ requestContext, methodContext });
  }

  const executeLocalAsset = await getDestinationLocalAsset(
    origin.domain,
    origin.assets?.bridgedAsset,
    destination.domain,
  );
  logger.debug("Got local asset", requestContext, methodContext, { executeLocalAsset });

  const receivingAmount = origin.assets.bridgedAmount;

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
  const balance = await subgraph.getAssetBalance(destination.domain, routerAddress, executeLocalAsset);
  if (balance.lt(receivingAmount)) {
    throw new NotEnoughAmount({
      balance: balance.toString(),
      receivingAmount: receivingAmount.toString(),
    });
  }
  logger.debug("Sanity checks passed", requestContext, methodContext, { liquidity: balance.toString() });

  const fee = DEFAULT_ROUTER_FEE;
  const bid: Bid = {
    transferId,
    origin: origin.domain,
    router: routerAddress.toLowerCase(),
    fee,
    signatures,
  };

  await sendBid(bid, requestContext);
};
