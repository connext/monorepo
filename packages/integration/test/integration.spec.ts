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
  DESTINATION_ASSET,
  CANONICAL_DOMAIN,
  TestAgents,
  EXECUTE_TIMEOUT,
  SUBG_POLL_PARITY,
} from "./constants";
import {
  canonizeTokenId,
  formatSubgraphGetTransferQuery,
  getAllowance,
  getRouterApproval,
  OperationContext,
} from "./helpers";
import { log } from "./log";

const ROUTER_MNEMONIC = process.env.ROUTER_MNEMONIC;
const DEPLOYER_MNEMONIC = process.env.DEPLOYER_MNEMONIC;
const USER_MNEMONIC = process.env.USER_MNEMONIC || Wallet.createRandom()._mnemonic().phrase;

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
describe("Integration:E2E", () => {
  // Configuration.
  let domainInfo: { ORIGIN: DomainInfo; DESTINATION: DomainInfo };
  let routerConfig: RouterConfig;
  let sequencerConfig: SequencerConfig;

  // Services.
  let chainreader: ChainReader;
  let subgraph: SubgraphReader;

  // Agents.
  let agents: TestAgents;

  // Contexts.
  let context: OperationContext;

  before(async () => {
    domainInfo = await DOMAINS;
    routerConfig = await ROUTER_CONFIG;
    sequencerConfig = await SEQUENCER_CONFIG;

    // Init agents.
    const router = ROUTER_MNEMONIC ? Wallet.fromMnemonic(ROUTER_MNEMONIC) : undefined;
    const deployer = ROUTER_MNEMONIC && DEPLOYER_MNEMONIC ? Wallet.fromMnemonic(DEPLOYER_MNEMONIC) : undefined;
    const user = Wallet.fromMnemonic(USER_MNEMONIC);
    const originProvider = new providers.JsonRpcProvider(domainInfo.ORIGIN.config.providers[0]);
    const destinationProvider = new providers.JsonRpcProvider(domainInfo.DESTINATION.config.providers[0]);
    agents = {
      router: router
        ? {
            address: router.address,
            origin: router.connect(originProvider),
            destination: router.connect(destinationProvider),
          }
        : undefined,
      deployer: deployer
        ? {
            address: deployer.address,
            origin: deployer.connect(originProvider),
            destination: deployer.connect(destinationProvider),
          }
        : undefined,
      user: {
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
    context = {
      chainreader,
      domainInfo,
      agents,
    };
  });

  const test = async () => {
    const connext = getConnextInterface();
    const testERC20 = new utils.Interface(ERC20Abi);
    const originConnextAddress = domainInfo.ORIGIN.config.deployments.connext;
    const destinationConnextAddress = domainInfo.DESTINATION.config.deployments.connext;

    // Log setup.
    log.params(
      "\n" +
        (agents.router ? "LOCAL TEST" : "LIVE TEST") +
        `\nTRANSFER:\n\tRoute:    \t${domainInfo.ORIGIN.name} (${domainInfo.ORIGIN.domain}) => ` +
        `${domainInfo.DESTINATION.name} (${domainInfo.DESTINATION.domain})` +
        `\n\tAmount:    \t${utils.formatEther(TRANSFER_TOKEN_AMOUNT)} TEST` +
        `\nAGENTS\n\tRouter:   \t${agents.router?.address ?? "N/A"}\n\tUser:    \t${agents.user.address}` +
        `\nCONNEXT\n\tOrigin:   \t${originConnextAddress}\n\tDestination:\t${destinationConnextAddress}` +
        `\nASSETS\n\tOrigin:   \t${ORIGIN_ASSET.address}\n\tDestination:\t${DESTINATION_ASSET.address}`,
    );

    if (agents.router) {
      // Make sure router's signer address is approved on destination chain.
      log.next("VERIFY ROUTER APPROVAL");
      let isApproved = getRouterApproval(context, {
        domain: domainInfo.DESTINATION,
      });
      if (!isApproved) {
        if (agents.deployer) {
          // Router is not approved. Use deployer to approve router.
          const encoded = connext.encodeFunctionData("setupRouter", [
            agents.router.address,
            agents.router.address,
            agents.router.address,
          ]);
          const tx = await agents.deployer.destination.sendTransaction({
            to: destinationConnextAddress,
            data: encoded,
          });
          await tx.wait(1);

          isApproved = getRouterApproval(context, {
            domain: domainInfo.DESTINATION,
          });

          if (!isApproved) {
            log.fail("Router approval attempt failed.", { domain: domainInfo.DESTINATION, hash: tx.hash });
          }

          log.info("Successfully approved router.");
        } else {
          log.fail("Router needs approval. Specify the DEPLOYER_MNEMONIC in env to have this done automatically.", {
            domain: domainInfo.DESTINATION,
          });
        }
      }
      log.info("Router is approved!", { domain: domainInfo.DESTINATION });
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
          log.fail(`Origin asset needs approval.`, { domain: domainInfo.ORIGIN });
        }
      }
      log.info("Transfer asset is approved on origin chain.", { domain: domainInfo.ORIGIN });

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
          log.fail(`Destination asset needs approval.`, { domain: domainInfo.DESTINATION });
        }
      }
      log.info("Transfer asset is approved on destination chain.", { domain: domainInfo.DESTINATION });
    }

    log.next("FUND USER AGENT");
    // Fund user with ETH and TEST on origin. Router signer will be funder for ETH.
    {
      if (agents.router) {
        // Make sure funder is funded themselves.
        const funderEth = await chainreader.getBalance(domainInfo.ORIGIN.chain, agents.router.address);
        log.info(`Retrieved Router ETH.`, {
          domain: domainInfo.ORIGIN,
          etc: {
            balance: `${utils.formatEther(funderEth)} ETH.`,
          },
        });

        if (funderEth.lt(MIN_FUNDER_ETH)) {
          log.fail(`Router needs at least ${utils.formatEther(MIN_FUNDER_ETH)} ETH for funding user agent.`, {
            domain: domainInfo.ORIGIN,
          });
        }
      }

      // Retrieve user balances for ETH and TEST.
      const userEth = await chainreader.getBalance(domainInfo.ORIGIN.chain, agents.user.address);
      const userTokens = await chainreader.getBalance(
        domainInfo.ORIGIN.chain,
        agents.user.address,
        ORIGIN_ASSET.address,
      );

      log.info("Retrieved User ETH.", {
        domain: domainInfo.ORIGIN,
        etc: {
          balance: `${utils.formatEther(userEth)} ETH.`,
        },
      });
      log.info("Retrieved User TEST.", {
        domain: domainInfo.ORIGIN,
        etc: {
          balance: `${utils.formatEther(userTokens)} TEST.`,
        },
      });

      if (userEth.lt(MIN_USER_ETH)) {
        log.info("Funding user with some ETH...", { domain: domainInfo.ORIGIN });

        if (!agents.router) {
          throw new Error(
            "Router signer not configured: cannot fund User agent! Please fund the User some ETH offline.",
          );
        }

        const tx = await agents.router.origin.sendTransaction({
          to: agents.user.address,
          value: MIN_USER_ETH,
        });
        const receipt = await tx.wait(1);

        const userEth = await chainreader.getBalance(domainInfo.ORIGIN.chain, agents.user.address);
        if (userEth.lt(MIN_USER_ETH)) {
          log.fail(`ETH funding operation failed! User still has only ${utils.formatEther(MIN_USER_ETH)} ETH.`, {
            domain: domainInfo.ORIGIN,
          });
        }
        log.info(`Sent ETH to User.`, {
          domain: domainInfo.ORIGIN,
          hash: receipt.transactionHash,
          etc: {
            balance: `${utils.formatEther(userEth)} ETH.`,
          },
        });
      }

      if (userTokens.lt(TRANSFER_TOKEN_AMOUNT)) {
        log.info("Minting TEST tokens for User...", { domain: domainInfo.ORIGIN });
        // Might as well mint enough for 100 test iterations...
        const amount = TRANSFER_TOKEN_AMOUNT.mul(100);
        const encoded = testERC20.encodeFunctionData("mint", [agents.user.address, amount]);
        const tx = await (agents.router ?? agents.user).origin.sendTransaction({
          to: ORIGIN_ASSET.address,
          data: encoded,
          value: BigNumber.from("0"),
        });
        const receipt = await tx.wait(1);

        const userTokens = await chainreader.getBalance(
          domainInfo.ORIGIN.chain,
          agents.user.address,
          ORIGIN_ASSET.address,
        );
        log.info(`Minted TEST tokens for User.`, {
          domain: domainInfo.ORIGIN,
          hash: receipt.transactionHash,
          etc: {
            balance: `${utils.formatEther(userTokens)} TEST.`,
          },
        });
      }
    }

    log.next("TOKEN ALLOWANCES");
    // Approve TEST token spending for agents.
    {
      const infiniteApproval = constants.MaxUint256;

      // User needs to approve TEST token spend for connext contract on origin chain.
      const userAllowance: BigNumber = await getAllowance(context, {
        domain: domainInfo.ORIGIN,
        owner: agents.user.address,
        spender: originConnextAddress,
        asset: ORIGIN_ASSET.address,
      });
      if (userAllowance.lt(TRANSFER_TOKEN_AMOUNT)) {
        log.info("Approving TEST spending for User...", { domain: domainInfo.ORIGIN });
        const encoded = testERC20.encodeFunctionData("approve", [originConnextAddress, infiniteApproval]);
        const tx = await agents.user.origin.sendTransaction({
          to: ORIGIN_ASSET.address,
          data: encoded,
          value: BigNumber.from("0"),
        });
        const receipt = await tx.wait(1);
        log.info(`Approved TEST spending for User.`, {
          domain: domainInfo.ORIGIN,
          hash: receipt.transactionHash,
          etc: {
            allowance: `${utils.formatEther(userAllowance)} TEST.`,
          },
        });
      }

      // Router needs to approve TEST token spend for connext contract on origin chain.
      if (agents.router) {
        const routerAllowance: BigNumber = await getAllowance(context, {
          domain: domainInfo.DESTINATION,
          owner: agents.router.address,
          spender: destinationConnextAddress,
          asset: DESTINATION_ASSET.address,
        });
        if (routerAllowance.lt(TRANSFER_TOKEN_AMOUNT)) {
          log.info("Approving TEST spending for Router...", { domain: domainInfo.DESTINATION });
          const encoded = testERC20.encodeFunctionData("approve", [destinationConnextAddress, infiniteApproval]);
          const tx = await agents.router.destination.sendTransaction({
            to: DESTINATION_ASSET.address,
            data: encoded,
            value: BigNumber.from("0"),
          });
          const receipt = await tx.wait(1);
          log.info(`Approved TEST spending for Router.`, {
            domain: domainInfo.ORIGIN,
            hash: receipt.transactionHash,
            etc: {
              allowance: `${utils.formatEther(routerAllowance)} TEST.`,
            },
          });
        }
      }
    }

    if (agents.router) {
      log.next("ADD LIQUIDITY");
      // Router should add liquidity to their pool on the destination chain.
      let routerBalance: BigNumber;
      {
        const encoded = connext.encodeFunctionData("routerBalances", [
          agents.router.address,
          DESTINATION_ASSET.address,
        ]);
        const result = await chainreader.readTx({
          chainId: domainInfo.DESTINATION.chain,
          to: destinationConnextAddress,
          data: encoded,
        });
        routerBalance = connext.decodeFunctionResult("routerBalances", result)[0];
      }
      log.info(`Retrieved Router liquidity balance.`, {
        domain: domainInfo.DESTINATION,
        etc: {
          balance: `${utils.formatEther(routerBalance)} TEST.`,
        },
      });

      if (routerBalance.lt(TRANSFER_TOKEN_AMOUNT)) {
        // Router liquidity balance is insufficient.

        // Ensure router has enough TEST tokens to add liquidity.
        {
          let routerTokens = await chainreader.getBalance(
            domainInfo.DESTINATION.chain,
            agents.router.address,
            DESTINATION_ASSET.address,
          );
          log.info("Retrieved Router TEST.", {
            domain: domainInfo.DESTINATION,
            etc: {
              balance: `${utils.formatEther(routerTokens)} TEST.`,
            },
          });

          if (routerTokens.lt(TRANSFER_TOKEN_AMOUNT)) {
            // Mint TEST tokens.
            log.info("Minting TEST tokens for Router...", { domain: domainInfo.DESTINATION });
            // Mint enough for another 100 test iterations...
            const amount = TRANSFER_TOKEN_AMOUNT.mul(100);
            const encoded = testERC20.encodeFunctionData("mint", [agents.router.address, amount]);
            const tx = await agents.router.destination.sendTransaction({
              to: DESTINATION_ASSET.address,
              data: encoded,
              value: BigNumber.from("0"),
            });
            const receipt = await tx.wait(1);

            routerTokens = await chainreader.getBalance(
              domainInfo.ORIGIN.chain,
              agents.router.address,
              DESTINATION_ASSET.address,
            );
            log.info(`Minted TEST tokens for Router. Router now has ${utils.formatEther(routerTokens)} TEST.`, {
              domain: domainInfo.DESTINATION,
              hash: receipt.transactionHash,
            });
          }
        }

        // Add liquidity.
        log.info("Adding liquidity for Router...", { domain: domainInfo.DESTINATION });
        {
          // NOTE: We could add liquidity for another 100 test iterations, HOWEVER, arguably, adding
          // liquidity should be a part of the test!
          const encoded = connext.encodeFunctionData("addLiquidity", [
            TRANSFER_TOKEN_AMOUNT,
            DESTINATION_ASSET.address,
          ]);
          const tx = await agents.router.destination.sendTransaction({
            to: destinationConnextAddress,
            data: encoded,
            value: BigNumber.from("0"),
          });
          const receipt = await tx.wait(1);

          // Check router liquidity on-chain to confirm.
          {
            const encoded = connext.encodeFunctionData("routerBalances", [
              agents.router.address,
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
            log.fail("Add liquidity operation failed!", {
              domain: domainInfo.DESTINATION,
              hash: receipt.transactionHash,
              etc: {
                balance: `${utils.formatEther(routerBalance)} TEST.`,
              },
            });
          }

          log.info("Added liquidity for Router.", {
            domain: domainInfo.DESTINATION,
            etc: {
              balance: `${utils.formatEther(routerBalance)} TEST.`,
            },
          });
        }
      }
    }

    // TODO: Add relayer fees?

    if (agents.router) {
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
    }

    let transfer: XTransfer | undefined;
    log.next("XCALL");
    {
      log.info("Sending XCall...", { domain: domainInfo.ORIGIN });
      const args: XCallArgs = {
        params: {
          to: agents.user.address,
          callData: "0x",
          originDomain: domainInfo.ORIGIN.domain,
          destinationDomain: domainInfo.DESTINATION.domain,
        },
        transactingAssetId: ORIGIN_ASSET.address,
        amount: TRANSFER_TOKEN_AMOUNT.toString(),
        relayerFee: "0",
      };
      const encoded = connext.encodeFunctionData("xcall", [args]);
      const tx = await agents.user.origin.sendTransaction({
        to: originConnextAddress,
        data: encoded,
      });
      const receipt = await tx.wait(1);
      log.info("XCall sent.", {
        domain: domainInfo.ORIGIN,
        hash: receipt.transactionHash,
      });

      // Poll the origin subgraph until the new XCall transfer appears.
      log.info("Polling origin subgraph for added transfer...", { domain: domainInfo.ORIGIN });
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
        log.fail("Failed to retrieve xcalled transfer from the origin subgraph.", {
          domain: domainInfo.ORIGIN,
          etc: {
            polled: `${parity * attempts}ms.`,
          },
        });
      }
      log.info("XCall retrieved.", {
        domain: domainInfo.ORIGIN,
        etc: {
          took: `${parity * i}ms.`,
          transferID: transfer?.transferId,
          transfer,
        },
      });
    }

    log.next("WAIT FOR EXECUTE");
    {
      if (!transfer) {
        // Should never happen, but this soothes Mr. Compiler.
        throw new Error("CRITICAL: transfer is undefined!");
      }

      const waitPeriod = agents.router ? 30 : 60;
      log.info(`Waiting ${waitPeriod}s to allow the XCall to propagate...`);
      await delay(waitPeriod * 1_000);

      if (agents.router) {
        // Poll the sequencer a few times to see if we can get the auction status.
        // NOTE: This may be unsuccessful, but is good information to have for debugging if available.
        log.info("Polling sequencer for auction status...");
        {
          const attempts = 10;
          let error: any | undefined;
          let status: AxiosResponse<AuctionsApiGetAuctionStatusResponse> | undefined;
          let i;
          for (i = 0; i < attempts; i++) {
            await delay(SUBG_POLL_PARITY);
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
              domain: domainInfo.DESTINATION,
              etc: { status: status.data },
            });
          }
        }
      }

      log.info("Polling destination subgraph for execute tx...", { domain: domainInfo.DESTINATION });
      const attempts = Math.floor(EXECUTE_TIMEOUT / SUBG_POLL_PARITY);
      const query = formatSubgraphGetTransferQuery({
        transferId: transfer.transferId,
      });
      let i;
      for (i = 0; i < attempts; i++) {
        await delay(SUBG_POLL_PARITY);
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
        log.fail("Failed to retrieve executed transfer from the destination subgraph.", {
          domain: domainInfo.DESTINATION,
          etc: {
            polled: `~${(SUBG_POLL_PARITY * attempts) / 1_000}s`,
          },
        });
      }
      log.info("Execute transaction found.", {
        domain: domainInfo.DESTINATION,
        hash: transfer.execute?.transactionHash,
        etc: {
          took: `~${(SUBG_POLL_PARITY * i) / 1_000}s`,
        },
      });

      log.info("Transfer completed successfully!", {
        domain: domainInfo.DESTINATION,
        etc: {
          locallyExecuted: agents.router && transfer.router && transfer.router === agents.router?.address,
          transfer,
        },
      });
    }
  };

  it.only("should complete a fast liquidity transfer", async function () {
    this.timeout(300_000 + EXECUTE_TIMEOUT);
    await test();
    log.done();
  });
});
