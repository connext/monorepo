import { Bytes, Contract } from "ethers";
// eslint-disable-next-line node/no-extraneous-import
import { Interface } from "@ethersproject/abi";

interface Call {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
}

export const multicall = async (abi: any[], calls: Call[], multicallContract: Contract) => {
  const abiInterface = new Interface(abi);
  const calldata = calls.map((call) => [
    call.address.toLowerCase(),
    abiInterface.encodeFunctionData(call.name, call.params),
  ]);

  const { returnData } = await multicallContract.aggregate(calldata);
  const res = returnData.map((call: Bytes, i: number) => abiInterface.decodeFunctionResult(calls[i].name, call));

  return res;
};
