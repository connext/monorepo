/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ProposedOwnableFacet,
  ProposedOwnableFacetInterface,
} from "../../../../../contracts/core/connext/facets/ProposedOwnableFacet";

const _abi = [
  {
    inputs: [],
    name: "BaseConnextFacet__getAdoptedAsset_assetNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__getApprovedCanonicalId_notAllowlisted",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__nonAddLiquidityReentrant_reentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__nonReentrant_reentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__nonXCallReentrant_reentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyOwnerOrRouter_notOwnerOrRouter",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyOwnerOrWatcher_notOwnerOrWatcher",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyOwner_notOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyProposed_notProposedOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__whenNotPaused_paused",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__acceptProposedOwner_noOwnershipChange",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__assignRoleAdmin_invalidInput",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__assignRoleRouter_invalidInput",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__assignRoleWatcher_invalidInput",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__delayElapsed_delayNotElapsed",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__proposeAssetAllowlistRemoval_noOwnershipChange",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__proposeNewOwner_invalidProposal",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__proposeNewOwner_noOwnershipChange",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__proposeRouterAllowlistRemoval_noOwnershipChange",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__removeAssetAllowlist_noOwnershipChange",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__removeAssetAllowlist_noProposal",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__removeRouterAllowlist_noOwnershipChange",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__removeRouterAllowlist_noProposal",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnableFacet__revokeRole_invalidInput",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "AssignRoleAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "AssignRoleRouter",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "watcher",
        type: "address",
      },
    ],
    name: "AssignRoleWatcher",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "proposedOwner",
        type: "address",
      },
    ],
    name: "OwnershipProposed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "revokedAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum Role",
        name: "revokedRole",
        type: "uint8",
      },
    ],
    name: "RevokeRole",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "RouterAllowlistRemovalProposed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "renounced",
        type: "bool",
      },
    ],
    name: "RouterAllowlistRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptProposedOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "assignRoleAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    name: "assignRoleRouterAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_watcher",
        type: "address",
      },
    ],
    name: "assignRoleWatcher",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "delay",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newlyProposed",
        type: "address",
      },
    ],
    name: "proposeNewOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proposeRouterAllowlistRemoval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proposed",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposedTimestamp",
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
        name: "_role",
        type: "address",
      },
    ],
    name: "queryRole",
    outputs: [
      {
        internalType: "enum Role",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "removeRouterAllowlist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_revoke",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "routerAllowlistRemoved",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "routerAllowlistTimestamp",
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
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610db6806100206000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80638456cb59116100a2578063bb271a2711610071578063bb271a27146101f1578063c56ce35814610204578063c5b350df1461020c578063c91cb56a14610214578063d1851c921461024d57600080fd5b80638456cb59146101a35780638da5cb5b146101ab578063a9943b1b146101cb578063b1f8100d146101de57600080fd5b80633f4ba83a116100e95780633f4ba83a146101575780635c975abb1461015f5780636a42b8f81461017d5780636be557851461018557806380e52e3f1461019057600080fd5b8063122329371461011b57806323986f7d146101325780632ec0c0021461013c5780633cf52ffb1461014f575b600080fd5b6013545b6040519081526020015b60405180910390f35b61013a61025e565b005b61013a61014a366004610cc6565b610347565b60115461011f565b61013a610463565b601a54600160a01b900460ff165b6040519015158152602001610129565b61011f6104fd565b60125460ff1661016d565b61013a61019e366004610cc6565b61052c565b61013a61064c565b6101b36106ec565b6040516001600160a01b039091168152602001610129565b61013a6101d9366004610cc6565b6106f6565b61013a6101ec366004610cc6565b61080b565b61013a6101ff366004610cc6565b6108be565b61013a6109d2565b61013a610a62565b610240610222366004610cc6565b6001600160a01b031660009081526014602052604090205460ff1690565b6040516101299190610d2e565b6010546001600160a01b03166101b3565b33610267610b10565b6001600160a01b0316141580156102a2575060033360009081526014602052604090205460ff16600381111561029f5761029f610cf6565b14155b156102c057604051637b32c26b60e01b815260040160405180910390fd5b6013546102cb6104fd565b6102d58242610d42565b116102f357604051637f0369a960e11b815260040160405180910390fd5b60125460ff161561031757604051634b4da55560e01b815260040160405180910390fd5b60135460000361033a576040516368ad12e160e11b815260040160405180910390fd5b6103446001610b3e565b50565b33610350610b10565b6001600160a01b03161415801561038b575060033360009081526014602052604090205460ff16600381111561038857610388610cf6565b14155b156103a957604051637b32c26b60e01b815260040160405180910390fd5b6001600160a01b03811660009081526014602052604081205460ff1660038111156103d6576103d6610cf6565b1415806103ea57506001600160a01b038116155b15610408576040516319f546ad60e11b815260040160405180910390fd5b6001600160a01b038116600081815260146020908152604091829020805460ff1916600117905590519182527ff294e68c632d2c26e3d36129816c9a3e54bfa0ebada89d07d08e15e87a8e240391015b60405180910390a150565b3361046c610b10565b6001600160a01b0316141580156104a7575060033360009081526014602052604090205460ff1660038111156104a4576104a4610cf6565b14155b156104c557604051637b32c26b60e01b815260040160405180910390fd5b601a805460ff60a01b191690556040517fa45f47fdea8a1efdd9029a5691c7f759c32b7c698632b563573e155625d1693390600090a1565b60006105277fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c13225490565b905090565b33610535610b10565b6001600160a01b031614158015610570575060033360009081526014602052604090205460ff16600381111561056d5761056d610cf6565b14155b1561058e57604051637b32c26b60e01b815260040160405180910390fd5b6001600160a01b03811660009081526014602052604081205460ff16908160038111156105bd576105bd610cf6565b14806105d057506001600160a01b038216155b156105ee57604051630e15d72960e31b815260040160405180910390fd5b6001600160a01b03821660009081526014602052604090819020805460ff19169055517fdc6f53b47a9dfbea7a15fceef0cd84711d3d79ccc0952111866167af5e59e264906106409084908490610d63565b60405180910390a15050565b33610655610b10565b6001600160a01b031614158015610690575060023360009081526014602052604090205460ff16600381111561068d5761068d610cf6565b14155b156106ae5760405163bae4c01f60e01b815260040160405180910390fd5b601a805460ff60a01b1916600160a01b1790556040517f9e87fac88ff661f02d44f95383c817fece4bce600a3dab7a54406878b965e75290600090a1565b6000610527610b10565b336106ff610b10565b6001600160a01b03161415801561073a575060033360009081526014602052604090205460ff16600381111561073757610737610cf6565b14155b1561075857604051637b32c26b60e01b815260040160405180910390fd5b6001600160a01b03811660009081526014602052604081205460ff16600381111561078557610785610cf6565b14158061079957506001600160a01b038116155b156107b757604051630bceab9d60e01b815260040160405180910390fd5b6001600160a01b038116600081815260146020908152604091829020805460ff1916600217905590519182527ffaac289281b8fc57dff30d0ff38b071d28bb5f24cd5ed1bd2379d6fb27f714dd9101610458565b33610814610b10565b6001600160a01b03161461083b576040516314e74a2560e21b815260040160405180910390fd5b6010546001600160a01b038281169116148061085e57506001600160a01b038116155b1561087c57604051630274ac4360e21b815260040160405180910390fd5b806001600160a01b031661088e6106ec565b6001600160a01b0316036108b557604051631f677f5160e01b815260040160405180910390fd5b61034481610b84565b336108c7610b10565b6001600160a01b031614158015610902575060033360009081526014602052604090205460ff1660038111156108ff576108ff610cf6565b14155b1561092057604051637b32c26b60e01b815260040160405180910390fd5b6001600160a01b03811660009081526014602052604081205460ff16600381111561094d5761094d610cf6565b14158061096157506001600160a01b038116155b1561097f57604051631600e74560e31b815260040160405180910390fd5b6001600160a01b038116600081815260146020908152604091829020805460ff1916600317905590519182527e0a317382a4189d8763d4a024ec833785cebd3580a084ff0f887f156b822cb19101610458565b336109db610b10565b6001600160a01b031614158015610a16575060033360009081526014602052604090205460ff166003811115610a1357610a13610cf6565b14155b15610a3457604051637b32c26b60e01b815260040160405180910390fd5b60125460ff1615610a58576040516333bfb93f60e11b815260040160405180910390fd5b610a60610bd2565b565b6010546001600160a01b03163314610a8d57604051631b54eee360e11b815260040160405180910390fd5b601154610a986104fd565b610aa28242610d42565b11610ac057604051637f0369a960e11b815260040160405180910390fd5b6010546001600160a01b0316610ad46106ec565b6001600160a01b031603610afb576040516355cc507960e01b815260040160405180910390fd5b601054610344906001600160a01b0316610c0d565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1320546001600160a01b031690565b6012805460ff191682151590811790915560006013556040519081527f7c21a455b42ac52b1f1cc1103db5afe532e817479e9503a97a734720271c5a7490602001610458565b42601155601080546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b4260138190556040519081527feb0f48d74c7254e5b55ef91a3f6e496e6a4a8676b6dae07f3d6fb0805b9fac939060200160405180910390a1565b60006011819055601080546001600160a01b03191690557fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1320546040516103449284927fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c926001600160a01b03808616939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a360040180546001600160a01b0319166001600160a01b0392909216919091179055565b600060208284031215610cd857600080fd5b81356001600160a01b0381168114610cef57600080fd5b9392505050565b634e487b7160e01b600052602160045260246000fd5b60048110610d2a57634e487b7160e01b600052602160045260246000fd5b9052565b60208101610d3c8284610d0c565b92915050565b81810381811115610d3c57634e487b7160e01b600052601160045260246000fd5b6001600160a01b038316815260408101610cef6020830184610d0c56fea264697066735822122003dc5f5bf3e5b3d5c8f0c541576ff2b3b663a2ed1336203cee70e1538771e31b64736f6c63430008110033";

type ProposedOwnableFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProposedOwnableFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ProposedOwnableFacet__factory extends ContractFactory {
  constructor(...args: ProposedOwnableFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ProposedOwnableFacet> {
    return super.deploy(overrides || {}) as Promise<ProposedOwnableFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ProposedOwnableFacet {
    return super.attach(address) as ProposedOwnableFacet;
  }
  override connect(signer: Signer): ProposedOwnableFacet__factory {
    return super.connect(signer) as ProposedOwnableFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProposedOwnableFacetInterface {
    return new utils.Interface(_abi) as ProposedOwnableFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProposedOwnableFacet {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ProposedOwnableFacet;
  }
}
