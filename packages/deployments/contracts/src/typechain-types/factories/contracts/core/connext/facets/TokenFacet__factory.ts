/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  TokenFacet,
  TokenFacetInterface,
} from "../../../../../contracts/core/connext/facets/TokenFacet";

const _abi = [
  {
    inputs: [],
    name: "BaseConnextFacet__getAdoptedAsset_notWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__getApprovedCanonicalId_notWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__mustGetLocalAsset_noLocalAssetFound",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__nonReentrant_reentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "BaseConnextFacet__onlyBridgeRouter_notBridgeRouter",
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
    name: "TokenFacet__addAssetId_alreadyAdded",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenFacet__addAssetId_nativeAsset",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenFacet__removeAssetId_notAdded",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenFacet__updateDetails_localNotFound",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "canonicalId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "adoptedAsset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "localAsset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "AssetAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "AssetRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "canonicalId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "swapPool",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "StableSwapAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint32",
        name: "domain",
        type: "uint32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "representation",
        type: "address",
      },
    ],
    name: "TokenDeployed",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "_canonical",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "_stableSwapPool",
        type: "address",
      },
    ],
    name: "addStableSwapPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_adopted",
        type: "address",
      },
    ],
    name: "adoptedToCanonical",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
    ],
    name: "adoptedToLocalPools",
    outputs: [
      {
        internalType: "contract IStableSwap",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "_canonical",
        type: "tuple",
      },
    ],
    name: "adoptedToLocalPools",
    outputs: [
      {
        internalType: "contract IStableSwap",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
    ],
    name: "approvedAssets",
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
        components: [
          {
            internalType: "uint32",
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "_canonical",
        type: "tuple",
      },
    ],
    name: "approvedAssets",
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
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
    ],
    name: "canonicalToAdopted",
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
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "_canonical",
        type: "tuple",
      },
    ],
    name: "canonicalToAdopted",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
    ],
    name: "canonicalToRepresentation",
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
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "_canonical",
        type: "tuple",
      },
    ],
    name: "canonicalToRepresentation",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "_id",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
    ],
    name: "getLocalAndAdoptedToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
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
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "_canonical",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "_adoptedAssetId",
        type: "address",
      },
      {
        internalType: "address",
        name: "_representation",
        type: "address",
      },
    ],
    name: "removeAssetId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_adoptedAssetId",
        type: "address",
      },
      {
        internalType: "address",
        name: "_representation",
        type: "address",
      },
    ],
    name: "removeAssetId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_representation",
        type: "address",
      },
    ],
    name: "representationToCanonical",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "_canonical",
        type: "tuple",
      },
      {
        internalType: "uint8",
        name: "_canonicalDecimals",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_representationName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_representationSymbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "_adoptedAssetId",
        type: "address",
      },
      {
        internalType: "address",
        name: "_stableSwapPool",
        type: "address",
      },
    ],
    name: "setupAsset",
    outputs: [
      {
        internalType: "address",
        name: "_local",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "_canonical",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "_representation",
        type: "address",
      },
      {
        internalType: "address",
        name: "_adoptedAssetId",
        type: "address",
      },
      {
        internalType: "address",
        name: "_stableSwapPool",
        type: "address",
      },
    ],
    name: "setupAsset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "domain",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        internalType: "struct TokenId",
        name: "_canonical",
        type: "tuple",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    name: "updateDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061182a806100206000396000f3fe60806040523480156200001157600080fd5b5060043610620001215760003560e01c8063a1b1930111620000af578063bd8671a7116200007a578063bd8671a7146200036b578063c40584291462000382578063d3654b801462000399578063d370db6314620003b0578063e9a25ab414620003c757600080fd5b8063a1b1930114620002fa578063ad4c77711462000311578063ae8bc0de1462000328578063bd7e1e2e146200033f57600080fd5b80632c1999d011620000f05780632c1999d0146200023157806357bd0a3214620002485780635a2164e5146200027f57806360062091146200029657600080fd5b806303e418c2146200012657806307a38d7b14620001b05780631506e46314620001e85780631ecf6f9f1462000201575b600080fd5b6200018a6200013736600462000dc6565b6040805180820190915260008082526020820152506040805180820182526001600160a01b03909216600081815260086020818152938220805463ffffffff168652929091528252600101549082015290565b60408051825163ffffffff16815260209283015192810192909252015b60405180910390f35b620001c7620001c136600462000df9565b620003de565b604080516001600160a01b03938416815292909116602083015201620001a7565b620001ff620001f936600462000e38565b620003f8565b005b620002186200021236600462000e68565b6200045e565b6040516001600160a01b039091168152602001620001a7565b620002186200024236600462000e68565b6200047d565b6200026e6200025936600462000e68565b60009081526006602052604090205460ff1690565b6040519015158152602001620001a7565b620001ff6200029036600462000e82565b6200048a565b6200018a620002a736600462000dc6565b6040805180820190915260008082526020820152506040805180820182526001600160a01b03909216600081815260076020818152938220805463ffffffff168652929091528252600101549082015290565b620001ff6200030b36600462000ecd565b620004eb565b620002186200032236600462000f05565b6200052b565b6200026e6200033936600462000f05565b6200054a565b620002186200035036600462000e68565b6000908152600560205260409020546001600160a01b031690565b620002186200037c36600462000f05565b62000567565b620001ff6200039336600462000fcf565b62000586565b62000218620003aa3660046200104d565b62000677565b62000218620003c136600462001109565b62000718565b62000218620003d836600462000f05565b62000765565b600080620003ed848462000782565b915091509250929050565b3362000403620007aa565b6001600160a01b0316146200042b576040516314e74a2560e21b815260040160405180910390fd5b60006200044a6020840180359062000444908662001167565b620007d8565b9050620004598383836200081b565b505050565b6000818152600a60205260408120546001600160a01b03165b92915050565b60006200047782620008b3565b3362000495620007aa565b6001600160a01b031614620004bd576040516314e74a2560e21b815260040160405180910390fd5b6000620004d66020850180359062000444908762001167565b9050620004e5818484620008ea565b50505050565b33620004f6620007aa565b6001600160a01b0316146200051e576040516314e74a2560e21b815260040160405180910390fd5b62000459838383620008ea565b6000620004776020830180359062000544908562001167565b620009e2565b600062000477620002596020840180359062000444908662001167565b6000620004776020830180359062000580908562001167565b62000a16565b3362000591620007aa565b6001600160a01b031614620005b9576040516314e74a2560e21b815260040160405180910390fd5b6000620005d26020850180359062000444908762001167565b6000818152600a60205260409020549091506001600160a01b0316806200060c57604051639db40a2560e01b815260040160405180910390fd5b604051635bd8487760e11b81526001600160a01b0382169063b7b090ee906200063c9087908790600401620011d5565b600060405180830381600087803b1580156200065757600080fd5b505af11580156200066c573d6000803e3d6000fd5b505050505050505050565b60003362000684620007aa565b6001600160a01b031614620006ac576040516314e74a2560e21b815260040160405180910390fd5b60045463ffffffff16620006c4602089018962001167565b63ffffffff1614620006f857620006f060208801803590620006e7908a62001167565b88888862000a2e565b9050620006ff565b5060208601355b6200070d8382848a62000b41565b509695505050505050565b60003362000725620007aa565b6001600160a01b0316146200074d576040516314e74a2560e21b815260040160405180910390fd5b6200075b8385848862000b41565b5092949350505050565b600062000477620003506020840180359062000444908662001167565b600080620007938484600062000d46565b9150620007a1848462000a16565b90509250929050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1320546001600160a01b031690565b60008282604051602001620007fd92919091825263ffffffff16602082015260400190565b60405160208183030381529060405280519060200120905092915050565b600081815260056020908152604090912080546001600160a01b0319166001600160a01b038516179055620008539084018462001167565b63ffffffff168360200135827f16285b1cf634d546d51fefe55f6e63e5edf970d2a3d2bd50b55a8cfad25e8b568533604051620008a69291906001600160a01b0392831681529116602082015260400190565b60405180910390a4505050565b6000818152600960205260408120546001600160a01b0316806200047757604051634cdfde3760e11b815260040160405180910390fd5b60008381526006602052604090205460ff166200091a57604051631c999e7d60e11b815260040160405180910390fd5b6000838152600660209081526040808320805460ff191690556005825280832080546001600160a01b03199081169091556001600160a01b03868116855260078452828520805463ffffffff1990811682556001918201879055918716865260088552838620805490921682550184905586845260098352818420805482169055600a8352928190208054909316909255905133815284917f9d181adb70e733f5235f839c1eed929407ea8526e41d01f49b9fef703e78dddf910160405180910390a2505050565b600062000a0f620009f48484620007d8565b6000908152600a60205260409020546001600160a01b031690565b9392505050565b600062000a0f62000a288484620007d8565b620008b3565b60045460405160009164010000000090046001600160a01b03169062000a549062000d9b565b6001600160a01b039091168152604060208201819052600090820152606001604051809103906000f08015801562000a90573d6000803e3d6000fd5b5060405163188c392760e11b81529091506001600160a01b03821690633118724e9062000ac69087908790879060040162001207565b600060405180830381600087803b15801562000ae157600080fd5b505af115801562000af6573d6000803e3d6000fd5b50505050806001600160a01b0316868663ffffffff167f84d5e3618bf276f3d29a931646fdd996b398a3efa3cf6bceefc1fe7f0304059f60405160405180910390a495945050505050565b600062000b5a6020830180359062000444908562001167565b905060006001600160a01b0386161562000b75578562000b77565b845b60008381526006602052604090205490915060ff161562000bab5760405163bfa2bf9b60e01b815260040160405180910390fd5b6000828152600660209081526040909120805460ff1916600117905562000bd59084018462001167565b6001600160a01b0382166000818152600760209081526040808320805463ffffffff191663ffffffff9690961695909517855587820180356001909601959095558683526009909152902080546001600160a01b031916909117905562000c3d908462001167565b60045463ffffffff90811691161462000cc85762000c5f602084018462001167565b6001600160a01b0386166000818152600860209081526040808320805463ffffffff191663ffffffff9690961695909517855587820135600190950194909455858252600a90529190912080546001600160a01b031916909117905562000cc88385846200081b565b62000cd7602084018462001167565b63ffffffff168360200135837f0c58c78506e2d526f5ccdba28119c9ca3b5ce48e1462e0e19bc39232db11c63284893360405162000d35939291906001600160a01b0393841681529183166020830152909116604082015260600190565b60405180910390a450949350505050565b600481015460009063ffffffff9081169084160362000d6757508262000a0f565b81600a01600062000d798686620007d8565b81526020810191909152604001600020546001600160a01b0316949350505050565b6105b1806200124483390190565b80356001600160a01b038116811462000dc157600080fd5b919050565b60006020828403121562000dd957600080fd5b62000a0f8262000da9565b803563ffffffff8116811462000dc157600080fd5b6000806040838503121562000e0d57600080fd5b82359150620007a16020840162000de4565b60006040828403121562000e3257600080fd5b50919050565b6000806060838503121562000e4c57600080fd5b62000e58848462000e1f565b9150620007a16040840162000da9565b60006020828403121562000e7b57600080fd5b5035919050565b60008060006080848603121562000e9857600080fd5b62000ea4858562000e1f565b925062000eb46040850162000da9565b915062000ec46060850162000da9565b90509250925092565b60008060006060848603121562000ee357600080fd5b8335925062000ef56020850162000da9565b915062000ec46040850162000da9565b60006040828403121562000f1857600080fd5b62000a0f838362000e1f565b634e487b7160e01b600052604160045260246000fd5b600082601f83011262000f4c57600080fd5b813567ffffffffffffffff8082111562000f6a5762000f6a62000f24565b604051601f8301601f19908116603f0116810190828211818310171562000f955762000f9562000f24565b8160405283815286602085880101111562000faf57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060006080848603121562000fe557600080fd5b62000ff1858562000e1f565b9250604084013567ffffffffffffffff808211156200100f57600080fd5b6200101d8783880162000f3a565b935060608601359150808211156200103457600080fd5b50620010438682870162000f3a565b9150509250925092565b60008060008060008060e087890312156200106757600080fd5b62001073888862000e1f565b9550604087013560ff811681146200108a57600080fd5b9450606087013567ffffffffffffffff80821115620010a857600080fd5b620010b68a838b0162000f3a565b95506080890135915080821115620010cd57600080fd5b50620010dc89828a0162000f3a565b935050620010ed60a0880162000da9565b9150620010fd60c0880162000da9565b90509295509295509295565b60008060008060a085870312156200112057600080fd5b6200112c868662000e1f565b93506200113c6040860162000da9565b92506200114c6060860162000da9565b91506200115c6080860162000da9565b905092959194509250565b6000602082840312156200117a57600080fd5b62000a0f8262000de4565b6000815180845260005b81811015620011ad576020818501810151868301820152016200118f565b81811115620011c0576000602083870101525b50601f01601f19169290920160200192915050565b604081526000620011ea604083018562001185565b8281036020840152620011fe818562001185565b95945050505050565b60ff8416815260606020820152600062001225606083018562001185565b828103604084015262001239818562001185565b969550505050505056fe60a06040526040516105b13803806105b18339810160408190526100229161027e565b6100358261010b60201b6100291760201c565b6100795760405162461bcd60e51b815260206004820152601060248201526f18995858dbdb880858dbdb9d1c9858dd60821b60448201526064015b60405180910390fd5b6001600160a01b03821660805260006100918361011a565b90506100a68161010b60201b6100291760201c565b6100f25760405162461bcd60e51b815260206004820152601f60248201527f626561636f6e20696d706c656d656e746174696f6e2021636f6e7472616374006044820152606401610070565b8151156101035761010381836101ae565b5050506103b3565b6001600160a01b03163b151590565b6000806000836001600160a01b0316604051600060405180830381855afa9150503d8060008114610167576040519150601f19603f3d011682016040523d82523d6000602084013e61016c565b606091505b50915091508181906101915760405162461bcd60e51b81526004016100709190610340565b50808060200190518101906101a69190610373565b949350505050565b6000826001600160a01b0316826040516101c89190610397565b600060405180830381855af49150503d8060008114610203576040519150601f19603f3d011682016040523d82523d6000602084013e610208565b606091505b505090508061021b573d6000803e3d6000fd5b505050565b6001600160a01b038116811461023557600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b83811015610269578181015183820152602001610251565b83811115610278576000848401525b50505050565b6000806040838503121561029157600080fd5b825161029c81610220565b60208401519092506001600160401b03808211156102b957600080fd5b818501915085601f8301126102cd57600080fd5b8151818111156102df576102df610238565b604051601f8201601f19908116603f0116810190838211818310171561030757610307610238565b8160405282815288602084870101111561032057600080fd5b61033183602083016020880161024e565b80955050505050509250929050565b602081526000825180602084015261035f81604085016020870161024e565b601f01601f19169190910160400192915050565b60006020828403121561038557600080fd5b815161039081610220565b9392505050565b600082516103a981846020870161024e565b9190910192915050565b6080516101e46103cd6000396000603f01526101e46000f3fe60806040523661001357610011610017565b005b6100115b610027610022610038565b610068565b565b6001600160a01b03163b151590565b60006100637f000000000000000000000000000000000000000000000000000000000000000061008c565b905090565b3660008037600080366000845af43d6000803e808015610087573d6000f35b3d6000fd5b6000806000836001600160a01b0316604051600060405180830381855afa9150503d80600081146100d9576040519150601f19603f3d011682016040523d82523d6000602084013e6100de565b606091505b509150915081819061010c5760405162461bcd60e51b81526004016101039190610129565b60405180910390fd5b5080806020019051810190610121919061017e565b949350505050565b600060208083528351808285015260005b818110156101565785810183015185820160400152820161013a565b81811115610168576000604083870101525b50601f01601f1916929092016040019392505050565b60006020828403121561019057600080fd5b81516001600160a01b03811681146101a757600080fd5b939250505056fea264697066735822122042436bafcc10b7d3b87b009f58b439277eb8f5d3a0eca073976612d5e2f4901264736f6c634300080f0033a2646970667358221220b80e6227fa02bc9f729699653c2a25d4213c1e4a88941b600bfd125321eb102a64736f6c634300080f0033";

type TokenFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenFacet__factory extends ContractFactory {
  constructor(...args: TokenFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TokenFacet> {
    return super.deploy(overrides || {}) as Promise<TokenFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TokenFacet {
    return super.attach(address) as TokenFacet;
  }
  override connect(signer: Signer): TokenFacet__factory {
    return super.connect(signer) as TokenFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenFacetInterface {
    return new utils.Interface(_abi) as TokenFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenFacet {
    return new Contract(address, _abi, signerOrProvider) as TokenFacet;
  }
}
