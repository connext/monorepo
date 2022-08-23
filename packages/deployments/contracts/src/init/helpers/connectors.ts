import { Contract, providers, Wallet } from "ethers";

import { Connector__factory } from "../../typechain-types";

import { waitForTx } from "./tx";
import { Deployment, DomainStack } from "./types";

export const getConnectorMirrorDomain = async (args: {
  Connector: Deployment;
  stack: DomainStack;
}): Promise<string> => {
  const { Connector: _Connector, stack } = args;
  const iface = Connector__factory.createInterface();

  const Connector = new Contract(_Connector.address, iface, stack.rpc);
  const res = await Connector.callStatic.mirrorDomain();
  if (!res) {
    throw new Error(`Connector ${_Connector.address} for domain ${stack.domain} returned no mirrorDomain: ${res}`);
  }
  return res.toString();
};

export const getConnectorMirror = async (args: { Connector: Deployment; stack: DomainStack }): Promise<string> => {
  const { Connector: _Connector, stack } = args;
  const iface = Connector__factory.createInterface();

  const Connector = new Contract(_Connector.address, iface, stack.rpc);
  const res = await Connector.callStatic.mirrorConnector();
  if (!res) {
    throw new Error(`Connector ${_Connector.address} for domain ${stack.domain} returned no mirrorConnector: ${res}`);
  }
  return res.toString();
};

export const setConnectorMirrors = async (args: {
  deployer: Wallet;
  hub: {
    Connector: Deployment;
    stack: DomainStack;
  };
  spoke: {
    Connector: Deployment;
    stack: DomainStack;
  };
}): Promise<void> => {
  const { hub, spoke, deployer } = args;
  const iface = Connector__factory.createInterface();

  console.log(`\n* Checking Connector pair for connection to chain ${spoke.stack.chain}.`);
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
    const Connector = new Contract(connection.Connector.address, iface, connection.stack.rpc);
    // Check to see if the mirror is set (correctly).
    const currentMirror = await Connector.callStatic.mirrorConnector();
    console.log(`(${connection.stack.chain}) Current: ${currentMirror} | Desired: ${connection.mirror}`);
    if (currentMirror !== connection.mirror) {
      console.log(`Setting mirror connector on ${connection.Connector.name} to ${connection.mirror}...`);
      const tx = await Connector.connect(deployer).setMirrorConnector(connection.mirror);
      await waitForTx(tx as providers.TransactionResponse, `setMirrorConnector`);
    }
  }
};
