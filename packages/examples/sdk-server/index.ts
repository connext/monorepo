import { RemoveLiquidityResponseSchema, AdminRequest, XCallArgsSchema, XCallArgs } from "@connext/nxtp-utils";
import ethers, { providers } from "ethers";
import * as fs from "fs";

import { NxtpSdkConfig, NxtpSdkConfigSchema, NxtpSdk } from "nxtp-sdk";
import fastify, { FastifyInstance, FastifyReply } from "fastify";

let sdkInstance: NxtpSdk;

export const sdkServer = () =>
  new Promise<FastifyInstance>((res) => {
    const server = fastify();

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
      // return configFile;

      const nxtpConfig: NxtpSdkConfig = {
        chains: configJson.chains ? configJson.chains : configFile.chains,
        logLevel: configJson.logLevel || configFile.logLevel || "info",
      };

      const signer = new ethers.Wallet(configJson.mnemonic || configFile.mnemonic);

      sdkInstance = await NxtpSdk.create(nxtpConfig, signer);
    });

    server.get("/ping", (_, res) => api.get.ping(res));

    server.post<{ Body: XCallArgs }>(
      "/xcall",
      { schema: { body: XCallArgsSchema, response: { "2xx": RemoveLiquidityResponseSchema } } },
      async (req, res) => api.post.xcall(req.body),
    );
  });

export const api = {
  get: {
    ping: async (res: FastifyReply) => {
      return res.status(200).send("pong\n");
    },
  },
  post: {
    xcall: async (req: XCallArgs): Promise<providers.TransactionResponse> => {
      // return re.status(500).send("Not implemented");
      return {} as providers.TransactionResponse;
    },
  },
};

sdkServer();
