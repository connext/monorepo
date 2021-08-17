/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestERC20, TestERC20Interface } from "../TestERC20";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
    inputs: [],
    name: "symbol",
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
    inputs: [],
    name: "totalSupply",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001c576000806200001962000284565b50505b5060405160408082018152600a8252692a32b9ba102a37b5b2b760b11b602083015251604080820190526004815263151154d560e21b602082015260038280516200006c929160200190620002f1565b50600481805162000082929160200190620002f1565b506012600560018162000094620003b3565b8160ff021916908360ff16021790620000ac62000410565b5050505050620000d15a620000c06200045f565b69d3c21bcecceda1000000620000d7565b620004c9565b6001600160a01b0382166200013d5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401604051809103906200013a62000284565b50505b6200014b6000838362000213565b620001708160026200015c620003b3565b6200021860201b6200074c1790919060201c565b8060026200017d62000410565b5050506001600160a01b03821660009081526020819052620001a9908290604090206200015c620003b3565b6001600160a01b03831660009081526020819052604090208190620001cd62000410565b5050506001600160a01b03821660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405190815260200160405180910390a35050565b505050565b6000828201838110156200027d5760405162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f7700000000006044820152606401604051809103906200027a62000284565b50505b9392505050565b632a2a7adb598160e01b8152600481016020815285602082015260005b86811015620002be578086015182820160400152602001620002a1565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b8280620002fd620003b3565b600181600116156101000203166002900490600052602060002090601f0160209004810192826200033d576000856200033562000410565b5050620003a1565b82601f106200035b57805160ff191683800117856200033562000410565b828001600101856200036c62000410565b50508215620003a1579182015b82811115620003a1578251826200038f62000410565b50509160200191906001019062000379565b50620003af929150620004a6565b5090565b6303daa959598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051935060005b60408110156200021357600082820152602001620003f7565b6322bd64c0598160e01b8152836004820152846024820152600081604483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b600081526020620003f7565b6373509064598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b80516000825293506020620003f7565b80821115620003af5760008082620004bd62000410565b505050600101620004a6565b61106480620004d96000396000f3fe608060405234801561001957600080610016610dc5565b50505b50600436106100d85760003560e01c806340c10f19116100955780639dc29fac1161006f5780639dc29fac146102c8578063a457c2d7146102fd578063a9059cbb14610332578063dd62ed3e14610367576100d8565b806340c10f191461025a57806370a082311461029157806395d89b41146102c0576100d8565b806306fdde03146100e6578063095ea7b31461016557806318160ddd146101ae57806323b872dd146101c8578063313ce567146102075780633950935114610225575b6000806100e3610dc5565b50505b6100ee61039e565b60405160208082528190810183818151815260200191508051906020019080838360005b8381101561012a578082015183820152602001610112565b50505050905090810190601f1680156101575780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61019a6004803603604081101561018457600080610181610dc5565b50505b506001600160a01b03813516906020013561045b565b604051901515815260200160405180910390f35b6101b6610478565b60405190815260200160405180910390f35b61019a600480360360608110156101e7576000806101e4610dc5565b50505b506001600160a01b03813581169160208101359091169060400135610489565b61020f61051d565b60405160ff909116815260200160405180910390f35b61019a6004803603604081101561024457600080610241610dc5565b50505b506001600160a01b038135169060200135610539565b61028f6004803603604081101561027957600080610276610dc5565b50505b506001600160a01b03813516906020013561059e565b005b6101b6600480360360208110156102b0576000806102ad610dc5565b50505b50356001600160a01b03166105ac565b6100ee6105d2565b61028f600480360360408110156102e7576000806102e4610dc5565b50505b506001600160a01b038135169060200135610678565b61019a6004803603604081101561031c57600080610319610dc5565b50505b506001600160a01b038135169060200135610682565b61019a600480360360408110156103515760008061034e610dc5565b50505b506001600160a01b0381351690602001356106f8565b6101b66004803603604081101561038657600080610383610dc5565b50505b506001600160a01b038135811691602001351661070c565b60606003806103ab610e30565b600181600116156101000203166002900480601f0160208091040260200160405190810160405281815291906020830182806103e5610e30565b600181600116156101000203166002900480156104515780601f1061041f576101008083610411610e30565b040283529160200191610451565b820191906000526020600020905b81610436610e30565b8152906001019060200180831161042d57829003601f168201915b5050505050905090565b600061046f6104686107b4565b84846107bf565b50600192915050565b60006002610484610e30565b905090565b60006104968484846108e7565b610513846104a26107b4565b61050e85604051606081016040526028808252610fad60208301396001600160a01b038a16600090815260016020526040902060006104df6107b4565b6001600160a01b03166001600160a01b03168152602001908152602001600020610507610e30565b9190610a85565b6107bf565b5060019392505050565b600080600561052a610e30565b906101000a900460ff16905090565b600061046f6105466107b4565b8461050e85600160006105576107b4565b6001600160a01b03166001600160a01b031681526020019081526020016000206001600160a01b038916600090815260209190915260409020610598610e30565b9061074c565b6105a88282610b25565b5050565b6001600160a01b03811660009081526020819052604081206105cc610e30565b92915050565b60606004806105df610e30565b600181600116156101000203166002900480601f016020809104026020016040519081016040528181529190602083018280610619610e30565b600181600116156101000203166002900480156104515780601f10610645576101008083610411610e30565b820191906000526020600020905b8161065c610e30565b8152906001019060200180831161065357509395945050505050565b6105a88282610c3e565b600061046f61068f6107b4565b8461050e8560405160608101604052602580825261103f6020830139600160006106b76107b4565b6001600160a01b03166001600160a01b031681526020019081526020016000206001600160a01b038a16600090815260209190915260409020610507610e30565b600061046f6107056107b4565b84846108e7565b6001600160a01b03821660009081526001602052604081206001600160a01b038316600090815260209190915260409020610745610e30565b9392505050565b6000828201838110156107455760405162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f7700000000006044820152606401604051809103906107ab610dc5565b50509392505050565b60005a610484610e8b565b6001600160a01b03831661080d5760405162461bcd60e51b815260040180806020018281038252602481526020018061101b602491396040019150506040518091039061080a610dc5565b50505b6001600160a01b03821661085b5760405162461bcd60e51b8152600401808060200182810382526022815260200180610f656022913960400191505060405180910390610858610dc5565b50505b6001600160a01b038316600090815260016020528190604090206001600160a01b0384166000908152602091909152604090208190610898610ed1565b505050816001600160a01b0316836001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258360405190815260200160405180910390a3505050565b6001600160a01b0383166109355760405162461bcd60e51b8152600401808060200182810382526025815260200180610ff66025913960400191505060405180910390610932610dc5565b50505b6001600160a01b0382166109835760405162461bcd60e51b8152600401808060200182810382526023815260200180610f206023913960400191505060405180910390610980610dc5565b50505b61098e838383610d5e565b6109c981604051606081016040526026808252610f8760208301396001600160a01b0386166000908152602081905260409020610507610e30565b6001600160a01b038416600090815260208190526040902081906109eb610ed1565b5050506001600160a01b03821660009081526020819052610a1490829060409020610598610e30565b6001600160a01b03831660009081526020819052604090208190610a36610ed1565b505050816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405190815260200160405180910390a3505050565b60008184841115610b1d5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610ad9578082015183820152602001610ac1565b50505050905090810190601f168015610b065780820380516001836020036101000a031916815260200191505b509250505060405180910390610b1a610dc5565b50505b505050900390565b6001600160a01b038216610b885760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390610b85610dc5565b50505b610b9460008383610d5e565b610ba2816002610598610e30565b806002610bad610ed1565b5050506001600160a01b03821660009081526020819052610bd690829060409020610598610e30565b6001600160a01b03831660009081526020819052604090208190610bf8610ed1565b5050506001600160a01b03821660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405190815260200160405180910390a35050565b6001600160a01b038216610c8c5760405162461bcd60e51b8152600401808060200182810382526021815260200180610fd56021913960400191505060405180910390610c89610dc5565b50505b610c9882600083610d5e565b610cd381604051606081016040526022808252610f4360208301396001600160a01b0385166000908152602081905260409020610507610e30565b6001600160a01b03831660009081526020819052604090208190610cf5610ed1565b505050610d0c816002610d06610e30565b90610d63565b806002610d17610ed1565b5060009150506001600160a01b0383167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405190815260200160405180910390a35050565b505050565b600082821115610dbf5760405162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015260640160405180910390610b1d610dc5565b50900390565b632a2a7adb598160e01b8152600481016020815285602082015260005b86811015610dfd578086015182820160400152602001610de2565b506020828760640184336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b505050565b6303daa959598160e01b8152836004820152602081602483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b8051935060005b6040811015610d5e57600082820152602001610e74565b6373509064598160e01b8152602081600483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b80516000825293506020610e74565b6322bd64c0598160e01b8152836004820152846024820152600081604483336000905af158600e01573d6000803e3d6000fd5b3d6001141558600a015760016000f35b600081526020610e7456fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f";

export class TestERC20__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestERC20> {
    return super.deploy(overrides || {}) as Promise<TestERC20>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestERC20 {
    return super.attach(address) as TestERC20;
  }
  connect(signer: Signer): TestERC20__factory {
    return super.connect(signer) as TestERC20__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestERC20Interface {
    return new utils.Interface(_abi) as TestERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestERC20 {
    return new Contract(address, _abi, signerOrProvider) as TestERC20;
  }
}
