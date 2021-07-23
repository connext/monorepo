import axios, { AxiosResponse } from "axios";
import pino, { BaseLogger } from "pino";
import { INatsService, natsServiceFactory } from "ts-natsutil";
import { Signer } from "ethers";
import hyperid from "hyperid";

import { isNode } from "./env";
import { safeJsonStringify } from "./json";
import { NxtpError, NxtpErrorJson, Values } from "./error";
import { FulfillParams } from "./transactionManager";

export { AuthService } from "ts-natsutil";

const hId = hyperid();

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

export const NATS_AUTH_URL = "https://auth.connext.network"; // TODO add this
export const NATS_WS_URL = "wss://websocket.connext.provide.network";
export const NATS_CLUSTER_URL =
  "nats://nats1.connext.provide.network:4222,nats://nats2.connext.provide.network:4222,nats://nats3.connext.provide.network:4222";

export type MessagingConfig = {
  signer: Signer;
  authUrl?: string;
  natsUrl?: string;
  bearerToken?: string;
  logger?: BaseLogger;
};

/**
 * Gets a bearer token by signing the prefix + nonce and sending it to the auth server
 *
 * @param authUrl - URL of NATS auth server
 * @param signer - The signer who is being authed
 * @returns A bearer token
 *
 * TODO: fix typing
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
  private log: BaseLogger;

  private authUrl?: string;
  private bearerToken?: string;
  private natsUrl?: string;
  protected signer: Signer;

  constructor(config: MessagingConfig) {
    this.log = config.logger || pino();

    // default to live cluster
    if (!config.authUrl) {
      config.authUrl = NATS_AUTH_URL;
    }

    if (!config.natsUrl) {
      config.natsUrl = isNode() ? NATS_CLUSTER_URL : NATS_WS_URL;
    }

    this.authUrl = config.authUrl;
    this.natsUrl = config.natsUrl;

    this.log.info({ natsUrl: this.natsUrl, authUrl: this.authUrl }, "Messaging config generated");

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
  async connect(bearerToken?: string): Promise<string> {
    if (bearerToken) {
      this.bearerToken = bearerToken;
    } else if (!this.bearerToken) {
      const token = await getBearerToken(this.authUrl!, this.signer)();
      this.bearerToken = token;
    }
    // TODO: fail fast w sensible error message if bearer token is invalid #446
    const service = natsServiceFactory(
      {
        bearerToken: this.bearerToken,
        natsServers: [this.natsUrl],
      },
      this.log.child({ module: "Messaging-Nats" }),
    );

    const natsConnection = await service.connect();
    this.connection = service;
    this.log.debug(`Connected!`);
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
  public async publish(subject: string, data: any): Promise<void> {
    this.assertConnected();
    const toPublish = safeJsonStringify(data);
    this.log.debug({ subject, data }, `Publishing`);
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
  public async request<T = any, V = any>(subject: string, timeout: number, data: T): Promise<V> {
    this.assertConnected();
    this.log.debug(`Requesting ${subject} with data: ${JSON.stringify(data)}`);
    const response = await this.connection!.request(subject, timeout, JSON.stringify(data));
    this.log.debug(`Request for ${subject} returned: ${JSON.stringify(response)}`);
    return response;
  }

  /**
   * Registers a handler to be invoked anytime a subject receives a published message
   *
   * @param subject - Unique subject to subscribe to
   * @param callback - Logic to invoke
   */
  public async subscribe(subject: string, callback: (msg: any, err?: any) => void): Promise<void> {
    this.assertConnected();
    await this.connection!.subscribe(subject, (msg: any, err?: any): void => {
      const parsedMsg = typeof msg === `string` ? JSON.parse(msg) : msg;
      const parsedData = typeof msg.data === `string` ? JSON.parse(msg.data) : msg.data;
      parsedMsg.data = parsedData;
      callback(msg, err);
    });
    this.log.debug({ subject }, `Subscription created`);
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
      this.connection!.unsubscribe(sub);
    });
  }

  /**
   * Flushes the messaging connection
   */
  public async flush(): Promise<void> {
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

export type AuctionPayload = {
  user: string;
  sendingChainId: number;
  sendingAssetId: string;
  amount: string;
  receivingChainId: number;
  receivingAssetId: string;
  receivingAddress: string;
  expiry: number;
  transactionId: string;
  encryptedCallData: string;
  callDataHash: string;
  callTo: string;
};

export type AuctionBid = {
  user: string;
  router: string;
  sendingChainId: number;
  sendingAssetId: string;
  amount: string;
  receivingChainId: number;
  receivingAssetId: string;
  amountReceived: string;
  receivingAddress: string;
  transactionId: string;
  expiry: number;
  callDataHash: string;
  callTo: string;
  encryptedCallData: string;
  sendingChainTxManagerAddress: string;
  receivingChainTxManagerAddress: string;
  bidExpiry: number;
};

export type AuctionResponse = {
  bid: AuctionBid;
  bidSignature: string;
};

// TODO: fix typing -- should look like this: https://github.com/connext/nxtp/blob/f51d1f4c8a52d26736a421460c2a1e3e0ac506d7/packages/router/src/subgraph.ts#L36-L41 + https://github.com/connext/nxtp/blob/f51d1f4c8a52d26736a421460c2a1e3e0ac506d7/packages/router/src/subgraph.ts#L57-L61
export type MetaTxPayloads = {
  Fulfill: MetaTxFulfillPayload;
};

export type MetaTxFulfillPayload = FulfillParams;

// TODO: include `cancel`
export type MetaTxTypes = "Fulfill";

export type MetaTxPayload<T extends MetaTxTypes> = {
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
  return `_INBOX.${hId()}`;
};

export const AUCTION_SUBJECT = "auction";
export const METATX_SUBJECT = "metatx";

/**
 * @classdesc Contains the logic for handling all the NATS messaging specific to the nxtp protocol (asserts messaging versions and structure)
 */
// TODO: add AJV structure assertions for the messaging envelopes
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
  ): Promise<void> {
    const payload: NxtpMessageEnvelope<T> = {
      responseInbox,
      data,
      version: MESSAGING_VERSION,
      error,
    };
    await this.publish(subject, payload);
  }

  /**
   * Registers some callback to be invoked when a message is received to the provided subject. Will error if the messaging version is not compatible.
   *
   * @param subject - Subject to register callback on
   * @param handler - Callback to be invoked
   */
  protected async subscribeToNxtpMessage<T>(subject: string, handler: (data?: T, err?: any) => void): Promise<void> {
    await this.subscribe(subject, (msg: { data: NxtpMessageEnvelope<T> }, err?: any) => {
      // TODO: validate data structure
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
    });
  }

  /**
   * Subscribes to a subject and executes the handler with a provided inbox. Should be used when subscribing to subjects where responses are required
   *
   * @param subject - Subject to register callback on
   * @param handler - Callback to be invoked
   */
  protected async subscribeToNxtpMessageWithInbox<T>(
    subject: string,
    handler: (inbox: string, data?: T, err?: NxtpErrorJson) => void,
  ): Promise<void> {
    await this.subscribe(subject, (msg: { data: NxtpMessageEnvelope<T> }, err?: any) => {
      // TODO: validate data structure
      // there was an error, run callback with error
      if (err) {
        return handler("ERROR", msg?.data?.data, err);
      }
      if (!checkMessagingVersionValid(msg.data.version)) {
        err = new MessagingError(MessagingError.reasons.VersionError, {
          receivedVersion: msg.data.version,
          ourVersion: MESSAGING_VERSION,
        });
        return handler("ERROR", msg?.data?.data, err);
      }
      return handler(msg.data.responseInbox!, msg?.data?.data, err);
    });
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
    handler: (inbox: string, data?: AuctionPayload, err?: NxtpErrorJson) => void,
  ): Promise<void> {
    await this.subscribeToNxtpMessageWithInbox<AuctionPayload>(
      `*.*.${AUCTION_SUBJECT}`,
      (inbox: string, data?: AuctionPayload, err?: NxtpErrorJson) => {
        return handler(inbox, data, err);
      },
    );
  }

  /**
   * Publishes a bid for an auction
   *
   * @param publishInbox - Unique inbox for the auction
   * @param data - Bid information
   */
  async publishAuctionResponse(publishInbox: string, data: AuctionResponse): Promise<void> {
    await this.publishNxtpMessage(publishInbox, data);
  }

  /**
   * Subscribes to the meta transaction requests for relayer
   *
   * @param handler - Callback that attempts to submit the transaction on behalf of the requester
   */
  async subscribeToMetaTxRequest(
    handler: (inbox: string, data?: MetaTxPayload<any>, err?: NxtpErrorJson) => void,
  ): Promise<void> {
    await this.subscribeToNxtpMessageWithInbox(
      `*.*.${METATX_SUBJECT}`,
      (inbox: string, data?: MetaTxPayload<any>, err?: NxtpErrorJson) => {
        return handler(inbox, data, err);
      },
    );
  }

  /**
   * Publishes a response to a meta transaction submission request
   *
   * @param publishInbox - Unique inbox for the meta tx request
   * @param data - (optional) Meta transaction response information to return to requester. Not needed if submission failed
   * @param err - (optional) Error when submitting meta transaction. Not needed if submission was successful
   */
  async publishMetaTxResponse(publishInbox: string, data?: MetaTxResponse, err?: NxtpErrorJson): Promise<void> {
    await this.publishNxtpMessage(publishInbox, data, undefined, err);
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
  async publishAuctionRequest(data: AuctionPayload, inbox?: string): Promise<{ inbox: string }> {
    if (!inbox) {
      inbox = generateMessagingInbox();
    }
    const signerAddress = await this.signer.getAddress();
    await this.publishNxtpMessage(`${signerAddress}.${signerAddress}.${AUCTION_SUBJECT}`, data, inbox);
    return { inbox };
  }

  /**
   * Handles any responses by routers to a user-initiated auction
   *
   * @param inbox - Inbox where auction responses are sent
   * @param handler - Callback to be executed when an auction response is receivied
   */
  async subscribeToAuctionResponse(inbox: string, handler: (data?: AuctionResponse, err?: any) => void): Promise<void> {
    await this.subscribeToNxtpMessage(inbox, (data?: AuctionResponse, err?: any) => {
      return handler(data, err);
    });
  }

  /**
   * Publishes a request for a relayer to submit a transaction on behalf of the user
   *
   * @param data - The meta transaction information
   * @param inbox - (optional) The inbox for relayers to send responses to. If not provided, one will be generated
   * @returns The inbox that will receive responses
   */
  async publishMetaTxRequest<T extends MetaTxTypes>(
    data: MetaTxPayload<T>,
    inbox?: string,
  ): Promise<{ inbox: string }> {
    if (!inbox) {
      inbox = generateMessagingInbox();
    }
    const signerAddress = await this.signer.getAddress();
    await this.publishNxtpMessage(`${signerAddress}.${signerAddress}.${METATX_SUBJECT}`, data, inbox);
    return { inbox };
  }

  /**
   * Handles any responses by relayers to a meta transaction submission
   *
   * @param inbox - Where relayers will be sending responses
   * @param handler - Callback to handle relayer responses
   */
  async subscribeToMetaTxResponse(inbox: string, handler: (data?: MetaTxResponse, err?: any) => void): Promise<void> {
    await this.subscribeToNxtpMessage(inbox, (data?: MetaTxResponse, err?: any) => {
      return handler(data, err);
    });
  }
}
