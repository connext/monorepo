import { Wallet, utils } from "ethers";
import { makeSequencer } from "@connext/nxtp-sequencer/src/sequencer";
import { makeRouter } from "@connext/nxtp-router/src/router";
import { SequencerConfig } from "@connext/nxtp-sequencer/src/lib/entities/config";
import { NxtpRouterConfig as RouterConfig } from "@connext/nxtp-router/src/config";
import { createRequestContext, delay, ERC20Abi, Logger } from "@connext/nxtp-utils";
import { getConnextInterface, TransactionService } from "@connext/nxtp-txservice";

import {
  DomainInfo,
  DOMAINS,
  ROUTER_CONFIG,
  SEQUENCER_CONFIG,
  EMPTY_BYTES,
  ORIGIN_ASSET,
  MIN_USER_ETH,
  TRANSFER_TOKEN_AMOUNT,
  MIN_FUNDER_ETH,
  DESTINATION_ASSET,
} from "./constants";

// TODO: Put this in env:
const ROUTER_MNEMONIC = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

const AGENTS = {
  ROUTER: Wallet.fromMnemonic(ROUTER_MNEMONIC),
  // TODO: Multiple user agents?
  // TODO: Pre-funded user on origin?
  USER: Wallet.createRandom(),
};

// Helper for logging steps in the integration test.
let step = 0;
const log = (message: string, chain?: number) => {
  if (chain) {
    console.log("\x1b[36m%s\x1b[0m", `[INFO] (${step}) {${chain}} ${message}`);
  } else {
    console.log("\x1b[36m%s\x1b[0m", `[INFO] (${step}) ${message}`);
  }
};
const next = (message: string) => {
  step++;
  console.log("\x1b[32m%s\x1b[0m", `[STEP] (${step}) ${message}`);
};
const fail = (message: string, chain?: number) => {
  if (chain) {
    console.error("\x1b[31m%s\x1b[0m", `[FAIL] (${step}) {${chain}} ${message}`);
  } else {
    console.error("\x1b[31m%s\x1b[0m", `[FAIL] (${step}) ${message}`);
  }
  process.exit(1);
};

describe("Integration", () => {
  // Configuration.
  let domainInfo: { ORIGIN: DomainInfo; DESTINATION: DomainInfo };
  let routerConfig: RouterConfig;
  let sequencerConfig: SequencerConfig;

  // Services.
  let txservice: TransactionService;
  before(async () => {
    domainInfo = await DOMAINS;
    routerConfig = await ROUTER_CONFIG;
    sequencerConfig = await SEQUENCER_CONFIG;
    txservice = new TransactionService(
      new Logger({
        level: "info",
        name: "IntegrationTransactionService",
      }),
      {
        [domainInfo.ORIGIN.chain]: domainInfo.ORIGIN.config,
        [domainInfo.DESTINATION.chain]: domainInfo.DESTINATION.config,
      },
      AGENTS.ROUTER,
      true,
    );
  });

  it("should complete a fast liquidity transfer", async () => {
    const connext = getConnextInterface();
    const connextAddress = routerConfig.chains[domainInfo.DESTINATION.domain].deployments.connext;

    next("ROUTER APPROVAL");
    // Make sure router's signer address is approved.
    {
      const encoded = connext.encodeFunctionData("approvedRouters", [AGENTS.ROUTER.address]);
      const result = await txservice.readTx({
        chainId: domainInfo.DESTINATION.chain,
        to: connextAddress,
        data: encoded,
      });
      if (result === EMPTY_BYTES) {
        // Router is not approved.
        fail(`Router ${AGENTS.ROUTER.address} needs approval.`, domainInfo.DESTINATION.chain);
      }
      log("Router is approved!", domainInfo.DESTINATION.chain);
    }

    next("FUND USER AGENT");
    // Fund user with ETH and TEST on origin. Router signer will be funder for ETH.
    {
      const funderEth = await txservice.getBalance(domainInfo.ORIGIN.chain, AGENTS.ROUTER.address);
      log(`${domainInfo.ORIGIN.chain}: Router ${AGENTS.ROUTER.address} has ${utils.formatEther(funderEth)} ETH.`);
      if (funderEth.lt(MIN_FUNDER_ETH)) {
        fail(
          `Funder ${AGENTS.ROUTER.address} needs at least ${utils.formatEther(
            MIN_FUNDER_ETH,
          )} ETH for funding user agent.`,
          domainInfo.ORIGIN.chain,
        );
      }

      const userEth = await txservice.getBalance(domainInfo.ORIGIN.chain, AGENTS.USER.address);
      const userTokens = await txservice.getBalance(domainInfo.ORIGIN.chain, AGENTS.USER.address, ORIGIN_ASSET.address);

      log(`User ${AGENTS.USER.address} has ${utils.formatEther(userEth)} ETH.`, domainInfo.ORIGIN.chain);
      log(`User ${AGENTS.USER.address} has ${utils.formatEther(userTokens)} TEST.`, domainInfo.ORIGIN.chain);

      if (userEth.lt(MIN_USER_ETH)) {
      }

      if (userTokens.lt(TRANSFER_TOKEN_AMOUNT)) {
        log("Minting TEST tokens for User...");
        const testToken = new utils.Interface(ERC20Abi);
        const encoded = testToken.encodeFunctionData("mint", [AGENTS.USER.address, TRANSFER_TOKEN_AMOUNT]);
        try {
          await txservice.sendTx(
            {
              chainId: domainInfo.ORIGIN.chain,
              to: ORIGIN_ASSET.address,
              data: encoded,
              value: "0",
            },
            createRequestContext("Integration"),
          );
        } catch (e: unknown) {
          fail(`Failed to fund user with TEST tokens: ${e}`, domainInfo.ORIGIN.chain);
        }
      }

      next("ADD LIQUIDITY");
      // Router should add liquidity to their pool on the destination chain.
      {
        // Mint TEST tokens.
        log("Minting TEST tokens for Router...");
        {
          const testToken = new utils.Interface(ERC20Abi);
          const encoded = testToken.encodeFunctionData("mint", [AGENTS.ROUTER.address, TRANSFER_TOKEN_AMOUNT]);
          try {
            await txservice.sendTx(
              {
                chainId: domainInfo.DESTINATION.chain,
                to: DESTINATION_ASSET.address,
                data: encoded,
                value: "0",
              },
              createRequestContext("Integration"),
            );
          } catch (e: unknown) {
            fail(`Failed to fund router with TEST tokens: ${e}`, domainInfo.DESTINATION.chain);
          }
        }

        // Add liquidity.
        log("Adding liquidity for Router...");
        {
          const encoded = connext.encodeFunctionData("addLiquidity", [TRANSFER_TOKEN_AMOUNT, AGENTS.ROUTER.address]);
          try {
            await txservice.sendTx(
              {
                chainId: domainInfo.DESTINATION.chain,
                to: connextAddress,
                data: encoded,
                value: "0",
              },
              createRequestContext("Integration"),
            );
          } catch (e: unknown) {
            fail(`Failed to fund router with TEST tokens: ${e}`, domainInfo.DESTINATION.chain);
          }
        }
      }
    }

    next("SEQUENCER START");
    await makeSequencer({
      ...sequencerConfig,
    });

    await delay(1_000);

    next("ROUTER START");
    await makeRouter({
      ...routerConfig,
      mnemonic: ROUTER_MNEMONIC,
    });

    next("XCALL");
    // TODO:
  });
});
