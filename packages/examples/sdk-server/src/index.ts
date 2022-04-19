import * as fs from "fs";

import fastify, { FastifyInstance, FastifyReply } from "fastify";
import { RemoveLiquidityResponseSchema, XCallArgsSchema, XCallArgs } from "@connext/nxtp-utils";
import { ethers, providers } from "ethers";
import { NxtpSdkConfig, NxtpSdk } from "@connext/nxtp-sdk";

let sdkInstance: NxtpSdk;

export const sdkServer = () =>
  new Promise<FastifyInstance>(() => {
    const server = fastify();

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
      // return configFile;

      const privateKey: string = configJson.mnemonic;
      const signer = privateKey ? new ethers.Wallet(privateKey) : ethers.Wallet.createRandom();

      const signerAddress = await signer.getAddress();

      const nxtpConfig: NxtpSdkConfig = {
        chains: configJson.chains ? configJson.chains : configFile.chains,
        logLevel: configJson.logLevel || configFile.logLevel || "info",
        signerAddress: signerAddress,
      };

      sdkInstance = await NxtpSdk.create(nxtpConfig, signer);
    });

    server.get("/ping", (_, res) => api.get.ping(res));

    server.post<{ Body: XCallArgs }>(
      "/xcall",
      { schema: { body: XCallArgsSchema, response: { "2xx": RemoveLiquidityResponseSchema } } },
      async (req) => api.post.xcall(req.body),
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
      console.log(req);
      // return re.status(500).send("Not implemented");
      await sdkInstance.xcall(req);
      return {} as providers.TransactionResponse;
    },
  },
};

sdkServer();
