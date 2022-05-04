import {
  Bid,
  createLoggingContext,
  DEFAULT_ROUTER_FEE,
  ajv,
  XTransferSchema,
  OriginTransfer,
} from "@connext/nxtp-utils";

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
export const execute = async (params: OriginTransfer): Promise<void> => {
  const { requestContext, methodContext } = createLoggingContext(execute.name);

  const {
    logger,
    adapters: { wallet, subgraph },
    routerAddress,
  } = getContext();
  const {
    auctions: { sendBid },
    shared: { getDestinationLocalAsset, signRouterPathPayload, recoverRouterPathPayload },
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

  const { originDomain, destinationDomain, origin, transferId } = params;
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

  const recoveredRouterAddress = recoverRouterPathPayload(transferId, "1", Object.values(signatures)[0]);
  console.log(" > verifying signatures on offchain ====>");
  console.log(recoveredRouterAddress.toLowerCase(), routerAddress.toLowerCase());
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
