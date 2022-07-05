import { createRequestContext, Logger } from "@connext/nxtp-utils";
import { ConnextHandlerAbi } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";
import { NxtpSdkBase } from "@connext/nxtp-sdk";
import { constants, utils, Wallet } from "ethers";

import { enrollHandlers } from "./helpers/enrollHandlers";
import { enrollCustom } from "./helpers/enrollCustom";
import { setupRouter } from "./helpers/setupRouter";
import { setupAsset } from "./helpers/setupAsset";

// TODO: Move to a sep. constants file (current constants file is for live integration tests).

const defaultWallet = Wallet.fromMnemonic("candy maple cake sugar pudding cream honey rich smooth crumble sweet treat");
const PARAMETERS = {
  ENVIRONMENT: "production",
  AGENTS: {
    ROUTER: {
      address: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    },
    CARTOGRAPHER: {
      url: "http://localhost:3000",
    },
    USER: {
      address: defaultWallet.address,
      signer: defaultWallet,
    },
  },
  // NOTE: Current test parameters / setup here assumes the token used is local on both chains.
  // i.e. there's no swap from adopted -> local on origin or local -> adopted on destination
  ASSET: {
    address: "0x1411CB266FCEd1587b0AA29E9d5a9Ef3Db64A9C5",
    name: "TEST",
  },
  A: {
    DOMAIN: "1337",
    CHAIN: 1337,
    RPC: ["http://localhost:8547"],
    DEPLOYMENTS: {
      ConnextHandler: "0x8273e4B8ED6c78e252a9fCa5563Adfcc75C91b2A",
      PromiseRouterUpgradeBeaconProxy: "0xbaAA2a3237035A2c7fA2A33c76B44a8C6Fe18e87",
      RelayerFeeRouterUpgradeBeaconProxy: "0xEcFcaB0A285d3380E488A39B4BB21e777f8A4EaC",
    },
  },
  B: {
    DOMAIN: "1338",
    CHAIN: 1338,
    RPC: ["http://localhost:8546"],
    DEPLOYMENTS: {
      ConnextHandler: "0x8273e4B8ED6c78e252a9fCa5563Adfcc75C91b2A",
      PromiseRouterUpgradeBeaconProxy: "0xbaAA2a3237035A2c7fA2A33c76B44a8C6Fe18e87",
      RelayerFeeRouterUpgradeBeaconProxy: "0xEcFcaB0A285d3380E488A39B4BB21e777f8A4EaC",
      TokenRegistry: "0x75c35C980C0d37ef46DF04d31A140b65503c0eEd",
    },
  },
};

const logger = new Logger({ name: "e2e" });

const wallet = Wallet.fromMnemonic("candy maple cake sugar pudding cream honey rich smooth crumble sweet treat");

const txService = new TransactionService(
  logger,
  {
    [PARAMETERS.A.DOMAIN]: {
      providers: PARAMETERS.A.RPC,
    },
    [PARAMETERS.B.DOMAIN]: {
      providers: PARAMETERS.B.RPC,
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
          domain: PARAMETERS.A.DOMAIN,
          ...PARAMETERS.A.DEPLOYMENTS,
        },
        {
          domain: PARAMETERS.B.DOMAIN,
          ...PARAMETERS.B.DEPLOYMENTS,
        },
      ],
      txService,
    );
    logger.info("Enrolled handlers...");

    logger.info("Enrolling custom...");
    await enrollCustom(
      {
        domain: PARAMETERS.A.DOMAIN,
        tokenAddress: PARAMETERS.ASSET.address,
      },
      [
        {
          domain: PARAMETERS.B.DOMAIN,
          tokenAddress: PARAMETERS.ASSET.address,
          TokenRegistry: PARAMETERS.B.DEPLOYMENTS.TokenRegistry,
        },
      ],
      txService,
    );
    logger.info("Enrolled custom");

    logger.info("Setting up router...");
    await setupRouter(
      PARAMETERS.AGENTS.ROUTER.address,
      [
        { ConnextHandler: PARAMETERS.A.DEPLOYMENTS.ConnextHandler, domain: PARAMETERS.A.DOMAIN },
        { ConnextHandler: PARAMETERS.B.DEPLOYMENTS.ConnextHandler, domain: PARAMETERS.B.DOMAIN },
      ],
      txService,
    );
    logger.info("Set up router");

    logger.info("Setting up assets...");
    await setupAsset(
      { domain: PARAMETERS.A.DOMAIN, tokenAddress: PARAMETERS.ASSET.address },
      [
        {
          domain: PARAMETERS.B.DOMAIN,
          ConnextHandler: PARAMETERS.B.DEPLOYMENTS.ConnextHandler,
          // NOTE: Same as local; this means we won't be doing any swaps.
          adopted: PARAMETERS.ASSET.address,
        },
      ],
      txService,
    );
    logger.info("Set up assets");

    sdk = await NxtpSdkBase.create({
      chains: {
        [PARAMETERS.A.DOMAIN]: {
          assets: [{ address: PARAMETERS.ASSET.address, name: PARAMETERS.ASSET.name }],
          providers: PARAMETERS.A.RPC,
          deployments: { connext: PARAMETERS.A.DEPLOYMENTS.ConnextHandler },
          chainId: PARAMETERS.A.CHAIN,
        },
        [PARAMETERS.B.DOMAIN]: {
          assets: [{ address: PARAMETERS.ASSET.address, name: PARAMETERS.ASSET.name }],
          providers: PARAMETERS.B.RPC,
          deployments: { connext: PARAMETERS.B.DEPLOYMENTS.ConnextHandler },
          chainId: PARAMETERS.B.CHAIN,
        },
      },
      cartographerUrl: PARAMETERS.AGENTS.CARTOGRAPHER.url,
      environment: PARAMETERS.ENVIRONMENT as "production" | "staging",
      signerAddress: PARAMETERS.AGENTS.USER.address,
    });

    let tx = await sdk.approveIfNeeded(PARAMETERS.A.DOMAIN, PARAMETERS.ASSET.address, "1", true);
    if (tx) {
      await txService.sendTx({ chainId: 1337, to: tx.to!, value: 0, data: utils.hexlify(tx.data!) }, requestContext);
    }
    if (tx) {
      tx = await sdk.approveIfNeeded(PARAMETERS.B.DOMAIN, PARAMETERS.ASSET.address, "1", true);
    }
  });

  it.only("sends a simple transfer with fast path", async () => {
    logger.info("Sending xcall...");
    const tx = await sdk.xcall({
      amount: "1000",
      params: {
        originDomain: PARAMETERS.A.DOMAIN,
        destinationDomain: PARAMETERS.B.DOMAIN,
        to: PARAMETERS.AGENTS.USER.address,
        callback: constants.AddressZero,
        callbackFee: "0",
        callData: "0x",
        forceSlow: false,
        receiveLocal: false,
        recovery: PARAMETERS.AGENTS.USER.address,
      },
      relayerFee: "0",
      transactingAssetId: PARAMETERS.ASSET.address,
    });

    const receipt = await txService.sendTx(
      { to: tx.to!, value: tx.value ?? 0, data: utils.hexlify(tx.data!), chainId: 1337 },
      requestContext,
    );

    logger.info("xcall sent", { receipt });

    receipt.logs.forEach((log, index) => {
      try {
        const iface = new utils.Interface(ConnextHandlerAbi).parseLog(log);
        console.log(`log at index ${index}: `, iface);
      } catch (e: unknown) {}
    });
  });
});
