import { NxtpMessaging, calculateExchangeAmount } from "@connext/nxtp-utils";

import {signFulfillTransactionPayload} from "../../utils/src/signatures";
import { Signer, Wallet, utils } from "ethers";
import { BaseLogger } from "pino";
import { TransactionManager } from "@connext/nxtp-contracts";
import TransactionService from "@connext/nxtp-txservice";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";


import {
  ReceiverFulfillData,
  ReceiverPrepareData,
  SenderFulfillData,
  SenderPrepareData,
  TransactionManagerListener,
} from "./transactionManagerListener";
import { getConfig } from "./config";
import {defaultAbiCoder} from "ethers/lib/utils";
import {InvariantTransactionData} from "@connext/nxtp-utils";

export const tidy = (str: string): string => `${str.replace(/\n/g, "").replace(/ +/g, " ")}`;
export const EXPIRY_DECREMENT = 3600 * 24;

export const TransactionDataParamsEncoding = tidy(`tuple(
  address user,
  address router,
  address sendingAssetId,
  address receivingAssetId,
  address receivingAddress,
  bytes callData,
  bytes32 transactionId,
  uint24 sendingChainId,
  uint24 receivingChainId,
  uint256 amount,
  uint256 expiry,
  uint256 blockNumber
`);

export interface TransactionDataParams {
  user: string;
  router: string;
  sendingAssetId: string;
  receivingAssetId: string;
  receivingAddress: string;
  callData: string;
  transactionId: string;
  sendingChainId: number;
  receivingChainId: number;
  amount: string;
  expiry: number;
  blockNumber: number;
}

//look @ ethers Contract instantiation for abiEncode

/*
    Handler.ts

    The goal of this file is to handle all inbound events and dispatch messages
    or new onchain txs as needed.

    Each handler method should do the following:
    1. Log what it's doing
    2. Validate the event data (in some cases not necessary if onchain validation)
    3. Prepare parameters for next action
    4. Dispatch a new message or tx to chain
    5. Update metrics
*/

// TODO should this be a class? Would be much easier to test, and remove the need
// to pass in dependencies into every single function from the listener.

export interface Handler {
  handleNewAuction(data: AuctionData): Promise<void>;
  handleMetaTxRequest(data: MetaTxData): Promise<void>;
  handleSenderPrepare(inboundData: SenderPrepareData): Promise<void>;
  handleReceiverPrepare(data: ReceiverPrepareData): Promise<void>;
  handleSenderFulfill(data: SenderFulfillData): Promise<void>;
  handleReceiverFulfill(data: ReceiverFulfillData): Promise<void>;
}

export type AuctionData = any;
export type MetaTxData = any;

export class Handler implements Handler {
  constructor(
    private readonly messagingService: NxtpMessaging,
    private readonly txManager: TransactionManagerListener,
    private readonly signer: Signer,
    private readonly txService: TransactionService,
    private readonly logger: BaseLogger,
  ) {}

  // HandleNewAuction
  // Purpose: Respond to auction with bid if router has sufficient funds for transfer
  // NOTE: This does not need to be implemented as part of MVP
  public async handleNewAuction(data: AuctionData): Promise<void> {
    // First, log
    // TODO
    // Next, validate that assets/chains are supported and there is enough liquidity
    // and gas on both sender and receiver side.
    // (TODO in what other scenarios would auction fail here? We should make sure
    // that router does not bid unless it is *sure* it's doing ok)
    // If you can support the transfer:
    // Next, prepare bid
    // - Get price from AMM (TODO)
    // - Get fee rate
    // - Sign bid data
    // - Create bid object
    // Next, dispatch bid to messaging service with the user address
    // Last, update metrics
    // TODO (also need to discuss what data is most needed here)
  }

  // HandleMetatxRequest
  // Purpose: If a user sends a FULFILL payload, submit it to chain on their behalf
  // NOTE: One consideration here is that it's technically possible for router to
  // just directly fulfill the sender side and leave the user hanging.
  // How can we protect against this case? Maybe broadcast to all routers?
  public async handleMetaTxRequest(data: MetaTxData): Promise<void> {
    // First log
    // TODO
    // Validate that metatx request matches with known data about fulfill
    // Is this needed? Can we just submit to chain without validating?
    // Technically this is ok, but perhaps we want to validate only for our own
    // logging purposes.
    // Would also be bad if router had no gas here
    // Next, prepare the tx object
    // - Get chainId from data
    // - Get fulfill fee from data and validate it covers gas
    // - etc.
    // Send to txService
    // Update metrics
    // TODO
  }

