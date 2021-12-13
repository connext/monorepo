import axios, { AxiosResponse } from "axios";
import { INatsService, natsServiceFactory } from "ts-natsutil";
import { Signer } from "ethers";
import { Type, Static } from "@sinclair/typebox";

import { TIntegerString, TAddress, TChainId } from "./basic";
import { isNode } from "./env";
import { safeJsonStringify } from "./json";
import { NxtpError, NxtpErrorJson, Values } from "./error";
import { FulfillParams } from "./transactionManager";
import { createLoggingContext, createRequestContext, getUuid, RequestContext } from "./request";
import { Logger } from "./logger";

export { AuthService } from "ts-natsutil";

const MESSAGE_PREFIX = `Hi there from Connext! Sign this message to make sure that no one can communicate on the Connext Network on your behalf. This will not cost you any Ether!
  
To stop hackers from using your wallet, here's a unique message ID that they can't guess: `;

/**
 * @classdesc Errors thrown by all messaging classes defined in this file.
 */
export class MessagingError extends NxtpError {
  static readonly type = "MessagingError";
  static readonly reasons = {
    ConfigError: "Error in configuration",
    ConnectionError: "No connection detected",
    VersionError: "Incoming message version not compatible",
  };

  constructor(
    public readonly message: Values<typeof MessagingError.reasons> | string,
    public readonly context: any = {},
  ) {
    super(message, context, MessagingError.type);
  }
}

export const NATS_AUTH_URL = "https://auth.connext.network";
export const NATS_WS_URL = "wss://websocket.connext.provide.network";
export const NATS_CLUSTER_URL =
  "nats://nats1.connext.provide.network:4222,nats://nats2.connext.provide.network:4222,nats://nats3.connext.provide.network:4222";

export const NATS_AUTH_URL_TESTNET = NATS_AUTH_URL;
export const NATS_WS_URL_TESTNET = NATS_WS_URL;
export const NATS_CLUSTER_URL_TESTNET = NATS_CLUSTER_URL;

export const NATS_AUTH_URL_LOCAL = "http://localhost:5040";
export const NATS_WS_URL_LOCAL = "ws://localhost:4221";
export const NATS_CLUSTER_URL_LOCAL = "nats://localhost:4222";

export type MessagingConfig = {
  signer: Signer;
  authUrl?: string;
  natsUrl?: string;
  bearerToken?: string;
  logger?: Logger;
};

/**
 * Gets a bearer token by signing the prefix + nonce and sending it to the auth server
 *
 * @param authUrl - URL of NATS auth server
 * @param signer - The signer who is being authed
 * @returns A bearer token
 *
 * TODO: #155 fix typing
 */
export const getBearerToken = (authUrl: string, signer: Signer) => async (): Promise<string> => {
  const address = await signer.getAddress();
  const nonceResponse = await axios.get(`${authUrl}/auth/${address}`);
  const nonce = nonceResponse.data;
  const sig = await signer.signMessage(`${MESSAGE_PREFIX}${nonce}`);
  const verifyResponse: AxiosResponse<string> = await axios.post(`${authUrl}/auth`, {
    sig,
    signerAddress: address,
  });
  return verifyResponse.data;
};

/**
 * @classdesc Handles all low-level messaging logic (subscribe, publish, request, reply, etc.)
 */
export class NatsBasicMessagingService {
  private connection: INatsService | undefined;
  private log: Logger;

  private authUrl: string;
  private bearerToken?: string;
  private natsUrl?: string;
  protected signer: Signer;

  constructor(config: MessagingConfig) {
    this.log = config.logger || new Logger({ level: "info", name: NatsBasicMessagingService.name });

    // create request and method context
    const { requestContext, methodContext } = createLoggingContext("NatsBasicMessagingService.constructor");

    // default to live cluster
    if (!config.authUrl) {
      config.authUrl = NATS_AUTH_URL;
    }

    if (!config.natsUrl) {
      config.natsUrl = isNode() ? NATS_CLUSTER_URL : NATS_WS_URL;
    }

    this.authUrl = config.authUrl;
    this.natsUrl = config.natsUrl;

    this.log.info("Messaging config generated", requestContext, methodContext, {
      natsUrl: this.natsUrl,
      authUrl: this.authUrl,
    });

    if (config.bearerToken) {
      this.bearerToken = config.bearerToken;
    } else if (!config.signer) {
      throw new MessagingError(MessagingError.reasons.ConfigError, { message: `A bearerToken must be provided` });
    }
    this.signer = config.signer;
  }

