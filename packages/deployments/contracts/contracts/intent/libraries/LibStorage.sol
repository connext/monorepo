// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

// ============= Enum =============

/// TODO Don't define as enum, use OZ contracts fool
enum Role {
  None,
  RouterAdmin,
  AssetAdmin, // Also strategy
  Watcher,
  Admin,
  Sequencer,
  Router,
  Owner
}

// TODO Transfer Status

// Fee Config

// struct FeeConfig {
//   uint8 routerFeeRate;
//   uint8 protocolFeeRate;
//   // TODO do we need a sweep address for protocol?
//   uint8 externalFeeRate;
//   address externalSweepAddress;
// }


// Asset mappings TODO

// tickerHash => (path => strategy) settlementStrategies;
mapping(bytes32 => mapping(bytes => address)) settlementStrategies;
// tickerHash => FeeConfig
mapping(bytes32 => FeeConfig) feeConfig;

// Balances

// _assetId => _amount
mapping(address => uint256) unclaimedAssets;
// _assetId => (_router => _amount)
mapping(address => mapping(address => uint256)) routerBalances;
// _assetId => (_router => _amount)
mapping(address => mapping(address => uint256)) routerCredits;

// TransferInfo

struct TransferInfo {
  uint32 originDomain;
  uint32 destinationDomain;
  address to;
  bytes callData;
  address originSender;
  uint256 amount;
  uint256 nonce;
  bytes32 tickerHash;
  uint8 protocolVersion;
}

