import { Logger } from "@connext/nxtp-utils";

import { SdkServerConfig } from "./config";

export type SdkServerContext = {
  logger: Logger;
  config: SdkServerConfig;
};