  /**
   * Returns boolean indicator representing messaging service connection status
   *
   * @returns Boolean indiciating if the messaging service is properly connected
   */
  public isConnected(): boolean {
    return !!this.connection?.isConnected();
  }

  /**
   * Will throw an error if the messaging service is not connected
   */
  public assertConnected(): void {
    if (!this.isConnected()) {
      throw new MessagingError(MessagingError.reasons.ConnectionError, { message: `Use connect() method` });
    }
  }

  /**
   * Will establish a connection to the messaging service.
   *
   * @param bearerToken - (optional) The token to use with the auth server. If not provided, will fetch one
   *
   * @returns The bearer token used for auth
   */
  async connect(bearerToken?: string, _requestContext?: RequestContext): Promise<string> {
    const { requestContext, methodContext } = createLoggingContext(this.connect.name, _requestContext);
    if (bearerToken) {
      this.bearerToken = bearerToken;
    } else if (!this.bearerToken) {
      const token = await getBearerToken(this.authUrl, this.signer)();
      this.bearerToken = token;
    }
    // TODO: #155 fail fast w sensible error message if bearer token is invalid #446
    const service = natsServiceFactory(
      {
        bearerToken: this.bearerToken,
        natsServers: [this.natsUrl],
      },
      this.log.child({ module: "Messaging-Nats" }, "debug"),
    );

    let natsConnection;
    try {
      natsConnection = await service.connect();
    } catch (e) {
      this.bearerToken = undefined;
      throw e;
    }
    this.connection = service;
    this.log.debug(`Connected!`, requestContext, methodContext);
    if (typeof natsConnection.addEventListener === "function") {
      natsConnection.addEventListener("close", async () => {
        this.bearerToken = undefined;
        await this.connect();
      });
    } else {
      natsConnection.on("close", async () => {
        this.bearerToken = undefined;
        await this.connect();
      });
    }
    return this.bearerToken;
  }

  /**
   * Will disconnect the messaging service
   */
  async disconnect(): Promise<void> {
    this.connection?.disconnect();
  }

  // Generic methods
  /**
   * Publishes a message
   *
   * @param subject - Subject to publish message to
   * @param data - Data to be published
   */
  public async publish<T = any>(subject: string, data: T, _requestContext?: RequestContext): Promise<void> {
    const { requestContext, methodContext } = createLoggingContext(this.publish.name, _requestContext);
    this.assertConnected();
    const toPublish = safeJsonStringify(data);
    this.log.debug(`Publishing`, requestContext, methodContext, { subject, data });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    await this.connection!.publish(subject, toPublish);
  }

  /**
   * Requests a response from a given subject
   *
   * @param subject - Subject you are requesting a response from
   * @param timeout - Time you are willing to wait for a response in ms. If met, will reject.
   * @param data - Data you include along with your request
   * @returns A response (if received before timeout)
   */
  public async request<T = any, V = any>(
    subject: string,
    timeout: number,
    data: T,
    _requestContext?: RequestContext,
  ): Promise<V> {
    const { requestContext, methodContext } = createLoggingContext(this.request.name, _requestContext);
    this.assertConnected();
    this.log.debug(`Requesting`, requestContext, methodContext, { subject, data });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const response = await this.connection!.request(subject, timeout, JSON.stringify(data));
    this.log.debug(`Request returned`, requestContext, methodContext, { subject, response });
    return response;
  }

  /**
   * Registers a handler to be invoked anytime a subject receives a published message
   *
   * @param subject - Unique subject to subscribe to
   * @param callback - Logic to invoke
   */
  public async subscribe(
    subject: string,
    callback: (msg: any, err?: any) => void,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const { requestContext, methodContext } = createLoggingContext(this.subscribe.name, _requestContext);
    this.assertConnected();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    await this.connection!.subscribe(subject, (msg: any, err?: any): void => {
      const parsedMsg = typeof msg === `string` ? JSON.parse(msg) : msg;
      const parsedData = typeof msg.data === `string` ? JSON.parse(msg.data) : msg.data;
      parsedMsg.data = parsedData;
      callback(msg, err);
    });
    this.log.debug("Subscription created", requestContext, methodContext, { subject });
  }

