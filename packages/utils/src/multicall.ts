import { Bytes, Contract } from "ethers";
// eslint-disable-next-line node/no-extraneous-import
import { Interface } from "@ethersproject/abi";
import { getSimpleRPCPRovider, MulticallAbi } from ".";

interface Call {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
}

/**
 * Runs multiple calls at a time, call data should be read methods.
 *
 * @param abi - The ABI data of target contract
 * @param calls - The call data what you want to read from contract
 * @param multicallAddress - The address of multicall contract deployed to configured chain
 * @param rpcUrl - The rpc endpoints what you want to call with
 *
 * @returns Array in ethers.BigNumber
 */
export const multicall = async (abi: any[], calls: Call[], multicallAddress: string, rpcUrl: string) => {
  const abiInterface = new Interface(abi);
  const calldata = calls.map((call) => [
    call.address.toLowerCase(),
    abiInterface.encodeFunctionData(call.name, call.params),
  ]);

  const multicallContract = new Contract(multicallAddress, MulticallAbi, getSimpleRPCPRovider(rpcUrl));

  const { returnData } = await multicallContract.aggregate(calldata);
  const res = returnData.map((call: Bytes, i: number) => abiInterface.decodeFunctionResult(calls[i].name, call));

  return res;
};
