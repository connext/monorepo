/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MerkleTreeManager,
  MerkleTreeManagerInterface,
} from "../../../contracts/messaging/MerkleTreeManager";

const _abi = [
  {
    inputs: [],
    name: "MerkleLib__insert_treeIsFull",
    type: "error",
  },
  {
    inputs: [],
    name: "MerkleTreeManager__setArborist_alreadyArborist",
    type: "error",
  },
  {
    inputs: [],
    name: "MerkleTreeManager__setArborist_zeroAddress",
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
    name: "ProposedOwnable__ownershipDelayElapsed_delayNotElapsed",
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
        internalType: "address",
        name: "previous",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "updated",
        type: "address",
      },
    ],
    name: "ArboristUpdated",
    type: "event",
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
        indexed: false,
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "leaf",
        type: "bytes32",
      },
    ],
    name: "LeafInserted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "leaves",
        type: "bytes32[]",
      },
    ],
    name: "LeavesInserted",
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
    inputs: [],
    name: "acceptProposedOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "arborist",
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
    name: "branch",
    outputs: [
      {
        internalType: "bytes32[32]",
        name: "",
        type: "bytes32[32]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "count",
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
        internalType: "address",
        name: "_arborist",
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
        name: "leaf",
        type: "bytes32",
      },
    ],
    name: "insert",
    outputs: [
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_count",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "leaves",
        type: "bytes32[]",
      },
    ],
    name: "insert",
    outputs: [
      {
        internalType: "bytes32",
        name: "_root",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_count",
        type: "uint256",
      },
    ],
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
    inputs: [],
    name: "root",
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
    name: "rootAndCount",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
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
        name: "newArborist",
        type: "address",
      },
    ],
    name: "setArborist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tree",
    outputs: [
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523461001657611ff7908161001c8239f35b600080fdfe60806040526004361015610013575b600080fd5b60003560e01c806306661abd1461017b5780631b373a98146101725780632d287e431461016957806331d0913c1461016057806334a55ee6146101575780633cf52ffb1461014e5780634b72d0d4146101455780636a42b8f81461013c578063715018a6146101335780638da5cb5b1461012a578063b1f8100d14610121578063c4d66de814610118578063c5b350df1461010f578063c9b0a6de14610106578063d1851c92146100fd578063d232c220146100f4578063ebf0c717146100eb5763fd54b228146100e357600080fd5b61000e610180565b5061000e610861565b5061000e610832565b5061000e610808565b5061000e6107d9565b5061000e610763565b5061000e61062a565b5061000e6105b2565b5061000e610584565b5061000e610557565b5061000e610538565b5061000e6104dc565b5061000e6104bd565b5061000e610415565b5061000e61036c565b5061000e61028a565b5061000e6101c1565b5061000e5b503461000e57600036600319011261000e576020605254604051908152f35b602090600319011261000e576004356001600160a01b038116810361000e5790565b503461000e576101d03661019f565b6000546001600160a01b03919060101c821633036102785781811691821561026657605354168281146102545760407ff2fa31e21376edb31995720340ba00a41a12a7c8744a9bde552660121f4b7771916102529482519182526020820152a160018060a01b03166bffffffffffffffffffffffff60a01b6053541617605355565b005b60405163606e957b60e11b8152600490fd5b604051630c11a52d60e11b8152600490fd5b6040516311a8a1bb60e31b8152600490fd5b503461000e5760208060031936011261000e57600435906102b660018060a01b03605354163314610989565b6102dc826040516102c6816103ad565b6102ce610885565b815260525484820152610b95565b805160005b83811061035957846102f585850151605255565b605254907fd50e83984b64a106ac2ee6314d689ec4d2a656d5ece6d94c585796944b52240c610345610325610c58565b926040519182918686846040919493926060820195825260208201520152565b0390a1604080519182526020820192909252f35b81516032820155908301906001016102e1565b503461000e57600036600319011261000e576053546040516001600160a01b039091168152602090f35b50634e487b7160e01b600052604160045260246000fd5b6040810190811067ffffffffffffffff8211176103c957604052565b6103d1610396565b604052565b610400810190811067ffffffffffffffff8211176103c957604052565b90601f8019910116810190811067ffffffffffffffff8211176103c957604052565b503461000e5760208060031936011261000e5767ffffffffffffffff60043581811161000e573660238201121561000e5780600401359182116104b0575b8160051b60405192610467858301856103f3565b83526024848401918301019136831161000e57602401905b8282106104a15761048f846109c1565b60408051928352602083019190915290f35b8135815290840190840161047f565b6104b8610396565b610453565b503461000e57600036600319011261000e576020600254604051908152f35b503461000e57600036600319011261000e576040516104fa816103d6565b610400809136903761050a610885565b90604051806000905b602090818310156105335790806001928751815201950191019093610513565b505050f35b503461000e57600036600319011261000e57602060405162093a808152f35b503461000e5760008060031936011261058157805460101c6001600160a01b031633036102785780f35b80fd5b503461000e57600036600319011261000e5760005460405160109190911c6001600160a01b03168152602090f35b503461000e576105c13661019f565b6000546001600160a01b039060101c811633810361027857600154838316921682148061061f575b61060d57146105fb5761025290611f77565b604051634a2fb73f60e11b8152600490fd5b6040516311bc066560e11b8152600490fd5b5060025415156105e9565b503461000e576106393661019f565b6000549060ff8260081c161580928193610755575b8115610735575b50156106d95761067b9082610672600160ff196000541617600055565b6106c0576108d0565b61068157005b61069161ff001960005416600055565b604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249890602090a1005b6106d461010061ff00196000541617600055565b6108d0565b60405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608490fd5b303b15915081610747575b5038610655565b6001915060ff161438610740565b600160ff821610915061064e565b503461000e57600036600319011261000e576001546001600160a01b03163381036107c75762093a8060025442034281116107ba575b11156107a85761025290611f04565b6040516324e0285f60e21b8152600490fd5b6107c2610aa2565b610799565b6040516311a7f27160e11b8152600490fd5b503461000e57600036600319011261000e576107f3610c58565b60525460408051928352602083019190915290f35b503461000e57600036600319011261000e576001546040516001600160a01b039091168152602090f35b503461000e57600036600319011261000e5760005460405160109190911c6001600160a01b0316158152602090f35b503461000e57600036600319011261000e57602061087d610c58565b604051908152f35b60405160006032825b602090818410156108ae576001918291845481520192019201919061088e565b5050505090610400820182811067ffffffffffffffff8211176103c957604052565b61091e9060ff60005460081c16906108e782610929565b6108f082610929565b60018060a01b03166bffffffffffffffffffffffff60a01b605354161760535561091981610929565b610929565b61092733611f04565b565b1561093057565b60405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608490fd5b1561099057565b60405162461bcd60e51b815260206004820152600960248201526808585c989bdc9a5cdd60ba1b6044820152606490fd5b906109d760018060a01b03605354163314610989565b6040516109e3816103ad565b6109eb610885565b8152605254906020918282015283516000905b808210610a55575050610a1081610ab9565b0151917f3ef8438c07c6b4b67e70eace906a07e9b294c2f0066803f58e705567e1aa4f1b610a4e610a3f610c58565b92604051918291878684610ae8565b0390a19190565b9091610a766001918751851015610a7e575b858560051b8901015190610b95565b9201906109fe565b610a86610a8b565b610a67565b50634e487b7160e01b600052603260045260246000fd5b50634e487b7160e01b600052601160045260246000fd5b805160005b602080821015610adc57906001918351930192816032015501610abe565b50505060200151605255565b916060830191835260806020938492838201526060604082015285518094520193019160005b828110610b1c575050505090565b835185529381019392810192600101610b0e565b60405190610b3d826103ad565b6000602083604051610b4e816103d6565b61040036823781520152565b6001906000198114610b6a570190565b610b72610aa2565b0190565b906020811015610b88575b60051b0190565b610b90610a8b565b610b81565b90610b9e610b30565b50602080830191610baf8351610b5a565b80935263ffffffff8311610c4657916000925b828410610bdb57604051638eab04bb60e01b8152600490fd5b6001908180841614610c3257610c15610c23610bf8878951610b76565b519260405192839188830195869091604092825260208201520190565b03601f1981018352826103f3565b51902091811c93019290610bc2565b93915050610c4291508351610b76565b5290565b604051638eab04bb60e01b8152600490fd5b6052548015611edf57600060018216611ec8575060028116611e915760048116611e5a5760088116611e235760108116611dec5760208116611db55760408116611d7e5760808116611d47576101008116611d10576102008116611cd9576104008116611ca2576108008116611c6b576110008116611c34576120008116611bfd576140008116611bc6576180008116611b8f57620100008116611b5857620200008116611b2157620400008116611aea57620800008116611ab357621000008116611a7c57622000008116611a4557624000008116611a0e576280000081166119d757630100000081166119a05763020000008116611969576304000000811661193257630800000081166118fb57631000000081166118c4576320000000811661188d5763400000008116611856576380000000811661181f577f27ae5ba08d7291c96c8cbddcc148bf48a6d68c7974b94356f53754ef6171d7579060205b601e811161181a57600181106117cf575b60028110611784575b60038110611739575b600481106116ee575b600581106116a3575b60068110611658575b6007811061160d575b600881106115c1575b60098110611575575b600a8110611529575b600b81106114dd575b600c8110611491575b600d8110611445575b600e81106113f9575b600f81106113ad575b60108110611360575b60118110611313575b601281106112c6575b60138110611279575b6014811061122c575b601581106111df575b60168110611192575b60178110611145575b601881106110f7575b601981106110a9575b601a811061105b575b601b811061100d575b601c8110610fbf575b601d8110610f71575b601e8110610f23575b601f11610eda575090565b63800000001615610ef7576051546000526020525b604060002090565b6000527f8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9602052610eef565b916340000000821615610f45576050546000526020525b604060002091610ecf565b6000527f93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735602052610f3a565b916320000000821615610f9357604f546000526020525b604060002091610ec6565b6000527f388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322602052610f88565b916310000000821615610fe157604e546000526020525b604060002091610ebd565b6000527f662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e602052610fd6565b91630800000082161561102f57604d546000526020525b604060002091610eb4565b6000527f838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e602052611024565b91630400000082161561107d57604c546000526020525b604060002091610eab565b6000527fb8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0602052611072565b9163020000008216156110cb57604b546000526020525b604060002091610ea2565b6000527f0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d6020526110c0565b91630100000082161561111957604a546000526020525b604060002091610e99565b6000527fcdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef60205261110e565b9162800000821615611166576049546000526020525b604060002091610e90565b6000527f4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee65260205261115b565b91624000008216156111b3576048546000526020525b604060002091610e87565b6000527f5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e3776020526111a8565b9162200000821615611200576047546000526020525b604060002091610e7e565b6000527ff4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd96020526111f5565b916210000082161561124d576046546000526020525b604060002091610e75565b6000527fc65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2602052611242565b916208000082161561129a576045546000526020525b604060002091610e6c565b6000527fb46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa060205261128f565b91620400008216156112e7576044546000526020525b604060002091610e63565b6000527f5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a06020526112dc565b9162020000821615611334576043546000526020525b604060002091610e5a565b6000527fe1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a602052611329565b9162010000821615611381576042546000526020525b604060002091610e51565b6000527f2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f602052611376565b916180008216156113cd576041546000526020525b604060002091610e48565b6000527fda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d26020526113c2565b91614000821615611419576040546000526020525b604060002091610e3f565b6000527f5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8becc60205261140e565b9161200082161561146557603f546000526020525b604060002091610e36565b6000527fc1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb60205261145a565b916110008216156114b157603e546000526020525b604060002091610e2d565b6000527f3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c6020526114a6565b916108008216156114fd57603d546000526020525b604060002091610e24565b6000527ff8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf8926020526114f2565b9161040082161561154957603c546000526020525b604060002091610e1b565b6000527ff9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a560205261153e565b9161020082161561159557603b546000526020525b604060002091610e12565b6000527fcefad4e508c098b9a7e1d8feb19955fb02ba9675585078710969d3440f5054e060205261158a565b916101008216156115e157603a546000526020525b604060002091610e09565b6000527f9867cc5f7f196b93bae1e27e6320742445d290f2263827498b54fec539f756af6020526115d6565b91608082161561162c576039546000526020525b604060002091610e00565b6000527fffd70157e48063fc33c97a050f7f640233bf646cc98d9524c6b92bcf3ab56f83602052611621565b916040821615611677576038546000526020525b604060002091610df7565b6000527f887c22bd8750d34016ac3c66b5ff102dacdd73f6b014e710b51e8022af9a196860205261166c565b9160208216156116c2576037546000526020525b604060002091610dee565b6000527f0eb01ebfc9ed27500cd4dfc979272d1f0913cc9f66540d7e8005811109e1cf2d6020526116b7565b91601082161561170d576036546000526020525b604060002091610de5565b6000527fe58769b32a1beaf1ea27375a44095a0d1fb664ce2dd358e7fcbfb78c26a19344602052611702565b916008821615611758576035546000526020525b604060002091610ddc565b6000527f21ddb9a356815c3fac1026b6dec5df3124afbadb485c9ba5a3e3398a04b7ba8560205261174d565b9160048216156117a3576034546000526020525b604060002091610dd3565b6000527fb4c11951957c6f8f642c4af61cd6b24640fec6dc7fc607ee8206a99e92410d30602052611798565b9160028216156117ee576033546000526020525b604060002091610dca565b6000527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb56020526117e3565b505090565b6051546000527f8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9602052604060002090601f610db9565b6050546000527f93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735602052604060002090601e610db9565b604f546000527f388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322602052604060002090601d610db9565b604e546000527f662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e602052604060002090601c610db9565b604d546000527f838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e602052604060002090601b610db9565b604c546000527fb8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0602052604060002090601a610db9565b604b546000527f0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d6020526040600020906019610db9565b604a546000527fcdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef6020526040600020906018610db9565b6049546000527f4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee6526020526040600020906017610db9565b6048546000527f5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e3776020526040600020906016610db9565b6047546000527ff4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd96020526040600020906015610db9565b6046546000527fc65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e26020526040600020906014610db9565b6045546000527fb46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa06020526040600020906013610db9565b6044546000527f5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a06020526040600020906012610db9565b6043546000527fe1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a6020526040600020906011610db9565b6042546000527f2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f6020526040600020906010610db9565b6041546000527fda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d2602052604060002090600f610db9565b6040546000527f5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8becc602052604060002090600e610db9565b603f546000527fc1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb602052604060002090600d610db9565b603e546000527f3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c602052604060002090600c610db9565b603d546000527ff8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf892602052604060002090600b610db9565b603c546000527ff9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5602052604060002090600a610db9565b603b546000527fcefad4e508c098b9a7e1d8feb19955fb02ba9675585078710969d3440f5054e06020526040600020906009610db9565b603a546000527f9867cc5f7f196b93bae1e27e6320742445d290f2263827498b54fec539f756af6020526040600020906008610db9565b6039546000527fffd70157e48063fc33c97a050f7f640233bf646cc98d9524c6b92bcf3ab56f836020526040600020906007610db9565b6038546000527f887c22bd8750d34016ac3c66b5ff102dacdd73f6b014e710b51e8022af9a19686020526040600020906006610db9565b6037546000527f0eb01ebfc9ed27500cd4dfc979272d1f0913cc9f66540d7e8005811109e1cf2d6020526040600020906005610db9565b6036546000527fe58769b32a1beaf1ea27375a44095a0d1fb664ce2dd358e7fcbfb78c26a193446020526040600020906004610db9565b6035546000527f21ddb9a356815c3fac1026b6dec5df3124afbadb485c9ba5a3e3398a04b7ba856020526040600020906003610db9565b6034546000527fb4c11951957c6f8f642c4af61cd6b24640fec6dc7fc607ee8206a99e92410d306020526040600020906002610db9565b6033546000527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb56020526040600020906001610db9565b906032546000526000602052604060002091610db9565b507f27ae5ba08d7291c96c8cbddcc148bf48a6d68c7974b94356f53754ef6171d75790565b6000549060018060a01b03808216908360101c167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a362010000600160b01b031990911660109190911b62010000600160b01b0316176000908155600255600180546001600160a01b0319169055565b42600255600180546001600160a01b0319166001600160a01b039290921691821790557f6ab4d119f23076e8ad491bc65ce85f017fb0591dce08755ba8591059cc51737a600080a256fea2646970667358221220a910d96f90786caff07b64a027ff6c344ed7deab358a95a842cfa20499f2783e64736f6c63430008110033";

type MerkleTreeManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MerkleTreeManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MerkleTreeManager__factory extends ContractFactory {
  constructor(...args: MerkleTreeManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MerkleTreeManager> {
    return super.deploy(overrides || {}) as Promise<MerkleTreeManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MerkleTreeManager {
    return super.attach(address) as MerkleTreeManager;
  }
  override connect(signer: Signer): MerkleTreeManager__factory {
    return super.connect(signer) as MerkleTreeManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MerkleTreeManagerInterface {
    return new utils.Interface(_abi) as MerkleTreeManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MerkleTreeManager {
    return new Contract(address, _abi, signerOrProvider) as MerkleTreeManager;
  }
}
