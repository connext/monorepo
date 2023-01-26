import { Logger, ChainData, createLoggingContext } from "@connext/utils";
import { contractDeployments } from "@connext/txservice";

import { SdkConfig, getConfig } from "./config";
import { SdkUtils } from "./sdkUtils";
import { SdkBase } from "./sdkBase";
import { SdkRouter } from "./sdkRouter";
import { SdkPool } from "./sdkPool";

export const create = async (
  _config: SdkConfig,
  _logger?: Logger,
  chainData?: Map<string, ChainData>,
): Promise<{
  sdkBase: SdkBase;
  sdkUtils: SdkUtils;
  sdkRouter: SdkRouter;
  sdkPool: SdkPool;
}> => {
  const connextConfig = await getConfig(_config, contractDeployments, chainData);
  const logger = _logger || new Logger({ name: "SDK", level: connextConfig.logLevel });

  const sdkBase = new SdkBase(connextConfig, logger, chainData!);
  const sdkUtils = await SdkUtils.create(connextConfig, logger, chainData);
  const sdkRouter = await SdkRouter.create(connextConfig, logger, chainData);
  const sdkPool = await SdkPool.create(connextConfig, logger, chainData);

  const { requestContext, methodContext } = createLoggingContext("SDK create()");
  logger.info(`Initialized SDK with config: `, requestContext, methodContext, { connextConfig });

  return { sdkBase, sdkUtils, sdkRouter, sdkPool };
};
