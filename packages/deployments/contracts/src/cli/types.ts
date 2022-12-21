import { Contract } from "ethers";

export type Deployment = {
  proxy?: string;
  name: string;
  address: string;
  abi: any[];
  contract: Contract;
};