  /**
   * Removes any registered handlers from the specified subject
   *
   * @param subject - Subject to remove handlers from
   */
  public async unsubscribe(subject: string): Promise<void> {
    this.assertConnected();
    const unsubscribeFrom = this.getSubjectsToUnsubscribeFrom(subject);
    unsubscribeFrom.forEach((sub) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      this.connection!.unsubscribe(sub);
    });
  }

  /**
   * Flushes the messaging connection
   */
  public async flush(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    await this.connection!.flush();
  }

  // Helper methods
  /**
   * Gets all full matching subjects that must be unsubscribed from. I.e. if given "*.auction" will unsubscribe from any subjects ending with "-auction"
   *
   * @param subject - Subject to match other subjects against when unsubscribing
   * @returns All full matching subjects to unsubscribe from
   */
  protected getSubjectsToUnsubscribeFrom(subject: string): string[] {
    // must account for wildcards
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const subscribedTo = this.connection!.getSubscribedSubjects();
    const unsubscribeFrom: string[] = [];

    // get all the substrings to match in the existing subscriptions
    // anything after `>` doesnt matter
    // `*` represents any set of characters
    // if no match for split, will return [subject]
    const substrsToMatch = subject.split(`>`)[0].split(`*`);
    subscribedTo.forEach((subscribedSubject) => {
      let subjectIncludesAllSubstrings = true;
      substrsToMatch.forEach((match) => {
        if (!(subscribedSubject ?? "").includes(match) && match !== ``) {
          subjectIncludesAllSubstrings = false;
        }
      });
      if (subjectIncludesAllSubstrings) {
        unsubscribeFrom.push(subscribedSubject);
      }
    });

    return unsubscribeFrom;
  }
}

const MESSAGING_VERSION = "0.0.1";
/**
 * Returns trye if the major messaging version matches the current messaging version
 *
 * @param version Received version
 * @returns True if major versions match, false otherwise
 */
const checkMessagingVersionValid = (version: string) => {
  if (version.split(".")[0] === MESSAGING_VERSION.split(".")[0]) {
    return true;
  } else {
    return false;
  }
};

export type NxtpMessageEnvelope<T> = {
  version: string;
  data?: T;
  responseInbox?: string;
  error?: NxtpErrorJson;
};

export const AuctionPayloadSchema = Type.Object({
  user: TAddress,
  initiator: TAddress,
  sendingChainId: TChainId,
  sendingAssetId: TAddress,
  amount: TIntegerString,
  receivingChainId: TChainId,
  receivingAssetId: TAddress,
  receivingAddress: TAddress,
  expiry: Type.Number(),
  transactionId: Type.RegEx(/^0x[a-fA-F0-9]{64}$/),
  encryptedCallData: Type.RegEx(/^0x[a-fA-F0-9]*$/),
  callDataHash: Type.RegEx(/^0x[a-fA-F0-9]{64}$/),
  callTo: TAddress,
  dryRun: Type.Boolean(),
});

export type AuctionPayload = Static<typeof AuctionPayloadSchema>;

export const AuctionBidSchema = Type.Object({
  user: TAddress,
  router: TAddress,
  initiator: TAddress,
  sendingChainId: TChainId,
  sendingAssetId: TAddress,
  amount: TIntegerString,
  receivingChainId: TChainId,
  receivingAssetId: TAddress,
  amountReceived: TIntegerString,
  receivingAddress: TAddress,
  transactionId: Type.RegEx(/^0x[a-fA-F0-9]{64}$/),
  expiry: Type.Number(),
  callDataHash: Type.RegEx(/^0x[a-fA-F0-9]{64}$/),
  callTo: TAddress,
  encryptedCallData: Type.RegEx(/^0x[a-fA-F0-9]*$/),
  sendingChainTxManagerAddress: TAddress,
  receivingChainTxManagerAddress: TAddress,
  bidExpiry: Type.Number(),
});

export type AuctionBid = Static<typeof AuctionBidSchema>;

export const AuctionResponseSchema = Type.Object({
  bid: AuctionBidSchema,
  gasFeeInReceivingToken: TIntegerString,
  bidSignature: Type.Optional(Type.String()),
});

export type AuctionResponse = Static<typeof AuctionResponseSchema>;

export type StatusResponse = {
  routerVersion: string;
  routerAddress: string;
  signerAddress: string;
  trackerLength: number;
  activeTransactionsLength: number;
  swapPools: Map<number, string[]>;
  supportedChains: number[];
};

export const MetaTxTypes = {
  Fulfill: "Fulfill",
} as const;
export type MetaTxType = typeof MetaTxTypes[keyof typeof MetaTxTypes];

