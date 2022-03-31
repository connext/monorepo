/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC20,
  ERC20Interface,
} from "../../../../../../../contracts/nomad-xapps/contracts/bridge/vendored/OZERC20.sol/ERC20";

const _abi = [
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
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
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
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
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
        name: "_account",
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
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_subtractedValue",
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
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_addedValue",
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
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
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
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
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
<<<<<<< HEAD
  "0x608060405234801561001057600080fd5b50610766806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806370a082311161005b57806370a08231146100ed578063a457c2d714610116578063a9059cbb14610129578063dd62ed3e1461013c57600080fd5b8063095ea7b31461008d57806318160ddd146100b557806323b872dd146100c757806339509351146100da575b600080fd5b6100a061009b36600461058e565b610175565b60405190151581526020015b60405180910390f35b6002545b6040519081526020016100ac565b6100a06100d53660046105b8565b61018b565b6100a06100e836600461058e565b6101f4565b6100b96100fb3660046105f4565b6001600160a01b031660009081526020819052604090205490565b6100a061012436600461058e565b61022a565b6100a061013736600461058e565b610279565b6100b961014a36600461060f565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6000610182338484610286565b50600192915050565b60006101988484846103b0565b6101ea84336101e5856040518060600160405280602881526020016106e4602891396001600160a01b038a1660009081526001602090815260408083203384529091529020549190610533565b610286565b5060019392505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916101829185906101e5908661055f565b600061018233846101e58560405180606001604052806025815260200161070c602591393360009081526001602090815260408083206001600160a01b038d1684529091529020549190610533565b60006101823384846103b0565b6001600160a01b0383166102ed5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084015b60405180910390fd5b6001600160a01b03821661034e5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016102e4565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0383166104145760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016102e4565b6001600160a01b0382166104765760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016102e4565b6104b3816040518060600160405280602681526020016106be602691396001600160a01b0386166000908152602081905260409020549190610533565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546104e2908261055f565b6001600160a01b038381166000818152602081815260409182902094909455518481529092918616917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91016103a3565b600081848411156105575760405162461bcd60e51b81526004016102e49190610642565b505050900390565b600061056b8284610697565b9392505050565b80356001600160a01b038116811461058957600080fd5b919050565b600080604083850312156105a157600080fd5b6105aa83610572565b946020939093013593505050565b6000806000606084860312156105cd57600080fd5b6105d684610572565b92506105e460208501610572565b9150604084013590509250925092565b60006020828403121561060657600080fd5b61056b82610572565b6000806040838503121561062257600080fd5b61062b83610572565b915061063960208401610572565b90509250929050565b600060208083528351808285015260005b8181101561066f57858101830151858201604001528201610653565b81811115610681576000604083870101525b50601f01601f1916929092016040019392505050565b600082198211156106b857634e487b7160e01b600052601160045260246000fd5b50019056fe45524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220a466b07366ccda76bcb1af9d9e35a38fcbd0823b7277eecee99e1fc47400e56f64736f6c634300080b0033";
=======
  "0x608060405234801561001057600080fd5b50610766806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806370a082311161005b57806370a08231146100ed578063a457c2d714610116578063a9059cbb14610129578063dd62ed3e1461013c57600080fd5b8063095ea7b31461008d57806318160ddd146100b557806323b872dd146100c757806339509351146100da575b600080fd5b6100a061009b36600461058e565b610175565b60405190151581526020015b60405180910390f35b6002545b6040519081526020016100ac565b6100a06100d53660046105b8565b61018b565b6100a06100e836600461058e565b6101f4565b6100b96100fb3660046105f4565b6001600160a01b031660009081526020819052604090205490565b6100a061012436600461058e565b61022a565b6100a061013736600461058e565b610279565b6100b961014a36600461060f565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6000610182338484610286565b50600192915050565b60006101988484846103b0565b6101ea84336101e5856040518060600160405280602881526020016106e4602891396001600160a01b038a1660009081526001602090815260408083203384529091529020549190610533565b610286565b5060019392505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916101829185906101e5908661055f565b600061018233846101e58560405180606001604052806025815260200161070c602591393360009081526001602090815260408083206001600160a01b038d1684529091529020549190610533565b60006101823384846103b0565b6001600160a01b0383166102ed5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084015b60405180910390fd5b6001600160a01b03821661034e5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016102e4565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0383166104145760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016102e4565b6001600160a01b0382166104765760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016102e4565b6104b3816040518060600160405280602681526020016106be602691396001600160a01b0386166000908152602081905260409020549190610533565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546104e2908261055f565b6001600160a01b038381166000818152602081815260409182902094909455518481529092918616917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91016103a3565b600081848411156105575760405162461bcd60e51b81526004016102e49190610642565b505050900390565b600061056b8284610697565b9392505050565b80356001600160a01b038116811461058957600080fd5b919050565b600080604083850312156105a157600080fd5b6105aa83610572565b946020939093013593505050565b6000806000606084860312156105cd57600080fd5b6105d684610572565b92506105e460208501610572565b9150604084013590509250925092565b60006020828403121561060657600080fd5b61056b82610572565b6000806040838503121561062257600080fd5b61062b83610572565b915061063960208401610572565b90509250929050565b600060208083528351808285015260005b8181101561066f57858101830151858201604001528201610653565b81811115610681576000604083870101525b50601f01601f1916929092016040019392505050565b600082198211156106b857634e487b7160e01b600052601160045260246000fd5b50019056fe45524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122007170e1b08232ff84435b8802ff601607872eb03ea43af1807b630afa5f2b10064736f6c634300080b0033";
>>>>>>> amarok

type ERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20__factory extends ContractFactory {
  constructor(...args: ERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC20> {
    return super.deploy(overrides || {}) as Promise<ERC20>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC20 {
    return super.attach(address) as ERC20;
  }
  override connect(signer: Signer): ERC20__factory {
    return super.connect(signer) as ERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20Interface {
    return new utils.Interface(_abi) as ERC20Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20 {
    return new Contract(address, _abi, signerOrProvider) as ERC20;
  }
}
