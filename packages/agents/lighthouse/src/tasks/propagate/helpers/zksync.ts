import { BigNumber, utils } from "ethers";
import { Provider } from "zksync-web3";
import { createLoggingContext, RequestContext } from "@connext/nxtp-utils";

import { getContract, getJsonRpcProvider } from "../../../mockable";
import { NoHubConnector, NoProviderForDomain, NoSpokeConnector } from "../errors";
import { ExtraPropagateParam } from "../operations/propagate";
import { getContext } from "../propagate";

const ZKSYNC_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gasPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_l2GasLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_l2GasPerPubdataByteLimit",
        type: "uint256",
      },
    ],
    name: "l2TransactionBaseCost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const getPropagateParams = async (
  l2domain: string,
  l2ChainId: number,
  l1ChainId: number,
  _requestContext: RequestContext,
): Promise<ExtraPropagateParam> => {
  const {
    config,
    logger,
    adapters: { deployments },
  } = getContext();
  const { methodContext, requestContext } = createLoggingContext(getPropagateParams.name, _requestContext);
  logger.info("Getting propagate params for ZkSync", requestContext, methodContext, { l2domain });

  const l2RpcUrl = config.chains[l2domain]?.providers[0];

  if (!l2RpcUrl) {
    throw new NoProviderForDomain(l2domain, requestContext, methodContext);
  }
  const l1RpcUrl = config.chains[config.hubDomain]?.providers[0];
  if (!l1RpcUrl) {
    throw new NoProviderForDomain(config.hubDomain, requestContext, methodContext);
  }

  const l2SpokeConnector = deployments.spokeConnector(
    l2ChainId,
    "ZkSync",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l2SpokeConnector) {
    throw new NoSpokeConnector(l2ChainId, requestContext, methodContext);
  }

  const l1HubConnector = deployments.hubConnector(
    l1ChainId,
    "ZkSync",
    config.environment === "staging" ? "Staging" : "",
  );
  if (!l1HubConnector) {
    throw new NoHubConnector(l1ChainId, requestContext, methodContext);
  }

  const l1Provider = getJsonRpcProvider(l1RpcUrl);
  const l2Provider = new Provider(l2RpcUrl);

  const gasPrice = await l1Provider.getGasPrice();
  const gasLimit = BigNumber.from(10000000);
  const gasPerPubdataByte = BigNumber.from(800);

  const zkSyncContract = getContract(await l2Provider.getMainContractAddress(), ZKSYNC_ABI, l1Provider);
  const txCostPrice = await zkSyncContract.l2TransactionBaseCost(gasPrice, gasLimit, gasPerPubdataByte);

  const encodedData = utils.defaultAbiCoder.encode(["uint256"], [gasPrice]);

  logger.info("Got propagate params for ZkSync", requestContext, methodContext, {
    gasPrice,
    gasLimit: gasLimit.toString(),
    gasPerPubdataByte: gasPerPubdataByte.toString(),
    txCostPrice: txCostPrice.toString(),
    zkSyncContract: zkSyncContract.address,
    encodedData,
  });

  return { _connector: "", _fee: txCostPrice.toString(), _encodedData: encodedData };
};
