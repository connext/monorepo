//todo: remove me

export default [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_multisend",
                "type": "address"
            },
            {
                "internalType": "uint24",
                "name": "_chainId",
                "type": "uint24"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "router",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "assetId",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "LiquidityAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "router",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "assetId",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "LiquidityRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "router",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sendingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "callData",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "transactionId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint24",
                        "name": "sendingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint24",
                        "name": "receivingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    }
                ],
                "indexed": false,
                "internalType": "struct ITransactionManager.TransactionData",
                "name": "txData",
                "type": "tuple"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            }
        ],
        "name": "TransactionCancelled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "router",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sendingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "callData",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "transactionId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint24",
                        "name": "sendingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint24",
                        "name": "receivingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    }
                ],
                "indexed": false,
                "internalType": "struct ITransactionManager.TransactionData",
                "name": "txData",
                "type": "tuple"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "relayerFee",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            }
        ],
        "name": "TransactionFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "router",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sendingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "callData",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "transactionId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint24",
                        "name": "sendingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint24",
                        "name": "receivingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    }
                ],
                "indexed": false,
                "internalType": "struct ITransactionManager.TransactionData",
                "name": "txData",
                "type": "tuple"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "caller",
                "type": "address"
            }
        ],
        "name": "TransactionPrepared",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "MIN_TIMEOUT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "assetId",
                "type": "address"
            }
        ],
        "name": "addLiquidity",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "router",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sendingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "callData",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "transactionId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint24",
                        "name": "sendingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint24",
                        "name": "receivingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ITransactionManager.TransactionData",
                "name": "txData",
                "type": "tuple"
            },
            {
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
            }
        ],
        "name": "cancel",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "router",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sendingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "callData",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "transactionId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint24",
                        "name": "sendingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint24",
                        "name": "receivingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ITransactionManager.TransactionData",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "chainId",
        "outputs": [
            {
                "internalType": "uint24",
                "name": "",
                "type": "uint24"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "router",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sendingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "callData",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "transactionId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint24",
                        "name": "sendingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint24",
                        "name": "receivingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ITransactionManager.TransactionData",
                "name": "txData",
                "type": "tuple"
            },
            {
                "internalType": "uint256",
                "name": "relayerFee",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
            }
        ],
        "name": "fulfill",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "router",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sendingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "callData",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "transactionId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint24",
                        "name": "sendingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint24",
                        "name": "receivingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ITransactionManager.TransactionData",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getActiveTransactionsByUser",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "digest",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct VariableTransactionData[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "multisend",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "router",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sendingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "callData",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "transactionId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint24",
                        "name": "sendingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint24",
                        "name": "receivingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ITransactionManager.TransactionData",
                "name": "txData",
                "type": "tuple"
            }
        ],
        "name": "prepare",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "router",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "sendingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAssetId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "receivingAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "callData",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "transactionId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint24",
                        "name": "sendingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint24",
                        "name": "receivingChainId",
                        "type": "uint24"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expiry",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockNumber",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ITransactionManager.TransactionData",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "assetId",
                "type": "address"
            },
            {
                "internalType": "address payable",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "removeLiquidity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "routerBalances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]