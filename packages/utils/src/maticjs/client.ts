import { POSClient, use } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
import { constants } from "ethers";

// install ethers plugin
use(Web3ClientPlugin);

// get matic and maticPoS clients from maticjs
export const initMatic = async (isMainnet: boolean, maticRPC: string, ethereumRPC: string): Promise<POSClient> => {
  // const _network = isMainnet ? "mainnet" : "testnet";
  // const _version = isMainnet ? "v1" : "mumbai";

  const _network = "mainnet";
  const _version = "v1";

  const maticConfig = {
    network: _network,
    version: _version,
    parent: {
      provider: ethereumRPC,
      defaultConfig: {
        from: constants.AddressZero,
      },
    },
    child: {
      provider: maticRPC,
      defaultConfig: {
        from: constants.AddressZero,
      },
    },
  };
  const posClient = new POSClient();
  await posClient.init(maticConfig);
  return posClient;
};
