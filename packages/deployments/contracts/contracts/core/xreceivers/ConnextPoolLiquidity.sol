// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {IXReceiver} from "../connext/interfaces/IXReceiver.sol";
import {IConnext} from "../connext/interfaces/IConnext.sol";

contract ConnextPoolLiquidity is IXReceiver {
  // ============ Libraries ============

  using SafeERC20 for IERC20;

  // ============ Events ============

  event CrossLiquidityAdded(bytes32 transferId, address lp, uint256 received, uint256 deposited, address recipient);

  // ============ Constants ============

  // ============ Storage ============
  /**
   * @notice The connext address on this domain
   */
  IConnext public connext;

  /**
   * @notice Get the LP token
   */

  // ============= Modifiers ==============

  /**
   * @notice Ensure caller is only the designated CONNEXT bridge address.
   */
  modifier onlyConnext() {
    require(msg.sender == address(connext), "!connext");
    _;
  }

  // ============ Constructor ============
  constructor(address _connext) {
    connext = IConnext(_connext);
  }

  // ============ External Functions ============

  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address, //_originSender,
    uint32, // _origin,
    bytes memory _callData
  ) external override onlyConnext returns (bytes memory) {
    // Sanity check: recipient in calldata is nonzero
    address recipient = abi.decode(_callData, (address));
    require(recipient != address(0), "!recipient");

    // 1. Calculate min amount to mint
    bytes32 key = bytes32(0); // the hash of canonical token data
    uint256[] memory amounts = new uint256[](2); // TODO: best way to derive from pool tokens
    amounts[0] = _amount; // [local, adopted]
    amounts[1] = 0;

    // 2. Get the LP token
    address lp = connext.getSwapLPToken(key);
    uint256 start = IERC20(lp).balanceOf(address(this));

    // 3. Approve the connext contract to spend the deposited token
    IERC20(_asset).safeApprove(address(connext), _amount);

    // 4. Call `connext.addLiquidity`
    connext.addSwapLiquidity(key, amounts, connext.calculateSwapTokenAmount(key, amounts, true), block.timestamp + 1);

    // 5. Send LP tokens to recipient in `_callData`
    uint256 received = IERC20(lp).balanceOf(address(this)) - start;
    IERC20(lp).safeTransfer(recipient, received);

    // 6. Emit event
    emit CrossLiquidityAdded(_transferId, lp, received, _amount, recipient);
  }

  // ============ Public Functions ============

  // ============ Private Functions ============
}
