import axios, { AxiosResponse } from "axios";
import { Wallet, utils, BigNumber, providers, constants } from "ethers";
import { makeSequencer } from "@connext/nxtp-sequencer/src/sequencer";
import { makeRouter } from "@connext/nxtp-router/src/router";
import { SequencerConfig } from "@connext/nxtp-sequencer/src/lib/entities/config";
import { NxtpRouterConfig as RouterConfig } from "@connext/nxtp-router/src/config";
import {
  AuctionsApiErrorResponse,
  AuctionsApiGetAuctionStatusResponse,
  delay,
  ERC20Abi,
  Logger,
  XCallArgs,
  XTransfer,
} from "@connext/nxtp-utils";
import { ChainReader, getConnextInterface } from "@connext/nxtp-txservice";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { xtransfer as parseXTransfer } from "@connext/nxtp-adapters-subgraph/src/lib/helpers/parse";

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
import {
  canonizeTokenId,
  formatEtherscanLink,
  formatSubgraphGetTransferQuery,
  getAllowance,
  OperationContext,
} from "./helpers";

const ROUTER_MNEMONIC =
  process.env.ROUTER_MNEMONIC || "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
const USER_MNEMONIC = process.env.USER_MNEMONIC || Wallet.createRandom()._mnemonic().phrase;

// TODO: Move to helpers
// Helper for logging steps in the integration test.
let step = 0;
const log = {
  params: (params: string) => {
    console.log("\x1b[35m\x1b[4m%s\x1b[0m", "TEST PARAMETERS");
    console.log("\x1b[35m%s\x1b[0m", params);
  },
  info: (_message: string, context: { chain?: number; network?: string; hash?: string; etc?: any } = {}) => {
    const { chain, hash, network, etc } = context;
    let message = `*** [INFO] (${step})`;
    message += chain ? ` {${chain}}` : "";
    message += ` ${_message}`;
    if (hash) {
      message += `\n\tHash: ${hash}`;
      if (network) {
        message += `\n\tEtherscan: ${formatEtherscanLink({
          hash,
          network,
        })}`;
      }
    }
    console.log("\x1b[36m%s\x1b[0m", message, etc ? "\n" : "", etc ?? "");
  },
  next: (message: string) => {
    step++;
    console.log("\x1b[32m%s\x1b[0m", `\n*** [STEP] (${step}) ${message}`);
  },
  fail: (_message: string, context: { chain: number; network?: string; hash?: string; etc?: any }) => {
    const { chain, hash, network, etc } = context;
    let message = `*** [FAIL] (${step}) {${chain}} ${_message}`;
    if (hash) {
      message += ` Hash: ${hash}`;
      if (network) {
        message += `Etherscan: ${formatEtherscanLink({
          hash,
          network,
        })}`;
      }
    }
    console.error("\x1b[31m%s\x1b[0m", message, etc ? "\n" : "", etc ?? "");
    process.exit(1);
  },
};

/**
 * NOTE: The router used in this integration test will not necessarily be the router that executes
 * the transfer. However, both router and sequencer are configured to 'outrace' the network under
 * typical operating conditions and configuration.
 *
 * The auction period, for instance, is set to be only 1 second.
 *
 * Because of this, we can't expect the transfer to be executed by the router, but we can get a
 * glimpse of how both are functioning/reacting to the xcall on-chain.
 */
