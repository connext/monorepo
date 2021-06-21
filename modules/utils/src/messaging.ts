import axios, { AxiosResponse } from "axios";
import pino, { BaseLogger } from "pino";
import { INatsService, natsServiceFactory } from "ts-natsutil";
import { Signer } from "ethers";

import { isNode } from "./env";
import { safeJsonStringify } from "./json";

export { AuthService } from "ts-natsutil";

export const NATS_AUTH_URL = ""; // TODO add this
export const NATS_WS_URL = "wss://websocket.connext.provide.network";
export const NATS_CLUSTER_URL =
  "nats://nats1.connext.provide.network:4222,nats://nats2.connext.provide.network:4222,nats://nats3.connext.provide.network:4222";

export type MessagingConfig = {
  messagingUrl?: string;
  authUrl?: string;
  natsUrl?: string;
  bearerToken?: string;
  signer?: Signer;
  logger?: BaseLogger;
};

export const getBearerToken = (authUrl: string, signer: Signer) => async (): Promise<string> => {
  const address = await signer.getAddress();
  const nonceResponse = await axios.get(`${authUrl}/auth/${address}`);
  const nonce = nonceResponse.data;
  const sig = await signer.signMessage(nonce);
  const verifyResponse: AxiosResponse<string> = await axios.post(`${authUrl}/auth`, {
    sig,
    userIdentifier: address,
  });
  return verifyResponse.data;
};

export interface BasicMessaging {
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
  private signer?: Signer;

  constructor(config: MessagingConfig) {
    this.log = config.logger || pino();

    // Either messagingUrl or authUrl+natsUrl must be specified
    if (config.messagingUrl) {
      this.authUrl = config.messagingUrl;
      // backwards compatible config for new cluster
      if (config.messagingUrl === "https://messaging.connext.network") {
        config.authUrl = NATS_AUTH_URL;
        config.natsUrl = isNode() ? NATS_CLUSTER_URL : NATS_WS_URL;
      }
      if (isNode()) {
        this.natsUrl = `nats://${
          // Remove protocol prefix and port+path suffix
          config.messagingUrl
            .replace(/^.*:\/\//, "")
            .replace(/\//, "")
            .replace(/:[0-9]+/, "")
        }:4222`;
      } else {
        // Browser env
        this.natsUrl = `${
          // Replace "http" in the protocol with "ws" (preserving an "s" suffix if present)
          config.messagingUrl.replace(/:\/\/.*/, "").replace("http", "ws")
        }://${
          // Remove protocol prefix & path suffix from messaging Url
          config.messagingUrl.replace(/^.*:\/\//, "").replace(/\//, "")
        }/ws-nats`;
      }
      this.log.info(`Derived natsUrl=${this.natsUrl} from messagingUrl=${config.messagingUrl}`);
    } else if (!config.authUrl || !config.natsUrl) {
      config.authUrl = NATS_AUTH_URL;
      config.natsUrl = isNode() ? NATS_CLUSTER_URL : NATS_WS_URL;
    }

    // Let authUrl and/or natsUrl overwrite messagingUrl if both are provided
    if (config.authUrl) {
      this.authUrl = config.authUrl;
    }
    if (config.natsUrl) {
      this.natsUrl = config.natsUrl;
    }

    this.log.info({ natsUrl: this.natsUrl, authUrl: this.authUrl }, "Messaging config generated");

    if (config.bearerToken) {
      this.bearerToken = config.bearerToken;
    } else if (config.signer) {
      this.signer = config.signer;
    } else {
      throw new Error(`Either a bearerToken or signer must be provided`);
    }
  }

  private isConnected(): boolean {
    return !!this.connection?.isConnected();
  }

  public assertConnected(): void {
    if (!this.isConnected()) {
      throw new Error(`No connection detected, use connect() method`);
    }
  }

  async connect(): Promise<void> {
    if (!this.bearerToken) {
      const address = await this.signer!.getAddress();
      const nonce = (await axios.get(`${this.authUrl}/auth/${address}`)).data;
      const sig = await this.signer!.signMessage(nonce);
      const verifyResponse: AxiosResponse<string> = await axios.post(`${this.authUrl}/auth`, {
        sig,
        userIdentifier: address,
      });
      this.bearerToken = verifyResponse.data;
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
    unsubscribeFrom.forEach(sub => {
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
    subscribedTo.forEach(subscribedSubject => {
      let subjectIncludesAllSubstrings = true;
      substrsToMatch.forEach(match => {
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

export interface NxtpMessaging extends BasicMessaging {}

export class NatsNxtpMessagingService extends NatsBasicMessagingService implements NxtpMessaging {}
