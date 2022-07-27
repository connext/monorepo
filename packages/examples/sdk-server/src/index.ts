import * as fs from "fs";

import fastify, { FastifyInstance } from "fastify";
import { ethers } from "ethers";
import { NxtpSdkConfig, NxtpSdkBase, NxtpSdkPool, create } from "@connext/nxtp-sdk";

import { poolRoutes } from "./pool";
import { baseRoutes } from "./base";

let sdkBaseInstance: NxtpSdkBase;
let sdkPoolInstance: NxtpSdkPool;

export const sdkServer = async (): Promise<FastifyInstance> => {
  const server = fastify();

  // Initialize SDK

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
  const signer = privateKey ? new ethers.Wallet(privateKey) : ethers.Wallet.createRandom();
  const signerAddress = await signer.getAddress();

  const nxtpConfig: NxtpSdkConfig = {
    chains: configJson.chains ? configJson.chains : configFile.chains,
    logLevel: configJson.logLevel || configFile.logLevel || "info",
    signerAddress: signerAddress,
  };

  const { nxtpSdkBase, nxtpSdkPool } = await create(nxtpConfig);
  sdkBaseInstance = nxtpSdkBase;
  sdkPoolInstance = nxtpSdkPool;

  // Register routes

  server.get("/ping", async (_, reply) => {
    return reply.status(200).send("pong\n");
  });
  server.register(baseRoutes, sdkBaseInstance);
  server.register(poolRoutes, sdkPoolInstance);

  server.listen(8080, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
  return server;
};

sdkServer();
