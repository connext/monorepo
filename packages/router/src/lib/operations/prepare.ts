import { createLoggingContext, CrossChainTx, getChainIdFromDomain, getDomainFromChainId } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { AppContext } from "../../context";
import { getContext } from "../../router";
import { OriginDomainDataInvalid } from "../errors";
import { getDestinationTransactingAsset, sanitationCheck } from "../helpers/shared";

export const prepare = async (pendingTx: CrossChainTx) => {
  // TODO. This is called whenever there is a new prepared transaction.
  // Router creates a bid and send it to auctioneer

  const { requestContext, methodContext } = createLoggingContext(prepare.name);
  const {
    logger,
    config,
    adapters: { auctioneer },
    txService,
  } = getContext();
  logger.info("Method start", requestContext, methodContext, pendingTx);

  // sanitation check before validiation
  await sanitationCheck(pendingTx, "prepare");

  // validate CallParam schema

  // validate Prepare Input schema

  // validate the prepare data

  // create a bid
  const { originDomain, destinationDomain, prepareTransactingAmount, prepareTransactingAsset, prepareLocalAsset } =
    pendingTx;
  const thresholdPct = Number(config.maxSlippage.toString().split(".")[0]);
  const highThreshold = BigNumber.from(prepareTransactingAmount)
    .mul(100 + thresholdPct)
    .div(100);
  const lowThreshold = BigNumber.from(prepareTransactingAmount)
    .mul(100 - thresholdPct)
    .div(100);

  const sendingChainId = getChainIdFromDomain(originDomain);
  const receivingChainId = getChainIdFromDomain(destinationDomain);
  const inputDecimals = await txService.getDecimalsForAsset(sendingChainId, prepareTransactingAsset);
  const transactingAssetOnDestDomain = await getDestinationTransactingAsset(
    originDomain,
    prepareTransactingAsset,
    destinationDomain,
  );
  const outputDecimals = await txService.getDecimalsForAsset(receivingChainId, transactingAssetOnDestDomain);
  // send the bid to auctioneer
  await auctioneer.sendBid(null);
};
