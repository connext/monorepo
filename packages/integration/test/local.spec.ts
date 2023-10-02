import axios, { AxiosResponse } from "axios";
import {
  createLoggingContext,
  ExecuteFastApiGetExecStatusResponse,
  SequencerApiErrorResponse,
  ERC20Abi,
  XTransferStatus,
} from "@connext/nxtp-utils";
import { SdkBase, SdkUtils, SdkXCallParams } from "@connext/sdk-core";
import { BigNumber, constants, providers, utils } from "ethers";
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

  it("happy: create a successful transfer", async () => {
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
      amount: "10000",
      slippage: "300",
      callData: "0x",
      relayerFee: utils.parseUnits("1", 17).toString(),
      receiveLocal: false,
    };

    const erc20 = new utils.Interface(ERC20Abi);

    const balanceBeforeXCallRes = await deployerTxService.readTx({
      domain: PARAMETERS.A.CHAIN,
      data: erc20.encodeFunctionData("balanceOf", [PARAMETERS.AGENTS.USER.address]),
      to: PARAMETERS.A.DEPLOYMENTS.TestERC20,
    });
    const [balanceBeforeXCall] = erc20.decodeFunctionResult("balanceOf", balanceBeforeXCallRes);

    const xcallRes = await sendXCall(sdkBase, xcallParams, userSignerOnHub);

    const originTransfer = await getTransferByTransactionHash(
      sdkUtils,
      xcallParams.origin,
      xcallRes.receipt.transactionHash,
    );

    logger.info("Waiting for execution on the destination domain.", requestContext, methodContext, {
      domain: xcallParams.destination,
      transferId: originTransfer?.transferId,
    });

    let destinationTransfer = await getTransferById(sdkUtils, xcallParams.origin, originTransfer.transferId);

    expect(destinationTransfer.destination?.status).to.be.eq(XTransferStatus.Executed);

    logger.info("Transfer executed", requestContext, methodContext, {
      originDomain: xcallParams.origin,
      destinationDomain: xcallParams.destination,
      status: destinationTransfer.destination?.status,
    });

    const balanceAfterXCallRes = await deployerTxService.readTx({
      domain: PARAMETERS.A.CHAIN,
      data: erc20.encodeFunctionData("balanceOf", [PARAMETERS.AGENTS.USER.address]),
      to: PARAMETERS.A.DEPLOYMENTS.TestERC20,
    });
    const [balanceAfterXCall] = erc20.decodeFunctionResult("balanceOf", balanceAfterXCallRes);
    logger.info(
      `New user: ${PARAMETERS.AGENTS.USER.address} token balance: ${balanceAfterXCall.toString()} on domain: ${
        PARAMETERS.A.DOMAIN
      }`,
    );

    // The amount received after fees are deducted (e.g. 9995/10000 would be .005%).
    expect(BigNumber.from(balanceAfterXCall.toString()).sub(balanceBeforeXCall.toString()).toString()).to.be.eq("9995");

    await processAMB(PARAMETERS.HUB);
    destinationTransfer = await getTransferById(
      sdkUtils,
      xcallParams.origin,
      originTransfer.transferId,
      XTransferStatus.CompletedFast,
    );
    expect(destinationTransfer.destination?.status).to.be.eq(XTransferStatus.CompletedFast);
    logger.info("Transfer completed!", requestContext, methodContext, {
      originDomain: xcallParams.origin,
      destinationDomain: xcallParams.destination,
      status: destinationTransfer.destination?.status,
    });
  });
});
