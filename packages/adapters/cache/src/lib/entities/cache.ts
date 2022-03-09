import { Logger } from "@connext/nxtp-utils";

import { Subscriptions } from "./channel";

export type CacheParams = { url: string; subscriptions: Subscriptions; mock: boolean; logger: Logger };
