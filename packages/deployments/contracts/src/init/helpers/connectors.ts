import { Contract } from "ethers";

import { Connector__factory } from "../../typechain-types";

import { Deployment, DomainStack } from "./types";

export const getConnectorMirrorDomain = async (args: {
  Connector: Deployment;
  domain: DomainStack;
}): Promise<string> => {
  const { Connector: _Connector, domain } = args;
  const iface = Connector__factory.createInterface();

  const Connector = new Contract(_Connector.address, iface, domain.rpc);
  const res = await Connector.callStatic.mirrorDomain();
  console.log(res);
  throw new Error("STOP");
  return res as string;
};
