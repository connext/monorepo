import { Logger, ChainData, createLoggingContext } from "@connext/nxtp-utils";
import { SdkConfig } from "@connext/sdk-core";
// import { SdkUtils } from "./sdkUtils";
import { SdkBase } from "./sdkBase";
// import { SdkRouter } from "./sdkRouter";
// import { SdkPool } from "./sdkPool";

export const create = async (
  _config: SdkConfig,
  _logger?: Logger,
  _chainData?: Map<string, ChainData>,
): Promise<{
  sdkBase: SdkBase;
  // sdkUtils: SdkUtils;
  // sdkRouter: SdkRouter;
  // sdkPool: SdkPool;
}> => {
  const sdkBase = await SdkBase.create(_config, _logger, _chainData);
  // const sdkUtils = await SdkUtils.create(nxtpConfig, logger, chainData);
  // const sdkRouter = await SdkRouter.create(nxtpConfig, logger, chainData);
  // const sdkPool = await SdkPool.create(nxtpConfig, logger, chainData);

  // return { sdkBase, sdkUtils, sdkRouter, sdkPool };
  return { sdkBase };
};
