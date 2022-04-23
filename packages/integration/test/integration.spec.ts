import { Wallet, utils, BigNumber, providers, constants } from "ethers";
import { makeSequencer } from "@connext/nxtp-sequencer/src/sequencer";
import { makeRouter } from "@connext/nxtp-router/src/router";
import { SequencerConfig } from "@connext/nxtp-sequencer/src/lib/entities/config";
import { NxtpRouterConfig as RouterConfig } from "@connext/nxtp-router/src/config";
import { delay, ERC20Abi, Logger } from "@connext/nxtp-utils";
import { ChainReader, getConnextInterface } from "@connext/nxtp-txservice";

import {
  DomainInfo,
  DOMAINS,
  ROUTER_CONFIG,
  SEQUENCER_CONFIG,
  ORIGIN_ASSET,
  MIN_USER_ETH,
  TRANSFER_TOKEN_AMOUNT,
  MIN_FUNDER_ETH,
  Agent,
  DESTINATION_ASSET,
  CANONICAL_DOMAIN,
} from "./constants";
import { canonizeTokenId, getAllowance, OperationContext } from "./helpers";

const ROUTER_MNEMONIC =
  process.env.ROUTER_MNEMONIC || "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
const USER_MNEMONIC = process.env.USER_MNEMONIC || Wallet.createRandom()._mnemonic().phrase;

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
  console.log("\x1b[32m%s\x1b[0m", `\n[STEP] (${step}) ${message}`);
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
  let chainreader: ChainReader;

  // Agents.
  let AGENTS: {
    ROUTER: Agent;
    USER: Agent;
  };

  // Contexts.
  let operationContext: OperationContext;

  before(async () => {
    domainInfo = await DOMAINS;
    routerConfig = await ROUTER_CONFIG;
    sequencerConfig = await SEQUENCER_CONFIG;

    // Init agents.
    const router = Wallet.fromMnemonic(ROUTER_MNEMONIC);
    const user = Wallet.fromMnemonic(USER_MNEMONIC);
    const originProvider = new providers.JsonRpcProvider(domainInfo.ORIGIN.config.providers[0]);
    const destinationProvider = new providers.JsonRpcProvider(domainInfo.DESTINATION.config.providers[0]);
    AGENTS = {
      ROUTER: {
        address: router.address,
        origin: router.connect(originProvider),
        destination: router.connect(destinationProvider),
      },
      USER: {
        address: user.address,
        origin: user.connect(originProvider),
        destination: user.connect(destinationProvider),
      },
    };

    // Init services.
    chainreader = new ChainReader(
      new Logger({
        level: "silent",
        name: "IntegrationChainReader",
      }),
      {
        [domainInfo.ORIGIN.chain]: domainInfo.ORIGIN.config,
        [domainInfo.DESTINATION.chain]: domainInfo.DESTINATION.config,
      },
    );

    // Setup contexts (used for injection into helpers).
    operationContext = {
      chainreader,
      domainInfo,
    };
  });

  it("should complete a fast liquidity transfer", async () => {
    const connext = getConnextInterface();
    const testERC20 = new utils.Interface(ERC20Abi);
    const originConnextAddress = domainInfo.ORIGIN.config.deployments.connext;
    const destinationConnextAddress = domainInfo.DESTINATION.config.deployments.connext;

    // Log setup.
    console.log("\x1b[35m\x1b[4m%s\x1b[0m", "TEST PARAMETERS");
    console.log(
      "\x1b[35m%s\x1b[0m",
      `\nTRANSFER:\n\tRoute:    \t${domainInfo.ORIGIN.name} (${domainInfo.ORIGIN.domain}) => ` +
        `${domainInfo.DESTINATION.name} (${domainInfo.DESTINATION.domain})` +
        `\n\tAmount:    \t${utils.formatEther(TRANSFER_TOKEN_AMOUNT)} TEST` +
        `\nAGENTS\n\tRouter:   \t${AGENTS.ROUTER.address}\n\tUser:    \t${AGENTS.USER.address}` +
        `\nCONNEXT\n\tOrigin:   \t${originConnextAddress}\n\tDestination:\t${destinationConnextAddress}` +
        `\nASSETS\n\tOrigin:   \t${ORIGIN_ASSET.address}\n\tDestination:\t${DESTINATION_ASSET.address}`,
    );

    next("VERIFY ROUTER APPROVAL");
    // Make sure router's signer address is approved on destination chain.
    {
      const encoded = connext.encodeFunctionData("approvedRouters", [AGENTS.ROUTER.address]);
      const result = await chainreader.readTx({
        chainId: domainInfo.DESTINATION.chain,
        to: destinationConnextAddress,
        data: encoded,
      });
      const isApproved = connext.decodeFunctionResult("approvedRouters", result)[0];
      if (!isApproved) {
        // Router is not approved.
        fail(`Router needs approval.`, domainInfo.DESTINATION.chain);
      }
      log("Router is approved!", domainInfo.DESTINATION.chain);
    }

    next("VERIFY ASSET APPROVAL");
    // Make sure the assets on origin and destination are approved.
    {
      const canonicalAsset = domainInfo[CANONICAL_DOMAIN].config.assets[0].address;
      const canonicalTokenId = utils.hexlify(canonizeTokenId(canonicalAsset));
      // Check origin asset approval.
      {
        const encoded = connext.encodeFunctionData("approvedAssets", [canonicalTokenId]);
        const result = await chainreader.readTx({
          chainId: domainInfo.ORIGIN.chain,
          to: originConnextAddress,
          data: encoded,
        });
        const isApproved = connext.decodeFunctionResult("approvedAssets", result)[0];
        if (!isApproved) {
          fail(`Origin asset needs approval.`, domainInfo.ORIGIN.chain);
        }
      }
      log("Transfer asset is approved on origin chain.", domainInfo.ORIGIN.chain);

      // Check destination asset approval.
      {
        const encoded = connext.encodeFunctionData("approvedAssets", [canonicalTokenId]);
        const result = await chainreader.readTx({
          chainId: domainInfo.DESTINATION.chain,
          to: destinationConnextAddress,
          data: encoded,
        });
        const isApproved = connext.decodeFunctionResult("approvedAssets", result)[0];
        if (!isApproved) {
          fail(`Destination asset needs approval.`, domainInfo.DESTINATION.chain);
        }
      }
      log("Transfer asset is approved on destination chain.", domainInfo.DESTINATION.chain);
    }

    next("FUND USER AGENT");
    // Fund user with ETH and TEST on origin. Router signer will be funder for ETH.
    {
      // Make sure funder is funded themselves.
      const funderEth = await chainreader.getBalance(domainInfo.ORIGIN.chain, AGENTS.ROUTER.address);
      log(`Router has ${utils.formatEther(funderEth)} ETH.`, domainInfo.ORIGIN.chain);

      if (funderEth.lt(MIN_FUNDER_ETH)) {
        fail(
          `Router needs at least ${utils.formatEther(MIN_FUNDER_ETH)} ETH for funding user agent.`,
          domainInfo.ORIGIN.chain,
        );
      }

      // Retrieve user balances for ETH and TEST.
      const userEth = await chainreader.getBalance(domainInfo.ORIGIN.chain, AGENTS.USER.address);
      const userTokens = await chainreader.getBalance(
        domainInfo.ORIGIN.chain,
        AGENTS.USER.address,
        ORIGIN_ASSET.address,
      );

      log(`User has ${utils.formatEther(userEth)} ETH.`, domainInfo.ORIGIN.chain);
      log(`User has ${utils.formatEther(userTokens)} TEST.`, domainInfo.ORIGIN.chain);

      if (userEth.lt(MIN_USER_ETH)) {
        log("Funding user with some ETH...", domainInfo.ORIGIN.chain);
        const tx = await AGENTS.ROUTER.origin.sendTransaction({
          to: AGENTS.USER.address,
          value: MIN_USER_ETH,
        });
        const receipt = await tx.wait(1);

        const userEth = await chainreader.getBalance(domainInfo.ORIGIN.chain, AGENTS.USER.address);
        if (userEth.lt(MIN_USER_ETH)) {
          fail(
            `ETH funding operation failed! User still has only ${utils.formatEther(MIN_USER_ETH)} ETH.`,
            domainInfo.ORIGIN.chain,
          );
        }
        log(
          `Sent ETH to User. User now has ${utils.formatEther(userEth)} ETH. Hash: ${receipt.transactionHash}.`,
          domainInfo.ORIGIN.chain,
        );
      }

      if (userTokens.lt(TRANSFER_TOKEN_AMOUNT)) {
        log("Minting TEST tokens for User...", domainInfo.ORIGIN.chain);
        const encoded = testERC20.encodeFunctionData("mint", [AGENTS.USER.address, TRANSFER_TOKEN_AMOUNT]);
        const tx = await AGENTS.ROUTER.origin.sendTransaction({
          to: ORIGIN_ASSET.address,
          data: encoded,
          value: BigNumber.from("0"),
        });
        const receipt = await tx.wait(1);

        const userTokens = await chainreader.getBalance(
          domainInfo.ORIGIN.chain,
          AGENTS.USER.address,
          ORIGIN_ASSET.address,
        );
        log(
          `Minted TEST tokens for User. User now has ${utils.formatEther(userTokens)} TEST. Hash: ${
            receipt.transactionHash
          }.`,
          domainInfo.ORIGIN.chain,
        );
      }
    }

    next("APPROVE TOKEN SPEND");
    // Approve TEST token spending for agents.
    {
      const infiniteApproval = constants.MaxUint256;

      // User needs to approve TEST token spend for connext contract on origin chain.
      const userAllowance: BigNumber = await getAllowance(operationContext, {
        chain: domainInfo.ORIGIN.chain,
        owner: AGENTS.USER.address,
        spender: originConnextAddress,
        asset: ORIGIN_ASSET.address,
      });
      if (userAllowance.lt(TRANSFER_TOKEN_AMOUNT)) {
        log("Approving TEST spending for User...", domainInfo.ORIGIN.chain);
        const encoded = testERC20.encodeFunctionData("approve", [originConnextAddress, infiniteApproval]);
        const tx = await AGENTS.USER.origin.sendTransaction({
          to: ORIGIN_ASSET.address,
          data: encoded,
          value: BigNumber.from("0"),
        });
        const receipt = await tx.wait(1);
        log(
          `Approved TEST spending for User. Allowance: ${utils.formatEther(userAllowance)} TEST. Hash: ${
            receipt.transactionHash
          }.`,
          domainInfo.ORIGIN.chain,
        );
      }

      // Router needs to approve TEST token spend for connext contract on origin chain.
      const routerAllowance: BigNumber = await getAllowance(operationContext, {
        chain: domainInfo.DESTINATION.chain,
        owner: AGENTS.ROUTER.address,
        spender: destinationConnextAddress,
        asset: DESTINATION_ASSET.address,
      });
      if (routerAllowance.lt(TRANSFER_TOKEN_AMOUNT)) {
        log("Approving TEST spending for Router...", domainInfo.DESTINATION.chain);
        const encoded = testERC20.encodeFunctionData("approve", [destinationConnextAddress, infiniteApproval]);
        const tx = await AGENTS.ROUTER.destination.sendTransaction({
          to: DESTINATION_ASSET.address,
          data: encoded,
          value: BigNumber.from("0"),
        });
        const receipt = await tx.wait(1);
        log(
          `Approved TEST spending for Router. Allowance: ${utils.formatEther(routerAllowance)} TEST. Hash: ${
            receipt.transactionHash
          }.`,
          domainInfo.DESTINATION.chain,
        );
      }
    }

    next("ADD LIQUIDITY");
    // Router should add liquidity to their pool on the destination chain.
    {
      let routerBalance: BigNumber;
      {
        const encoded = connext.encodeFunctionData("routerBalances", [
          AGENTS.ROUTER.address,
          DESTINATION_ASSET.address,
        ]);
        const result = await chainreader.readTx({
          chainId: domainInfo.DESTINATION.chain,
          to: destinationConnextAddress,
          data: encoded,
        });
        routerBalance = connext.decodeFunctionResult("routerBalances", result)[0];
      }
      log(`Router liquidity balance: ${utils.formatEther(routerBalance)} TEST.`, domainInfo.DESTINATION.chain);

      if (routerBalance.lt(TRANSFER_TOKEN_AMOUNT)) {
        // Router liquidity balance is insufficient.

        // Ensure router has enough TEST tokens to add liquidity.
        {
          let routerTokens = await chainreader.getBalance(
            domainInfo.DESTINATION.chain,
            AGENTS.ROUTER.address,
            DESTINATION_ASSET.address,
          );
          log(`Router has ${utils.formatEther(routerTokens)} TEST.`, domainInfo.DESTINATION.chain);

          if (routerTokens.lt(TRANSFER_TOKEN_AMOUNT)) {
            // Mint TEST tokens.
            log("Minting TEST tokens for Router...", domainInfo.DESTINATION.chain);
            const encoded = testERC20.encodeFunctionData("mint", [AGENTS.ROUTER.address, TRANSFER_TOKEN_AMOUNT]);
            const tx = await AGENTS.ROUTER.destination.sendTransaction({
              to: DESTINATION_ASSET.address,
              data: encoded,
              value: BigNumber.from("0"),
            });
            const receipt = await tx.wait(1);

            routerTokens = await chainreader.getBalance(
              domainInfo.ORIGIN.chain,
              AGENTS.ROUTER.address,
              DESTINATION_ASSET.address,
            );
            log(
              `Minted TEST tokens for Router. Router now has ${utils.formatEther(routerTokens)} TEST. Hash: ${
                receipt.transactionHash
              }.`,
              domainInfo.DESTINATION.chain,
            );
          }
        }

        // Add liquidity.
        log("Adding liquidity for Router...", domainInfo.DESTINATION.chain);
        {
          const encoded = connext.encodeFunctionData("addLiquidity", [
            TRANSFER_TOKEN_AMOUNT,
            DESTINATION_ASSET.address,
          ]);
          const tx = await AGENTS.ROUTER.destination.sendTransaction({
            to: destinationConnextAddress,
            data: encoded,
            value: BigNumber.from("0"),
            gasLimit: BigNumber.from("10000000"),
          });
          const receipt = await tx.wait(1);

          // Check router liquidity on-chain to confirm.
          {
            const encoded = connext.encodeFunctionData("routerBalances", [
              AGENTS.ROUTER.address,
              DESTINATION_ASSET.address,
            ]);
            const result = await chainreader.readTx({
              chainId: domainInfo.DESTINATION.chain,
              to: destinationConnextAddress,
              data: encoded,
            });
            routerBalance = connext.decodeFunctionResult("routerBalances", result)[0];
          }

          if (routerBalance.lt(TRANSFER_TOKEN_AMOUNT)) {
            fail(
              `Add liquidity operation failed! Balance: ${utils.formatEther(routerBalance)} TEST. Hash: ${
                receipt.transactionHash
              }`,
              domainInfo.DESTINATION.chain,
            );
          }

          log(
            `Added liquidity for Router. New balance: ${utils.formatEther(routerBalance)} TEST. Hash: ${
              receipt.transactionHash
            }.`,
            domainInfo.DESTINATION.chain,
          );
        }
      }
    }

    // TODO: Add relayer fees?

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
