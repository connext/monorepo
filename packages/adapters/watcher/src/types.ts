import {
  getDeployedConnextContract,
  getDeployedMerkleTreeManagerOfRootManagerContract,
  getDeployedRootManagerContract,
  getDeployedSpokeConnecterContractByName,
  TransactionService,
} from "@connext/nxtp-txservice";
import { Logger, RequestContext } from "@connext/nxtp-utils";
import { getConnectorName } from "@connext/smart-contracts";
import { MESSAGING_PROTOCOL_CONFIGS } from "@connext/smart-contracts/dist/deployConfig/shared";
import { Static, Type } from "@sinclair/typebox";
import { ethers } from "ethers";

/// MARK - Verifiers
// Shared verifier context, used in constructor in base class below.
export type VerifierContext = {
  domains: string[];
  txservice: TransactionService;
  logger: Logger;
  isStaging?: boolean;
};

export type VerifyResponse = {
  needsAction: boolean;
  reason?: string;
};

export type WatcherInvariantResponse = VerifyResponse & { transactions?: Record<string, string[]> };

export type ProposedData = {
  snapshotId: string;
  endOfDispute: string;
  aggregateRoot: string;
  baseRoot: string;
  snapshotRoots: string[];
  domains: string[];
};

// Base class for all verifiers. Should be inherited by verifiers, each with their own
// invariant condition to track and verify.
export abstract class Verifier {
  constructor(public readonly context: VerifierContext) {}

  public async checkInvariant(requestContext: RequestContext): Promise<VerifyResponse> {
    throw new Error("not implemented");
  }

  public getConnextDeployment(chainId: number): { address: string; abi: any } {
    const connext = getDeployedConnextContract(chainId, this.context.isStaging ? "Staging" : "");
    if (!connext) {
      // TODO: Custom errors for package
      throw new Error(`Connext deployment not found for chain ${chainId}!`);
    }
    return connext;
  }

  public getRootManagerDeployment(chainId: number): { address: string; abi: any } {
    const rootManager = getDeployedRootManagerContract(chainId, this.context.isStaging ? "Staging" : "");
    if (!rootManager) {
      // TODO: Custom errors for package
      throw new Error(`RootManager deployment not found for chain ${chainId}!`);
    }
    return rootManager;
  }

  public getMerkleTreeManagerOfRootManagerDeployment(chainId: number): { address: string; abi: any } {
    const merkleTreeManager = getDeployedMerkleTreeManagerOfRootManagerContract(
      chainId,
      this.context.isStaging ? "Staging" : "",
    );
    if (!merkleTreeManager) {
      // TODO: Custom errors for package
      throw new Error(`MerkleManager deployment not found for chain ${chainId}!`);
    }
    return merkleTreeManager;
  }

  public getSpokeConnectorDeployment(chainId: number): { address: string; abi: any } {
    const protocol = this.context.isStaging ? MESSAGING_PROTOCOL_CONFIGS.testnet : MESSAGING_PROTOCOL_CONFIGS.mainnet;
    const connectorName = getConnectorName(protocol, chainId);
    const spokeConnector = getDeployedSpokeConnecterContractByName(
      chainId,
      connectorName,
      this.context.isStaging ? "Staging" : "",
    );
    if (!spokeConnector) {
      // TODO: Custom errors for package
      throw new Error(`SpokeConnector deployment not found for chain ${chainId}!`);
    }
    return spokeConnector;
  }
}

export type SwitchResponse = {
  domain: number;
  switched: boolean;
  error: any;
  relevantTransaction: ethers.providers.TransactionResponse | string;
};

export type PauseResponse = {
  domain: string;
  paused: boolean;
  error: any;
  relevantTransaction: ethers.providers.TransactionResponse | string;
};

/// MARK - General
// Used in AssetVerifier
export type AssetInfo = {
  canonicalId: string;
  canonicalDomain: string;
  address: string; // TODO: Remove this arg and parse out the address from canonical ID?
  symbol: string; // Used for easy logging
};

/// MARK - Alerts

export enum ReportEventType {
  Pause = "Pause",
  Switch = "Switch",
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
  domains: string[];
  relevantTransactions: (ethers.providers.TransactionResponse | string)[];
  rpcs: string[];
};
//  { name: string; public: boolean; topicType?: string; membersType?: string; topicName?: string }
export const WatcherAlertsConfigSchema = Type.Object({
  discordHookUrl: Type.Optional(Type.String({ format: "uri" })),
  pagerDutyRoutingKey: Type.Optional(Type.String({ maxLength: 32, minLength: 32 })),
  twilioNumber: Type.Optional(Type.String()),
  twilioAccountSid: Type.Optional(Type.String()),
  twilioAuthToken: Type.Optional(Type.String()),
  twilioToPhoneNumbers: Type.Optional(Type.Array(Type.String())),
  telegramApiKey: Type.Optional(Type.String()),
  telegramChatId: Type.Optional(Type.String()),
  betterUptimeApiKey: Type.Optional(Type.String()),
  betterUptimeRequesterEmail: Type.Optional(Type.String()),
});

export type WatcherAlertsConfig = Static<typeof WatcherAlertsConfigSchema>;
