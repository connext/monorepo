import { getChainData, Logger } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { NxtpSdkConfig, getConfig } from "./config";
import { NxtpSdkUtils } from "./sdkUtils";
import { NxtpSdkBase } from "./sdkBase";
import { NxtpSdkRouter } from "./sdkRouter";
import { NxtpSdkStableSwap } from "./sdkStableSwap";

export { NxtpSdkBase } from "./sdkBase";
export { NxtpSdkRouter } from "./sdkRouter";
export { NxtpSdkStableSwap } from "./sdkStableSwap";
export { NxtpSdkUtils } from "./sdkUtils";
export { NxtpSdkConfig, NxtpSdkConfigSchema } from "./config";

export const create = async (
  _config: NxtpSdkConfig,
  _logger?: Logger,
): Promise<{
  nxtpSdkBase: NxtpSdkBase;
  nxtpSdkUtils: NxtpSdkUtils;
  nxtpSdkRouter: NxtpSdkRouter;
  nxtpSdkStableSwap: NxtpSdkStableSwap;
}> => {
  const chainData = await getChainData();
  if (!chainData) {
    throw new Error("Could not get chain data");
  }
  const nxtpConfig = await getConfig(_config, chainData, contractDeployments);
  const logger = _logger || new Logger({ name: "NxtpSdk", level: nxtpConfig.logLevel });

  const nxtpSdkUtils = await NxtpSdkUtils.create(nxtpConfig, logger, chainData);
  const nxtpSdkBase = await NxtpSdkBase.create(nxtpConfig, logger, chainData);
  const nxtpSdkRouter = await NxtpSdkRouter.create(nxtpConfig, logger, chainData);
  const nxtpSdkStableSwap = await NxtpSdkStableSwap.create(nxtpConfig, logger, chainData);

  return { nxtpSdkBase, nxtpSdkUtils, nxtpSdkRouter, nxtpSdkStableSwap };
};
