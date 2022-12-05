import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { WatcherAdapter } from "@connext/nxtp-adapters-watcher";
import { TransactionService } from "@connext/nxtp-txservice";
import {
  Asset,
  ChainData,
  createLoggingContext,
  createMethodContext,
  getChainData,
  Logger,
  RequestContext,
} from "@connext/nxtp-utils";

import { getConfig } from "./config";
import { WatcherContext } from "./context";

const context: WatcherContext = {} as any;
export const getContext = (): WatcherContext => context;

export const makeWatcher = async () => {
  const { requestContext, methodContext } = createLoggingContext("makeWatcher");
  context.chainData = await getChainData();
  context.adapters = {} as any;
  context.config = await getConfig();
  context.logger = new Logger({ name: "Watcher", level: "info" });
  const txservice = new TransactionService(
    context.logger.child({ module: "TransactionService", level: context.config.logLevel }),
    context.config.chains,
    context.adapters.wallet,
    true, // Ghost instance, in the event that this is running in the same process as a router.;
  );

  context.adapters.subgraph = await setupSubgraphReader(
    context.logger,
    context.chainData,
    Object.keys(context.config.chains),
    context.config.environment,
    undefined,
    requestContext,
  );

  // get asset info from subgraph
  const assetInfo: Asset[] = await context.adapters.subgraph.getAssetsByLocals(
    context.config.hubDomain,
    context.config.chains[context.config.hubDomain].assets.map((a) => a.address),
  );
  context.logger.info("Got asset info from subgraph", requestContext, methodContext, { assetInfo });

  context.adapters.watcher = new WatcherAdapter(
    {
      domains: Object.keys(context.config.chains),
      logger: context.logger.child({ module: "WatcherAdapter", level: context.config.logLevel }),
      txservice,
      isStaging: context.config.environment === "staging",
    },
    assetInfo.map((a) => {
      return { address: a.id, canonicalDomain: a.canonicalDomain, canonicalId: a.canonicalId };
    }),
  );
};

export const setupSubgraphReader = async (
  logger: Logger,
  chainData: Map<string, ChainData>,
  allowedDomains: string[],
  environment: "staging" | "production" | undefined,
  subgraphPrefix: string | undefined,
  requestContext: RequestContext,
): Promise<SubgraphReader> => {
  const methodContext = createMethodContext(setupSubgraphReader.name);

  const allowedChainData: Map<string, ChainData> = new Map();
  for (const allowedDomain of allowedDomains) {
    if (chainData.has(allowedDomain)) {
      allowedChainData.set(allowedDomain, chainData.get(allowedDomain)!);
    }
  }
  logger.info("Subgraph reader setup in progress...", requestContext, methodContext, { allowedChainData });
  const subgraphReader = await SubgraphReader.create(allowedChainData, environment, subgraphPrefix);

  // Pull support for domains that don't have a subgraph.
  const supported: Record<string, boolean> = subgraphReader.supported;
  for (const domain of Object.keys(supported)) {
    // If the domain is set to false, it indicates the SubgraphReader did not find active subgraphs for that domain.
    if (!supported[domain]) {
      throw new Error(`No subgraph found for domain ${domain}`);
    }
  }

  logger.info("Subgraph reader setup is done!", requestContext, methodContext, {});

  return subgraphReader;
};
