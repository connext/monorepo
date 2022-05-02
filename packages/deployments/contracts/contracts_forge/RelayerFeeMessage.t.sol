// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ForgeHelper.sol";

import "../contracts/interfaces/IConnextHandler.sol";
import "../contracts/nomad-xapps/contracts/relayer-fee-router/RelayerFeeRouter.sol";
import {Home} from "../contracts/nomad-core/contracts/Home.sol";

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract RelayerFeeMessageTest is ForgeHelper {
  // ============ Libraries ============
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using RelayerFeeMessage for bytes29;

  // ============ Utils ============
  function formatMessage(address _recipient, bytes32[] calldata _transferIds)
    internal
    pure
    returns (bytes memory message)
  {
    message = RelayerFeeMessage.formatClaimFees(_recipient, _transferIds);
  }

  function parseMessage(bytes memory _message) internal pure returns (address recipient, bytes32[] memory transferIds) {
    // parse recipient and transferIds from message
    bytes29 _msg = _message.ref(0).mustBeClaimFees();

    recipient = _msg.recipient();
    transferIds = _msg.transferIds();
  }

  // ============ Test set up ============

  function setUp() public {}

  // ============ format/parse ============
  // Should work
  function test_RelayerFeeMessage__formatMessage_parseMessage_works(address _recipient, bytes32[] calldata _transferIds)
    public
  {
    vm.assume(_recipient != address(0) && _transferIds.length != 0);
    bytes memory message = formatMessage(_recipient, _transferIds);

    (address recipient, bytes32[] memory transferIds) = parseMessage(message);
    assertEq(recipient, _recipient);
    assertEq(transferIds.length, _transferIds.length);

    for (uint256 i = 0; i < transferIds.length; i++) {
      assertEq(transferIds[i], _transferIds[i]);
    }
  }
}
