import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";
import { constants, utils } from "ethers";

import { getContext } from "../propagate";
import { NoSpokeConnector, NoHubConnector, NoProviderForDomain } from "../errors";
import { ExtraPropagateParam } from "../operations/propagate";
import { getJsonRpcProvider, getL1ToL2MessageGasEstimator } from "../../../mockable";

// example at https://github.com/OffchainLabs/arbitrum-tutorials/blob/master/packages/greeter/scripts/exec.js
export const getPropagateParams = async (
  l2domain: string,
  l2ChainId: number,
  l1ChainId: number,
  _requestContext: RequestContext,
): Promise<ExtraPropagateParam> => {
  const {
    config,
    logger,
    adapters: { chainreader, contracts },
  } = getContext();
  const { methodContext, requestContext } = createLoggingContext(getPropagateParams.name, _requestContext);
  logger.info("Getting propagate params for Arbitrum", requestContext, methodContext, { l2domain });
  const l2RpcUrl = config.chains[l2domain]?.providers[0];

  if (!l2RpcUrl) {
    throw new NoProviderForDomain(l2domain, requestContext, methodContext);
  }
  const l1RpcUrl = config.chains[config.hubDomain]?.providers[0];
  if (!l1RpcUrl) {
    throw new NoProviderForDomain(config.hubDomain, requestContext, methodContext);
  }

  const l2Provider = getJsonRpcProvider(l2RpcUrl);
  const l1ToL2MessageGasEstimate = getL1ToL2MessageGasEstimator(l2Provider);

  // example encoded payload: 0x4ff746f6000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000207465737400000000000000000000000000000000000000000000000000000000
  // length = 200 not including 0x = 100 bytes
  // TODO: verify this is the correct payload to use
  const messageBytesLength = 100 + 4; // 4 bytes func identifier
  const l1Provider = getJsonRpcProvider(l1RpcUrl);
  const _submissionPriceWei = await l1ToL2MessageGasEstimate.estimateSubmissionFee(
    l1Provider,
    await l1Provider.getGasPrice(),
    messageBytesLength,
  );

  logger.info(
    `Got current retryable base submission price: ${_submissionPriceWei.toString()}`,
    requestContext,
    methodContext,
    { submissionPriceWei: _submissionPriceWei.toString() },
  );

  const gasPriceBid = await chainreader.getGasPrice(+l2domain, requestContext);
  logger.info(`Got current gas price bid: ${gasPriceBid.toString()}`, requestContext, methodContext, {
    gasPriceBid: gasPriceBid.toString(),
  });

  const l2SpokeConnector = contracts.spokeConnector(
    l2ChainId,
    "Arbitrum",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l2SpokeConnector) {
    throw new NoSpokeConnector(l2ChainId, requestContext, methodContext);
  }

  const l1HubConnector = contracts.hubConnector(
    l1ChainId,
    "Arbitrum",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l1HubConnector) {
    throw new NoHubConnector(l1ChainId, requestContext, methodContext);
  }

  const maxGas = await l1ToL2MessageGasEstimate.estimateRetryableTicketGasLimit(
    l1HubConnector.address,
    l2SpokeConnector.address,
    constants.Zero,
    l2SpokeConnector.address, // TODO: check this
    l2SpokeConnector.address,
    // use example calldata since it will always be the same
    // TODO: check this, it shouldnt be the same as the above example calldata
    "0x4ff746f6000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000207465737400000000000000000000000000000000000000000000000000000000",
    utils.parseEther("1"),
  );

  /**
   * ...Okay, but on the off chance we end up underpaying, our retryable ticket simply fails.
   * This is highly unlikely, but just to be safe, let's increase the amount we'll be paying (the difference between the actual cost and the amount we pay gets refunded to our address on L2 anyway)
   * In nitro, submission fee will be charged in L1 based on L1 basefee, revert on L1 side upon insufficient fee.
   */
  const submissionPriceWei = _submissionPriceWei.mul(5);

  /**
   * With these three values, we can calculate the total callvalue we'll need our L1 transaction to send to L2
   */
  const callValue = submissionPriceWei.add(gasPriceBid.mul(maxGas));

  // (uint256 maxSubmissionCost, uint256 maxGas, uint256 gasPrice) = abi.decode(
  const encodedData = utils.defaultAbiCoder.encode(
    ["uint256", "uint256", "uint256"],
    [submissionPriceWei, maxGas, gasPriceBid],
  );

  return { _connector: "", _fee: callValue.toString(), _encodedData: encodedData };
};
