import axios, { AxiosResponse } from "axios";
import pino, { BaseLogger } from "pino";
import { INatsService, natsServiceFactory } from "ts-natsutil";
import { Signer } from "ethers";
import hyperid from "hyperid";

import { isNode } from "./env";
import { safeJsonStringify } from "./json";
import { NxtpError, Values } from "./error";
import { FulfillParams } from "./transactionManager";

export { AuthService } from "ts-natsutil";

const hId = hyperid();

const MESSAGE_PREFIX = `Hi there from Connext! Sign this message to make sure that no one can communicate on the Connext Network on your behalf. This will not cost you any Ether!
  
To stop hackers from using your wallet, here's a unique message ID that they can't guess: `;

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

export interface BasicMessaging {
  isConnected(): boolean;
  assertConnected(): void;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  publish(subject: string, data: any): Promise<void>;
  subscribe(subject: string, cb: (data: any) => any): Promise<void>;
  unsubscribe(subject: string): Promise<void>;
  flush(): Promise<void>;
  request(subject: string, timeout: number, data: any): Promise<any>;
}

export class NatsBasicMessagingService implements BasicMessaging {
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

  public isConnected(): boolean {
    return !!this.connection?.isConnected();
  }

  public assertConnected(): void {
    if (!this.isConnected()) {
      throw new MessagingError(MessagingError.reasons.ConnectionError, { message: `Use connect() method` });
    }
  }

  async connect(): Promise<void> {
    if (!this.bearerToken) {
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
  }

  async disconnect(): Promise<void> {
    this.connection?.disconnect();
  }

  // Generic methods
  public async publish(subject: string, data: any): Promise<void> {
    this.assertConnected();
    const toPublish = safeJsonStringify(data);
    this.log.debug({ subject, data }, `Publishing`);
    await this.connection!.publish(subject, toPublish);
  }

  public async request(subject: string, timeout: number, data: any): Promise<any> {
    this.assertConnected();
    this.log.debug(`Requesting ${subject} with data: ${JSON.stringify(data)}`);
    const response = await this.connection!.request(subject, timeout, JSON.stringify(data));
    this.log.debug(`Request for ${subject} returned: ${JSON.stringify(response)}`);
    return response;
  }

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

  public async unsubscribe(subject: string): Promise<void> {
    this.assertConnected();
    const unsubscribeFrom = this.getSubjectsToUnsubscribeFrom(subject);
    unsubscribeFrom.forEach((sub) => {
      this.connection!.unsubscribe(sub);
    });
  }

  public async flush(): Promise<void> {
    await this.connection!.flush();
  }

  // Helper methods
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
const checkMessagingVersionValid = (version: string) => {
  if (version.split(".")[0] === MESSAGING_VERSION.split(".")[0]) {
    return true;
  } else {
    return false;
  }
};

export type NxtpMessageEnvelope<T> = {
  version: string;
  data: T;
  inbox?: string;
};

export type AuctionPayload = { [k: string]: never };
export type AuctionResponse = { [k: string]: never };

export type MetaTxPayloads = {
  Fulfill: MetaTxFulfillPayload;
};

export type MetaTxFulfillPayload = FulfillParams;

export type MetaTxTypes = "Fulfill";

export type MetaTxPayload<T extends MetaTxTypes> = {
  type: T; // can expand to more types
  relayerFee: string;
  to: string;
  data: MetaTxPayloads[T];
  chainId: number;
  responseInbox: string;
};
export type MetaTxResponse = {
  transactionHash: string;
  chainId: number;
};

export const generateMessagingInbox = (): string => {
  return `_INBOX.${hId()}`;
};

export const AUCTION_SUBJECT = "auction";
export const METATX_SUBJECT = "metatx";

export class NatsNxtpMessagingService extends NatsBasicMessagingService {
  protected async publishNxtpMessage<T>(subject: string, data: T, inbox?: string): Promise<void> {
    const payload: NxtpMessageEnvelope<T> = {
      inbox,
      data,
      version: MESSAGING_VERSION,
    };
    await this.publish(subject, payload);
  }

  protected async subscribeToNxtpMessage<T>(subject: string, handler: (data: T, err?: any) => void): Promise<void> {
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

  protected async subscribeToNxtpMessageWithInbox<T>(
    subject: string,
    handler: (data: T, inbox: string, err?: any) => void,
  ): Promise<void> {
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
      return handler(msg?.data?.data, msg.data.inbox!, err);
    });
  }
}

export class RouterNxtpNatsMessagingService extends NatsNxtpMessagingService {
  /**
   * subscribeToAuctionRequest
   * @param handler
   *
   */
  async subscribeToAuctionRequest(handler: (data: AuctionPayload, inbox: string, err?: any) => void): Promise<void> {
    await this.subscribeToNxtpMessageWithInbox<AuctionResponse>(
      `*.*.${AUCTION_SUBJECT}`,
      (data: AuctionResponse, inbox: string, err?: any) => {
        return handler(data, inbox, err);
      },
    );
  }

  async publishAuctionResponse(data: AuctionResponse, publishInbox: string): Promise<void> {
    await this.publishNxtpMessage(publishInbox, data);
  }

  async subscribeToMetaTxRequest(handler: (data: MetaTxPayload<any>, inbox: string, err?: any) => void): Promise<void> {
    await this.subscribeToNxtpMessageWithInbox(
      `*.*.${METATX_SUBJECT}`,
      (data: MetaTxPayload<any>, inbox: string, err?: any) => {
        return handler(data, inbox, err);
      },
    );
  }

  async publishMetaTxResponse(data: MetaTxResponse, publishInbox: string): Promise<void> {
    await this.publishNxtpMessage(publishInbox, data);
  }
}

export class UserNxtpNatsMessagingService extends NatsNxtpMessagingService {
  /**
   * publishAuctionRequest
   * @param data
   * @param inbox
   * @returns
   *
   */
  async publishAuctionRequest(data: AuctionPayload, inbox?: string): Promise<{ inbox: string }> {
    if (!inbox) {
      inbox = generateMessagingInbox();
    }
    const signerAddress = await this.signer.getAddress();
    await this.publishNxtpMessage(`${signerAddress}.${signerAddress}.${AUCTION_SUBJECT}`, data);
    return { inbox };
  }

  async subscribeToAuctionResponse(inbox: string, handler: (data: AuctionResponse, err?: any) => void): Promise<void> {
    await this.subscribeToNxtpMessage(inbox, (data: AuctionResponse, err?: any) => {
      return handler(data, err);
    });
  }

  async publishMetaTxRequest<T extends MetaTxTypes>(
    data: MetaTxPayload<T>,
    inbox?: string,
  ): Promise<{ inbox: string }> {
    if (!inbox) {
      inbox = generateMessagingInbox();
    }
    const signerAddress = await this.signer.getAddress();
    await this.publishNxtpMessage(`${signerAddress}.${signerAddress}.${METATX_SUBJECT}`, data);
    return { inbox };
  }

  async subscribeToMetaTxResponse(inbox: string, handler: (data: MetaTxResponse, err?: any) => void): Promise<void> {
    await this.subscribeToNxtpMessage(inbox, (data: MetaTxResponse, err?: any) => {
      return handler(data, err);
    });
  }
}
