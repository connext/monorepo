/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestAggregator, TestAggregatorInterface } from "../TestAggregator";

const _abi = [
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "_roundId",
        type: "uint80",
      },
    ],
    name: "getRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mockAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "_answer",
        type: "int256",
      },
    ],
    name: "updateMockAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
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

const _bytecode =
  "0x6000805460ff1916601217905560c0604052601960808190527f436861696e6c696e6b20546573742041676772656761746f720000000000000060a090815261004b916001919061006f565b506001600255670de0b6b3a764000060035534801561006957600080fd5b50610143565b82805461007b90610108565b90600052602060002090601f01602090048101928261009d57600085556100e3565b82601f106100b657805160ff19168380011785556100e3565b828001600101855582156100e3579182015b828111156100e35782518255916020019190600101906100c8565b506100ef9291506100f3565b5090565b5b808211156100ef57600081556001016100f4565b600181811c9082168061011c57607f821691505b6020821081141561013d57634e487b7160e01b600052602260045260246000fd5b50919050565b6102fd806101526000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80637284e4161161005b5780637284e416146100d25780639a6fc8f5146100e7578063f0f4632714610142578063feaf968c1461014b57600080fd5b8063313ce5671461008257806354fd4d50146100a6578063575ac1e6146100bd575b600080fd5b60005461008f9060ff1681565b60405160ff90911681526020015b60405180910390f35b6100af60025481565b60405190815260200161009d565b6100d06100cb3660046101f0565b600355565b005b6100da610162565b60405161009d9190610239565b61010b6100f5366004610208565b60035490916000904290670de0b6b3a764000090565b6040805169ffffffffffffffffffff968716815260208101959095528401929092526060830152909116608082015260a00161009d565b6100af60035481565b600354600190600042670de0b6b3a764000061010b565b6001805461016f9061028c565b80601f016020809104026020016040519081016040528092919081815260200182805461019b9061028c565b80156101e85780601f106101bd576101008083540402835291602001916101e8565b820191906000526020600020905b8154815290600101906020018083116101cb57829003601f168201915b505050505081565b600060208284031215610201578081fd5b5035919050565b600060208284031215610219578081fd5b813569ffffffffffffffffffff81168114610232578182fd5b9392505050565b6000602080835283518082850152825b8181101561026557858101830151858201604001528201610249565b818111156102765783604083870101525b50601f01601f1916929092016040019392505050565b600181811c908216806102a057607f821691505b602082108114156102c157634e487b7160e01b600052602260045260246000fd5b5091905056fea26469706673582212200710f2ab40507ee0ecd8e6250b0b0780ba79af85165da19e9157068db0294eca64736f6c63430008040033";

export class TestAggregator__factory extends ContractFactory {
  constructor(...args: TestAggregatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "TestAggregator";
  }

  deploy(overrides?: Overrides & { from?: string | Promise<string> }): Promise<TestAggregator> {
    return super.deploy(overrides || {}) as Promise<TestAggregator>;
  }
  getDeployTransaction(overrides?: Overrides & { from?: string | Promise<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestAggregator {
    return super.attach(address) as TestAggregator;
  }
  connect(signer: Signer): TestAggregator__factory {
    return super.connect(signer) as TestAggregator__factory;
  }
  static readonly contractName: "TestAggregator";
  public readonly contractName: "TestAggregator";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestAggregatorInterface {
    return new utils.Interface(_abi) as TestAggregatorInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): TestAggregator {
    return new Contract(address, _abi, signerOrProvider) as TestAggregator;
  }
}
