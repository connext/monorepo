import { Logger, XCallArgs } from "@connext/nxtp-utils";
import { SdkBase, SdkXCallParams } from "@connext/sdk-core";
import { providers, utils, Wallet } from "ethers";
import { ConnextInterface } from "@connext/smart-contracts";

export const logger = new Logger({ name: "e2e" });

export const sendXCall = async (
  sdkBase: SdkBase,
  xcallParams: SdkXCallParams,
  signer: Wallet,
): Promise<{
  receipt: providers.TransactionReceipt;
  xcallData: XCallArgs;
}> => {
  logger.info("Formatting XCall.", undefined, undefined, { xcallParams });

  const tx = await sdkBase.xcall(xcallParams);

  logger.info("Sending XCall...");
  const res = await signer.sendTransaction({
    to: tx.to!,
    value: tx.value ?? 0,
    data: utils.hexlify(tx.data!),
    chainId: +xcallParams.origin,
  });
  const receipt: providers.TransactionReceipt = await res.wait(1);

  logger.info("XCall sent!", undefined, undefined, {
    hash: receipt.transactionHash,
    confirmations: receipt.confirmations,
    blockNumber: receipt.blockNumber,
    logs: receipt.logs
      .map((event) => {
        try {
          const result = ConnextInterface.parseLog(event);
          return {
            name: result.eventFragment.name,
            signature: result.signature,
            topic: result.topic,
            rargs: result.args,
          };
        } catch (e: unknown) {
          return undefined;
        }
      })
      .filter((event) => !!event),
  });
  return {
    receipt,
    xcallData: {
      destination: xcallParams.destination,
      to: xcallParams.to,
      asset: xcallParams.asset!,
      relayerFee: xcallParams.relayerFee,
      delegate: xcallParams.delegate!,
      amount: xcallParams.amount!,
      slippage: xcallParams.slippage!,
      callData: xcallParams.callData!,
    },
  };
};