export type MetaTxPayloads = {
  [MetaTxTypes.Fulfill]: MetaTxFulfillPayload;
};

export type MetaTxFulfillPayload = FulfillParams;

// TODO: #155 include `cancel`

export type MetaTxPayload<T extends MetaTxType> = {
  type: T; // can expand to more types
  relayerFee: string;
  to: string;
  data: MetaTxPayloads[T];
  chainId: number;
};
export type MetaTxResponse = {
  transactionHash: string;
  chainId: number;
};

/**
 * Creates a unique inbox to use for messaging responses
 * @returns A unique inbox string to receive replies to
 */
export const generateMessagingInbox = (): string => {
  return `_INBOX.${getUuid()}`;
};

export const AUCTION_REQUEST_SUBJECT = "auction.request";
export const AUCTION_RESPONSE_SUBJECT = "auction.response";
export const METATX_REQUEST_SUBJECT = "metatx.request";
export const METATX_RESPONSE_SUBJECT = "metatx.response";
export const STATUS_REQUEST_SUBJECT = "status.request";
export const STATUS_RESPONSE_SUBJECT = "status.response";

/**
 * @classdesc Contains the logic for handling all the NATS messaging specific to the nxtp protocol (asserts messaging versions and structure)
 */
// TODO: #155 add AJV structure assertions for the messaging envelopes
export class NatsNxtpMessagingService extends NatsBasicMessagingService {
  /**
   * Publishes data to a subject that conforms to the NXTP message structure
   *
   * @param subject - Where to publish data
   * @param data - (optional) Data to publish
   * @param responseInbox - (optional) Where responses should be published
   * @param error - (optional) Error json to be published
   */
  protected async publishNxtpMessage<T>(
    subject: string,
    data?: T,
    responseInbox?: string,
    error?: NxtpErrorJson,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const requestContext = _requestContext ?? createRequestContext(this.publishNxtpMessage.name);
    const payload: NxtpMessageEnvelope<T> = {
      responseInbox,
      data,
      version: MESSAGING_VERSION,
      error,
    };
    await this.publish(subject, payload, requestContext);
  }

  /**
   * Registers some callback to be invoked when a message is received to the provided subject. Will error if the messaging version is not compatible.
   *
   * @param subject - Subject to register callback on
   * @param handler - Callback to be invoked
   */
  protected async subscribeToNxtpMessage<T>(
    subject: string,
    handler: (data?: T, err?: any) => void,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const requestContext = _requestContext ?? createRequestContext(this.subscribeToNxtpMessage.name);
    await this.subscribe(
      subject,
      (msg: { data: NxtpMessageEnvelope<T> }, err?: any) => {
        // TODO: #155 validate data structure
        // there was an error, run callback with error
        if (err) {
          return handler(msg?.data?.data, err);
        }
        if (!checkMessagingVersionValid(msg.data.version)) {
          err = new MessagingError(MessagingError.reasons.VersionError, {
            receivedVersion: msg.data.version,
            ourVersion: MESSAGING_VERSION,
          });
          return handler(msg?.data?.data, err);
        }
        return handler(msg?.data?.data, err);
      },
      requestContext,
    );
  }

  /**
   * Subscribes to a subject and executes the handler with a provided inbox. Should be used when subscribing to subjects where responses are required
   *
   * @param subject - Subject to register callback on
   * @param handler - Callback to be invoked
   */
  protected async subscribeToNxtpMessageWithInbox<T>(
    subject: string,
    handler: (from: string, inbox: string, data?: T, err?: NxtpErrorJson) => void,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const requestContext = _requestContext ?? createRequestContext(this.subscribeToNxtpMessageWithInbox.name);
    await this.subscribe(
      subject,
      (msg: { subject: string; data: NxtpMessageEnvelope<T> }, err?: any) => {
        const from = msg.subject.split(".")[0];
        // TODO: #155 validate data structure
        // there was an error, run callback with error
        if (err) {
          return handler(from, "ERROR", msg?.data?.data, err);
        }
        if (!checkMessagingVersionValid(msg.data.version)) {
          err = new MessagingError(MessagingError.reasons.VersionError, {
            receivedVersion: msg.data.version,
            ourVersion: MESSAGING_VERSION,
          });
          return handler(from, "ERROR", msg?.data?.data, err);
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return handler(from, msg.data.responseInbox!, msg?.data?.data, err);
      },
      requestContext,
    );
  }
}

/**
 * @classdesc Handles NXTP messaging logic that is specific to the messages a router will need to handle.
 *
 */
export class RouterNxtpNatsMessagingService extends NatsNxtpMessagingService {
  /**
   * Subscribes auction response/bidding logic for the routers
   *
   * @param handler - Callback that defines the bid-submission logic when an auction is broadcast
   *
   */
  async subscribeToAuctionRequest(
    handler: (from: string, inbox: string, data?: AuctionPayload, err?: NxtpErrorJson) => void,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const requestContext = _requestContext ?? createRequestContext(this.subscribeToAuctionRequest.name);
    await this.subscribeToNxtpMessageWithInbox<AuctionPayload>(
      `*.*.${AUCTION_REQUEST_SUBJECT}`,
      (from: string, inbox: string, data?: AuctionPayload, err?: NxtpErrorJson) => {
        return handler(from, inbox, data, err);
      },
      requestContext,
    );
  }

