import { task } from "hardhat/config";
import { relayer, toChainName, ChainId, CHAINS } from "@certusone/wormhole-sdk";
import { axiosGet } from "@connext/nxtp-utils";
import { Contract } from "ethers";

import {
  Env,
  ProtocolNetwork,
  getConnectorName,
  getDeploymentName,
  getMessagingProtocolConfig,
  getProviderFromHardhatConfig,
} from "../../src/utils";

type TaskArgs = {
  txHash: string;
  env?: Env;
  networkType?: ProtocolNetwork;
  dryRun?: boolean;
};

const chainIdToWhId: Map<number, number> = new Map([
  [1, CHAINS.ethereum],
  [56, CHAINS.bsc],
]);

export default task("wormhole-deliver", "Get status of the message through wormhole and deliver")
  .addOptionalParam("txHash", "Sent transaction has on origin chain")
  .addOptionalParam("dryRun", "Execute tx if wasn't delivered")
  .setAction(
    async (
      { txHash: _txHash, env: _env, networkType: _networkType, dryRun: _dryRun }: TaskArgs,
      { deployments, ethers },
    ) => {
      let { deployer } = await ethers.getNamedSigners();
      if (!deployer) {
        [deployer] = await ethers.getUnnamedSigners();
      }

      const network = await ethers.provider.getNetwork();
      const sourceChainId = chainIdToWhId.get(+network.chainId);

      if (!sourceChainId || ![1, 56].includes(network.chainId)) {
        throw new Error("unsupported source wormhole chain id");
      }
      const targetEvmChainId = network.chainId === 1 ? 56 : 1;
      const targetChainId = chainIdToWhId.get(targetEvmChainId);

      const dryRun = _dryRun === undefined ?? true;
      let txHash = _txHash;

      const sourceProvider = getProviderFromHardhatConfig(network.chainId);
      const targetProvider = getProviderFromHardhatConfig(targetEvmChainId);

      if (!txHash) {
        // find the latest `MessageSent` event!

        const latestBlock = await sourceProvider.getBlockNumber();

        const protocolConfig = getMessagingProtocolConfig("mainnet" as ProtocolNetwork);

        const deploymentName = getDeploymentName(
          getConnectorName(protocolConfig, +network.chainId),
          "production",
          protocolConfig.configs[+network.chainId].networkName,
        );
        const deployment = await deployments.get(deploymentName);
        const address = deployment.address;
        console.log(deploymentName, "connector:", address);

        const connector = new Contract(address, deployment.abi, sourceProvider);
        const events = (
          await Promise.all([
            connector.queryFilter(connector.filters.MessageSent(), latestBlock - 60000, latestBlock - 30000),
            connector.queryFilter(connector.filters.MessageSent(), latestBlock - 29999, latestBlock),
          ])
        ).flat();
        if (!events.length) {
          throw new Error(`Can't find the latest MessageSent Event on chain: ${network.chainId}`);
        }

        events.sort((a, b) => {
          if (a.blockNumber === b.blockNumber) {
            return b.transactionIndex - a.transactionIndex;
          } else {
            return b.blockNumber - a.blockNumber;
          }
        });

        txHash = events[0].transactionHash;
        console.log("found the latest MessageSent transaction: ", txHash);
      }

      console.log("sent txHash: ", txHash);
      console.log("dryRun:", dryRun);

      const info = await relayer.getWormholeRelayerInfo(toChainName(sourceChainId as ChainId), txHash, {
        environment: "MAINNET",
        sourceChainProvider: sourceProvider,
        targetChainProviders: new Map([[toChainName(targetChainId as ChainId), targetProvider]]),
      });
      console.log("deliver status on target chain : ", info.targetChainStatus);
      console.log(relayer.stringifyWormholeRelayerInfo(info));

      if (!info.targetChainStatus.events[0].transactionHash && !dryRun) {
        const vaaBytes = (
          await axiosGet(
            `https://wormhole-v2-mainnet-api.certus.one/v1/signed_vaa/${sourceChainId}/00000000000000000000000027428dd2d3dd32a4d7f7c497eaaa23130d894911/${info.targetChainStatus.events[0].sourceVaaSequence?.toString()}`,
          )
        ).data.vaaBytes;

        const signed_vaa = Buffer.from(vaaBytes as string, "base64");
        console.log("signed vaa: ", signed_vaa);

        const receipt = await relayer.deliver(signed_vaa, deployer.connect(targetProvider), "");

        console.log("deliver tx", receipt);
      }
    },
  );
