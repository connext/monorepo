import {
  getChainData,
  getGelatoRelayerAddress,
  isChainSupportedByGelato,
  signHandleRelayerFeePayload,
} from "@connext/nxtp-utils";
import { BigNumber, providers, Wallet } from "ethers";
import { BigNumberish } from "ethers/utils/bignumber";
import { task } from "hardhat/config";

type TaskArgs = {
  connextAddress?: string;
};

export default task("executeEstimateGas", "Prepare a cross-chain tx")
  .addOptionalParam("connextAddress", "Override connext address")
  .setAction(async ({ connextAddress: _connextAddress }: TaskArgs, { deployments, ethers }) => {
    let connextAddress = _connextAddress ?? process.env.EG_CONNEXT_ADDRESS;
    if (!connextAddress) {
      const connextDeployment = await deployments.get("Connext");
      connextAddress = connextDeployment.address;
    }
    console.log("connextAddress: ", connextAddress);
    const connext = await ethers.getContractAt("Connext", connextAddress);
    const destinationDomain = process.env.TRANSFER_DESTINATION_DOMAIN;
    if (!destinationDomain) {
      throw new Error("Destination domain must be specified in env (TRANSFER_DESTINATION_DOMAIN)");
    }

    let encodedData: string | undefined = process.env.EG_EXECUTE_ENCODED_DATA;
    if (!encodedData) {
      console.log("Encoded data was not provided. Encoding data manually...");
      const callParams = {
        to: "TRANSFER_TO",
        callData: "TRANSFER_CALL_DATA",
        originDomain: "TRANSFER_ORIGIN_DOMAIN",
        destinationDomain: "TRANSFER_DESTINATION_DOMAIN",
      };
      for (const [key, envKey] of Object.entries(callParams)) {
        const value = process.env[envKey];
        if (value === undefined) {
          throw new Error(`${key} must be specified from env as ${envKey}`);
        }
        (callParams as any)[key] = value;
      }

      const executeArgs = {
        local: "TRANSFER_ASSET",
        routers: "EXECUTE_ROUTER",
        amount: "TRANSFER_AMOUNT",
        nonce: "EXECUTE_NONCE",
        originSender: "EXECUTE_ORIGIN_SENDER",
      };
      for (const [key, envKey] of Object.entries(executeArgs)) {
        const value = process.env[envKey];
        if (value === undefined) {
          throw new Error(`${key} must be specified from env as ${envKey}`);
        }
        (executeArgs as any)[key] = value;
      }
      (executeArgs as any).params = callParams;
      const feePercentage = "0.05";
      (executeArgs as any).feePercentage = feePercentage;

      console.log("Getting transfer ID...", executeArgs.nonce, executeArgs.originSender, callParams);
      const transferId = await connext.getTransferId(executeArgs.nonce, executeArgs.originSender, callParams);
      console.log("transferId: ", transferId);

      console.log("Getting relayer signature...");
      const router_mnemonic = process.env.EXECUTE_ROUTER_MNEMONIC;
      if (!router_mnemonic) {
        throw new Error("Router mnemonic must be specified in env (EXECUTE_ROUTER_MNEMONIC)");
      }
      const wallet = Wallet.fromMnemonic(router_mnemonic);
      const relayerSignature = await signHandleRelayerFeePayload(transferId as string, feePercentage, wallet);

      (executeArgs as any).relayerSignature = relayerSignature;

      console.log("Execute args: ", executeArgs);

      encodedData = connext.encodeFunctionData("execute", [executeArgs]);
    }

    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Chain data not found!");
    }

    const destinationChainId = chainData.get(destinationDomain)!.chainId;

    const isSupportedByGelato = await isChainSupportedByGelato(destinationChainId);
    if (!isSupportedByGelato) {
      throw new Error("Chain not supported by gelato!");
    }

    // Validate the bid's fulfill call will succeed on chain.
    const relayerAddress = await getGelatoRelayerAddress(destinationChainId);

    const rpcUrl = chainData.get(destinationDomain)?.rpc ?? process.env.EXECUTE_RPC_URL;
    if (!rpcUrl) {
      throw new Error("RPC URL must be specified in env (EXECUTE_RPC_URL)");
    }
    const provider = new providers.JsonRpcProvider(Array.isArray(rpcUrl) ? rpcUrl[0] : rpcUrl);

    const args = provider.prepareRequest("estimateGas", {
      transaction: {
        chainId: destinationChainId,
        to: connextAddress,
        data: encodedData,
        from: relayerAddress,
      },
    });
    const result = (await provider.send(args[0], args[1])) as unknown as BigNumberish;
    const gasLimit = BigNumber.from(result);
    console.log("Estimation successful! Gas limit: ", gasLimit);
  });
