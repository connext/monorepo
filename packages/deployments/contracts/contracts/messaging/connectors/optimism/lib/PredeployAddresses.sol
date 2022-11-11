// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
 * @title PredeployAddresses
 *
 * @dev modified from: https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol
 */
library PredeployAddresses {
  address internal constant L2_TO_L1_MESSAGE_PASSER = 0x4200000000000000000000000000000000000000;
  address internal constant L1_MESSAGE_SENDER = 0x4200000000000000000000000000000000000001;
  address internal constant DEPLOYER_WHITELIST = 0x4200000000000000000000000000000000000002;
  address payable internal constant OVM_ETH = payable(0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000);
  address internal constant L2_CROSS_DOMAIN_MESSENGER = 0x4200000000000000000000000000000000000007;
  address internal constant LIB_ADDRESS_MANAGER = 0x4200000000000000000000000000000000000008;
  address internal constant PROXY_EOA = 0x4200000000000000000000000000000000000009;
  address internal constant L2_STANDARD_BRIDGE = 0x4200000000000000000000000000000000000010;
  address internal constant SEQUENCER_FEE_WALLET = 0x4200000000000000000000000000000000000011;
  address internal constant L2_STANDARD_TOKEN_FACTORY = 0x4200000000000000000000000000000000000012;
  address internal constant L1_BLOCK_NUMBER = 0x4200000000000000000000000000000000000013;
}