  /**
   * Publishes a bid for an auction
   *
   * @param publishInbox - Unique inbox for the auction
   * @param publishInbox - Unique inbox for the auction
   * @param data - Bid information
   */
  async publishAuctionResponse(
    from: string,
    publishInbox: string,
    data: AuctionResponse,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const requestContext = _requestContext ?? createRequestContext(this.publishAuctionResponse.name);
    const signerAddress = await this.signer.getAddress();
    await this.publishNxtpMessage(
      `${from}.${signerAddress}.${AUCTION_RESPONSE_SUBJECT}`,
      data,
      publishInbox,
      undefined, // error
      requestContext,
    );
  }

  /**
   * Subscribes to the meta transaction requests for relayer
   *
   * @param handler - Callback that attempts to submit the transaction on behalf of the requester
   */
  async subscribeToMetaTxRequest(
    handler: (from: string, inbox: string, data?: MetaTxPayload<any>, err?: NxtpErrorJson) => void,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const requestContext = _requestContext ?? createRequestContext(this.subscribeToMetaTxRequest.name);
    await this.subscribeToNxtpMessageWithInbox(
      `*.*.${METATX_REQUEST_SUBJECT}`,
      (from: string, inbox: string, data?: MetaTxPayload<any>, err?: NxtpErrorJson) => {
        return handler(from, inbox, data, err);
      },
      requestContext,
    );
  }

  /**
   * Publishes a response to a meta transaction submission request
   *
   * @param publishInbox - Unique inbox for the meta tx request
   * @param data - (optional) Meta transaction response information to return to requester. Not needed if submission failed
   * @param err - (optional) Error when submitting meta transaction. Not needed if submission was successful
   */
  async publishMetaTxResponse(
    from: string,
    publishInbox: string,
    data?: MetaTxResponse,
    err?: NxtpErrorJson,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const requestContext = _requestContext ?? createRequestContext(this.publishMetaTxResponse.name);
    const signerAddress = await this.signer.getAddress();
    await this.publishNxtpMessage(
      `${from}.${signerAddress}.${METATX_RESPONSE_SUBJECT}`,
      data,
      publishInbox,
      err,
      requestContext,
    );
  }

  /**
   * Subscribes to the get status requests
   *
   * @param handler - Callback that attempts to get status on behalf of the requester
   */
  async subscribeToStatusRequest(
    handler: (from: string, inbox: string, data?: any, err?: NxtpErrorJson) => void,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const requestContext = _requestContext ?? createRequestContext(this.subscribeToStatusRequest.name);
    await this.subscribeToNxtpMessageWithInbox(
      `*.*.${STATUS_REQUEST_SUBJECT}`,
      (from: string, inbox: string, data?: any, err?: NxtpErrorJson) => {
        return handler(from, inbox, data, err);
      },
      requestContext,
    );
  }

