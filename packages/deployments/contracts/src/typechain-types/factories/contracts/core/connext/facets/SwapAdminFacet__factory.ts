/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  SwapAdminFacet,
  SwapAdminFacetInterface,
} from "../../../../../contracts/core/connext/facets/SwapAdminFacet";

const _abi = [
  {
    inputs: [],
    name: "BaseConnextFacet__getAdoptedAsset_notWhitelisted",
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
    name: "SwapAdminFacet__initializeSwap_aExceedMax",
    type: "error",
  },
  {
    inputs: [],
    name: "SwapAdminFacet__initializeSwap_adminFeeExceedMax",
    type: "error",
  },
  {
    inputs: [],
    name: "SwapAdminFacet__initializeSwap_alreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "SwapAdminFacet__initializeSwap_decimalsMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "SwapAdminFacet__initializeSwap_duplicateTokens",
    type: "error",
  },
  {
    inputs: [],
    name: "SwapAdminFacet__initializeSwap_failedInitLpTokenClone",
    type: "error",
  },
  {
    inputs: [],
    name: "SwapAdminFacet__initializeSwap_feeExceedMax",
    type: "error",
  },
  {
    inputs: [],
    name: "SwapAdminFacet__initializeSwap_invalidPooledTokens",
    type: "error",
  },
  {
    inputs: [],
    name: "SwapAdminFacet__initializeSwap_tokenDecimalsExceedMax",
    type: "error",
  },
  {
    inputs: [],
    name: "SwapAdminFacet__initializeSwap_zeroTokenAddress",
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
        indexed: false,
        internalType: "uint256",
        name: "newAdminFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "AdminFeesSet",
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
    name: "AdminFeesWithdrawn",
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
        internalType: "uint256",
        name: "futureA",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "futureTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "RampAStarted",
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
    name: "RampAStopped",
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
        internalType: "uint256",
        name: "newSwapFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "SwapFeesSet",
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
        components: [
          {
            internalType: "bytes32",
            name: "key",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "initialA",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "futureA",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialATime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "futureATime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "swapFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "adminFee",
            type: "uint256",
          },
          {
            internalType: "contract LPToken",
            name: "lpToken",
            type: "address",
          },
          {
            internalType: "contract IERC20[]",
            name: "pooledTokens",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "tokenPrecisionMultipliers",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "balances",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "adminFees",
            type: "uint256[]",
          },
        ],
        indexed: false,
        internalType: "struct SwapUtils.Swap",
        name: "swap",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "SwapInitialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
      {
        internalType: "contract IERC20[]",
        name: "_pooledTokens",
        type: "address[]",
      },
      {
        internalType: "uint8[]",
        name: "decimals",
        type: "uint8[]",
      },
      {
        internalType: "string",
        name: "lpTokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "lpTokenSymbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_a",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_adminFee",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "lpTokenTargetAddress",
        type: "address",
      },
    ],
    name: "initializeSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "futureA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "futureTime",
        type: "uint256",
      },
    ],
    name: "rampA",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "newAdminFee",
        type: "uint256",
      },
    ],
    name: "setSwapAdminFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "newSwapFee",
        type: "uint256",
      },
    ],
    name: "setSwapFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
    ],
    name: "stopRampA",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
    ],
    name: "withdrawSwapAdminFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611af4806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80631963e4261461006757806343be5eaf1461007c57806347555ef61461008f57806372a30e08146100a25780639c8eab97146100b5578063a1a23c29146100c8575b600080fd5b61007a610075366004611398565b6100db565b005b61007a61008a3660046113c4565b61016b565b61007a61009d3660046115c3565b6101f2565b61007a6100b03660046116a8565b61085b565b61007a6100c33660046113c4565b6108da565b61007a6100d63660046116a8565b610959565b336100e4610a09565b6001600160a01b03161461010b576040516314e74a2560e21b815260040160405180910390fd5b6000838152602160205260409020610124908383610a37565b60408051838152602081018390523381830152905184917f58e6fbecdb1a94225cf82c6b317a771aa08c9ab6552702b819bcd84ba8e8312f919081900360600190a2505050565b33610174610a09565b6001600160a01b03161461019b576040516314e74a2560e21b815260040160405180910390fd5b60008281526021602052604090206101b39082610c87565b6040805182815233602082015283917f6d9b91502dc11e7c127e8e2d114c1f8026647ecb6b987c1baaadb706b5eb317691015b60405180910390a25050565b336101fb610a09565b6001600160a01b031614610222576040516314e74a2560e21b815260040160405180910390fd5b60008981526021602052604090206008015415610252576040516376a1368960e11b815260040160405180910390fd5b60018851111580610264575060208851115b156102825760405163502ef3af60e01b815260040160405180910390fd5b8751875160ff8216146102a85760405163d6e48e5d60e01b815260040160405180910390fd5b6000885167ffffffffffffffff8111156102c4576102c46113e6565b6040519080825280602002602001820160405280156102ed578160200160208202803683370190505b50905060005b8260ff168160ff1610156105215760ff8116156103cb5760008c81526022602052604081208c519091908d9060ff8516908110610332576103326116c1565b6020908102919091018101516001600160a01b031682528101919091526040016000205460ff161515806103ad57508a8160ff1681518110610376576103766116c1565b60200260200101516001600160a01b03168b60008151811061039a5761039a6116c1565b60200260200101516001600160a01b0316145b156103cb57604051632fa9e93b60e11b815260040160405180910390fd5b60006001600160a01b03168b8260ff16815181106103eb576103eb6116c1565b60200260200101516001600160a01b03160361041a57604051634ce187ad60e11b815260040160405180910390fd5b601260ff168a8260ff1681518110610434576104346116c1565b602002602001015160ff16111561045e57604051637d4ada4560e11b815260040160405180910390fd5b898160ff1681518110610473576104736116c1565b6020026020010151601261048791906116ed565b6104959060ff16600a6117f6565b828260ff16815181106104aa576104aa6116c1565b60200260200101818152505080600060220160008e815260200190815260200160002060008d8460ff16815181106104e4576104e46116c1565b6020908102919091018101516001600160a01b03168252810191909152604001600020805460ff191660ff929092169190911790556001016102f3565b50620f42408610610545576040516306aedbfd60e01b815260040160405180910390fd5b6305f5e100851061056957604051634fc2217d60e11b815260040160405180910390fd5b6402540be400841061058e576040516384b9a37f60e01b815260040160405180910390fd5b600061059984610cff565b60405163266c45bb60e11b81529091506001600160a01b03821690634cd88b76906105ca908c908c9060040161185a565b6020604051808303816000875af11580156105e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060d9190611888565b61062a5760405163276cd8b960e01b815260040160405180910390fd5b60006040518061018001604052808e815260200160648a61064b91906118aa565b815260200161065b60648b6118aa565b81526020016000815260200160008152602001888152602001878152602001836001600160a01b031681526020018d81526020018481526020018d5167ffffffffffffffff8111156106af576106af6113e6565b6040519080825280602002602001820160405280156106d8578160200160208202803683370190505b5081526020018d5167ffffffffffffffff8111156106f8576106f86113e6565b604051908082528060200260200182016040528015610721578160200160208202803683370190505b50905260008e81526021602090815260409182902083518155838201516001820155918301516002830155606083015160038301556080830151600483015560a0830151600583015560c0830151600683015560e08301516007830180546001600160a01b0319166001600160a01b03909216919091179055610100830151805193945084936107b792600885019201906112e3565b5061012082015180516107d4916009840191602090910190611348565b5061014082015180516107f191600a840191602090910190611348565b50610160820151805161080e91600b840191602090910190611348565b509050508c7f4c5d883e86afc82dc0f918cfc013e437aa458ec41475884857ba8daec50d24cb823360405161084492919061193d565b60405180910390a250505050505050505050505050565b33610864610a09565b6001600160a01b03161461088b576040516314e74a2560e21b815260040160405180910390fd5b60008181526021602052604090206108a290610d9c565b60405133815281907f86ce75679135e270f845c02bcb49ef6fb50464cb322dcc30096cccd13d2597df9060200160405180910390a250565b336108e3610a09565b6001600160a01b03161461090a576040516314e74a2560e21b815260040160405180910390fd5b60008281526021602052604090206109229082610e5d565b6040805182815233602082015283917f46eefbb271e4103912d3c227656de8afc0849f4c8cba4b2a1e38b660361e046391016101e6565b33610962610a09565b6001600160a01b031614610989576040516314e74a2560e21b815260040160405180910390fd5b602054600119016109ad57604051637ce54e2d60e11b815260040160405180910390fd5b6002602090815560008281526021909152604090206109cc9033610ed6565b60405133815281907f2e6c35653408399a9853c5e5f81b67018cba78568bfd76dd46f93c825cbfb95d9060200160405180910390a2506001602055565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1320546001600160a01b031690565b6003830154610a499062015180611a3e565b421015610a9d5760405162461bcd60e51b815260206004820152601f60248201527f57616974203120646179206265666f7265207374617274696e672072616d700060448201526064015b60405180910390fd5b610aaa6212750042611a3e565b811015610af25760405162461bcd60e51b8152602060048201526016602482015275496e73756666696369656e742072616d702074696d6560501b6044820152606401610a94565b8115801590610b035750620f424082105b610b4f5760405162461bcd60e51b815260206004820181905260248201527f667574757265415f206d757374206265203e203020616e64203c204d41585f416044820152606401610a94565b6000610b5a84610f88565b90506000610b696064856118aa565b905081811015610bca5781610b7f6002836118aa565b1015610bc55760405162461bcd60e51b8152602060048201526015602482015274199d5d1d5c995057c81a5cc81d1bdbc81cdb585b1b605a1b6044820152606401610a94565b610c1c565b610bd56002836118aa565b811115610c1c5760405162461bcd60e51b8152602060048201526015602482015274667574757265415f20697320746f6f206c6172676560581b6044820152606401610a94565b600185018290556002850181905542600386018190556004860184905560408051848152602081018490528082019290925260608201859052517fa2b71ec6df949300b59aab36b55e189697b750119dd349fcfa8c0f779e83c2549181900360800190a15050505050565b6305f5e100811115610cc65760405162461bcd60e51b81526020600482015260086024820152670e8dede40d0d2ced60c31b6044820152606401610a94565b6005820181905581546040518281527f29aee3d14d18e1b8ace81481838ab2996fee9446a44336847d1d5c7fdf2471b1906020016101e6565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b038116610d975760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b6044820152606401610a94565b919050565b42816004015411610def5760405162461bcd60e51b815260206004820152601760248201527f52616d7020697320616c72656164792073746f707065640000000000000000006044820152606401610a94565b6000610dfa82610f88565b60018301819055600283018190554260038401819055600484018190556040519192507f46e22fb3709ad289f62ce63d469248536dbc78d82b84a3d7e74ad606dc20193891610e5191848252602082015260400190565b60405180910390a15050565b6402540be400811115610e9d5760405162461bcd60e51b81526020600482015260086024820152670e8dede40d0d2ced60c31b6044820152606401610a94565b6006820181905581546040518281527f7b4e02f2e320870ba4f764edf60a5289a465018a3fe159f0d72ba33139b0a616906020016101e6565b600882015460005b81811015610f82576000846008018281548110610efd57610efd6116c1565b6000918252602082200154600b870180546001600160a01b0390921693509084908110610f2c57610f2c6116c1565b9060005260206000200154905080600014610f7857600086600b018481548110610f5857610f586116c1565b600091825260209091200155610f786001600160a01b0383168683611039565b5050600101610ede565b50505050565b600481015460028201546000919042821115611032576003840154600185015480831115610ff657610fba8285611a56565b610fc48342611a56565b610fce8386611a56565b610fd891906118aa565b610fe29190611a6d565b610fec9082611a3e565b9695505050505050565b6110008285611a56565b61100a8342611a56565b6110148584611a56565b61101e91906118aa565b6110289190611a6d565b610fec9082611a56565b9392505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b17905261108b908490611090565b505050565b60006110e5826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166111629092919063ffffffff16565b80519091501561108b57808060200190518101906111039190611888565b61108b5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610a94565b60606111718484600085611179565b949350505050565b6060824710156111da5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610a94565b6001600160a01b0385163b6112315760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610a94565b600080866001600160a01b0316858760405161124d9190611a8f565b60006040518083038185875af1925050503d806000811461128a576040519150601f19603f3d011682016040523d82523d6000602084013e61128f565b606091505b509150915061129f8282866112aa565b979650505050505050565b606083156112b9575081611032565b8251156112c95782518084602001fd5b8160405162461bcd60e51b8152600401610a949190611aab565b828054828255906000526020600020908101928215611338579160200282015b8281111561133857825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190611303565b50611344929150611383565b5090565b828054828255906000526020600020908101928215611338579160200282015b82811115611338578251825591602001919060010190611368565b5b808211156113445760008155600101611384565b6000806000606084860312156113ad57600080fd5b505081359360208301359350604090920135919050565b600080604083850312156113d757600080fd5b50508035926020909101359150565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611425576114256113e6565b604052919050565b600067ffffffffffffffff821115611447576114476113e6565b5060051b60200190565b6001600160a01b038116811461146657600080fd5b50565b600082601f83011261147a57600080fd5b8135602061148f61148a8361142d565b6113fc565b82815260059290921b840181019181810190868411156114ae57600080fd5b8286015b848110156114d25780356114c581611451565b83529183019183016114b2565b509695505050505050565b600082601f8301126114ee57600080fd5b813560206114fe61148a8361142d565b82815260059290921b8401810191818101908684111561151d57600080fd5b8286015b848110156114d257803560ff8116811461153b5760008081fd5b8352918301918301611521565b600082601f83011261155957600080fd5b813567ffffffffffffffff811115611573576115736113e6565b611586601f8201601f19166020016113fc565b81815284602083860101111561159b57600080fd5b816020850160208301376000918101602001919091529392505050565b8035610d9781611451565b60008060008060008060008060006101208a8c0312156115e257600080fd5b8935985060208a013567ffffffffffffffff8082111561160157600080fd5b61160d8d838e01611469565b995060408c013591508082111561162357600080fd5b61162f8d838e016114dd565b985060608c013591508082111561164557600080fd5b6116518d838e01611548565b975060808c013591508082111561166757600080fd5b506116748c828d01611548565b95505060a08a0135935060c08a0135925060e08a013591506116996101008b016115b8565b90509295985092959850929598565b6000602082840312156116ba57600080fd5b5035919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff841680821015611707576117076116d7565b90039392505050565b600181815b8085111561174b578160001904821115611731576117316116d7565b8085161561173e57918102915b93841c9390800290611715565b509250929050565b600082611762575060016117f0565b8161176f575060006117f0565b8160018114611785576002811461178f576117ab565b60019150506117f0565b60ff8411156117a0576117a06116d7565b50506001821b6117f0565b5060208310610133831016604e8410600b84101617156117ce575081810a6117f0565b6117d88383611710565b80600019048211156117ec576117ec6116d7565b0290505b92915050565b60006110328383611753565b60005b8381101561181d578181015183820152602001611805565b83811115610f825750506000910152565b60008151808452611846816020860160208601611802565b601f01601f19169290920160200192915050565b60408152600061186d604083018561182e565b828103602084015261187f818561182e565b95945050505050565b60006020828403121561189a57600080fd5b8151801515811461103257600080fd5b60008160001904831182151516156118c4576118c46116d7565b500290565b600081518084526020808501945080840160005b838110156119025781516001600160a01b0316875295820195908201906001016118dd565b509495945050505050565b600081518084526020808501945080840160005b8381101561190257815187529582019590820190600101611921565b60408152825160408201526020830151606082015260408301516080820152606083015160a0820152608083015160c082015260a083015160e0820152600060c0840151610100818185015260e086015191506101206119a7818601846001600160a01b03169052565b818701519250610180915061014082818701526119c86101c08701856118c9565b9350818801519150603f196101608188870301818901526119e9868561190d565b9550828a01519350818887030185890152611a04868561190d565b9550808a015194505080878603016101a0880152505050611a25828261190d565b9250505061103260208301846001600160a01b03169052565b60008219821115611a5157611a516116d7565b500190565b600082821015611a6857611a686116d7565b500390565b600082611a8a57634e487b7160e01b600052601260045260246000fd5b500490565b60008251611aa1818460208701611802565b9190910192915050565b602081526000611032602083018461182e56fea2646970667358221220d4bf8ead39756f5a21a105b79870e8f881aeddc315521646b13f09df11adde0364736f6c634300080f0033";

type SwapAdminFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SwapAdminFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SwapAdminFacet__factory extends ContractFactory {
  constructor(...args: SwapAdminFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SwapAdminFacet> {
    return super.deploy(overrides || {}) as Promise<SwapAdminFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SwapAdminFacet {
    return super.attach(address) as SwapAdminFacet;
  }
  override connect(signer: Signer): SwapAdminFacet__factory {
    return super.connect(signer) as SwapAdminFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SwapAdminFacetInterface {
    return new utils.Interface(_abi) as SwapAdminFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SwapAdminFacet {
    return new Contract(address, _abi, signerOrProvider) as SwapAdminFacet;
  }
}
