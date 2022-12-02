import { TransactionService } from "@connext/nxtp-txservice";
import { Logger, MethodContext, RequestContext } from "@connext/nxtp-utils";
import { ethers } from "ethers";

export type CallContext = {
  txservice: TransactionService;
  logger: Logger;
  requestContext?: RequestContext;
  isStaging?: boolean;
};

export enum ReportEventType {
  Pause = "Pause",
  Rpc = "Rpc",
  Tx = "Tx",
}

export type Report = {
  timestamp: number;
  event: ReportEventType;
  reason: string;
  errors: any[];
  logger: Logger;
  requestContext: RequestContext;
  methodContext: MethodContext;
  domains: string[];
  relevantTransactions: (ethers.providers.TransactionResponse | string)[];
  rpcs: string[];
};