  async publishStatusResponse(
    from: string,
    publishInbox: string,
    data?: StatusResponse,
    err?: NxtpErrorJson,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const requestContext = _requestContext ?? createRequestContext(this.publishStatusResponse.name);
    const signerAddress = await this.signer.getAddress();
    await this.publishNxtpMessage(
      `${from}.${signerAddress}.${STATUS_RESPONSE_SUBJECT}`,
      data,
      publishInbox,
      err,
      requestContext,
    );
  }
}

/**
 * @classdesc Handles NXTP messaging logic that is specific to the messages a user will need to handle.
 *
 */
export class UserNxtpNatsMessagingService extends NatsNxtpMessagingService {
  /**
   * Publishes an auction request to initiate the crosschain transfer process
   *
   * @param data - Auction information needed by routers to submit bid
   * @param inbox - (optional) Where routers should respond to. If not provided, will be generated
   * @returns The inbox string to expect responses at
   *
   */
  async publishAuctionRequest(
    data: AuctionPayload,
    inbox?: string,
    _requestContext?: RequestContext,
  ): Promise<{ inbox: string }> {
    if (!inbox) {
      inbox = generateMessagingInbox();
    }
    const signerAddress = await this.signer.getAddress();
    await this.publishNxtpMessage(
      `${signerAddress}.${signerAddress}.${AUCTION_REQUEST_SUBJECT}`,
      data,
      inbox,
      undefined, // error
      _requestContext ?? createRequestContext(this.publishAuctionRequest.name),
    );
    return { inbox };
  }

  /**
   * Handles any responses by routers to a user-initiated auction
   *
   * @param inbox - Inbox where auction responses are sent
   * @param handler - Callback to be executed when an auction response is receivied
   */
  async subscribeToAuctionResponse(
    handler: (from: string, inbox: string, data?: AuctionResponse, err?: any) => void,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const signerAddress = await this.signer.getAddress();
    await this.subscribeToNxtpMessageWithInbox<AuctionResponse>(
      `${signerAddress}.*.${AUCTION_RESPONSE_SUBJECT}`,
      (from: string, inbox: string, data?: AuctionResponse, err?: NxtpErrorJson) => {
        return handler(from, inbox, data, err);
      },
      _requestContext ?? createRequestContext(this.subscribeToAuctionResponse.name),
    );
  }

  /**
   * Publishes a request for a relayer to submit a transaction on behalf of the user
   *
   * @param data - The meta transaction information
   * @param inbox - (optional) The inbox for relayers to send responses to. If not provided, one will be generated
   * @returns The inbox that will receive responses
   */
  async publishMetaTxRequest<T extends MetaTxType>(
    data: MetaTxPayload<T>,
    inbox?: string,
    _requestContext?: RequestContext,
  ): Promise<{ inbox: string }> {
    if (!inbox) {
      inbox = generateMessagingInbox();
    }
    const signerAddress = await this.signer.getAddress();
    await this.publishNxtpMessage(
      `${signerAddress}.${signerAddress}.${METATX_REQUEST_SUBJECT}`,
      data,
      inbox,
      undefined, // error
      _requestContext ?? createRequestContext(this.publishMetaTxRequest.name),
    );
    return { inbox };
  }

  /**
   * Handles any responses by relayers to a meta transaction submission
   *
   * @param inbox - Where relayers will be sending responses
   * @param handler - Callback to handle relayer responses
   */
  async subscribeToMetaTxResponse(
    handler: (from: string, inbox: string, data?: MetaTxResponse, err?: any) => void,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const signerAddress = await this.signer.getAddress();
    await this.subscribeToNxtpMessageWithInbox<MetaTxResponse>(
      `${signerAddress}.*.${METATX_RESPONSE_SUBJECT}`,
      (from: string, inbox: string, data?: MetaTxResponse, err?: NxtpErrorJson) => {
        return handler(from, inbox, data, err);
      },
      _requestContext ?? createRequestContext(this.subscribeToMetaTxResponse.name),
    );
  }

  async publishStatusRequest(data: any, inbox?: string, _requestContext?: RequestContext): Promise<{ inbox: string }> {
    if (!inbox) {
      inbox = generateMessagingInbox();
    }
    const signerAddress = await this.signer.getAddress();
    await this.publishNxtpMessage(
      `${signerAddress}.${signerAddress}.${STATUS_REQUEST_SUBJECT}`,
      data,
      inbox,
      undefined, // error
      _requestContext ?? createRequestContext(this.publishStatusRequest.name),
    );
    return { inbox };
  }

  async subscribeToStatusResponse(
    handler: (from: string, inbox: string, data?: StatusResponse, err?: any) => void,
    _requestContext?: RequestContext,
  ): Promise<void> {
    const signerAddress = await this.signer.getAddress();
    await this.subscribeToNxtpMessageWithInbox<any>(
      `${signerAddress}.*.${STATUS_RESPONSE_SUBJECT}`,
      (from: string, inbox: string, data?: any, err?: NxtpErrorJson) => {
        return handler(from, inbox, data, err);
      },
      _requestContext ?? createRequestContext(this.subscribeToStatusResponse.name),
    );
  }
}
