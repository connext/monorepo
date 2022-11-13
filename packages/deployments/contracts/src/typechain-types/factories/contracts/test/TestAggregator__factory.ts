/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestAggregator,
  TestAggregatorInterface,
} from "../../../contracts/test/TestAggregator";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "TestAggregator_Stopped",
    type: "error",
  },
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
    name: "stop",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint80",
        name: "_roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "_answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "_updateAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "_answeredInRound",
        type: "uint80",
      },
    ],
    name: "updateMockData",
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
  "0x6000805460ff1916601217905560c0604052601960809081527f436861696e6c696e6b20546573742041676772656761746f720000000000000060a052600190610049908261015e565b5060016002819055600380546001600160501b03199081168317909155600482905560068054909116909117905534801561008357600080fd5b5060405161081c38038061081c8339810160408190526100a29161021d565b6000805460ff191660ff9290921691909117905542600555610247565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806100e957607f821691505b60208210810361010957634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561015957600081815260208120601f850160051c810160208610156101365750805b601f850160051c820191505b8181101561015557828155600101610142565b5050505b505050565b81516001600160401b03811115610177576101776100bf565b61018b8161018584546100d5565b8461010f565b602080601f8311600181146101c057600084156101a85750858301515b600019600386901b1c1916600185901b178555610155565b600085815260208120601f198616915b828110156101ef578886015182559484019460019091019084016101d0565b508582101561020d5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60006020828403121561022f57600080fd5b815160ff8116811461024057600080fd5b9392505050565b6105c6806102566000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063640529801161005b57806364052980146100f55780637284e416146101405780639a6fc8f514610155578063feaf968c1461019c57600080fd5b806307da68f51461008d578063313ce567146100a757806354fd4d50146100cb578063575ac1e6146100e2575b600080fd5b6100a56006805460ff60501b1916600160501b179055565b005b6000546100b49060ff1681565b60405160ff90911681526020015b60405180910390f35b6100d460025481565b6040519081526020016100c2565b6100a56100f0366004610330565b600455565b6100a5610103366004610365565b600380546001600160501b0395861669ffffffffffffffffffff199182161790915560049390935560059190915560068054919093169116179055565b6101486101a4565b6040516100c291906103ab565b6101686101633660046103f9565b610232565b604080516001600160501b03968716815260208101959095528401929092526060830152909116608082015260a0016100c2565b6101686102ab565b600180546101b19061041b565b80601f01602080910402602001604051908101604052809291908181526020018280546101dd9061041b565b801561022a5780601f106101ff5761010080835404028352916020019161022a565b820191906000526020600020905b81548152906001019060200180831161020d57829003601f168201915b505050505081565b60008060008060006006600a9054906101000a900460ff1615610268576040516330a0505160e01b815260040160405180910390fd5b600054869061027b9060ff16600a610551565b6004546102889190610560565b60055460065492999198506000975095506001600160501b039091169350915050565b60008060008060006006600a9054906101000a900460ff16156102e1576040516330a0505160e01b815260040160405180910390fd5b6003546000546001600160501b03909116906103019060ff16600a610551565b60045461030e9190610560565b60055460065492989197506000965094506001600160501b0390911692509050565b60006020828403121561034257600080fd5b5035919050565b80356001600160501b038116811461036057600080fd5b919050565b6000806000806080858703121561037b57600080fd5b61038485610349565b935060208501359250604085013591506103a060608601610349565b905092959194509250565b600060208083528351808285015260005b818110156103d8578581018301518582016040015282016103bc565b506000604082860101526040601f19601f8301168501019250505092915050565b60006020828403121561040b57600080fd5b61041482610349565b9392505050565b600181811c9082168061042f57607f821691505b60208210810361044f57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600181815b808511156104a657816000190482111561048c5761048c610455565b8085161561049957918102915b93841c9390800290610470565b509250929050565b6000826104bd5750600161054b565b816104ca5750600061054b565b81600181146104e057600281146104ea57610506565b600191505061054b565b60ff8411156104fb576104fb610455565b50506001821b61054b565b5060208310610133831016604e8410600b8410161715610529575081810a61054b565b610533838361046b565b806000190482111561054757610547610455565b0290505b92915050565b600061041460ff8416836104ae565b80820260008212600160ff1b8414161561057c5761057c610455565b818105831482151761054b5761054b61045556fea26469706673582212201b5d9cc0079a8961c143054d716d795ad3cd23e342bd37d735fa9e290736bcb564736f6c63430008110033";

type TestAggregatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestAggregatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestAggregator__factory extends ContractFactory {
  constructor(...args: TestAggregatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _decimals: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestAggregator> {
    return super.deploy(_decimals, overrides || {}) as Promise<TestAggregator>;
  }
  override getDeployTransaction(
    _decimals: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_decimals, overrides || {});
  }
  override attach(address: string): TestAggregator {
    return super.attach(address) as TestAggregator;
  }
  override connect(signer: Signer): TestAggregator__factory {
    return super.connect(signer) as TestAggregator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestAggregatorInterface {
    return new utils.Interface(_abi) as TestAggregatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestAggregator {
    return new Contract(address, _abi, signerOrProvider) as TestAggregator;
  }
}
