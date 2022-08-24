import { Contract, providers, Wallet } from "ethers";

import { Connector__factory } from "../../typechain-types";

import { waitForTx } from "./tx";
import { Deployment, NetworkStack } from "./types";

export const getConnectorMirrorDomain = async (args: {
  Connector: Deployment;
  network: NetworkStack;
}): Promise<string> => {
  const { Connector: _Connector, network } = args;
  const iface = Connector__factory.createInterface();

  const Connector = new Contract(_Connector.address, iface, network.rpc);
  const res = await Connector.callStatic.mirrorDomain();
  if (!res) {
    throw new Error(`Connector ${_Connector.address} for domain ${network.domain} returned no mirrorDomain: ${res}`);
  }
  return res.toString();
};

export const getConnectorMirror = async (args: { Connector: Deployment; network: NetworkStack }): Promise<string> => {
  const { Connector: _Connector, network } = args;
  const iface = Connector__factory.createInterface();

  const Connector = new Contract(_Connector.address, iface, network.rpc);
  const res = await Connector.callStatic.mirrorConnector();
  if (!res) {
    throw new Error(`Connector ${_Connector.address} for domain ${network.domain} returned no mirrorConnector: ${res}`);
  }
  return res.toString();
};

export const getConnectorRootManager = async (args: {
  Connector: Deployment;
  network: NetworkStack;
}): Promise<string> => {
  const { Connector: _Connector, network } = args;
  const iface = Connector__factory.createInterface();

  const Connector = new Contract(_Connector.address, iface, network.rpc);
  const res = await Connector.callStatic.ROOT_MANAGER();
  if (!res) {
    throw new Error(`Connector ${_Connector.address} for domain ${network.domain} returned no ROOT_MANAGER: ${res}`);
  }
  return res.toString();
};

export const setConnectorMirrors = async (args: {
  deployer: Wallet;
  hub: {
    Connector: Deployment;
    network: NetworkStack;
  };
  spoke: {
    Connector: Deployment;
    network: NetworkStack;
  };
}): Promise<void> => {
  const { hub, spoke, deployer } = args;
  const iface = Connector__factory.createInterface();

  for (const connection of [
    {
      ...hub,
      mirror: spoke.Connector.address,
    },
    {
      ...spoke,
      mirror: hub.Connector.address,
    },
  ]) {
    const Connector = new Contract(connection.Connector.address, iface, connection.network.rpc);

    // Check to see if the mirror is set (correctly).
    const currentMirror = await Connector.callStatic.mirrorConnector();
    console.log(`\t[${connection.network.chain}] Current: ${currentMirror} | Desired: ${connection.mirror}`);
    if (currentMirror !== connection.mirror) {
      console.log(`Setting mirror connector on ${connection.Connector.name} to ${connection.mirror}...`);
      const tx = (await Connector.connect(deployer).setMirrorConnector(
        connection.mirror,
      )) as providers.TransactionResponse;
      await waitForTx({
        tx,
        name: "setMirrorConnector",
        checkResult: {
          method: Connector.callStatic.mirrorConnector,
          desired: connection.mirror,
        },
      });
    }
  }
};
