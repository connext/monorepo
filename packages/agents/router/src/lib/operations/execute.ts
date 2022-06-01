import { Bid, createLoggingContext, ajv, XTransferSchema, OriginTransfer } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { CallDataForNonContract, MissingXCall, NotEnoughAmount, ParamsInvalid } from "../errors";
import { getHelpers } from "../helpers";
import { getContext } from "../../router";
import { getAuctionAmount } from "../helpers/auctions";
// @ts-ignore
import { version } from "../../../package.json";

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
    config,
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

  // Make a list of signatures that reflect which auction rounds we want to bid on.
  const balance = await subgraph.getAssetBalance(destinationDomain, routerAddress, executeLocalAsset);
  const signatures: Record<string, string> = {};
  for (let roundIdx = 1; roundIdx <= config.auctionRoundDepth; roundIdx++) {
    const amountForRound = getAuctionAmount(roundIdx, BigNumber.from(receivingAmount));
    if (amountForRound.lte(balance)) {
      const pathLen = Math.pow(2, roundIdx - 1);
      signatures[roundIdx.toString()] = await signRouterPathPayload(transferId, pathLen.toString(), wallet);
    } else {
      logger.debug(`Not enough balance for this round: ${roundIdx}. Skipping!`, requestContext, methodContext, {
        balance: balance.toString(),
        amountForRound: amountForRound.toString(),
      });
    }
  }

  if ([...Object.keys(signatures)].length == 0) {
    throw new NotEnoughAmount({
      balance: balance.toString(),
      receivingAmount: receivingAmount.toString(),
      executeLocalAsset,
      routerAddress,
      destinationDomain: destinationDomain,
      maxRoundDepth: config.auctionRoundDepth,
      requestContext,
      methodContext,
    });
  }

  logger.debug("Signed payloads", requestContext, methodContext, {
    rounds: Object.keys(signatures),
    // Sanitized with ellipsis.
    sigs: Object.values(signatures).map((s) => s.slice(0, 6) + ".."),
  });

  if (callData !== "0x") {
    const code = await txservice.getCode(+destinationDomain, to);
    if (code === "0x") {
      throw new CallDataForNonContract({ transferId, destinationDomain, to, callData, requestContext, methodContext });
    }
  }

  logger.debug("Sanity checks passed", requestContext, methodContext, { liquidity: balance.toString() });

  const bid: Bid = {
    routerVersion: version,
    transferId,
    origin: originDomain,
    router: routerAddress.toLowerCase(),
    signatures,
  };

  await sendBid(bid, requestContext);
};
