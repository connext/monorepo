import Ajv from "ajv";
import addFormats from "ajv-formats";
import { constants, providers, Signer, utils } from "ethers";
import { Evt } from "evt";
import {
  getRandomBytes32,
  TIntegerString,
  TAddress,
  UserNxtpNatsMessagingService,
  PrepareParams,
  TransactionCancelledEvent,
  TransactionFulfilledEvent,
  TransactionPreparedEvent,
  TChainId,
  TransactionData,
  CancelParams,
  encrypt,
  generateMessagingInbox,
  AuctionResponse,
  encodeAuctionBid,
  recoverAuctionBid,
  InvariantTransactionData,
  signFulfillTransactionPayload,
  MetaTxResponse,
} from "@connext/nxtp-utils";
import pino, { BaseLogger } from "pino";
import { Type, Static } from "@sinclair/typebox";

import { TransactionManager, getTransactionManagerContractAddress } from "./transactionManager";
import { TransactionManagerEvents } from "./listener";

declare const ethereum: any;

export const CrossChainParamsSchema = Type.Object({
  callData: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]*$/)),
  sendingChainId: TChainId,
  sendingAssetId: TAddress,
  receivingChainId: TChainId,
  receivingAssetId: TAddress,
  callTo: Type.Optional(TAddress),
  receivingAddress: TAddress,
  amount: TIntegerString,
  expiry: Type.Number(),
  transactionId: Type.Optional(Type.RegEx(/^0x[a-fA-F0-9]{64}$/)),
});

export type CrossChainParams = Static<typeof CrossChainParamsSchema>;

export const NxtpSdkEvents = {
  SenderTransactionPrepareTokenApproval: "SenderTokenApprovalSubmitted",
  SenderTokenApprovalMined: "SenderTokenApprovalMined",
  SenderTransactionPrepareSubmitted: "SenderTransactionPrepareSubmitted",
  SenderTransactionPrepared: "SenderTransactionPrepared",
  SenderTransactionFulfilled: "SenderTransactionFulfilled",
  SenderTransactionCancelled: "SenderTransactionCancelled",
  ReceiverTransactionPrepared: "ReceiverTransactionPrepared",
  ReceiverTransactionFulfilled: "ReceiverTransactionFulfilled",
  ReceiverTransactionCancelled: "ReceiverTransactionCancelled",
} as const;
export type NxtpSdkEvent = typeof NxtpSdkEvents[keyof typeof NxtpSdkEvents];

// TODO: is this the event payload we want? anything else?
export type TransactionCompletedEvent = TransactionFulfilledEvent;

export type SenderTransactionPrepareTokenApprovalPayload = {
  assetId: string;
  chainId: number;
  transactionResponse: providers.TransactionResponse;
};

export type SenderTokenApprovalMinedPayload = {
  assetId: string;
  chainId: number;
  transactionReceipt: providers.TransactionReceipt;
};

export type SenderTransactionPrepareSubmittedPayload = {
  prepareParams: PrepareParams;
  transactionResponse: providers.TransactionResponse;
};

export interface NxtpSdkEventPayloads {
  [NxtpSdkEvents.SenderTransactionPrepareTokenApproval]: SenderTransactionPrepareTokenApprovalPayload;
  [NxtpSdkEvents.SenderTokenApprovalMined]: SenderTokenApprovalMinedPayload;
  [NxtpSdkEvents.SenderTransactionPrepareSubmitted]: SenderTransactionPrepareSubmittedPayload;
  [NxtpSdkEvents.SenderTransactionPrepared]: TransactionPreparedEvent;
  [NxtpSdkEvents.SenderTransactionFulfilled]: TransactionFulfilledEvent;
  [NxtpSdkEvents.SenderTransactionCancelled]: TransactionCancelledEvent;
  [NxtpSdkEvents.ReceiverTransactionPrepared]: TransactionPreparedEvent;
  [NxtpSdkEvents.ReceiverTransactionFulfilled]: TransactionFulfilledEvent;
  [NxtpSdkEvents.ReceiverTransactionCancelled]: TransactionCancelledEvent;
}

const ajv = addFormats(new Ajv(), [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
])
  .addKeyword("kind")
  .addKeyword("modifier");

