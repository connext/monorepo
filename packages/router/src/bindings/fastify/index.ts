import { createRequestContext, jsonifyError } from "@connext/nxtp-utils";
import { constants, utils } from "ethers/lib/ethers";
import fastify from "fastify";
import { register } from "prom-client";

import { signRouterRemoveLiquidityTransactionPayload } from "../../lib/helpers";
import { getContext } from "../../router";
import { handleActiveTransactions } from "../contractReader";

import { prepareCancel } from "./cancel";
import {
  AdminRequest,
  AdminSchema,
  CancelSenderTransferRequest,
  CancelSenderTransferRequestSchema,
  RemoveLiquidityRequest,
  RemoveLiquidityRequestSchema,
  RemoveLiquidityResponseSchema,
  AddLiquidityForRequest,
  AddLiquidityForRequestSchema,
  AddLiquidityForResponseSchema,
  MigrateLiquidityRequest,
  MigrateLiquidityRequestSchema,
  MigrateLiquidityResponseSchema,
} from "./schema";

export const bindFastify = () =>
  new Promise<void>((res) => {
    const {
      wallet,
      contractWriter,
      config,
      logger,
      contractReader,
      isRouterContract,
      txService,
      chainData,
      routerAddress,
    } = getContext();

    const server = fastify();

    server.get("/ping", async () => {
      return "pong\n";
    });

    server.get("/config", async () => {
      return {
        signerAddress: await wallet.getAddress(),
      };
    });

    server.get("/metrics", async (request, response) => {
      try {
        const res = await register.metrics();
        return response.status(200).send(res);
      } catch (e: any) {
        const json = jsonifyError(e);
        logger.error("Failed to collect metrics", undefined, undefined, json);
        return response.status(500).send(json);
      }
    });

    server.post<{ Body: RemoveLiquidityRequest }>(
      "/remove-liquidity",
      { schema: { body: RemoveLiquidityRequestSchema, response: { "2xx": RemoveLiquidityResponseSchema } } },
      async (req, res) => {
        const requestContext = createRequestContext("/remove-liquidity");
        const { adminToken, chainId, amount, assetId, recipientAddress } = req.body;
        if (adminToken !== config.adminToken) {
          return res.code(401).send("Unauthorized to perform this operation");
        }
        try {
          let transactionHash;
          if (isRouterContract) {
            const routerRelayerFeeAsset = utils.getAddress(
              config.chainConfig[chainId].routerContractRelayerAsset ?? constants.AddressZero,
            );
            const relayerFeeAssetDecimal = await txService.getDecimalsForAsset(chainId, routerRelayerFeeAsset);
            const routerRelayerFee = await txService.calculateGasFee(
              chainId,
              routerRelayerFeeAsset,
              relayerFeeAssetDecimal,
              "removeLiquidity",
              isRouterContract,
              chainData,
              requestContext,
            );
            const signature = await signRouterRemoveLiquidityTransactionPayload(
              amount,
              assetId,
              routerRelayerFeeAsset,
              routerRelayerFee.toString(),
              chainId,
              wallet,
            );
            const result = await contractWriter.removeLiquidityRouterContract(
              chainId,
              amount,
              assetId,
              recipientAddress,
              routerAddress,
              signature,
              routerRelayerFeeAsset,
              routerRelayerFee.toString(),
              true,
              requestContext,
            );
          } else {
            const result = await contractWriter.removeLiquidityTransactionManager(
              chainId,
              amount,
              assetId,
              recipientAddress,
              requestContext,
            );
          }
          return { transactionHash: result.transactionHash };
        } catch (err) {
          return res.code(400).send({ err: jsonifyError(err), requestContext });
        }
      },
    );

    server.post<{ Body: AddLiquidityForRequest }>(
      "/add-liquidity-for",
      { schema: { body: AddLiquidityForRequestSchema, response: { "2xx": AddLiquidityForResponseSchema } } },
      async (req, res) => {
        const requestContext = createRequestContext("/add-liquidity-for");
        const { adminToken, chainId, amount, assetId, routerAddress } = req.body;
        if (adminToken !== config.adminToken) {
          return res.code(401).send("Unauthorized to perform this operation");
        }
        try {
          const result = await contractWriter.addLiquidityForTransactionManager(
            chainId,
            amount,
            assetId,
            routerAddress,
            requestContext,
          );
          return {
            transactionHash: result.transactionHash,
          };
        } catch (err) {
          return res.code(400).send({ err: jsonifyError(err), requestContext });
        }
      },
    );

    server.post<{ Body: MigrateLiquidityRequest }>(
      "/migrate-liquidity",
      { schema: { body: MigrateLiquidityRequestSchema, response: { "2xx": MigrateLiquidityResponseSchema } } },
      async (req, res) => {
        const requestContext = createRequestContext("/migrate-liquidity");
        const { adminToken, chainId, assets: _assets, newRouterAddress } = req.body;
        if (adminToken !== config.adminToken) {
          return res.code(401).send("Unauthorized to perform this operation");
        }
        let assets = _assets;
        if (!assets) {
          assets = config.swapPools
            .map((pool) => pool.assets.find((asset) => asset.chainId === chainId)?.assetId)
            .filter((x) => !!x) as string[];
        }

        const result = [];
        let code = 200;
        for (const a of assets) {
          try {
            const _result = await contractWriter.migrateLiquidity(chainId, a, requestContext, newRouterAddress);
            result.push({
              removeLiqudityTx: _result?.removeLiqudityTx.transactionHash,
              addLiquidityForTx: _result?.addLiquidityForTx.transactionHash,
            });
          } catch (err) {
            code = 400;
            result.push({
              err: jsonifyError(err),
            });
          }
        }
        return res.code(code).send(result);
      },
    );

    server.post<{ Body: CancelSenderTransferRequest }>(
      "/cancel-sender",
      { schema: { body: CancelSenderTransferRequestSchema, response: { "2xx": RemoveLiquidityResponseSchema } } },
      async (req, res) => {
        const requestContext = createRequestContext("/cancel-sender");
        const { transactionId, adminToken, user, senderChainId } = req.body;
        if (adminToken !== config.adminToken) {
          return res.code(401).send("Unauthorized to perform this operation");
        }
        try {
          const senderTx = await prepareCancel({ senderChainId, user, transactionId });
          const result = await contractWriter.cancelTransactionManager(
            senderTx.txData.sendingChainId,
            { signature: senderTx.signature ?? "0x", txData: senderTx.txData },
            requestContext,
          );
          return { transactionHash: result.transactionHash };
        } catch (err) {
          return res.code(400).send({ err: jsonifyError(err), requestContext });
        }
      },
    );

    server.post<{ Body: AdminRequest }>(
      "/process-active-transactions",
      { schema: { body: AdminSchema } },
      async (req, res) => {
        const requestContext = createRequestContext("/process-active-transactions");
        const { adminToken } = req.body;
        if (adminToken !== config.adminToken) {
          return res.code(401).send("Unauthorized to perform this operation");
        }
        try {
          const activeTxs = await contractReader.getActiveTransactions();
          logger.info("Got active txs", requestContext, undefined, { activeTxs });
          await handleActiveTransactions(activeTxs);
          return res.code(200).send(activeTxs);
        } catch (err) {
          return res.code(400).send({ err: jsonifyError(err), requestContext });
        }
      },
    );

    server.listen(config.port, config.host, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      logger.info(`Server listening at ${address}`);
      res();
    });
  });
