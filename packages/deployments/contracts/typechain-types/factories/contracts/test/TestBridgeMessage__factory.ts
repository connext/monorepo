/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TestBridgeMessage,
  TestBridgeMessageInterface,
} from "../../../contracts/test/TestBridgeMessage";

const _abi = [
  {
    inputs: [
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
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
    ],
    name: "formatDetailsHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_tokenId",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_action",
        type: "bytes",
      },
      {
        internalType: "enum BridgeMessage.Types",
        name: "_idType",
        type: "uint8",
      },
      {
        internalType: "enum BridgeMessage.Types",
        name: "_actionType",
        type: "uint8",
      },
    ],
    name: "formatMessage",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
    ],
    name: "formatTokenId",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_to",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_amnt",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_detailsHash",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "_enableFast",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "_externalHash",
        type: "bytes32",
      },
    ],
    name: "formatTransfer",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_action",
        type: "bytes",
      },
    ],
    name: "isFastTransfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_action",
        type: "bytes",
      },
    ],
    name: "isTransfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_action",
        type: "bytes",
      },
      {
        internalType: "enum BridgeMessage.Types",
        name: "_t",
        type: "uint8",
      },
    ],
    name: "isValidAction",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "isValidMessageLength",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "messageType",
    outputs: [
      {
        internalType: "enum BridgeMessage.Types",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "mustBeMessage",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "splitMessage",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_tokenId",
        type: "bytes",
      },
    ],
    name: "splitTokenId",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_transfer",
        type: "bytes",
      },
    ],
    name: "splitTransfer",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611930806100206000396000f3fe608060405234801561001057600080fd5b50600436106100ce5760003560e01c806349a1af771161008c5780637a36eccb116100665780637a36eccb14610207578063a1aeb6951461021a578063af8a08d914610258578063db48cd2a1461026b57600080fd5b806349a1af77146101b35780635ae52b95146101c6578063634fa27e146101e757600080fd5b806208d69f146100d357806306cb7430146100fc5780630ae313001461011f57806320aa9fd214610140578063295ab27b1461018d57806337600258146101a0575b600080fd5b6100e66100e1366004611388565b61027e565b6040516100f39190611419565b60405180910390f35b61010f61010a366004611388565b6102af565b60405190151581526020016100f3565b61013261012d36600461142c565b6102cf565b6040519081526020016100f3565b61015361014e366004611388565b6102e4565b6040805160ff909616865260208601949094526001600160a01b03909216928401929092526060830191909152608082015260a0016100f3565b61010f61019b366004611388565b61034b565b6100e66101ae3660046114aa565b610363565b61010f6101c136600461150c565b61037f565b6101d96101d4366004611388565b6103a5565b6040516100f392919061155a565b6101fa6101f5366004611388565b6103fa565b6040516100f39190611595565b6100e66102153660046115bd565b61041a565b61022d610228366004611388565b610429565b6040805163ffffffff909416845260208401929092526001600160a01b0316908201526060016100f3565b61010f610266366004611388565b61046f565b6100e66102793660046115f2565b610487565b6060600061028f60025b84906104d7565b90506102a861029d826104fb565b62ffffff191661051a565b9392505050565b6000806102bb83610563565b90506102a86102ca84836104d7565b610586565b60006102dc8484846105a9565b949350505050565b600080808080806102f68760046104d7565b90506000610303826105e5565b90506000610310836105f9565b9050600061031d8461060e565b9050600061032a85610621565b9050600061033786610636565b949c939b5091995097509195509350505050565b6000806103586004610288565b90506102a88161064b565b606061037561029d8787878787610658565b9695505050505050565b60006102a86103a08360048111156103995761039961157f565b85906104d7565b6106cb565b60608060006103b46002610399565b905060006103c1826106e5565b905060006103ce83610712565b90506103df62ffffff19831661051a565b6103ee62ffffff19831661051a565b94509450505050915091565b60008061040683610563565b90506102a861041584836104d7565b610760565b60606102a861029d848461077b565b60008080806104398560016104d7565b90506000610446826107af565b90506000610453836107d1565b90506000610460846107f3565b92989197509195509350505050565b60008061047c6003610288565b90506102a881610813565b606060006104a78460048111156104a0576104a061157f565b87906104d7565b905060006104c08460048111156104a0576104a061157f565b90506104cc8282610820565b979650505050505050565b8151600090602084016104f264ffffffffff851682846108f4565b95945050505050565b600061051461050983610938565b62ffffff191661096a565b92915050565b60606000806105328460181c6001600160601b031690565b6001600160601b03169050604051915081925061055284836020016109c5565b508181016020016040529052919050565b60008160248151811061057857610578611677565b016020015160f81c92915050565b6000601882901c6001600160601b03166105a2608160246116a3565b1492915050565b6000835184845185856040516020016105c69594939291906116bb565b6040516020818303038152906040528051906020012090509392505050565b600061051462ffffff198316826001610b1d565b600061051462ffffff19831660016020610b4d565b600061051462ffffff198316600d610ca6565b600061051462ffffff19831660216020610b1d565b600061051462ffffff19831660616020610b4d565b6000610514826004610cb4565b6000808361066757600361066a565b60045b90506104cc8160048111156106815761068161157f565b6106b56000848b8b8b8a60405160200161069f95949392919061171b565b60408051601f19818403018152919052906104d7565b6301000000600160d81b031660d89190911b1790565b60006106d682610813565b8061051457506105148261064b565b60008160026106fc815b62ffffff19841690610d13565b506102dc62ffffff198516600060246001610dec565b6000816002610720816106ef565b50600061073b6024601887901c6001600160601b0316611764565b9050600061074886610e5c565b60ff16905061037562ffffff19871660248484610dec565b600060d882901c60ff1660048111156105145761051461157f565b60006102a860016040516001600160e01b031960e087901b166020820152602481018590526106b59060009060440161069f565b60008160016107bd816106ef565b506102dc62ffffff19851660006004610b1d565b60008160016107df816106ef565b506102dc62ffffff19851660046020610b4d565b6000816001610801816106ef565b506102dc62ffffff1985166010610ca6565b6000610514826003610cb4565b606082600161082e816106ef565b50610838846106cb565b6108735760405162461bcd60e51b815260206004820152600760248201526610b0b1ba34b7b760c91b60448201526064015b60405180910390fd5b60408051600280825260608201835260009260208301908036833701905050905085816000815181106108a8576108a8611677565b602002602001019062ffffff1916908162ffffff19168152505084816001815181106108d6576108d6611677565b62ffffff199092166020928302919091019091015261037581610e71565b60008061090183856116a3565b9050604051811115610911575060005b806109235762ffffff199150506102a8565b5050606092831b9190911790911b1760181b90565b600061094382610586565b15610960576301000000600160d81b038216600160d91b17610514565b62ffffff19610514565b600061097582610ec6565b6109c15760405162461bcd60e51b815260206004820152601960248201527f56616c696469747920617373657274696f6e206661696c656400000000000000604482015260640161086a565b5090565b600062ffffff198084161415610a2e5760405162461bcd60e51b815260206004820152602860248201527f54797065644d656d566965772f636f7079546f202d204e756c6c20706f696e7460448201526732b9103232b932b360c11b606482015260840161086a565b610a3783610ec6565b610a975760405162461bcd60e51b815260206004820152602b60248201527f54797065644d656d566965772f636f7079546f202d20496e76616c696420706f60448201526a34b73a32b9103232b932b360a91b606482015260840161086a565b6000610aac8460181c6001600160601b031690565b6001600160601b031690506000610acc8560781c6001600160601b031690565b6001600160601b031690506000604051905084811115610aec5760206060fd5b8285848460045afa50610375610b028760d81c90565b64ffffffffff60601b606091821b168717901b841760181b90565b6000610b2a82602061177b565b610b3590600861179e565b60ff16610b43858585610b4d565b901c949350505050565b600060ff8216610b5f575060006102a8565b610b728460181c6001600160601b031690565b6001600160601b0316610b8860ff8416856116a3565b1115610bec57610bd3610ba48560781c6001600160601b031690565b6001600160601b0316610bc08660181c6001600160601b031690565b6001600160601b0316858560ff16610f04565b60405162461bcd60e51b815260040161086a9190611419565b60208260ff161115610c665760405162461bcd60e51b815260206004820152603a60248201527f54797065644d656d566965772f696e646578202d20417474656d70746564207460448201527f6f20696e646578206d6f7265207468616e203332206279746573000000000000606482015260840161086a565b600882026000610c7f8660781c6001600160601b031690565b6001600160601b031690506000600160ff1b60001984011d91909501511695945050505050565b60006102a883836014610b1d565b6000816004811115610cc857610cc861157f565b60ff16610cd4846105e5565b60ff161480156102a85750816004811115610cf157610cf161157f565b610cfa84610760565b6004811115610d0b57610d0b61157f565b149392505050565b6000610d1f8383610f72565b610de5576000610d3e610d328560d81c90565b64ffffffffff16610f95565b9150506000610d538464ffffffffff16610f95565b6040517f5479706520617373657274696f6e206661696c65642e20476f7420307800000060208201526001600160b01b031960b086811b8216603d8401526c05c408af0e0cac6e8cac84060f609b1b604784015283901b16605482015290925060009150605e0160405160208183030381529060405290508060405162461bcd60e51b815260040161086a9190611419565b5090919050565b600080610e028660781c6001600160601b031690565b6001600160601b03169050610e1686611043565b84610e2187846116a3565b610e2b91906116a3565b1115610e3e5762ffffff199150506102dc565b610e4885826116a3565b90506103758364ffffffffff1682866108f4565b600061051462ffffff19831660246001610b1d565b6040516060906000610e86846020840161107c565b90506000610e9d8260181c6001600160601b031690565b6001600160601b031690506000610eb38361110c565b9184525082016020016040525092915050565b6000610ed28260d81c90565b64ffffffffff1664ffffffffff1415610eed57506000919050565b6000610ef883611043565b60405110199392505050565b60606000610f1186610f95565b9150506000610f1f86610f95565b9150506000610f2d86610f95565b9150506000610f3b86610f95565b91505083838383604051602001610f5594939291906117c7565b604051602081830303815290604052945050505050949350505050565b60008164ffffffffff16610f868460d81c90565b64ffffffffff16149392505050565b600080601f5b600f8160ff161115610fea576000610fb482600861179e565b60ff1685901c9050610fc581611122565b61ffff16841793508160ff16601014610fe057601084901b93505b5060001901610f9b565b50600f5b60ff8160ff16101561103d57600061100782600861179e565b60ff1685901c905061101881611122565b61ffff16831792508160ff1660001461103357601083901b92505b5060001901610fee565b50915091565b60006110588260181c6001600160601b031690565b61106b8360781c6001600160601b031690565b016001600160601b03169050919050565b60006040518281111561108f5760206060fd5b506000805b84518110156110fc5760008582815181106110b1576110b1611677565b602002602001015190506110c7818487016109c5565b506110db8160181c6001600160601b031690565b6001600160601b0316830192505080806110f49061189e565b915050611094565b50606083901b811760181b6102dc565b600061111782611154565b6105149060206118b9565b600061113460048360ff16901c611189565b60ff1661ffff919091161760081b61114b82611189565b60ff1617919050565b6000602061116b8360181c6001600160601b031690565b61117f906001600160601b031660206116a3565b61051491906118d8565b600060f08083179060ff821614156111a45750603092915050565b8060ff1660f114156111b95750603192915050565b8060ff1660f214156111ce5750603292915050565b8060ff1660f314156111e35750603392915050565b8060ff1660f414156111f85750603492915050565b8060ff1660f5141561120d5750603592915050565b8060ff1660f614156112225750603692915050565b8060ff1660f714156112375750603792915050565b8060ff1660f8141561124c5750603892915050565b8060ff1660f914156112615750603992915050565b8060ff1660fa14156112765750606192915050565b8060ff1660fb141561128b5750606292915050565b8060ff1660fc14156112a05750606392915050565b8060ff1660fd14156112b55750606492915050565b8060ff1660fe14156112ca5750606592915050565b8060ff1660ff14156112df5750606692915050565b50919050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261130c57600080fd5b813567ffffffffffffffff80821115611327576113276112e5565b604051601f8301601f19908116603f0116810190828211818310171561134f5761134f6112e5565b8160405283815286602085880101111561136857600080fd5b836020870160208301376000602085830101528094505050505092915050565b60006020828403121561139a57600080fd5b813567ffffffffffffffff8111156113b157600080fd5b6102dc848285016112fb565b60005b838110156113d85781810151838201526020016113c0565b838111156113e7576000848401525b50505050565b600081518084526114058160208601602086016113bd565b601f01601f19169290920160200192915050565b6020815260006102a860208301846113ed565b60008060006060848603121561144157600080fd5b833567ffffffffffffffff8082111561145957600080fd5b611465878388016112fb565b9450602086013591508082111561147b57600080fd5b50611488868287016112fb565b925050604084013560ff8116811461149f57600080fd5b809150509250925092565b600080600080600060a086880312156114c257600080fd5b853594506020860135935060408601359250606086013580151581146114e757600080fd5b949793965091946080013592915050565b80356005811061150757600080fd5b919050565b6000806040838503121561151f57600080fd5b823567ffffffffffffffff81111561153657600080fd5b611542858286016112fb565b925050611551602084016114f8565b90509250929050565b60408152600061156d60408301856113ed565b82810360208401526104f281856113ed565b634e487b7160e01b600052602160045260246000fd5b60208101600583106115b757634e487b7160e01b600052602160045260246000fd5b91905290565b600080604083850312156115d057600080fd5b823563ffffffff811681146115e457600080fd5b946020939093013593505050565b6000806000806080858703121561160857600080fd5b843567ffffffffffffffff8082111561162057600080fd5b61162c888389016112fb565b9550602087013591508082111561164257600080fd5b5061164f878288016112fb565b93505061165e604086016114f8565b915061166c606086016114f8565b905092959194509250565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600082198211156116b6576116b661168d565b500190565b858152600085516116d3816020850160208a016113bd565b808301905085602082015284516116f18160408401602089016113bd565b60f89490941b6001600160f81b031916604091909401908101939093525050604101949350505050565b60006005871061173b57634e487b7160e01b600052602160045260246000fd5b5060f89590951b8552600185019390935260218401919091526041830152606182015260810190565b6000828210156117765761177661168d565b500390565b600060ff821660ff8416808210156117955761179561168d565b90039392505050565b600060ff821660ff84168160ff04811182151516156117bf576117bf61168d565b029392505050565b7f54797065644d656d566965772f696e646578202d204f76657272616e20746865815274040ecd2caee5c40a6d8d2c6ca40d2e640c2e84060f605b1b60208201526001600160d01b031960d086811b821660358401526e040eed2e8d040d8cadccee8d04060f608b1b603b840181905286821b8316604a8501527f2e20417474656d7074656420746f20696e646578206174206f666673657420306050850152600f60fb1b607085015285821b83166071850152607784015283901b166086820152601760f91b608c8201526000608d8201610375565b60006000198214156118b2576118b261168d565b5060010190565b60008160001904831182151516156118d3576118d361168d565b500290565b6000826118f557634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220c868d2d52d934da5ed9beecf57b90564bc61853861731e780213e8ed3100d82f64736f6c634300080b0033";

type TestBridgeMessageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestBridgeMessageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestBridgeMessage__factory extends ContractFactory {
  constructor(...args: TestBridgeMessageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestBridgeMessage> {
    return super.deploy(overrides || {}) as Promise<TestBridgeMessage>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestBridgeMessage {
    return super.attach(address) as TestBridgeMessage;
  }
  override connect(signer: Signer): TestBridgeMessage__factory {
    return super.connect(signer) as TestBridgeMessage__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestBridgeMessageInterface {
    return new utils.Interface(_abi) as TestBridgeMessageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestBridgeMessage {
    return new Contract(address, _abi, signerOrProvider) as TestBridgeMessage;
  }
}