export const createEvts = (): { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> } => {
  return {
    [NxtpSdkEvents.SenderTransactionPrepareTokenApproval]: Evt.create<SenderTransactionPrepareTokenApprovalPayload>(),
    [NxtpSdkEvents.SenderTokenApprovalMined]: Evt.create<SenderTokenApprovalMinedPayload>(),
    [NxtpSdkEvents.SenderTransactionPrepareSubmitted]: Evt.create<SenderTransactionPrepareSubmittedPayload>(),
    [NxtpSdkEvents.SenderTransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [NxtpSdkEvents.SenderTransactionFulfilled]: Evt.create<TransactionFulfilledEvent>(),
    [NxtpSdkEvents.SenderTransactionCancelled]: Evt.create<TransactionCancelledEvent>(),
    [NxtpSdkEvents.ReceiverTransactionPrepared]: Evt.create<TransactionPreparedEvent>(),
    [NxtpSdkEvents.ReceiverTransactionFulfilled]: Evt.create<TransactionFulfilledEvent>(),
    [NxtpSdkEvents.ReceiverTransactionCancelled]: Evt.create<TransactionCancelledEvent>(),
  };
};

export class NxtpSdk {
  private evts: { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> } = createEvts();

  private readonly transactionManager: TransactionManager;
  private readonly messaging: UserNxtpNatsMessagingService;

  constructor(
    private readonly chainProviders: {
      [chainId: number]: providers.FallbackProvider;
    },
    private readonly signer: Signer,
    private readonly logger: BaseLogger = pino(),
    natsUrl?: string,
    authUrl?: string,
    messaging?: UserNxtpNatsMessagingService,
  ) {
    if (messaging) {
      this.messaging = messaging;
    } else {
      this.messaging = new UserNxtpNatsMessagingService({
        signer,
        logger: logger.child({ module: "UserNxtpNatsMessagingService" }),
        natsUrl,
        authUrl,
      });
    }

    const cc: {
      [chainId: number]: {
        provider: providers.FallbackProvider;
        transactionManagerAddress: string;
      };
    } = {};
    Object.entries(this.chainProviders).forEach(async ([_chainId, provider]) => {
      const chainId = parseInt(_chainId);
      cc[chainId] = {
        provider,
        transactionManagerAddress: getTransactionManagerContractAddress(chainId),
      };
    });
    this.transactionManager = new TransactionManager(
      this.signer,
      this.logger.child({ module: "TransactionManager" }),
      cc,
    );

    // Start up transaction manager listeners
    this.setupListeners();
  }

  public async connectMessaging(bearerToken?: string): Promise<string> {
    const token = await this.messaging.connect(bearerToken);
    return token;
  }

  public async getTransferQuote(params: CrossChainParams): Promise<AuctionResponse> {
    const method = "getTransferQuote";
    const methodId = getRandomBytes32();
    this.logger.info({ method, methodId, params }, "Method started");

    // Validate params schema
    const validate = ajv.compile(CrossChainParamsSchema);
    const valid = validate(params);
    if (!valid) {
      const error = validate.errors?.map((err) => `${err.instancePath} - ${err.message}`).join(",");
      this.logger.error({ method, methodId, error: validate.errors, params }, "Invalid transfer params");
      throw new Error(`Invalid params - ${error}`);
    }

    const user = await this.signer.getAddress();

    const { sendingAssetId, sendingChainId, amount, receivingChainId, receivingAssetId, receivingAddress, expiry } =
      params;
    if (!this.chainProviders[sendingChainId] || !this.chainProviders[receivingChainId]) {
      throw new Error(`Not configured for for chains ${sendingChainId} & ${receivingChainId}`);
    }

    const transactionId = params.transactionId ?? getRandomBytes32();
    const callTo = params.callTo ?? constants.AddressZero;
    const callData = params.callData ?? "0x";

    let encryptedCallData = "0x";
    const callDataHash = utils.keccak256(callData);
    if (callData !== "0x") {
      let encryptionPublicKey;

      try {
        encryptionPublicKey = await ethereum.request({
          method: "eth_getEncryptionPublicKey",
          params: [user], // you must have access to the specified account
        });
      } catch (error) {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          this.logger.info({ method, methodId }, "We can't encrypt anything without the key.");
        } else {
          this.logger.error({ method, methodId, error }, "Error getting encryption key");
        }
        throw error;
      }

      encryptedCallData = await encrypt(callData, encryptionPublicKey);
    }

    if (!this.messaging.isConnected()) {
      await this.messaging.connect();
    }

    const inbox = generateMessagingInbox();
    const receivedResponsePromise = new Promise<AuctionResponse>((res, rej) => {
      setTimeout(() => rej(), 10_000);
      this.messaging.subscribeToAuctionResponse(inbox, (data, err) => {
        if (err) {
          this.logger.error({ method, methodId, err }, "Error in auction response");
          return;
        }

        // check router sig on bid
        const signer = recoverAuctionBid(data.bid, data.bidSignature);
        if (signer !== data.bid.router) {
          this.logger.error({ method, methodId, signer, router: data.bid.router }, "Invalid router signature on bid");
          return;
        }

        // TODO: check contract for router liquidity

        this.logger.info({ method, methodId, data }, "Received auction response");
        res(data);
      });
    });

    await this.messaging.publishAuctionRequest(
      {
        user,
        sendingChainId,
        sendingAssetId,
        amount,
        receivingChainId,
        receivingAssetId,
        receivingAddress,
        callTo,
        callDataHash,
        encryptedCallData,
        expiry,
        transactionId,
      },
      inbox,
    );

    this.logger.info({ method, methodId }, "Waiting up to 10 seconds for responses");
    try {
      const auctionResponse = await receivedResponsePromise;
      this.logger.info({ method, methodId, auctionResponse }, "Received response");
      return auctionResponse;
    } catch (e) {
      throw new Error("No response received");
    }
  }

  public async startTransfer(
    transferParams: AuctionResponse,
    infiniteApprove = false,
  ): Promise<{ prepareResponse: providers.TransactionResponse; transactionId: string }> {
    const method = "transfer";
    const methodId = getRandomBytes32();
    this.logger.info({ method, methodId, transferParams }, "Method started");

    const { bid, bidSignature } = transferParams;
    const {
      user,
      router,
      sendingAssetId,
      receivingAssetId,
      receivingAddress,
      amount,
      expiry,
      callDataHash,
      encryptedCallData,
      sendingChainId,
      receivingChainId,
      callTo,
      transactionId,
    } = bid;
    const encodedBid = encodeAuctionBid(bid);

    if (!this.chainProviders[sendingChainId] || !this.chainProviders[receivingChainId]) {
      throw new Error(`Not configured for for chains ${sendingChainId} & ${receivingChainId}`);
    }

    this.logger.info(
      {
        method,
        methodId,
        amount,
        expiry,
        encodedBid,
        bidSignature,
      },
      "Preparing tx!",
    );

    if (sendingAssetId !== constants.AddressZero) {
      const approveTx = await this.transactionManager.approveTokensIfNeeded(
        sendingChainId,
        sendingAssetId,
        amount,
        infiniteApprove,
      );

      if (approveTx) {
        this.evts.SenderTokenApprovalSubmitted.post({
          assetId: sendingAssetId,
          chainId: sendingChainId,
          transactionResponse: approveTx,
        });
        const approveReceipt = await approveTx.wait(1); // TODO: confs
        if (approveReceipt.status === 0) {
          throw new Error("Approve transaction reverted onchain");
        }
        this.logger.info(
          { method, methodId, transactionId, transactionHash: approveReceipt.transactionHash },
          "Mined approve tx",
        );
        this.evts.SenderTokenApprovalMined.post({
          assetId: sendingAssetId,
          chainId: sendingChainId,
          transactionReceipt: approveReceipt,
        });
      }
    }

    // Prepare sender side tx
    // TODO: validate expiry
    const txData: InvariantTransactionData = {
      user,
      router,
      sendingAssetId,
      receivingAssetId,
      sendingChainFallback: user,
      callTo,
      receivingAddress,
      sendingChainId,
      receivingChainId,
      callDataHash,
      transactionId,
    };
    const params: PrepareParams = {
      txData,
      encryptedCallData,
      bidSignature,
      encodedBid,
      amount,
      expiry,
    };
    const prepareResponse = await this.transactionManager.prepare(sendingChainId, params);
    this.evts.SenderTransactionPrepareSubmitted.post({
      prepareParams: params,
      transactionResponse: prepareResponse,
    });

    // TODO: fix block confs for chains
    this.logger.info(
      { method, methodId, transactionId, transactionHash: prepareResponse.hash },
      "Submitted prepare tx",
    );
    return {
      prepareResponse,
      transactionId,
    };
  }

  public async finishTransfer(
    params: TransactionPreparedEvent,
    useRelayers = true,
  ): Promise<{ fulfillResponse?: providers.TransactionResponse; metaTxResponse?: MetaTxResponse }> {
    const method = "finishTransfer";
    const methodId = getRandomBytes32();
    this.logger.info({ method, methodId, params, useRelayers }, "Method started");

    const { txData, encryptedCallData } = params;

    // TODO
    const relayerFee = "0";

    // Generate signature
    this.logger.info({ method, methodId, transactionId: params.txData.transactionId }, "Generating fulfill signature");
    const signature = await signFulfillTransactionPayload(txData.transactionId, relayerFee, this.signer);
    this.logger.info({ method, methodId }, "Generated signature");

    // Make sure user is on the receiving chain

    // Submit fulfill to receiver chain
    this.logger.info({ method, methodId, transactionId: txData.transactionId, relayerFee }, "Preparing fulfill tx");
    let callData = "0x";
    if (txData.callDataHash !== utils.keccak256(callData)) {
      callData = await ethereum.request({
        method: "eth_decrypt",
        params: [encryptedCallData, txData.user],
      });
    }
    this.logger.info({ method, methodId, transactionId: txData.transactionId, relayerFee }, "Decrypted calldata");

    if (useRelayers) {
      const inbox = generateMessagingInbox();
      const responseInbox = generateMessagingInbox();
      const responsePromise = new Promise<MetaTxResponse>(async (resolve, reject) => {
        await this.messaging.subscribeToMetaTxResponse(responseInbox, (data, err) => {
          this.logger.info({ method, methodId, data, err }, "MetaTx response received");
          if (err) {
            return reject(err);
          }
          this.logger.info({ method, methodId, inbox, data }, "Fulfill metaTx response received");
          return resolve(data);
        });
      });

      await this.messaging.publishMetaTxRequest(
        {
          type: "Fulfill",
          relayerFee,
          to: this.transactionManager.getTransactionManagerAddress(txData.receivingChainId),
          chainId: txData.receivingChainId,
          data: {
            relayerFee,
            signature,
            txData,
            callData,
          },
        },
        inbox,
      );
      this.logger.info({ method, methodId, inbox }, "Fulfill metaTx request published");
      const metaTxResponse = await responsePromise;
      return { metaTxResponse };
    } else {
      const fulfillResponse = await this.transactionManager.fulfill(txData.receivingChainId, {
        callData,
        relayerFee,
        signature,
        txData,
      });
      return { fulfillResponse };
    }
  }

  public async getActiveTransactions(): Promise<{ txData: TransactionData; status: NxtpSdkEvent }[]> {
    return [];
  }

  public async cancelExpired(cancelParams: CancelParams, chainId: number): Promise<providers.TransactionResponse> {
    const tx = await this.transactionManager.cancel(chainId, cancelParams);
    return tx;
  }

  private setupListeners(): void {
    Object.keys(this.chainProviders).forEach((_chainId) => {
      const chainId = parseInt(_chainId);
      // Translate chain events to SDK external events
      this.transactionManager.attach(chainId, TransactionManagerEvents.TransactionPrepared, (data) => {
        if (chainId === data.txData.sendingChainId) {
          return this.evts[NxtpSdkEvents.SenderTransactionPrepared].post(data);
        }
        if (chainId === data.txData.receivingChainId) {
          return this.evts[NxtpSdkEvents.ReceiverTransactionPrepared].post(data);
        }
        return;
      });

      this.transactionManager.attach(chainId, TransactionManagerEvents.TransactionFulfilled, (data) => {
        if (chainId === data.txData.sendingChainId) {
          this.evts[NxtpSdkEvents.SenderTransactionFulfilled].post(data);
        } else if (chainId === data.txData.receivingChainId) {
          this.evts[NxtpSdkEvents.ReceiverTransactionFulfilled].post(data);
        }
      });

      this.transactionManager.attach(chainId, TransactionManagerEvents.TransactionCancelled, (data) => {
        if (chainId === data.txData.sendingChainId) {
          this.evts[NxtpSdkEvents.SenderTransactionCancelled].post(data);
        } else if (chainId === data.txData.receivingChainId) {
          this.evts[NxtpSdkEvents.ReceiverTransactionCancelled].post(data);
        }
      });
    });
  }

  // Listener methods
  public attach<T extends NxtpSdkEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].pipe(filter).attach(...(args as [number, any]));
  }

  public attachOnce<T extends NxtpSdkEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    this.evts[event].pipe(filter).attachOnce(...(args as [number, any]));
  }

  public detach<T extends NxtpSdkEvent>(event?: T): void {
    if (event) {
      this.evts[event].detach();
      return;
    }
    Object.values(this.evts).forEach((evt) => evt.detach());
  }

  public waitFor<T extends NxtpSdkEvent>(
    event: T,
    timeout: number,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
  ): Promise<NxtpSdkEventPayloads[T]> {
    return this.evts[event].pipe(filter).waitFor(timeout) as Promise<NxtpSdkEventPayloads[T]>;
  }
}
