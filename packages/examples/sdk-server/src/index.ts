import * as fs from "fs";

import fastify, { FastifyInstance } from "fastify";
import { ethers, providers } from "ethers";
import { SdkConfig, SdkBase, SdkPool, SdkUtils, SdkRouter, create } from "@connext/sdk";

import { baseRoutes } from "./base";
import { poolRoutes } from "./pool";
import { utilsRoutes } from "./utils";
import { routerRoutes } from "./router";

let sdkBaseInstance: SdkBase;
let sdkPoolInstance: SdkPool;
let sdkUtilsInstance: SdkUtils;
let sdkRouterInstance: SdkRouter;

export const sdkServer = async (): Promise<FastifyInstance> => {
  const server = fastify();

  // Initialize SDK

  let configJson: Record<string, any> = {};

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
      configJson = JSON.parse(json);
    }
  } catch (e: unknown) {
    console.error("Error reading config file!");
    process.exit(1);
  }

  const privateKey: string = configJson.privateKey;
  const mnemonic: string = configJson.mnemonic;
  const signer = privateKey
    ? new ethers.Wallet(privateKey)
    : ethers.Wallet.fromMnemonic(mnemonic) ?? ethers.Wallet.createRandom();
  const signerAddress = await signer.getAddress();

  const configuredProviders: Record<string, providers.JsonRpcProvider> = {};
  const chains = configJson.chains;
  for (const key in chains) {
    const chain = chains[key];
    const url: string = chain.providers[0];
    const provider = new ethers.providers.JsonRpcProvider(url);
    configuredProviders[key] = provider;
  }

  const nxtpConfig: SdkConfig = {
    chains: chains,
    logLevel: configJson.logLevel || "info",
    signerAddress: signerAddress,
    network: configJson.network,
    environment: configJson.environment,
    cartographerUrl: configJson.cartographerUrl,
  };

  const { sdkBase, sdkPool, sdkUtils, sdkRouter } = await create(nxtpConfig);

  sdkBaseInstance = sdkBase;
  sdkPoolInstance = sdkPool;
  sdkUtilsInstance = sdkUtils;
  sdkRouterInstance = sdkRouter;

  // Register routes

  server.get("/ping", async (_, reply) => {
    return reply.status(200).send("pong\n");
  });

  server.post<{
    Params: { domainId: string };
    Body: providers.TransactionRequest;
  }>("/sendTransaction/:domainId", async (request, reply) => {
    const feeData = await configuredProviders[request.params.domainId].getFeeData();
    // request.body.gasLimit = ethers.BigNumber.from("20000");
    request.body.gasPrice = feeData.gasPrice!;
    const txRes = await signer.connect(configuredProviders[request.params.domainId]).sendTransaction(request.body);
    const txRec = await txRes.wait();
    reply.status(200).send(txRec);
  });

  server.register(baseRoutes, sdkBaseInstance);
  server.register(poolRoutes, sdkPoolInstance);
  server.register(utilsRoutes, sdkUtilsInstance);
  server.register(routerRoutes, sdkRouterInstance);

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
