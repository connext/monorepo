import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { LineaSDK, getBestProvider } from "../../../mockable";
import { getContext } from "../propagate";
import { ExtraPropagateParam } from "../operations/propagate";
import { NoProviderForDomain } from "../errors";

// https://docs.linea.build/use-mainnet/bridges-of-linea#manual-vs-automatic-claiming
export const getPropagateParams = async (
  l2domain: string,
  l2ChainId: number,
  l1ChainId: number,
  _requestContext: RequestContext,
): Promise<ExtraPropagateParam> => {
  const { config, logger } = getContext();
  const { methodContext, requestContext } = createLoggingContext(getPropagateParams.name, _requestContext);
  logger.info("Getting propagate params for Linea", requestContext, methodContext, {
    l2domain,
    l1ChainId,
    l2ChainId,
  });

  const l2RpcUrl = await getBestProvider(config.chains[l2domain]?.providers ?? []);
  if (!l2RpcUrl) {
    throw new NoProviderForDomain(l2domain, requestContext, methodContext);
  }
  const l1RpcUrl = await getBestProvider(config.chains[config.hubDomain]?.providers ?? []);
  if (!l1RpcUrl) {
    throw new NoProviderForDomain(config.hubDomain, requestContext, methodContext);
  }

  // Postman Fee = target layer gas price * (gas estimated + gas limit surplus) * margin
  // where target layer gas price is eth_gasPrice on the target layer, gas estimated = 100,000, gas limit surplus = 6000, and margin = 2.
  const sdk = new LineaSDK({
    l1RpcUrl: l1RpcUrl, // L1 rpc url
    l2RpcUrl: l2RpcUrl, // L2 rpc url
    network: config.network === "mainnet" ? "linea-mainnet" : "linea-goerli", // network you want to interact with (either linea-mainnet or linea-goerli)
    mode: "read-only", // contract wrapper class mode (read-only or read-write), read-only: only read contracts state, read-write: read contracts state and claim messages
  });
  const gasPrice = (await sdk.getL2Contract().get1559Fees()).maxFeePerGas;

  // On linea-goerli claimMessage gasLimit was 83717
  // https://goerli.lineascan.build/tx/0x4c477dfcbc22cd99b461cfe714a6ad60796331d3c13e55a74a6de51c3cd9aab6
  const gasLimit = BigNumber.from("120000");
  const margin = BigNumber.from(1);

  const _fee = BigNumber.from(gasPrice).mul(gasLimit).mul(margin).toString();

  logger.info("Got propagate params for Linea", requestContext, methodContext, {
    gasPrice: gasPrice.toString(),
    gasLimit: gasLimit.toString(),
    fee: _fee.toString(),
  });

  return { _connector: "", _fee, _encodedData: "0x" };
};
