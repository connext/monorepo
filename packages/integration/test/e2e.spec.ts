import { createRequestContext, Logger } from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";
import { NxtpSdkBase } from "@connext/nxtp-sdk";
import { constants, utils, Wallet } from "ethers";

import { enrollHandlers } from "./helpers/enrollHandlers";
import { enrollCustom } from "./helpers/enrollCustom";
import { setupRouter } from "./helpers/setupRouter";
import { setupAsset } from "./helpers/setupAsset";

const logger = new Logger({ name: "e2e" });

const wallet = Wallet.fromMnemonic("candy maple cake sugar pudding cream honey rich smooth crumble sweet treat");

const txService = new TransactionService(
  logger,
  {
    "1337": {
      providers: ["http://localhost:8547"],
    },
    "1338": {
      providers: ["http://localhost:8546"],
    },
  },
  wallet,
);

const requestContext = createRequestContext("e2e");
describe("e2e", () => {
  let sdk: NxtpSdkBase;
  before(async () => {
    logger.info("Enrolling handlers...");
    await enrollHandlers(
      [
        {
          domain: "1337",
          ConnextHandler: "0x8273e4B8ED6c78e252a9fCa5563Adfcc75C91b2A",
          PromiseRouterUpgradeBeaconProxy: "0xbaAA2a3237035A2c7fA2A33c76B44a8C6Fe18e87",
          RelayerFeeRouterUpgradeBeaconProxy: "0xEcFcaB0A285d3380E488A39B4BB21e777f8A4EaC",
        },
        {
          domain: "1338",
          ConnextHandler: "0x8273e4B8ED6c78e252a9fCa5563Adfcc75C91b2A",
          PromiseRouterUpgradeBeaconProxy: "0xbaAA2a3237035A2c7fA2A33c76B44a8C6Fe18e87",
          RelayerFeeRouterUpgradeBeaconProxy: "0xEcFcaB0A285d3380E488A39B4BB21e777f8A4EaC",
        },
      ],
      txService,
    );
    logger.info("Enrolled handlers...");

    logger.info("Enrolling custom...");
    await enrollCustom(
      {
        domain: "1337",
        tokenAddress: "0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae",
      },
      [
        {
          domain: "1338",
          tokenAddress: "0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae",
          TokenRegistry: "0x75c35C980C0d37ef46DF04d31A140b65503c0eEd",
        },
      ],
      txService,
    );
    logger.info("Enrolled custom");

    logger.info("Setting up router...");
    await setupRouter(
      "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      [
        { ConnextHandler: "0x8273e4B8ED6c78e252a9fCa5563Adfcc75C91b2A", domain: "1337" },
        { ConnextHandler: "0x8273e4B8ED6c78e252a9fCa5563Adfcc75C91b2A", domain: "1338" },
      ],
      txService,
    );
    logger.info("Set up router");

    logger.info("Setting up assets...");
    await setupAsset(
      { domain: "1337", tokenAddress: "0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae" },
      [
        {
          domain: "1337",
          ConnextHandler: "0x8273e4B8ED6c78e252a9fCa5563Adfcc75C91b2A",
          adopted: "0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae",
        },
        {
          domain: "1338",
          ConnextHandler: "0x8273e4B8ED6c78e252a9fCa5563Adfcc75C91b2A",
          adopted: "0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae",
        },
      ],
      txService,
    );
    logger.info("Set up assets");

    sdk = await NxtpSdkBase.create({
      chains: {
        "1337": {
          assets: [{ address: "0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae", name: "TEST" }],
          providers: ["http://localhost:8547"],
        },
        "1338": {
          assets: [{ address: "0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae", name: "TEST" }],
          providers: ["http://localhost:8546"],
        },
      },
      cartographerUrl: "http://localhost:3000",
      environment: "production",
      signerAddress: wallet.address,
    });

    let tx = await sdk.approveIfNeeded("1337", "0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae", "1", true);
    if (tx) {
      await txService.sendTx({ chainId: 1337, to: tx.to!, value: 0, data: utils.hexlify(tx.data!) }, requestContext);
    }
    if (tx) {
      tx = await sdk.approveIfNeeded("1338", "0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae", "1", true);
    }
  });

  it.only("sends a simple transfer with fast path", async () => {
    await sdk.xcall({
      amount: "1",
      params: {
        originDomain: "1337",
        destinationDomain: "1338",
        to: wallet.address,
        callback: constants.AddressZero,
        callbackFee: "0",
        callData: "0x",
        forceSlow: false,
        receiveLocal: false,
        recovery: wallet.address,
      },
      relayerFee: "1",
      transactingAssetId: "0x8e4C131B37383E431B9cd0635D3cF9f3F628EDae",
    });
  });
});
