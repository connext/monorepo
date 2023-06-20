import { Logger, ChainData } from "@connext/nxtp-utils";

import type { SdkConfig } from "./sdk-types";
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
  const sdkBase = await SdkBase.create(_config, _logger, _chainData);
  const sdkUtils = await SdkUtils.create(_config, _logger, _chainData);
  const sdkRouter = await SdkRouter.create(_config, _logger, _chainData);
  const sdkPool = await SdkPool.create(_config, _logger, _chainData);

  return { sdkBase, sdkUtils, sdkRouter, sdkPool };
};
