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
//helper function to match our config environments with nomads
export const getBlacklist = async (
  originDomain: string,
  destinationDomain: string,
): Promise<{ originBlacklisted: boolean; destinationBlacklisted: boolean }> => {
  const { bridgeContext: context } = getContext();
  if (!context) {
    return { originBlacklisted: false, destinationBlacklisted: false };
  }
  //todo: look for higher level import of this class
  //push them to blacklist if not there already
  await context.checkHomes([Number(originDomain), Number(destinationDomain)]);

  //get blacklist
  const blacklist = context.blacklist();

  //determine if origin or destintion aren't connected to nomad
  const originBlacklisted = blacklist.has(Number(originDomain));
  const destinationBlacklisted = blacklist.has(Number(destinationDomain));

  return { originBlacklisted, destinationBlacklisted };
};
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
    origin,
    transferId,
    xparams: { callData, to, forceSlow, originDomain, destinationDomain },
  } = params;

  if (forceSlow) {
    logger.debug("Opt for slow path", requestContext, methodContext, { transferId });
    return;
  }

  if (!origin) {
    throw new MissingXCall({ requestContext, methodContext });
  }

  logger.debug("Getting local asset", requestContext, methodContext, {
    originDomain,
    asset: origin.assets.bridged.asset,
    destinationDomain,
  });
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

  // Need to make sure if nomad-sdk handles an error in case of bad rpc before integrating.
  // Test code base: https://codesandbox.io/s/nomad-integration-testing-h8q00t?file=/index.js

  // const { originBlacklisted, destinationBlacklisted } = await getBlacklist(originDomain, destinationDomain);
  // if (originBlacklisted || destinationBlacklisted) {
  //   throw new NomadHomeBlacklisted({
  //     originDomainBlacklisted: originBlacklisted,
  //     destinationBlacklisted: destinationBlacklisted,
  //   });
  // }

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