  // HandleSenderPrepare
  // Purpose: On sender PREPARE, router should mirror the data to receiver chain
  public async handleSenderPrepare(inboundData: SenderPrepareData): Promise<void> {
    const signerAddress = await this.signer.getAddress();
    const config = getConfig();
    // First log

    // Validate the prepare data
    // TODO what needs to be validated here? Is this necessary? Assumption
    // that user is only sending stuff that makes sense is possibly ok since otherwise
    // they're losing gas costs

    //calculateExchange

    // Next, prepare the outbound data
    // Must have:
    // - Sending and receiving chainId
    // - Sending and receiving assetId
    // - Sender address
    // - Router address
    // - Unique transferId (TODO: do we need this? How should we create this?)
    // - Price and fee quote (TODO: either we can agree upon this upfront)
    // - Amount sent by user
    // - Recipient (callTo) and callData
    const mutatedData = this.mutatePrepareData(inboundData);
    const nxtpContract = new utils.Interface(TransactionManagerArtifact.abi) as TransactionManager["interface"];

    // encode the data for contract call
    // @ts-ignore TODO: fix this types shit
    const encodedData = nxtpContract.encodeFunctionData("prepare", [{txData: mutatedData}]);
    

    // Then prepare tx object
    // Note tx object must have:
    // - Prepare fn params
    // - Destination chainId
    // - Amount
    // - AssetId

    // TODO: approve tokens if transaction.receivingAssetId !== ethers.constants.AddressZero
    // TODO: if transaction.receivingAssetId === ethers.constants.AddressZero, add value

    // Send to txService
    try {
      const txRes = await this.txService.sendAndConfirmTx(inboundData.receivingChainId, {
        to: config.chainConfig[inboundData.receivingChainId].transactionManagerAddress,
        data: encodedData,
        value: 0, // TODO
        chainId: inboundData.receivingChainId,
        from: signerAddress,
      });
    } catch (e) {}

    // If success, update metrics
  }

  // HandleReceiverPrepare
  // Purpose: On this method, no action is needed from the router except to update
  // metrics
  public async handleReceiverPrepare(data: ReceiverPrepareData): Promise<void> {
    // First log
    // Update metrics
  }

  // HandleSenderFulfill
  // Purpose: No action is needed here from router except to update metrics
  public async handleSenderFulfill(data: SenderFulfillData): Promise<void> {
    // First log
    // Update metrics
  }

  // HandleReceiverFulfill
  // Purpose: Router should mirror the receiver fulfill data back to sender side
  public async handleReceiverFulfill(data: ReceiverFulfillData): Promise<void> {
    // First log
    // Prepare tx packet
    const signerAddress = await this.signer.getAddress();
    const config = getConfig();

    //signature on fee + digest.
    const relayerFee = calculateExchangeAmount(data.amount, "0.995");
    //or cast this.signer to wallet?
    let signedPayload = signFulfillTransactionPayload(data, relayerFee, this.signer);

    // const nxtpContract = new utils.Interface(TransactionManagerArtifact.abi) as TransactionManager["interface"];
    const nxtpContract = new utils.Interface(TransactionManagerArtifact.abi) as TransactionManager["interface"];
    // @ts-ignore TODO: fix this types shit
    const encodedData = nxtpContract.encodeFunctionData("fulfill", [{txDigest: data, relayerFee: relayerFee, signature: signedPayload}]);

    try {
      const txRes = await this.txService.sendAndConfirmTx(data.sendingChainId, {
        to: config.chainConfig[data.sendingChainId].transactionManagerAddress,
        data: encodedData,
        value: 0, // TODO
        chainId: data.sendingChainId,
        from: signerAddress,
      });
    } catch (e) {}
    // Send to tx service
    // If success, update metrics
    // If fail -- something has gone really wrong here!! We need to figure out what ASAP.
    // TODO discuss the above case!!
  }

  // MutatePrepareData
  // Purpose: Internal fn used to mutate the prepare data between sender and receiver chain
  private mutatePrepareData(data: SenderPrepareData): SenderPrepareData {
    const newAmount = calculateExchangeAmount(data.amount, "0.995");
    let mutatedData = data;

    mutatedData.amount = newAmount;
    const newExpiration = mutatedData.expiry - EXPIRY_DECREMENT;

    if (newExpiration < Date.now()) {
      throw new Error("expiry already happened");
    }

    return mutatedData;
  }
}
