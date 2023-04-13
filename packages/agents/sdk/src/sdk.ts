import { Logger, ChainData, createLoggingContext } from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { SdkConfig, getConfig } from "./config";
import { SdkUtils } from "./sdkUtils";
import { SdkBase } from "./sdkBase";
import { SdkRouter } from "./sdkRouter";
import { SdkPool } from "./sdkPool";

export const create = async (
  _config: SdkConfig,
  _logger?: Logger,
  _chainData?: Map<string, ChainData>,
): Promise<{
  sdkBase: SdkBase;
  sdkUtils: SdkUtils;
  sdkRouter: SdkRouter;
  sdkPool: SdkPool;
}> => {
  const { nxtpConfig, chainData } = await getConfig(_config, contractDeployments, _chainData);
  const logger = _logger || new Logger({ name: "SDK", level: nxtpConfig.logLevel });

  const sdkBase = await SdkBase.create(nxtpConfig, logger, chainData);
  const sdkUtils = await SdkUtils.create(nxtpConfig, logger, chainData);
  const sdkRouter = await SdkRouter.create(nxtpConfig, logger, chainData);
  const sdkPool = await SdkPool.create(nxtpConfig, logger, chainData);

  const { requestContext, methodContext } = createLoggingContext("SDK create()");
  logger.info(`Initialized SDK with config: `, requestContext, methodContext, { nxtpConfig: nxtpConfig });

  return { sdkBase, sdkUtils, sdkRouter, sdkPool };
};