describe("Integration", () => {
  // Configuration.
  let domainInfo: { ORIGIN: DomainInfo; DESTINATION: DomainInfo };
  let routerConfig: RouterConfig;
  let sequencerConfig: SequencerConfig;

  // Services.
  let chainreader: ChainReader;
  let subgraph: SubgraphReader;

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

    subgraph = await SubgraphReader.create({
      chains: {
        [domainInfo.ORIGIN.domain]: domainInfo.ORIGIN.config.subgraph,
        [domainInfo.DESTINATION.domain]: domainInfo.DESTINATION.config.subgraph,
      },
    });

    // Setup contexts (used for injection into helpers).
    operationContext = {
      chainreader,
      domainInfo,
    };
  });

  it("should complete a fast liquidity transfer", async function () {
    this.timeout(300_000);

    const connext = getConnextInterface();
    const testERC20 = new utils.Interface(ERC20Abi);
    const originConnextAddress = domainInfo.ORIGIN.config.deployments.connext;
    const destinationConnextAddress = domainInfo.DESTINATION.config.deployments.connext;

    // Log setup.
    log.params(
      `\nTRANSFER:\n\tRoute:    \t${domainInfo.ORIGIN.name} (${domainInfo.ORIGIN.domain}) => ` +
        `${domainInfo.DESTINATION.name} (${domainInfo.DESTINATION.domain})` +
        `\n\tAmount:    \t${utils.formatEther(TRANSFER_TOKEN_AMOUNT)} TEST` +
        `\nAGENTS\n\tRouter:   \t${AGENTS.ROUTER.address}\n\tUser:    \t${AGENTS.USER.address}` +
        `\nCONNEXT\n\tOrigin:   \t${originConnextAddress}\n\tDestination:\t${destinationConnextAddress}` +
        `\nASSETS\n\tOrigin:   \t${ORIGIN_ASSET.address}\n\tDestination:\t${DESTINATION_ASSET.address}`,
    );

    log.next("VERIFY ROUTER APPROVAL");
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
        log.fail(`Router needs approval.`, { chain: domainInfo.DESTINATION.chain });
      }
      log.info("Router is approved!", { chain: domainInfo.DESTINATION.chain });
    }

    log.next("VERIFY ASSET APPROVAL");
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
          log.fail(`Origin asset needs approval.`, { chain: domainInfo.ORIGIN.chain });
        }
      }
      log.info("Transfer asset is approved on origin chain.", { chain: domainInfo.ORIGIN.chain });

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
          log.fail(`Destination asset needs approval.`, { chain: domainInfo.DESTINATION.chain });
        }
      }
      log.info("Transfer asset is approved on destination chain.", { chain: domainInfo.DESTINATION.chain });
    }

    log.next("FUND USER AGENT");
    // Fund user with ETH and TEST on origin. Router signer will be funder for ETH.
    {
      // Make sure funder is funded themselves.
      const funderEth = await chainreader.getBalance(domainInfo.ORIGIN.chain, AGENTS.ROUTER.address);
      log.info(`Router has ${utils.formatEther(funderEth)} ETH.`, { chain: domainInfo.ORIGIN.chain });

      if (funderEth.lt(MIN_FUNDER_ETH)) {
        log.fail(`Router needs at least ${utils.formatEther(MIN_FUNDER_ETH)} ETH for funding user agent.`, {
          chain: domainInfo.ORIGIN.chain,
        });
      }

      // Retrieve user balances for ETH and TEST.
      const userEth = await chainreader.getBalance(domainInfo.ORIGIN.chain, AGENTS.USER.address);
      const userTokens = await chainreader.getBalance(
        domainInfo.ORIGIN.chain,
        AGENTS.USER.address,
        ORIGIN_ASSET.address,
      );

      log.info(`User has ${utils.formatEther(userEth)} ETH.`, { chain: domainInfo.ORIGIN.chain });
      log.info(`User has ${utils.formatEther(userTokens)} TEST.`, { chain: domainInfo.ORIGIN.chain });

      if (userEth.lt(MIN_USER_ETH)) {
        log.info("Funding user with some ETH...", { chain: domainInfo.ORIGIN.chain });
        const tx = await AGENTS.ROUTER.origin.sendTransaction({
          to: AGENTS.USER.address,
          value: MIN_USER_ETH,
        });
        const receipt = await tx.wait(1);

        const userEth = await chainreader.getBalance(domainInfo.ORIGIN.chain, AGENTS.USER.address);
        if (userEth.lt(MIN_USER_ETH)) {
          log.fail(`ETH funding operation failed! User still has only ${utils.formatEther(MIN_USER_ETH)} ETH.`, {
            chain: domainInfo.ORIGIN.chain,
          });
        }
        log.info(`Sent ETH to User. User now has ${utils.formatEther(userEth)} ETH.`, {
          chain: domainInfo.ORIGIN.chain,
          hash: receipt.transactionHash,
        });
      }

      if (userTokens.lt(TRANSFER_TOKEN_AMOUNT)) {
        log.info("Minting TEST tokens for User...", { chain: domainInfo.ORIGIN.chain });
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
        log.info(`Minted TEST tokens for User. User now has ${utils.formatEther(userTokens)} TEST.`, {
          chain: domainInfo.ORIGIN.chain,
          hash: receipt.transactionHash,
        });
      }
    }

    log.next("TOKEN ALLOWANCES");
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
        log.info("Approving TEST spending for User...", { chain: domainInfo.ORIGIN.chain });
        const encoded = testERC20.encodeFunctionData("approve", [originConnextAddress, infiniteApproval]);
        const tx = await AGENTS.USER.origin.sendTransaction({
          to: ORIGIN_ASSET.address,
          data: encoded,
          value: BigNumber.from("0"),
        });
        const receipt = await tx.wait(1);
        log.info(`Approved TEST spending for User. Allowance: ${utils.formatEther(userAllowance)} TEST.`, {
          chain: domainInfo.ORIGIN.chain,
          hash: receipt.transactionHash,
        });
      }

      // Router needs to approve TEST token spend for connext contract on origin chain.
      const routerAllowance: BigNumber = await getAllowance(operationContext, {
        chain: domainInfo.DESTINATION.chain,
        owner: AGENTS.ROUTER.address,
        spender: destinationConnextAddress,
        asset: DESTINATION_ASSET.address,
      });
      if (routerAllowance.lt(TRANSFER_TOKEN_AMOUNT)) {
        log.info("Approving TEST spending for Router...", { chain: domainInfo.DESTINATION.chain });
        const encoded = testERC20.encodeFunctionData("approve", [destinationConnextAddress, infiniteApproval]);
        const tx = await AGENTS.ROUTER.destination.sendTransaction({
          to: DESTINATION_ASSET.address,
          data: encoded,
          value: BigNumber.from("0"),
        });
        const receipt = await tx.wait(1);
        log.info(`Approved TEST spending for Router. Allowance: ${utils.formatEther(routerAllowance)} TEST.`, {
          chain: domainInfo.ORIGIN.chain,
          hash: receipt.transactionHash,
        });
      }
    }

    log.next("ADD LIQUIDITY");
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
      log.info(`Router liquidity balance: ${utils.formatEther(routerBalance)} TEST.`, {
        chain: domainInfo.DESTINATION.chain,
      });

      if (routerBalance.lt(TRANSFER_TOKEN_AMOUNT)) {
        // Router liquidity balance is insufficient.

        // Ensure router has enough TEST tokens to add liquidity.
        {
          let routerTokens = await chainreader.getBalance(
            domainInfo.DESTINATION.chain,
            AGENTS.ROUTER.address,
            DESTINATION_ASSET.address,
          );
          log.info(`Router has ${utils.formatEther(routerTokens)} TEST.`, { chain: domainInfo.DESTINATION.chain });

          if (routerTokens.lt(TRANSFER_TOKEN_AMOUNT)) {
            // Mint TEST tokens.
            log.info("Minting TEST tokens for Router...", { chain: domainInfo.DESTINATION.chain });
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
            log.info(`Minted TEST tokens for Router. Router now has ${utils.formatEther(routerTokens)} TEST.`, {
              chain: domainInfo.DESTINATION.chain,
              hash: receipt.transactionHash,
            });
          }
        }

        // Add liquidity.
        log.info("Adding liquidity for Router...", { chain: domainInfo.DESTINATION.chain });
        {
          const encoded = connext.encodeFunctionData("addLiquidity", [
            TRANSFER_TOKEN_AMOUNT,
            DESTINATION_ASSET.address,
          ]);
          const tx = await AGENTS.ROUTER.destination.sendTransaction({
            to: destinationConnextAddress,
            data: encoded,
            value: BigNumber.from("0"),
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
            log.fail(`Add liquidity operation failed! Balance: ${utils.formatEther(routerBalance)} TEST.`, {
              chain: domainInfo.DESTINATION.chain,
              hash: receipt.transactionHash,
            });
          }

          log.info(`Added liquidity for Router. New balance: ${utils.formatEther(routerBalance)} TEST.`, {
            chain: domainInfo.DESTINATION.chain,
          });
        }
      }
    }

    // TODO: Add relayer fees?

    log.next("SEQUENCER START");
    await makeSequencer({
      ...sequencerConfig,
    });
    await delay(1_000);

    log.next("ROUTER START");
    await makeRouter({
      ...routerConfig,
      mnemonic: ROUTER_MNEMONIC,
    });
    await delay(1_000);

    let transfer: XTransfer | undefined;
    log.next("XCALL");
    {
      log.info("Sending XCall...", { chain: domainInfo.ORIGIN.chain });
      const args: XCallArgs = {
        params: {
          to: AGENTS.USER.address,
          callData: "0x",
          originDomain: domainInfo.ORIGIN.domain,
          destinationDomain: domainInfo.DESTINATION.domain,
        },
        transactingAssetId: ORIGIN_ASSET.address,
        amount: TRANSFER_TOKEN_AMOUNT.toString(),
      };
      const encoded = connext.encodeFunctionData("xcall", [args]);
      const tx = await AGENTS.USER.origin.sendTransaction({
        to: originConnextAddress,
        data: encoded,
      });
      const receipt = await tx.wait(1);
      log.info(`XCall sent.`, {
        chain: domainInfo.ORIGIN.chain,
        hash: receipt.transactionHash,
        network: domainInfo.ORIGIN.network,
      });

      // Poll the origin subgraph until the new XCall transfer appears.
      log.info("Polling origin subgraph for added transfer...", { chain: domainInfo.ORIGIN.chain });
      const parity = 5_000;
      const attempts = 10;
      const query = formatSubgraphGetTransferQuery({
        xcallTransactionHash: receipt.transactionHash,
      });
      let i;
      for (i = 0; i < attempts; i++) {
        await delay(parity);
        try {
          const result = await subgraph.query(domainInfo.ORIGIN.domain, query);
          if (result.transfers.length === 1) {
            transfer = parseXTransfer(result.transfers[0]);
            break;
          }
        } catch (e: unknown) {
          console.log(e, (e as any).errors);
          throw e;
        }
      }
      if (!transfer) {
        log.fail(`Failed to retrieve transfer from the subgraph. (Polled: ${parity * attempts}ms)`, {
          chain: domainInfo.ORIGIN.chain,
        });
      }
      log.info(`XCall retrieved. (Took: ~${parity * i}ms)\n\tTransfer ID: ${transfer?.transferId}`, {
        chain: domainInfo.ORIGIN.chain,
        etc: { transfer },
      });
    }

    log.next("WAIT FOR EXECUTE");
    {
      log.info("Waiting 30s to allow the XCall to propagate...");
      await delay(30_000);

      if (!transfer) {
        // Should never happen, but this soothes Mr. Compiler.
        throw new Error("CRITICAL: transfer is undefined!");
      }

      // Poll the sequencer a few times to see if we can get the auction status.
      // NOTE: This may be unsuccessful, but is good information to have for debugging if available.
      log.info("Polling sequencer for auction status...");
      {
        const parity = 5_000;
        const attempts = 4;
        let error: any | undefined;
        let status: AxiosResponse<AuctionsApiGetAuctionStatusResponse> | undefined;
        let i;
        for (i = 0; i < attempts; i++) {
          await delay(parity);
          status = await axios
            .request<AuctionsApiGetAuctionStatusResponse>({
              method: "get",
              baseURL: `http://${sequencerConfig.server.host}:${sequencerConfig.server.port}`,
              url: `/auctions/0xf8b72dd5eb4b330a736b8f336ae13f95a26f92774e2fe95e7b5236fda75f27ed`,
            })
            .catch((e: AxiosResponse<AuctionsApiErrorResponse>) => {
              error = e.data ? (e.data.error ? e.data.error.message : e.data) : e;
              return undefined;
            });
        }

        if (!status) {
          log.info("Unable to retrieve auction status from Sequencer.", {
            etc: {
              error,
            },
          });
        } else {
          log.info(`Retrieved auction status from Sequencer.`, {
            chain: domainInfo.DESTINATION.chain,
            etc: { status: status.data },
          });
        }
      }

      log.info("Polling destination subgraph for execute tx...", { chain: domainInfo.ORIGIN.chain });
      const parity = 5_000;
      const attempts = 10;
      const query = formatSubgraphGetTransferQuery({
        transferId: transfer.transferId,
      });
      let i;
      for (i = 0; i < attempts; i++) {
        await delay(parity);
        const result = await subgraph.query(domainInfo.DESTINATION.domain, query);
        if (result.transfers.length === 1) {
          const _transfer = parseXTransfer(result.transfers[0]);
          transfer = {
            ..._transfer,
            xcall: transfer?.xcall,
          };
          break;
        }
      }
      if (!transfer.execute?.transactionHash) {
        log.fail(`Failed to retrieve transfer from the subgraph. (Polled: ${parity * attempts}ms)`, {
          chain: domainInfo.DESTINATION.chain,
        });
      }
      log.info(`Execute transaction found. (Took: ~${parity * i}ms)`, {
        chain: domainInfo.ORIGIN.chain,
        hash: transfer.execute?.transactionHash,
        network: domainInfo.DESTINATION.network,
      });

      log.info(`Transfer completed successfully!`, { chain: domainInfo.DESTINATION.chain, etc: { transfer } });
    }
  });
});
