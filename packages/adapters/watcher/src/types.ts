import { TransactionService } from "@connext/nxtp-txservice";
import { Logger, RequestContext } from "@connext/nxtp-utils";

export type CallContext = {
  txservice: TransactionService;
  logger: Logger;
  _requestContext?: RequestContext;
  isStaging?: boolean;
};
