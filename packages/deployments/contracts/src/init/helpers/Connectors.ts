import { Contract } from "ethers";

import { Connector__factory } from "../../typechain-types";

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
