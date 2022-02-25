import { createLoggingContext, CrossChainTx } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { AppContext } from "../../context";
import { getContext } from "../../router";
import { OriginDomainDataInvalid } from "../errors";
import { sanitationCheck } from "../helpers/shared";

export const prepare = async (pendingTx: CrossChainTx) => {
  // TODO. This is called whenever there is a new prepared transaction.
  // Router creates a bid and send it to auctioneer

  const { requestContext, methodContext } = createLoggingContext(prepare.name);
  const {
    logger,
    config,
    adapters: { auctioneer },
  } = getContext();
  logger.info("Method start", requestContext, methodContext, pendingTx);

  // sanitation check before validiation
  await sanitationCheck(pendingTx, "prepare");

  // validate CallParam schema

  // validate Prepare Input schema

  // validate the prepare data

  // create a bid
  const { prepareTransactingAmount } = pendingTx;
  const thresholdPct = Number(config.maxSlippage.toString().split(".")[0]);
  const highThreshold = BigNumber.from(prepareTransactingAmount)
    .mul(100 + thresholdPct)
    .div(100);
  const lowThreshold = BigNumber.from(prepareTransactingAmount)
    .mul(100 - thresholdPct)
    .div(100);
  if (
    BigNumber.from(prepareTransactingAmount).gt(highThreshold) ||
    BigNumber.from(prepareTransactingAmount).lt(lowThreshold)
  ) {
    throw new OriginDomainDataInvalid({
      methodContext,
      requestContext,
      prepareTransactingAmount: prepareTransactingAmount.toString(),
      highThreshold: highThreshold.toString(),
      lowThreshold: lowThreshold.toString(),
      pendingTx,
    });
  }

  // send the bid to auctioneer
  await auctioneer.sendBid(null);
};
