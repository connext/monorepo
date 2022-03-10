import fastify from "fastify";
import axios from "axios";
import pino from "pino";
import {
  gelatoSend,
  isChainSupportedByGelato,
  SignedBid,
  RequestContext,
  createLoggingContext,
  formatUrl,
  jsonifyError,
  gelatoRelayEndpoint,
} from "@connext/nxtp-utils";
import { getTxManagerInterface } from "@connext/nxtp-contracts/src";

import { AppContext } from "../../context";

export const bindServer = (context: AppContext) =>
  new Promise<void>((res) => {
    const { config, logger } = context;
    const server = fastify({ logger: pino({ level: context.config.logLevel }) });

    server.get("/ping", async (_req, res) => {
      return res.code(200).send("pong\n");
    });

    server.post("/bid", {}, async (request, response) => {
      try {
        const { requestContext } = createLoggingContext("/bid endpoint");
        const { body: req } = request;
        const result = await handleBid(context, (req as any).bid as SignedBid, requestContext);
        return response.status(200).send(result);
      } catch (error: any) {
        logger.error(`Bid Post Error: ${error}`);
        return response.code(500).send({ err: jsonifyError(error) });
      }
    });

    server.listen(config.server.port, config.server.host, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      logger.info(`Server listening at ${address}`);
      res();
    });
  });

export const handleBid = async (
  context: AppContext,
  signedBid: SignedBid,
  _requestContext: RequestContext,
): Promise<any> => {
  const {
    logger,
    chainData,
    adapters: { chainreader },
    config,
  } = context;
  const { requestContext, methodContext } = createLoggingContext(handleBid.name, _requestContext);
  logger.info("Method start: handleBid", requestContext, methodContext, { signedBid });

  const { bid } = signedBid;
  const destinationChainId = chainData.get(bid.data.params.destinationDomain)!.chainId;

  const encodedData = getTxManagerInterface().encodeFunctionData("fulfill", [bid.data]);
  const destinationTransactionManagerAddress =
    config.chains[bid.data.params.destinationDomain].deployments.transactionManager;

  logger.info("Prepared data for sending", requestContext, methodContext, {
    encodedData,
    destinationTransactonManagerAddress: destinationTransactionManagerAddress,
    domain: bid.data.params.destinationDomain,
    signedBid,
  });

  // Validate the bid's fulfill call will succeed on chain.
  const gas = await chainreader.getGasEstimate(Number(bid.data.params.destinationDomain), {
    chainId: destinationChainId,
    to: destinationTransactionManagerAddress,
    data: encodedData,
  });

  logger.info("Estimated gas", requestContext, methodContext, {
    gas: gas.toString(),
  });

  if (!isChainSupportedByGelato(destinationChainId)) {
    throw new Error("Chain not supported by gelato.");
  }

  logger.info("Sending to Gelato network", requestContext, methodContext, {
    encodedData,
    destinationTransactionManagerAddress,
    domain: bid.data.params.destinationDomain,
  });

  // TODO: In the future, this should update the cache with the bid, and we should be sending with gelato in a separate handler!
  const result = await gelatoSend(
    destinationChainId,
    destinationTransactionManagerAddress,
    encodedData,
    bid.data.local,
    bid.data.feePercentage,
  );
  const response = await axios.get(formatUrl(gelatoRelayEndpoint, "tasks", result.taskId));

  logger.info("Sent to Gelato network", requestContext, methodContext, {
    result,
    response: response.data,
  });
};
