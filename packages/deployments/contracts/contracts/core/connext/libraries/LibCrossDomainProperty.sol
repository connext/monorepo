// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {TypedMemView} from "../../../nomad-core/libs/TypedMemView.sol";

library LibCrossDomainProperty {
  // ============ Libraries ============

  using TypedMemView for bytes29;
  using TypedMemView for bytes;

  // ============ Constants ============

  // 32 bytes amount + 4 bytes domain + 20 bytes address = 56 bytes;
  uint256 private constant PROPERTIES_LENGTH = 56;

  // ============ Internal Functions ============

  /**
   * @notice
   * @param
   * @param
   * @param
   * @param
   * @return
   */
  function formatCalldataWithProperties(
    uint256 _amount,
    uint32 _originDomain,
    address _originSender,
    bytes memory callData
  ) internal returns (bytes memory) {
    // Convert data to bytes
    bytes memory properties = abi.encodePacked(_amount, _originDomain, _originSender);
    return bytes.concat(callData, properties);
  }

  function amount(bytes memory data) internal returns (uint256) {
    // create view
    bytes29 typed = data.ref(0);
    // The data will be packed with the properties appended to the data
    uint256 dataLen = typed.len() - PROPERTIES_LENGTH;
    // before the domain = calldata
    return typed.indexUint(dataLen, 32);
  }

  function origin(bytes memory data) internal returns (uint32) {
    // create view
    bytes29 typed = data.ref(0);
    // The data will be packed with the properties appended to the data
    uint256 dataLen = typed.len() - PROPERTIES_LENGTH;
    // before the domain = calldata + amount
    return uint32(typed.indexUint(dataLen + 32, 4));
  }

  function originSender(bytes memory data) internal returns (address) {
    // create view
    bytes29 typed = data.ref(0);
    // The data will be packed with the properties appended to the data
    uint256 dataLen = typed.len() - PROPERTIES_LENGTH;
    // before the domain = calldata + amount + domain
    return typed.indexAddress(dataLen + 36);
  }
}
