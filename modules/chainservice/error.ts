import { VectorError, Values } from "@connext/nxtp-types";

export class ChainError extends VectorError {
  static readonly type = "ChainError";
  static readonly reasons = {
    ProviderNotFound: "Provider not found for chainId",
    SignerNotFound: "Signer not found for chainId",
    SenderNotInChannel: "Sender is not a channel participant",
    NegativeDepositAmount: "Cannot deposit a negative amount",
    NotEnoughFunds: "Not enough funds in wallet",
    FailedToDeploy: "Could not deploy vector channel",
    FailedToSendTx: "Failed to send transaction to chain",
    TransferNotRegistered: "Transfer not in registry",
    MissingSigs: "Channel state is not double signed",
    ResolverNeeded: "Transfer resolver must be provided in dispute",
    NotInitialState: "Transfer must be disputed with initial state",
    MultisigDeployed: "Multisig already deployed",
    TransferNotFound: "Transfer is not included in active transfers",
    TxAlreadyMined: "Tranasction already mined",
    TxNotFound: "Transaction not found",
    TxReverted: "Transaction reverted on chain",
    MaxGasPriceReached: "Max gas price reached",
    ConfirmationTimeout: "Timed out waiting for confirmation.",
    NonceExpired: "Failed to confirm a tx whose nonce had expired.",
    InvalidResponse: "Did not receive valid tx response from ethers.",
    RpcFailure: "Could not execute RPC method.",
  };

  constructor(public readonly message: Values<typeof ChainError.reasons> | string, public readonly context: any = {}) {
    super(message, context, ChainError.type);
  }

  static parseChainErrorReason = (message: string): string | undefined => {
    if (message.includes("sender doesn't have enough funds")) {
      return ChainError.reasons.NotEnoughFunds;
    }
    return undefined;
  };
}
