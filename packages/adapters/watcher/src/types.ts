import { TransactionService } from "@connext/nxtp-txservice";
import { Logger, MethodContext, RequestContext } from "@connext/nxtp-utils";
import { ethers } from "ethers";

/// MARK - Verifiers
// Shared verifier context, used in constructor in base class below.
export type VerifierContext = {
  domains: string[];
  txservice: TransactionService;
  logger: Logger;
  isStaging?: boolean;
};

// Base class for all verifiers. Should be inherited by verifiers, each with their own
// invariant condition to track and verify.
export abstract class Verifier {
  constructor(public readonly context: VerifierContext) {}

  public async checkInvariant(_requestContext: RequestContext): Promise<boolean> {
    throw new Error("not implemented");
  }
}

/// MARK - General
// Used in AssetVerifier
export type AssetInfo = {
  canonicalId: string;
  canonicalDomain: string;
  address: string; // TODO: Remove this arg and parse out the address from canonical ID?
};

/// MARK - Alerts

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
