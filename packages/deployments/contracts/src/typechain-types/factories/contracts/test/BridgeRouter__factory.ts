/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  BridgeRouter,
  BridgeRouterInterface,
} from "../../../contracts/test/BridgeRouter";

const _abi = [
  {
    inputs: [],
    name: "ProposedOwnable__acceptProposedOwner_delayNotElapsed",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__onlyOwner_notOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__onlyProposed_notProposedOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__proposeNewOwner_invalidProposal",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__proposeNewOwner_noOwnershipChange",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__renounceOwnership_delayNotElapsed",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__renounceOwnership_invalidProposal",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposedOwnable__renounceOwnership_noProposal",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
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
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "originAndNonce",
        type: "uint64",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "liquidityProvider",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Receive",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint32",
        name: "toDomain",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "toId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "toHook",
        type: "bool",
      },
    ],
    name: "Send",
    type: "event",
  },
  {
    inputs: [],
    name: "DUST_AMOUNT",
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
    name: "acceptProposedOwner",
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
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_id",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_custom",
        type: "address",
      },
    ],
    name: "enrollCustom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_domain",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_router",
        type: "bytes32",
      },
    ],
    name: "enrollRemoteRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_nonce",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_sender",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "handle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenRegistry",
        type: "address",
      },
      {
        internalType: "address",
        name: "_xAppConnectionManager",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "liquidityProvider",
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
        internalType: "address",
        name: "_oldRepr",
        type: "address",
      },
    ],
    name: "migrate",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "remotes",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounced",
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
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_destination",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_recipient",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "send",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_destination",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_remoteHook",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "sendToHook",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_xAppConnectionManager",
        type: "address",
      },
    ],
    name: "setXAppConnectionManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenRegistry",
    outputs: [
      {
        internalType: "contract ITokenRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "xAppConnectionManager",
    outputs: [
      {
        internalType: "contract IConnectorManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506132ad806100206000396000f3fe60806040526004361061012e5760003560e01c806397f641ab116100ab578063b49c53a71161006f578063b49c53a714610345578063bc7dbab314610365578063c5b350df14610385578063ce5494bb1461039a578063d1851c92146103ba578063d232c220146103d857600080fd5b806397f641ab146102aa5780639d23c4c7146102c5578063a9bd1226146102e5578063ab2dc3f514610305578063b1f8100d1461032557600080fd5b8063546d573d116100f2578063546d573d146101f85780636a42b8f81461022e578063715018a61461024457806383bbb806146102595780638da5cb5b1461028657600080fd5b806328b1aea01461013a5780633339df961461015c5780633cf52ffb1461019957806341bdc8b5146101b8578063485cc955146101d857600080fd5b3661013557005b600080fd5b34801561014657600080fd5b5061015a6101553660046129b8565b61040e565b005b34801561016857600080fd5b5060345461017c906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156101a557600080fd5b506002545b604051908152602001610190565b3480156101c457600080fd5b5061015a6101d33660046129fa565b610576565b3480156101e457600080fd5b5061015a6101f3366004612a17565b6105c9565b34801561020457600080fd5b5061017c610213366004612a50565b6099602052600090815260409020546001600160a01b031681565b34801561023a57600080fd5b5062093a806101aa565b34801561025057600080fd5b5061015a6106ba565b34801561026557600080fd5b506101aa610274366004612a69565b60666020526000908152604090205481565b34801561029257600080fd5b506000546201000090046001600160a01b031661017c565b3480156102b657600080fd5b506101aa66d529ae9e86000081565b3480156102d157600080fd5b5060985461017c906001600160a01b031681565b3480156102f157600080fd5b5061015a610300366004612a94565b6106ed565b34801561031157600080fd5b5061015a610320366004612b62565b6107af565b34801561033157600080fd5b5061015a6103403660046129fa565b610902565b34801561035157600080fd5b5061015a610360366004612c11565b6109b6565b34801561037157600080fd5b506101aa610380366004612c3d565b610a00565b34801561039157600080fd5b5061015a610ace565b3480156103a657600080fd5b5061015a6103b53660046129fa565b610b3e565b3480156103c657600080fd5b506001546001600160a01b031661017c565b3480156103e457600080fd5b506103fe6000546201000090046001600160a01b03161590565b6040519015158152602001610190565b6000546201000090046001600160a01b0316331461043f576040516311a8a1bb60e31b815260040160405180910390fd5b6040516340c10f1960e01b8152306004820152600160248201526001600160a01b038216906340c10f1990604401600060405180830381600087803b15801561048757600080fd5b505af115801561049b573d6000803e3d6000fd5b5050604051632770a7eb60e21b8152306004820152600160248201526001600160a01b0384169250639dc29fac9150604401600060405180830381600087803b1580156104e757600080fd5b505af11580156104fb573d6000803e3d6000fd5b50506098546040516301458d7560e51b815263ffffffff87166004820152602481018690526001600160a01b03858116604483015290911692506328b1aea09150606401600060405180830381600087803b15801561055957600080fd5b505af115801561056d573d6000803e3d6000fd5b50505050505050565b6000546201000090046001600160a01b031633146105a7576040516311a8a1bb60e31b815260040160405180910390fd5b603480546001600160a01b0319166001600160a01b0392909216919091179055565b600054610100900460ff16158080156105e95750600054600160ff909116105b806106035750303b158015610603575060005460ff166001145b6106285760405162461bcd60e51b815260040161061f90612ce7565b60405180910390fd5b6000805460ff19166001179055801561064b576000805461ff0019166101001790555b609880546001600160a01b0319166001600160a01b03851617905561066f82610d33565b80156106b5576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050565b6000546201000090046001600160a01b031633146106eb576040516311a8a1bb60e31b815260040160405180910390fd5b565b816107235760405162461bcd60e51b815260206004820152600660248201526502172656369760d41b604482015260640161061f565b6000806107308787610e19565b915091506000610741858884611137565b905061074e868483611175565b506040805186815260208101899052600081830152905163ffffffff88169133916001600160a01b038c16917fa3d219cf126a12be40d7ad1ceef46231c987988dd4e686457b610e1b6b80a4bf919081900360600190a45050505050505050565b6107b83361127e565b6107ef5760405162461bcd60e51b8152602060048201526008602482015267217265706c69636160c01b604482015260640161061f565b83826107fb82826112f3565b6108385760405162461bcd60e51b815260206004820152600e60248201526d10b932b6b7ba32903937baba32b960911b604482015260640161061f565b6000610852610847858361131a565b62ffffff1916611335565b9050600061086562ffffff19831661134e565b9050600061087862ffffff198416611387565b905061088962ffffff1982166113df565b1561089f5761089a898984846113ec565b6108f7565b6108ae62ffffff19821661141d565b156108bf5761089a8989848461142a565b60405162461bcd60e51b815260206004820152600d60248201526c10bb30b634b21030b1ba34b7b760991b604482015260640161061f565b505050505050505050565b6000546201000090046001600160a01b03163314610933576040516311a8a1bb60e31b815260040160405180910390fd5b6001546001600160a01b03828116911614801561095857506001600160a01b03811615155b15610976576040516311bc066560e11b815260040160405180910390fd5b6000546001600160a01b038083166201000090920416036109aa57604051634a2fb73f60e11b815260040160405180910390fd5b6109b381611564565b50565b6000546201000090046001600160a01b031633146109e7576040516311a8a1bb60e31b815260040160405180910390fd5b63ffffffff909116600090815260666020526040902055565b6000806000610a0f8989610e19565b90925090506000610a59878a84338a8a8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506115b292505050565b90506000610a68898584611175565b604080518a8152602081018d9052600181830152905191925063ffffffff8b169133916001600160a01b038f16917fa3d219cf126a12be40d7ad1ceef46231c987988dd4e686457b610e1b6b80a4bf9181900360600190a49a9950505050505050505050565b6001546001600160a01b03163314610af9576040516311a7f27160e11b815260040160405180910390fd5b62093a8060025442610b0b9190612d4b565b11610b295760405163d39c12bb60e01b815260040160405180910390fd5b6001546106eb906001600160a01b03166115d4565b609854604051630e71e25160e01b81526001600160a01b0383811660048301526000921690630e71e25190602401602060405180830381865afa158015610b89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bad9190612d62565b9050816001600160a01b0316816001600160a01b031603610bfd5760405162461bcd60e51b815260206004820152600a60248201526908591a5999995c995b9d60b21b604482015260640161061f565b6040516370a0823160e01b815233600482015282906000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610c46573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c6a9190612d7f565b604051632770a7eb60e21b8152336004820152602481018290529091506001600160a01b03831690639dc29fac90604401600060405180830381600087803b158015610cb557600080fd5b505af1158015610cc9573d6000803e3d6000fd5b50506040516340c10f1960e01b8152336004820152602481018490526001600160a01b03861692506340c10f199150604401600060405180830381600087803b158015610d1557600080fd5b505af1158015610d29573d6000803e3d6000fd5b5050505050505050565b600054610100900460ff1615808015610d535750600054600160ff909116105b80610d6d5750303b158015610d6d575060005460ff166001145b610d895760405162461bcd60e51b815260040161061f90612ce7565b6000805460ff191660011790558015610dac576000805461ff0019166101001790555b603480546001600160a01b0319166001600160a01b038416179055610dcf611644565b8015610e15576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050565b60985460405163c86415cb60e01b81526001600160a01b038085166004830152600092839286929091169063c86415cb90602401602060405180830381865afa158015610e6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e8e9190612d98565b15610fe757610ea86001600160a01b038616333087611673565b610fe0816001600160a01b03166306fdde036040518163ffffffff1660e01b81526004016000604051808303816000875af1158015610eeb573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f139190810190612de1565b826001600160a01b03166395d89b416040518163ffffffff1660e01b8152600401600060405180830381865afa158015610f51573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f799190810190612de1565b836001600160a01b031663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610fb7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fdb9190612e4f565b6116e4565b91506110ac565b604051632770a7eb60e21b8152336004820152602481018590526001600160a01b03821690639dc29fac90604401600060405180830381600087803b15801561102f57600080fd5b505af1158015611043573d6000803e3d6000fd5b50505050806001600160a01b0316634815fcb16040518163ffffffff1660e01b8152600401602060405180830381865afa158015611085573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110a99190612d7f565b91505b6098546040516378a9bb4360e11b81526001600160a01b038781166004830152600092839291169063f1537686906024016040805180830381865afa1580156110f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061111d9190612e72565b9150915061112b8282611720565b94505050509250929050565b600061116b6003808686866040516020016111559493929190612edb565b60408051601f198184030181529190529061131a565b90505b9392505050565b6000806111818561174d565b9050603460009054906101000a90046001600160a01b03166001600160a01b0316639fa92f9d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156111d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111fa9190612d62565b6001600160a01b031663fa31de018683611214888861179f565b6040518463ffffffff1660e01b815260040161123293929190612f2e565b6020604051808303816000875af1158015611251573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112759190612d7f565b95945050505050565b603454604051635190bc5360e01b81526001600160a01b0383811660048301526000921690635190bc5390602401602060405180830381865afa1580156112c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ed9190612d98565b92915050565b63ffffffff82166000908152606660205260408120548214801561116e5750501515919050565b81516000906020840161127564ffffffffff8516828461186e565b60006112ed611343836118b3565b62ffffff19166118e5565b6000816002611365815b62ffffff19841690611940565b5061137f6000602460015b62ffffff198816929190611a19565b949350505050565b600081600261139581611358565b5060006113b06024601887901c6001600160601b0316612d4b565b905060006113bd86611a89565b60ff1690506113d562ffffff19871660248484611a19565b9695505050505050565b60006112ed826003611a9e565b60006113fd62ffffff198316611afd565b905061140c8585858585611b1d565b5061141681611da5565b5050505050565b60006112ed826005611a9e565b600061143b62ffffff198316611dfb565b9050600061144c8686868686611b1d565b905060006302424a7f60e11b8761146862ffffff198716611e09565b61147762ffffff198916611e2b565b61148662ffffff198a16611e4d565b8661149662ffffff198b16611e6f565b6114b36114a862ffffff198d16611e84565b62ffffff1916611eb6565b6040516024016114c99796959493929190612f53565b604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b0383818316178352505050509050826001600160a01b0316816040516115169190612fa9565b6000604051808303816000865af19150503d8060008114611553576040519150601f19603f3d011682016040523d82523d6000602084013e611558565b606091505b50505050505050505050565b42600255600180546001600160a01b0319166001600160a01b0383169081179091556040517f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a90600090a250565b60006113d5600580888888888860405160200161115596959493929190612fc5565b600080546001600160a01b038381166201000081810262010000600160b01b031985161785556002859055600180546001600160a01b031916905560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b600054610100900460ff1661166b5760405162461bcd60e51b815260040161061f9061300e565b6106eb611eff565b6040516001600160a01b03808516602483015283166044820152606481018290526116de9085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152611f2f565b50505050565b600083518484518585604051602001611701959493929190613059565b6040516020818303038152906040528051906020012090509392505050565b600061116e60016040516001600160e01b031960e087901b16602082015260248101859052604401611155565b63ffffffff81166000908152606660205260409020548061179a5760405162461bcd60e51b81526020600482015260076024820152662172656d6f746560c81b604482015260640161061f565b919050565b60608260016117ad81611358565b506117b784612001565b6117ed5760405162461bcd60e51b815260206004820152600760248201526610b0b1ba34b7b760c91b604482015260640161061f565b6040805160028082526060820183526000926020830190803683370190505090508581600081518110611822576118226130b9565b602002602001019062ffffff1916908162ffffff1916815250508481600181518110611850576118506130b9565b62ffffff19909216602092830291909101909101526113d58161201b565b60008061187b83856130cf565b905060405181111561188b575060005b806000036118a05762ffffff1991505061116e565b606085811b8517901b831760181b611275565b60006118be82612070565b156118db576301000000600160d81b038216600160d91b176112ed565b62ffffff196112ed565b60006118f0826120a8565b61193c5760405162461bcd60e51b815260206004820152601960248201527f56616c696469747920617373657274696f6e206661696c656400000000000000604482015260640161061f565b5090565b600061194c83836120e5565b611a1257600061196b61195f8560d81c90565b64ffffffffff16612108565b91505060006119808464ffffffffff16612108565b6040517f5479706520617373657274696f6e206661696c65642e20476f7420307800000060208201526001600160b01b031960b086811b8216603d8401526c05c408af0e0cac6e8cac84060f609b1b604784015283901b16605482015290925060009150605e0160405160208183030381529060405290508060405162461bcd60e51b815260040161061f91906130e7565b5090919050565b600080611a2f8660781c6001600160601b031690565b6001600160601b03169050611a43866121b6565b84611a4e87846130cf565b611a5891906130cf565b1115611a6b5762ffffff1991505061137f565b611a7585826130cf565b90506113d58364ffffffffff16828661186e565b60006112ed62ffffff198316602460016121ef565b6000816006811115611ab257611ab2612ea0565b60ff16611abe8461221f565b60ff1614801561116e5750816006811115611adb57611adb612ea0565b611ae484612233565b6006811115611af557611af5612ea0565b149392505050565b6000816003611b0b81611358565b5061137f62ffffff198516600d61224e565b6098546000906001600160a01b031663b869d89a611b4062ffffff198716611e2b565b611b4f62ffffff198816611e4d565b6040516001600160e01b031960e085901b16815263ffffffff92909216600483015260248201526044016020604051808303816000875af1158015611b98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bbc9190612d62565b90506000611bcf62ffffff198516611e6f565b60985460405163c86415cb60e01b81526001600160a01b03858116600483015292935091169063c86415cb90602401602060405180830381865afa158015611c1b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c3f9190612d98565b15611c5d57611c586001600160a01b038316848361225c565b611d2e565b6040516340c10f1960e01b81526001600160a01b038481166004830152602482018390528316906340c10f1990604401600060405180830381600087803b158015611ca757600080fd5b505af1158015611cbb573d6000803e3d6000fd5b50505050816001600160a01b031663cc2ab7c7611cdd8662ffffff191661228c565b6040518263ffffffff1660e01b8152600401611cfb91815260200190565b600060405180830381600087803b158015611d1557600080fd5b505af1158015611d29573d6000803e3d6000fd5b505050505b6001600160a01b0380841690831667ffffffff0000000060208a901b1663ffffffff89161760408051600081526020810186905267ffffffffffffffff92909216917f9f9a97db84f39202ca3b409b63f7ccf7d3fd810e176573c7483088b6f181bbbb910160405180910390a45095945050505050565b66d529ae9e860000816001600160a01b031631108015611dcc575066d529ae9e8600004710155b156109b3576040516001600160a01b0382169060009066d529ae9e8600009082818181858883f1505050505050565b6000816005611b0b81611358565b6000816005611e1781611358565b5061137f62ffffff1985166061602061229d565b6000816001611e3981611358565b5061137f62ffffff198516600060046121ef565b6000816001611e5b81611358565b5061137f62ffffff1985166004602061229d565b60006112ed62ffffff198316602160206121ef565b6000816005611e9281611358565b5061137f6081611eaf81601888901c6001600160601b0316612d4b565b6006611370565b6060600080611ece8460181c6001600160601b031690565b6001600160601b031690506040519150819250611eee84836020016123f9565b508181016020016040529052919050565b600054610100900460ff16611f265760405162461bcd60e51b815260040161061f9061300e565b6106eb336115d4565b6000611f84826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166125509092919063ffffffff16565b8051909150156106b55780806020019051810190611fa29190612d98565b6106b55760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161061f565b600061200c826113df565b806112ed57506112ed8261141d565b6040516060906000612030846020840161255f565b905060006120478260181c6001600160601b031690565b6001600160601b03169050600061205d836125ef565b9184525082016020016040525092915050565b6000601882901c6001600160601b031661208c606160246130cf565b81148061116e57506120a0608160246130cf565b111592915050565b60006120b48260d81c90565b64ffffffffff1664ffffffffff036120ce57506000919050565b60006120d9836121b6565b60405110199392505050565b60008164ffffffffff166120f98460d81c90565b64ffffffffff16149392505050565b600080601f5b600f8160ff16111561215d5760006121278260086130fa565b60ff1685901c905061213881612605565b61ffff16841793508160ff1660101461215357601084901b93505b506000190161210e565b50600f5b60ff8160ff1610156121b057600061217a8260086130fa565b60ff1685901c905061218b81612605565b61ffff16831792508160ff166000146121a657601083901b92505b5060001901612161565b50915091565b60006121cb8260181c6001600160601b031690565b6121de8360781c6001600160601b031690565b016001600160601b03169050919050565b60006121fc826020613123565b6122079060086130fa565b60ff1661221585858561229d565b901c949350505050565b60006112ed62ffffff1983168260016121ef565b600060d882901c60ff1660068111156112ed576112ed612ea0565b600061116e838360146121ef565b6040516001600160a01b0383166024820152604481018290526106b590849063a9059cbb60e01b906064016116a7565b60006112ed62ffffff198316604160205b60008160ff166000036122b25750600061116e565b6122c58460181c6001600160601b031690565b6001600160601b03166122db60ff8416856130cf565b111561233f576123266122f78560781c6001600160601b031690565b6001600160601b03166123138660181c6001600160601b031690565b6001600160601b0316858560ff16612637565b60405162461bcd60e51b815260040161061f91906130e7565b60208260ff1611156123b95760405162461bcd60e51b815260206004820152603a60248201527f54797065644d656d566965772f696e646578202d20417474656d70746564207460448201527f6f20696e646578206d6f7265207468616e203332206279746573000000000000606482015260840161061f565b6008820260006123d28660781c6001600160601b031690565b6001600160601b031690506000600160ff1b60001984011d91909501511695945050505050565b600062ffffff19808416036124615760405162461bcd60e51b815260206004820152602860248201527f54797065644d656d566965772f636f7079546f202d204e756c6c20706f696e7460448201526732b9103232b932b360c11b606482015260840161061f565b61246a836120a8565b6124ca5760405162461bcd60e51b815260206004820152602b60248201527f54797065644d656d566965772f636f7079546f202d20496e76616c696420706f60448201526a34b73a32b9103232b932b360a91b606482015260840161061f565b60006124df8460181c6001600160601b031690565b6001600160601b0316905060006124ff8560781c6001600160601b031690565b6001600160601b03169050600060405190508481111561251f5760206060fd5b8285848460045afa506113d56125358760d81c90565b64ffffffffff60601b606091821b168717901b841760181b90565b606061116b84846000856126a5565b6000604051828111156125725760206060fd5b506000805b84518110156125df576000858281518110612594576125946130b9565b602002602001015190506125aa818487016123f9565b506125be8160181c6001600160601b031690565b6001600160601b0316830192505080806125d790613146565b915050612577565b50606083901b811760181b61137f565b60006125fa826127d6565b6112ed90602061315f565b600061261760048360ff16901c61280b565b60ff1661ffff919091161760081b61262e8261280b565b60ff1617919050565b6060600061264486612108565b915050600061265286612108565b915050600061266086612108565b915050600061266e86612108565b91505083838383604051602001612688949392919061317e565b604051602081830303815290604052945050505050949350505050565b6060824710156127065760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161061f565b6001600160a01b0385163b61275d5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161061f565b600080866001600160a01b031685876040516127799190612fa9565b60006040518083038185875af1925050503d80600081146127b6576040519150601f19603f3d011682016040523d82523d6000602084013e6127bb565b606091505b50915091506127cb828286612958565b979650505050505050565b600060206127ed8360181c6001600160601b031690565b612801906001600160601b0316601f6130cf565b6112ed9190613255565b600060f08083179060ff821690036128265750603092915050565b8060ff1660f10361283a5750603192915050565b8060ff1660f20361284e5750603292915050565b8060ff1660f3036128625750603392915050565b8060ff1660f4036128765750603492915050565b8060ff1660f50361288a5750603592915050565b8060ff1660f60361289e5750603692915050565b8060ff1660f7036128b25750603792915050565b8060ff1660f8036128c65750603892915050565b8060ff1660f9036128da5750603992915050565b8060ff1660fa036128ee5750606192915050565b8060ff1660fb036129025750606292915050565b8060ff1660fc036129165750606392915050565b8060ff1660fd0361292a5750606492915050565b8060ff1660fe0361293e5750606592915050565b8060ff1660ff036129525750606692915050565b50919050565b6060831561296757508161116e565b8251156129775782518084602001fd5b8160405162461bcd60e51b815260040161061f91906130e7565b63ffffffff811681146109b357600080fd5b6001600160a01b03811681146109b357600080fd5b6000806000606084860312156129cd57600080fd5b83356129d881612991565b92506020840135915060408401356129ef816129a3565b809150509250925092565b600060208284031215612a0c57600080fd5b813561116e816129a3565b60008060408385031215612a2a57600080fd5b8235612a35816129a3565b91506020830135612a45816129a3565b809150509250929050565b600060208284031215612a6257600080fd5b5035919050565b600060208284031215612a7b57600080fd5b813561116e81612991565b80151581146109b357600080fd5b600080600080600060a08688031215612aac57600080fd5b8535612ab7816129a3565b9450602086013593506040860135612ace81612991565b9250606086013591506080860135612ae581612a86565b809150509295509295909350565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715612b3257612b32612af3565b604052919050565b600067ffffffffffffffff821115612b5457612b54612af3565b50601f01601f191660200190565b60008060008060808587031215612b7857600080fd5b8435612b8381612991565b93506020850135612b9381612991565b925060408501359150606085013567ffffffffffffffff811115612bb657600080fd5b8501601f81018713612bc757600080fd5b8035612bda612bd582612b3a565b612b09565b818152886020838501011115612bef57600080fd5b8160208401602083013760006020838301015280935050505092959194509250565b60008060408385031215612c2457600080fd5b8235612c2f81612991565b946020939093013593505050565b60008060008060008060a08789031215612c5657600080fd5b8635612c61816129a3565b9550602087013594506040870135612c7881612991565b935060608701359250608087013567ffffffffffffffff80821115612c9c57600080fd5b818901915089601f830112612cb057600080fd5b813581811115612cbf57600080fd5b8a6020828501011115612cd157600080fd5b6020830194508093505050509295509295509295565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600082821015612d5d57612d5d612d35565b500390565b600060208284031215612d7457600080fd5b815161116e816129a3565b600060208284031215612d9157600080fd5b5051919050565b600060208284031215612daa57600080fd5b815161116e81612a86565b60005b83811015612dd0578181015183820152602001612db8565b838111156116de5750506000910152565b600060208284031215612df357600080fd5b815167ffffffffffffffff811115612e0a57600080fd5b8201601f81018413612e1b57600080fd5b8051612e29612bd582612b3a565b818152856020838501011115612e3e57600080fd5b611275826020830160208601612db5565b600060208284031215612e6157600080fd5b815160ff8116811461116e57600080fd5b60008060408385031215612e8557600080fd5b8251612e9081612991565b6020939093015192949293505050565b634e487b7160e01b600052602160045260246000fd5b60078110612ed457634e487b7160e01b600052602160045260246000fd5b60f81b9052565b612ee58186612eb6565b600181019390935260218301919091526041820152606101919050565b60008151808452612f1a816020860160208601612db5565b601f01601f19169290920160200192915050565b63ffffffff841681528260208201526060604082015260006112756060830184612f02565b600063ffffffff808a16835288602084015280881660408401525085606083015260018060a01b03851660808301528360a083015260e060c0830152612f9c60e0830184612f02565b9998505050505050505050565b60008251612fbb818460208701612db5565b9190910192915050565b612fcf8188612eb6565b85600182015284602182015283604182015282606182015260008251612ffc816081850160208701612db5565b91909101608101979650505050505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b85815260008551613071816020850160208a01612db5565b8083019050856020820152845161308f816040840160208901612db5565b60f89490941b6001600160f81b031916604091909401908101939093525050604101949350505050565b634e487b7160e01b600052603260045260246000fd5b600082198211156130e2576130e2612d35565b500190565b60208152600061116e6020830184612f02565b600060ff821660ff84168160ff048111821515161561311b5761311b612d35565b029392505050565b600060ff821660ff84168082101561313d5761313d612d35565b90039392505050565b60006001820161315857613158612d35565b5060010190565b600081600019048311821515161561317957613179612d35565b500290565b7f54797065644d656d566965772f696e646578202d204f76657272616e20746865815274040ecd2caee5c40a6d8d2c6ca40d2e640c2e84060f605b1b60208201526001600160d01b031960d086811b821660358401526e040eed2e8d040d8cadccee8d04060f608b1b603b840181905286821b8316604a8501527f2e20417474656d7074656420746f20696e646578206174206f666673657420306050850152600f60fb1b607085015285821b83166071850152607784015283901b166086820152601760f91b608c8201526000608d82016113d5565b60008261327257634e487b7160e01b600052601260045260246000fd5b50049056fea26469706673582212209f0408e9f94dab6179efebfc61cf9da133af180622a6740bb6000bce2613c99064736f6c634300080f0033";

type BridgeRouterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BridgeRouterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BridgeRouter__factory extends ContractFactory {
  constructor(...args: BridgeRouterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BridgeRouter> {
    return super.deploy(overrides || {}) as Promise<BridgeRouter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BridgeRouter {
    return super.attach(address) as BridgeRouter;
  }
  override connect(signer: Signer): BridgeRouter__factory {
    return super.connect(signer) as BridgeRouter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BridgeRouterInterface {
    return new utils.Interface(_abi) as BridgeRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BridgeRouter {
    return new Contract(address, _abi, signerOrProvider) as BridgeRouter;
  }
}
