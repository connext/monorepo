import { Wallet } from "ethers";
import {
  createMethodContext,
  createRequestContext,
  getChainData,
  getNtpTimeSeconds,
  jsonifyError,
  Logger,
} from "@connext/nxtp-utils";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { getContractInterfaces, TransactionService, contractDeployments } from "@connext/nxtp-txservice";
import rabbit from "foo-foo-mq";

import {
  DEFAULT_ROUTER_MQ_RETRY_LIMIT,
  DEFAULT_ROUTER_MQ_FAILAFTER_LIMIT,
  getConfig,
  NxtpRouterConfig,
} from "../../config";
import { bindMetrics } from "../../bindings";
import { setupMq, setupSubgraphReader } from "../../setup";
import { axiosGet } from "../../mockable";

import { AppContext } from "./context";
import { bindMessageQueue, bindServer } from "./bindings";

// AppContext instance used for interacting with adapters, config, etc.
const context: AppContext = {} as any;
export const getContext = () => context;

export const makeSubscriber = async (_configOverride?: NxtpRouterConfig) => {
  const requestContext = createRequestContext("Router subscriber Init");
  const methodContext = createMethodContext(makeSubscriber.name);
  let MQConnection = false;

  try {
    context.adapters = {} as any;

    /// MARK - Config.
    // Get ChainData and parse out configuration.
    context.chainData = await getChainData();
    context.config = _configOverride ?? (await getConfig(context.chainData, contractDeployments));

    /// MARK - Signer
    if (!context.config.mnemonic && !context.config.web3SignerUrl) {
      throw new Error(
        "No mnemonic or web3signer was configured. Please ensure either a mnemonic or a web3signer" +
          " URL is provided in the config. Exiting!",
      );
    }
    context.adapters.wallet = context.config.mnemonic
      ? Wallet.fromMnemonic(context.config.mnemonic)
      : new Web3Signer(context.config.web3SignerUrl!);

    context.routerAddress = await context.adapters.wallet.getAddress();

    /// MARK - Logger
    context.logger = new Logger({
      level: context.config.logLevel,
      name: context.routerAddress,
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    });
    context.logger.info("Generated config.", requestContext, methodContext, {
      config: { ...context.config, mnemonic: context.config.mnemonic ? "*****" : "N/A" },
    });

    /// MARK - Adapters
    context.adapters.subgraph = await setupSubgraphReader(
      context.logger,
      context.chainData,
      Object.keys(context.config.chains),
      context.config.environment,
      context.config.subgraphPrefix,
      requestContext,
    );
    context.adapters.txservice = new TransactionService(
      context.logger.child({ module: "TransactionService", level: context.config.logLevel }),
      context.config.chains,
      context.adapters.wallet as Wallet,
    );
    context.adapters.contracts = getContractInterfaces();

    /// MARK - Validation for auctionRoundDepth

    /// MARK - Cold Start Housekeeping
    try {
      const res = await axiosGet(`${context.config.sequencerUrl}/supportedBidVersion`);
      context.logger.info("supportedBidVersion response received from sequencer", requestContext, methodContext, {
        response: res.data,
      });
    } catch (e: unknown) {
      context.logger.error(
        "Ping error, could not reach sequencer. Exiting!",
        requestContext,
        methodContext,
        jsonifyError(e as Error),
      );
      process.exit(1);
    }
    // TODO: Cold start housekeeping cont'd.
    // - read subgraph to make sure router is approved
    // - read contract or subgraph for current liquidity in each asset, cache it
    // - read subgraph to make sure each asset is (still) approved
    // - bring cache up to speed
    // - make sure a relayer is configured for supported chains.

    /// MARK - Bindings
    // TODO: New diagnostic mode / cleanup mode?
    await bindServer();
    await bindMetrics("subscriber");

    const retryTimeLimit =
      getNtpTimeSeconds() +
      (context.config.messageQueue.retryLimit ?? DEFAULT_ROUTER_MQ_RETRY_LIMIT) *
        (context.config.messageQueue.failAfter ?? DEFAULT_ROUTER_MQ_FAILAFTER_LIMIT);

    while (retryTimeLimit > getNtpTimeSeconds()) {
      try {
        context.adapters.mqClient = await setupMq(
          context.config.messageQueue.uri as string,
          context.config.messageQueue.limit as number,
          context.config.messageQueue.heartbeat as number,
          context.config.messageQueue.failAfter as number,
          context.config.messageQueue.retryLimit as number,
          context.logger,
          requestContext,
        );
        await bindMessageQueue();
        context.logger.info("MQ subscription successfull.", requestContext, methodContext);
        MQConnection = true;
        break;
      } catch (e: unknown) {
        rabbit.reset();
        context.logger.error(
          "Error binding message queue, retrying...",
          requestContext,
          methodContext,
          jsonifyError(e as Error),
        );
        // Wait for 1 second before retrying.
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    if (!MQConnection) {
      // If we failed to connect to the message queue after many retries, throw an error.
      MQConnection = false;
      rabbit.reset();
      context.adapters.mqClient = await setupMq(
        context.config.messageQueue.uri as string,
        context.config.messageQueue.limit as number,
        context.config.messageQueue.heartbeat as number,
        context.config.messageQueue.failAfter as number,
        context.config.messageQueue.retryLimit as number,
        context.logger,
        requestContext,
      );
      await bindMessageQueue();
    }

    context.logger.info("Bindings initialized.", requestContext, methodContext);
    context.logger.info("Router subscriber boot complete!", requestContext, methodContext, {
      port: context.config.server.sub.port,
      chains: [...Object.keys(context.config.chains)],
    });
    console.log(
      `

        _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|   _|_|_|_|_|
      _|         _|    _|   _|_|    _|   _|_|    _|   _|           _|  _|         _|
      _|         _|    _|   _|  _|  _|   _|  _|  _|   _|_|_|         _|           _|
      _|         _|    _|   _|    _|_|   _|    _|_|   _|           _|  _|         _|
        _|_|_|     _|_|     _|      _|   _|      _|   _|_|_|_|   _|      _|       _|

      `,
    );
  } catch (e: unknown) {
    console.error("Error starting router subscriber. Sad! :(", e);
    process.exit();
  }
};
