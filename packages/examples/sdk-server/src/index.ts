import * as fs from "fs";

import fastify, { FastifyInstance, FastifyReply } from "fastify";
import {
  XCallArgsSchema,
  XCallArgs,
  getCanonicalFromLocalRequestBodySchema,
  getCanonicalFromLocalRequestBody,
  getPoolRequestBodySchema,
  getPoolRequestBody,
} from "@connext/nxtp-utils";
import { ethers, Signer, providers } from "ethers";
import { NxtpSdkConfig, NxtpSdkBase, NxtpSdkPool, create } from "@connext/nxtp-sdk";

let sdkBaseInstance: NxtpSdkBase;
let sdkPoolInstance: NxtpSdkPool;

export const sdkServer = () =>
  new Promise<FastifyInstance>(() => {
    const server = fastify();
    let signer: Signer;

    server.listen(8080, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });

    server.addHook("onReady", async () => {
      let configJson: Record<string, any> = {};
      let configFile: any = {};

      try {
        configJson = JSON.parse(process.env.NXTP_CONFIG || "");
      } catch (e: unknown) {
        console.info("No NXTP_CONFIG exists, using config file and individual env vars");
      }
      try {
        let json: string;
        const path = process.env.NXTP_CONFIG_FILE ?? "config.json";
        if (fs.existsSync(path)) {
          json = fs.readFileSync(path, { encoding: "utf-8" });
          configFile = JSON.parse(json);
        }
      } catch (e: unknown) {
        console.error("Error reading config file!");
        process.exit(1);
      }

      const privateKey: string = configJson.privateKey;
      signer = privateKey ? new ethers.Wallet(privateKey) : ethers.Wallet.createRandom();
      const signerAddress = await signer.getAddress();

      const nxtpConfig: NxtpSdkConfig = {
        chains: configJson.chains ? configJson.chains : configFile.chains,
        logLevel: configJson.logLevel || configFile.logLevel || "info",
        signerAddress: signerAddress,
      };

      const { nxtpSdkBase, nxtpSdkPool } = await create(nxtpConfig);
      sdkBaseInstance = nxtpSdkBase;
      sdkPoolInstance = nxtpSdkPool;
    });

    // Routes

    server.get("/ping", (_, res) => api.get.ping(res));

    server.post<{ Body: XCallArgs }>(
      "/xcall",
      {
        schema: {
          body: XCallArgsSchema,
        },
      },
      async (req) => api.post.xcall(req.body),
    );
  });

// Handlers

export const api = {
  get: {
    ping: async (res: FastifyReply) => {
      return res.status(200).send("pong\n");
    },
  },
  post: {
    xcall: async (req: XCallArgs): Promise<providers.TransactionRequest> => {
      return await sdkBaseInstance.xcall(req);
    },
  },
};

sdkServer();
