import { Logger, ChainData } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { NxtpSdkConfig, getConfig } from "./config";
import { NxtpSdkBase } from "./sdkBase";
import { NxtpSdkUtils } from "./sdkUtils";
import { NxtpSdkBridge } from "./sdkBridge";
import { NxtpSdkRouter } from "./sdkRouter";
import { NxtpSdkStableSwap } from "./sdkStableSwap";
import { NxtpSdkPool } from "./sdkPool";

export const create = async (
  _config: NxtpSdkConfig,
  _logger?: Logger,
  chainData?: Map<string, ChainData>,
): Promise<{
  nxtpSdkBase: NxtpSdkBase;
  nxtpSdkBridge: NxtpSdkBridge;
  nxtpSdkUtils: NxtpSdkUtils;
  nxtpSdkRouter: NxtpSdkRouter;
  nxtpSdkStableSwap: NxtpSdkStableSwap;
  nxtpSdkPool: NxtpSdkPool;
}> => {
  const nxtpConfig = await getConfig(_config, contractDeployments, chainData);
  const logger = _logger || new Logger({ name: "NxtpSdk", level: nxtpConfig.logLevel });

  const nxtpSdkBase = new NxtpSdkBase(nxtpConfig, logger, chainData!);
  const nxtpSdkUtils = await NxtpSdkUtils.create(nxtpConfig, logger, chainData);
  const nxtpSdkBridge = await NxtpSdkBridge.create(nxtpConfig, logger, chainData);
  const nxtpSdkRouter = await NxtpSdkRouter.create(nxtpConfig, logger, chainData);
  const nxtpSdkStableSwap = await NxtpSdkStableSwap.create(nxtpConfig, logger, chainData);
  const nxtpSdkPool = await NxtpSdkPool.create(nxtpConfig, logger, chainData);

  return { nxtpSdkBase, nxtpSdkBridge, nxtpSdkUtils, nxtpSdkRouter, nxtpSdkStableSwap, nxtpSdkPool };
};
