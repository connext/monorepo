// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {IXReceiver} from "../connext/interfaces/IXReceiver.sol";
import {IConnext} from "../connext/interfaces/IConnext.sol";
import {TokenId} from "../connext/libraries/TokenId.sol";
import {AssetLogic} from "../connext/libraries/AssetLogic.sol";

contract ConnextPoolLiquidity is IXReceiver {
  // ============ Libraries ============

  using SafeERC20 for IERC20;

  // ============ Events ============

  /**
   * @notice Emitted when liquidity is added to a pool
   * @param transferId The transfer id
   * @param recipient The recipient of the lp tokens
   * @param lp The address of the lp token
   * @param received The amount of lp tokens received
   * @param deposited The address of token deposited
   * @param depositedAmount The amount of tokens deposited
   */
  event CrossLiquidityAdded(
    bytes32 indexed transferId,
    address indexed recipient,
    address indexed lp,
    uint256 received,
    address deposited,
    uint256 depositedAmount
  );

  // ============ Constants ============

  // ============ Storage ============
  /**
   * @notice The connext address on this domain
   */
  IConnext public connext;

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

  /**
   * @notice Called by the connext bridge to add liquidity to a pool
   * @dev Will add single-sided liquidity in the asset associated with the transfer.
   * @param _transferId The transfer id
   * @param _amount The amount of tokens to add to LP pool
   * @param _asset The asset to add to the LP pool
   * @param _callData The encoded data for the transfer, should be the encoded recipient
   * of LP tokens on this chain.
   */
  function xReceive(
    bytes32 _transferId,
    uint256 _amount,
    address _asset,
    address, //_originSender,
    uint32, // _origin,
    bytes memory _callData
  ) external override onlyConnext returns (bytes memory ret) {
    // Sanity check: recipient in calldata is nonzero
    address recipient = abi.decode(_callData, (address));
    require(recipient != address(0), "!recipient");

    // Sanity check: _amount is nonzero
    require(_amount > 0, "!amount");

    // Sanity check: _asset is nonzero
    require(_asset != address(0), "!asset");

    // Get the canonical identifier for the pool
    bytes32 key = getKey(_asset);

    // Get lp token associated with the canonical key
    address lp = connext.getSwapLPToken(key);

    // Add liquidity and distribute LP tokens
    uint256 received = addLiquidityAndDistributeLP(key, _amount, _asset, lp, recipient);

    // Emit event
    emit CrossLiquidityAdded(_transferId, recipient, lp, received, _asset, _amount);
  }

  // ============ Private Functions ============

  /**
   * @notice Generates the amounts[] array for the connext.addLiquidity call
   * @dev Inserts _amount at the index for _asset in the pools stored at key
   */
  function addLiquidityAndDistributeLP(
    bytes32 _key,
    uint256 _amount,
    address _asset,
    address _lp,
    address _recipient
  ) private returns (uint256) {
    // Get starting lp token balance
    uint256 start = IERC20(_lp).balanceOf(address(this));

    // Generate amounts input
    uint256[] memory amounts = generateAmounts(_key, _amount, _asset);

    // Calculate the minimum to add
    uint256 min = connext.calculateSwapTokenAmount(_key, amounts, true);

    // Approve amount
    IERC20(_asset).safeApprove(address(connext), _amount);

    // Call connext.addLiquidity
    connext.addSwapLiquidity(_key, amounts, min, block.timestamp + 1);

    // Reset approve amount to zero
    IERC20(_asset).safeApprove(address(connext), 0);

    // Send LP tokens to recipient in `_callData`
    uint256 received = IERC20(_lp).balanceOf(address(this)) - start;
    IERC20(_lp).safeTransfer(_recipient, received);
    return received;
  }

  /**
   * @notice Generates the amounts[] array for the connext.addLiquidity call
   * @dev Inserts _amount at the index for _asset in the pools stored at key
   */
  function generateAmounts(bytes32 key, uint256 _amount, address _asset) private view returns (uint256[] memory) {
    // Generate the amount array
    uint256 amountsLen = connext.getSwapStorage(key).pooledTokens.length;
    // TODO: send directly to recipient?
    require(amountsLen > 0, "!pool");
    uint256[] memory amounts = new uint256[](amountsLen);

    // Insert _amount at the index for _asset
    amounts[connext.getSwapTokenIndex(key, _asset)] = _amount;
    return amounts;
  }

  /**
   * @notice Get the hash of the canonical identifier for the asset
   * @param _asset The asset to get the canonical identifier for
   */
  function getKey(address _asset) private view returns (bytes32) {
    TokenId memory id = connext.getTokenId(_asset);
    return AssetLogic.calculateCanonicalHash(id.id, id.domain);
  }
}
