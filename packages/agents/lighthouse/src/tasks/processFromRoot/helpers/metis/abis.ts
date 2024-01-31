export const L2CrossDomainMessengerAbi = [
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
        internalType: "bytes32",
        name: "msgHash",
        type: "bytes32",
      },
    ],
    name: "FailedRelayedMessage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_xDomainCalldataHash",
        type: "bytes32",
      },
    ],
    name: "MessageAllowed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "_xDomainCalldataHash",
        type: "bytes32",
      },
    ],
    name: "MessageBlocked",
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
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "msgHash",
        type: "bytes32",
      },
    ],
    name: "RelayedMessage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "messageNonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
    ],
    name: "SentMessage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_xDomainCalldataHash",
        type: "bytes32",
      },
    ],
    name: "allowMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_xDomainCalldataHash",
        type: "bytes32",
      },
    ],
    name: "blockMessage",
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
    name: "blockedMessages",
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
        name: "_libAddressManager",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "libAddressManager",
    outputs: [
      {
        internalType: "contract Lib_AddressManager",
        name: "",
        type: "address",
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
        name: "_target",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_messageNonce",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "stateRoot",
            type: "bytes32",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "batchIndex",
                type: "uint256",
              },
              {
                internalType: "bytes32",
                name: "batchRoot",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "batchSize",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "prevTotalElements",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "extraData",
                type: "bytes",
              },
            ],
            internalType: "struct Lib_OVMCodec.ChainBatchHeader",
            name: "stateRootBatchHeader",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "index",
                type: "uint256",
              },
              {
                internalType: "bytes32[]",
                name: "siblings",
                type: "bytes32[]",
              },
            ],
            internalType: "struct Lib_OVMCodec.ChainInclusionProof",
            name: "stateRootProof",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "stateTrieWitness",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "storageTrieWitness",
            type: "bytes",
          },
        ],
        internalType: "struct IL1CrossDomainMessenger.L2MessageInclusionProof",
        name: "_proof",
        type: "tuple",
      },
    ],
    name: "relayMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_messageNonce",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "stateRoot",
            type: "bytes32",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "batchIndex",
                type: "uint256",
              },
              {
                internalType: "bytes32",
                name: "batchRoot",
                type: "bytes32",
              },
              {
                internalType: "uint256",
                name: "batchSize",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "prevTotalElements",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "extraData",
                type: "bytes",
              },
            ],
            internalType: "struct Lib_OVMCodec.ChainBatchHeader",
            name: "stateRootBatchHeader",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "index",
                type: "uint256",
              },
              {
                internalType: "bytes32[]",
                name: "siblings",
                type: "bytes32[]",
              },
            ],
            internalType: "struct Lib_OVMCodec.ChainInclusionProof",
            name: "stateRootProof",
            type: "tuple",
          },
          {
            internalType: "bytes",
            name: "stateTrieWitness",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "storageTrieWitness",
            type: "bytes",
          },
        ],
        internalType: "struct IL1CrossDomainMessenger.L2MessageInclusionProof",
        name: "_proof",
        type: "tuple",
      },
    ],
    name: "relayMessageViaChainId",
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
    name: "relayedMessages",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_queueIndex",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_oldGasLimit",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_newGasLimit",
        type: "uint32",
      },
    ],
    name: "replayMessage",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_queueIndex",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_oldGasLimit",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_newGasLimit",
        type: "uint32",
      },
    ],
    name: "replayMessageViaChainId",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "resolve",
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
        name: "_target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "uint32",
        name: "_gasLimit",
        type: "uint32",
      },
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "uint32",
        name: "_gasLimit",
        type: "uint32",
      },
    ],
    name: "sendMessageViaChainId",
    outputs: [],
    stateMutability: "payable",
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
    name: "successfulMessages",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "xDomainMessageSender",
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
];

export const L1CrossDomainMessengerAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_libAddressManager",
        type: "address",
      },
      {
        internalType: "string",
        name: "_implementationName",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
];

export const StateCommitmentChainAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_libAddressManager",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_fraudProofWindow",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_sequencerPublishWindow",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_batchIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "_batchRoot",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_batchSize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_prevTotalElements",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "StateBatchAppended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_batchIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "_batchRoot",
        type: "bytes32",
      },
    ],
    name: "StateBatchDeleted",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_CHAINID",
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
    name: "FRAUD_PROOF_WINDOW",
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
    name: "SEQUENCER_PUBLISH_WINDOW",
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
        internalType: "bytes32[]",
        name: "_batch",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "_shouldStartAtElement",
        type: "uint256",
      },
    ],
    name: "appendStateBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "_batch",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "_shouldStartAtElement",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "proposer",
        type: "string",
      },
    ],
    name: "appendStateBatchByChainId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "batches",
    outputs: [
      {
        internalType: "contract IChainStorageContainer",
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
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
        ],
        internalType: "struct Lib_OVMCodec.ChainBatchHeader",
        name: "_batchHeader",
        type: "tuple",
      },
    ],
    name: "deleteStateBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
        ],
        internalType: "struct Lib_OVMCodec.ChainBatchHeader",
        name: "_batchHeader",
        type: "tuple",
      },
    ],
    name: "deleteStateBatchByChainId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastSequencerTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "_lastSequencerTimestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
    ],
    name: "getLastSequencerTimestampByChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "_lastSequencerTimestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalBatches",
    outputs: [
      {
        internalType: "uint256",
        name: "_totalBatches",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
    ],
    name: "getTotalBatchesByChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "_totalBatches",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalElements",
    outputs: [
      {
        internalType: "uint256",
        name: "_totalElements",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
    ],
    name: "getTotalElementsByChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "_totalElements",
        type: "uint256",
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
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
        ],
        internalType: "struct Lib_OVMCodec.ChainBatchHeader",
        name: "_batchHeader",
        type: "tuple",
      },
    ],
    name: "insideFraudProofWindow",
    outputs: [
      {
        internalType: "bool",
        name: "_inside",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
        ],
        internalType: "struct Lib_OVMCodec.ChainBatchHeader",
        name: "_batchHeader",
        type: "tuple",
      },
    ],
    name: "insideFraudProofWindowByChainId",
    outputs: [
      {
        internalType: "bool",
        name: "_inside",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "libAddressManager",
    outputs: [
      {
        internalType: "contract Lib_AddressManager",
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
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "resolve",
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
        internalType: "uint256",
        name: "window",
        type: "uint256",
      },
    ],
    name: "setFraudProofWindow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_element",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
        ],
        internalType: "struct Lib_OVMCodec.ChainBatchHeader",
        name: "_batchHeader",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "bytes32[]",
            name: "siblings",
            type: "bytes32[]",
          },
        ],
        internalType: "struct Lib_OVMCodec.ChainInclusionProof",
        name: "_proof",
        type: "tuple",
      },
    ],
    name: "verifyStateCommitment",
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
        internalType: "uint256",
        name: "_chainId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_element",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "batchIndex",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "batchRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "batchSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prevTotalElements",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
        ],
        internalType: "struct Lib_OVMCodec.ChainBatchHeader",
        name: "_batchHeader",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "bytes32[]",
            name: "siblings",
            type: "bytes32[]",
          },
        ],
        internalType: "struct Lib_OVMCodec.ChainInclusionProof",
        name: "_proof",
        type: "tuple",
      },
    ],
    name: "verifyStateCommitmentByChainId",
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
];
