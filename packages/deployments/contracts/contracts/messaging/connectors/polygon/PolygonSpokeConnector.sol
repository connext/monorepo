// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {FxBaseChildTunnel} from "./tunnel/FxBaseChildTunnel.sol";

import {SpokeConnector} from "../SpokeConnector.sol";

// address constant MUMBAI_FX_CHILD = 0xCf73231F28B7331BBe3124B907840A94851f9f11;
// address constant GOERLI_CHECKPOINT_MANAGER = 0x2890bA17EfE978480615e330ecB65333b880928e;
// address constant GOERLI_FX_ROOT = 0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA;

// address constant MAINNET_FX_CHILD = 0x8397259c983751DAf40400790063935a11afa28a;
// address constant MAINNET_CHECKPOINT_MANAGER = 0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287;
// address constant MAINNET_FX_ROOT = 0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2;

contract PolygonSpokeConnector is SpokeConnector, FxBaseChildTunnel {
  // ============ Constructor ============
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager
  )
    SpokeConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    )
    FxBaseChildTunnel(_amb)
  {}

  // ============ Private fns ============

  function _verifySender(address _expected) internal pure override returns (bool) {
    // NOTE: Always return false here because we cannot verify sender except in
    // _processMessageFromRoot, where it is exposed in plaintext
    return false;
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should not include specialized calldata
    require(_encodedData.length == 0, "!data length");
    _sendMessageToRoot(_data);
  }

  function _processMessageFromRoot(
    uint256, /* stateId */
    address sender,
    bytes memory data
  ) internal override validateSender(sender) {
    // NOTE: Don't need to check that sender is mirrorConnector as this is checked in validateSender()
    // get the data (should be the aggregate root)
    require(data.length == 32, "!length");
    // update the aggregate root on the domain
    receiveAggregateRoot(bytes32(data));

    emit MessageProcessed(data, msg.sender);
  }

  // DO NOT override _processMessage, should revert from `Connector` class. All messages must use the
  // `processMessageFromRoot` flow.

  function _setMirrorConnector(address _mirrorConnector) internal override {
    // NOTE: FxBaseChildTunnel has the following code in their `setFxRootTunnel`:
    // ```
    // require(setFxRootTunnel == address(0x0), "FxBaseChildTunnel: ROOT_TUNNEL_ALREADY_SET");
    // ```
    // Which means this function will revert if updating the `mirrorConnector`. In that case, in
    // changes the spoke connector should also be redeployed
    super._setMirrorConnector(_mirrorConnector);

    setFxRootTunnel(_mirrorConnector);
  }
}
