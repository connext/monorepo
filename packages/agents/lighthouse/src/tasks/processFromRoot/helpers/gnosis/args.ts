import { createLoggingContext } from "@connext/nxtp-utils";
import { ethers } from "ethers";

import { getContext } from "../../processFromRoot";
import { GetProcessArgsParams } from "..";

import { ABM_ABI, AMB_BRIDGE_HELPER_ABI } from "./abis";

// https://gnosisscan.io/address/0x7d94ece17e81355326e3359115D4B02411825EdD
const AMB_HELPER_ADDRESS = "0x7d94ece17e81355326e3359115D4B02411825EdD";

export const getProcessFromGnosisRootArgs = async ({
  spokeChainId,
  spokeProvider,
  blockNumber,
  _requestContext,
}: GetProcessArgsParams): Promise<[string, string]> => {
  const {
    logger,
    config,
    adapters: { contracts },
  } = getContext();

  const { requestContext, methodContext } = createLoggingContext(getProcessFromGnosisRootArgs.name, _requestContext);
  logger.info("Method start", requestContext, methodContext);

  const spokeConnector = contracts.spokeConnector(
    spokeChainId ?? 0,
    "Gnosis",
    config.environment === "staging" ? "Staging" : "",
  );
  const rpcProvider = new ethers.providers.JsonRpcProvider(spokeProvider);
  const spokeConnectorContract = new ethers.Contract(
    spokeConnector!.address,
    spokeConnector!.abi as any[],
    rpcProvider,
  );

  const amb = await spokeConnectorContract.AMB();
  const ambContract = new ethers.Contract(amb as string, ABM_ABI, rpcProvider);
  const events = await ambContract.queryFilter("UserRequestForSignature", blockNumber, blockNumber);
  const userRequestForSignatureEvt = events[0];
  const log = ambContract.interface.parseLog(userRequestForSignatureEvt);
  const { encodedData } = log.args;
  const helperContract = new ethers.Contract(AMB_HELPER_ADDRESS, AMB_BRIDGE_HELPER_ABI, rpcProvider);
  const signature = await helperContract.getSignatures(encodedData);
  return [encodedData, signature];
};
