import axios, { AxiosResponse } from "axios";
import {
  createLoggingContext,
  ExecuteFastApiGetExecStatusResponse,
  SequencerApiErrorResponse,
  ERC20Abi,
  XTransferStatus,
} from "@connext/nxtp-utils";
import { SdkBase, SdkUtils, SdkXCallParams } from "@connext/sdk-core";
import { constants, providers, utils } from "ethers";
import { expect } from "chai";

import { pollSomething } from "./helpers/shared";
import {
  sendXCall,
  PARAMETERS,
  deployerTxService,
  logger,
  onchainSetup,
  getTransferByTransactionHash,
  getTransferById,
  processAMB,
} from "./helpers/local";
import { SUBG_POLL_PARITY } from "./constants/local";

const { requestContext, methodContext } = createLoggingContext("e2e");
describe("LOCAL:E2E", () => {
  let sdkBase: SdkBase;
  let sdkUtils: SdkUtils;

  before(async () => {
    for (const chain of [PARAMETERS.HUB, PARAMETERS.A, PARAMETERS.B]) {
      const provider = new providers.JsonRpcProvider(chain.RPC[0]);

      // Ensure automine is off
      await provider.send("evm_setAutomine", [false]);

      // Fund the user and relayer agents some ETH.
      await provider.send("anvil_setBalance", [PARAMETERS.AGENTS.USER.address, "0x84595161401484A000000"]);
      await provider.send("anvil_setBalance", [PARAMETERS.AGENTS.RELAYER.address, "0x84595161401484A000000"]);
    }

    // Sanity checks: make sure addresses configured are correct by checking to make sure contracts are deployed
    // at those addresses (using `getCode`).
    for (const key of ["HUB", "A", "B"]) {
      const config = PARAMETERS[key as "A" | "B"];
      const { CHAIN: chain, DEPLOYMENTS: deployments } = config;
      for (const [deployment, address] of Object.entries(deployments)) {
        const code = await deployerTxService.getCode(chain, address);
        if (code === "0x") {
          throw new Error(`No contract found at given ${deployment} address: ${address} on chain ${chain}!`);
        }
      }
    }

    // Peripherals.
    logger.info("Setting up sdk...");
    const sdkConfig = {
      chains: {
        [PARAMETERS.A.DOMAIN]: {
          assets: [{ address: PARAMETERS.A.DEPLOYMENTS.TestERC20, name: "TestERC20", symbol: "TEST" }],
          providers: PARAMETERS.A.RPC,
          deployments: {
            connext: PARAMETERS.A.DEPLOYMENTS.Connext,
            stableSwap: constants.AddressZero,
          },
        },
        [PARAMETERS.B.DOMAIN]: {
          assets: [
            {
              address: PARAMETERS.B.DEPLOYMENTS.TestERC20,
              name: "TestERC20",
              symbol: "TEST",
            },
          ],
          providers: PARAMETERS.B.RPC,
          deployments: {
            connext: PARAMETERS.B.DEPLOYMENTS.Connext,
            stableSwap: constants.AddressZero,
          },
        },
        [PARAMETERS.HUB.DOMAIN]: {
          assets: [
            {
              address: PARAMETERS.HUB.DEPLOYMENTS.TestERC20,
              name: "TestERC20",
              symbol: "TEST",
            },
          ],
          providers: PARAMETERS.HUB.RPC,
          deployments: {
            connext: PARAMETERS.HUB.DEPLOYMENTS.Connext,
            stableSwap: constants.AddressZero,
          },
        },
      },
      cartographerUrl: PARAMETERS.AGENTS.CARTOGRAPHER.url,
      environment: PARAMETERS.ENVIRONMENT as "production" | "staging",
      signerAddress: PARAMETERS.AGENTS.USER.address,
    };
    sdkBase = await SdkBase.create(sdkConfig);
    sdkUtils = await SdkUtils.create(sdkConfig);
    logger.info("Set up sdk.");

    // On-chain / contracts configuration, approvals, etc.
    await onchainSetup();
  });

  it("handles fast liquidity transfer", async () => {
    // Creates an xcall from hub to spoke
    logger.info("Creating an xcall for happy path", requestContext, methodContext);
    const hubProvider = new providers.JsonRpcProvider(PARAMETERS.HUB.RPC[0]);
    const userSignerOnHub = PARAMETERS.AGENTS.USER.signer.connect(hubProvider);

    const approveReceipt = await sdkBase.approveIfNeeded(
      PARAMETERS.HUB.DOMAIN,
      PARAMETERS.HUB.DEPLOYMENTS.TestERC20,
      "100",
      true,
    );
    if (approveReceipt) {
      const res = await userSignerOnHub.sendTransaction({
        to: PARAMETERS.HUB.DEPLOYMENTS.TestERC20,
        value: 0,
        data: utils.hexlify(approveReceipt.data!),
        chainId: PARAMETERS.HUB.CHAIN,
      });
      await res.wait(1);
    }

    const xcallParams: SdkXCallParams = {
      origin: PARAMETERS.HUB.DOMAIN,
      destination: PARAMETERS.A.DOMAIN,
      to: PARAMETERS.AGENTS.USER.address,
      asset: PARAMETERS.HUB.DEPLOYMENTS.TestERC20,
      delegate: PARAMETERS.AGENTS.USER.address,
      amount: "100",
      slippage: "300",
      callData: "0x",
      relayerFee: utils.parseUnits("1", 16).toString(),
      receiveLocal: false,
    };

    const erc20 = new utils.Interface(ERC20Abi);

    const balanceOfData = erc20.encodeFunctionData("balanceOf", [PARAMETERS.AGENTS.USER.address]);
    const res = await deployerTxService.readTx({
      domain: PARAMETERS.HUB.CHAIN,
      data: balanceOfData,
      to: PARAMETERS.HUB.DEPLOYMENTS.TestERC20,
    });
    const [tokenBalance] = erc20.decodeFunctionResult("balanceOf", res);
    logger.info(`New user: ${PARAMETERS.AGENTS.USER.address} token balance: ${tokenBalance.toString()}`);
    console.log(`New user: ${PARAMETERS.AGENTS.USER.address} token balance: ${tokenBalance.toString()}`);

    const xcallRes = await sendXCall(sdkBase, xcallParams, userSignerOnHub);

    await processAMB(PARAMETERS.HUB);

    const originTransfer = await getTransferByTransactionHash(
      sdkUtils,
      xcallParams.origin,
      xcallRes.receipt.transactionHash,
    );

    logger.info("Waiting for execution on the destination domain.", requestContext, methodContext, {
      domain: xcallParams.destination,
      transferId: originTransfer?.transferId,
    });

    const destinationTransfer = await getTransferById(sdkUtils, xcallParams.origin, originTransfer.transferId);

    logger.info("Fast liquidity transfer completed successfully", requestContext, methodContext, {
      originDomain: xcallParams.origin,
      destinationDomain: xcallParams.destination,
      status: destinationTransfer.destination?.status,
    });
  });

  it.skip("works for address(0) and 0-value transfers", async () => {
    const originProvider = new providers.JsonRpcProvider(PARAMETERS.A.RPC[0]);
    const { receipt, xcallData } = await sendXCall(
      sdkBase,
      { amount: "0", asset: constants.AddressZero },
      PARAMETERS.AGENTS.USER.signer.connect(originProvider),
    );
    const originTransfer = await getTransferByTransactionHash(sdkUtils, PARAMETERS.A.DOMAIN, receipt.transactionHash);

    // TODO: Check user funds, assert tokens were deducted.

    logger.info("Waiting for execution on the destination domain.", requestContext, methodContext, {
      domain: xcallData.destination,
      transferId: originTransfer?.transferId,
    });

    const sequencerUrl = process.env.SEQUENCER_URL;
    if (sequencerUrl) {
      logger.info("Polling sequencer for auction status...");
      let error: any | undefined;
      const status: AxiosResponse<ExecuteFastApiGetExecStatusResponse> | undefined = await pollSomething({
        attempts: Math.floor(60_000 / SUBG_POLL_PARITY),
        parity: SUBG_POLL_PARITY,
        method: async () => {
          return await axios
            .request<ExecuteFastApiGetExecStatusResponse>({
              method: "get",
              baseURL: sequencerUrl,
              url: `/auctions/${originTransfer.transferId}`,
            })
            .catch((e: AxiosResponse<SequencerApiErrorResponse>) => {
              error = e.data ? (e.data.error ? e.data.error.message : e.data) : e;
              return undefined;
            });
        },
      });
      if (!status) {
        logger.info("Unable to retrieve auction status from Sequencer.", requestContext, methodContext, {
          etc: {
            error,
          },
        });
      } else {
        logger.info(`Retrieved auction status from Sequencer.`, requestContext, methodContext, {
          originDomain: xcallData.origin,
          destinationDomain: xcallData.destination,
          etc: { status: status.data },
        });
      }
    }

    const destinationTransfer = await getTransferById(sdkUtils, PARAMETERS.B.DOMAIN, originTransfer.transferId);
    expect(destinationTransfer.destination?.status).to.be.eq(XTransferStatus.Executed);

    // TODO: Check router liquidity on-chain, assert funds were deducted.
    logger.info("Fast-liquidity transfer completed successfully!", requestContext, methodContext, {
      originDomain: xcallData.origin,
      destinationDomain: xcallData.destination,
      etc: {
        transfer: {
          ...originTransfer,
          destination: destinationTransfer.destination,
        },
      },
    });
  });
});
