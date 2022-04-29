// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import {ISponsorVault} from "./interfaces/ISponsorVault.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20, Address} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface ITokenExchange {
  function getInGivenExactOut(address token, uint256 exactOut) external returns (uint256);
  function swapExactOut(address token, uint256 exactOut, address recipient) external payable returns (uint256);
}

interface IGasTokenOracle {
  function getRate(uint32 originDomain) external view returns (uint256 num, uint256 den);
}

/**
 * @title SponsorVault
 * @author Connext Labs
 * @notice Contains logic for sponsoring liquidity and relayer fees
 */
contract SponsorVault is ISponsorVault, Ownable{
  // ============ Libraries ============
  using SafeERC20 for IERC20;

  // ============ Struct ============
  struct Rate {
    uint256 num;
    uint256 den;
  }

  // ============ Private storage ============

  // ============ Public storage ============

  /**
   * @notice The address of connext
   */
  address public connext;

  /**
   * @notice The origin domain to this domain gas token rates
   * @dev Used when no oracle is available
   */
  mapping(uint32 => Rate) public rates;

  /**
   * @notice The maximum amount of relayer fee to sponsor
   */
  uint256 public relayerFeeCap;

  /**
   * @notice The origin domain to this domain gas token oracle
   * @dev Used to calculate sponsored relayer fee
   */
  address public gasTokenOracle;

  /**
   * @notice The this domain gas token to token exchange
   * @dev Used to calculate sponsored relayer fee
   */
  mapping(address => address payable) public tokenExchanges;

  // ============ Errors ============

  error SponsorVault__setConnext_invalidConnext();
  error SponsorVault__setRate_invalidOriginDomain();
  error SponsorVault__setGasTokenOracle_invalidOriginDomain();
  error SponsorVault__setTokenExchange_invalidAdopted();
  error SponsorVault__onlyConnext();

  // ============ Events ============

  /**
   * @notice Emitted when a new connext is set
   */
  event ConnextUpdated(address connext, address caller);

  /**
   * @notice Emitted when a new rate is set
   */
  event RateUpdated(uint32 originDomain, Rate rate, address caller);

  /**
   * @notice Emitted when a new relayerFeeCap is set
   */
  event RelayerFeeCapUpdated(uint256 relayerFeeCap, address caller);

  /**
   * @notice Emitted when a new gas token oracle is set
   */
  event GasTokenOracleUpdated(address oracle, address caller);

  /**
   * @notice Emitted when a new token exchange is set
   */
  event TokenExchangeUpdated(address token, address tokenExchange, address caller);

  // ============ Modifiers ============

  modifier onlyConnext() {
    if (msg.sender != connext) revert SponsorVault__onlyConnext();
    _;
  }

  // ============ Constructor ============

  constructor(address _connext) Ownable() {
    _setConnext(_connext);
  }

  // ============ Owner Functions ============

  function setConnext(address _connext) external onlyOwner {
    _setConnext(_connext);
  }

  function setRate(uint32 _originDomain, Rate calldata _rate) external onlyOwner {
    if (_originDomain == 0) revert SponsorVault__setRate_invalidOriginDomain();

    rates[_originDomain] = _rate;

    emit RateUpdated(_originDomain, _rate, msg.sender);
  }

  function setRelayerFeeCap(uint256 _relayerFeeCap) external onlyOwner {
    relayerFeeCap = _relayerFeeCap;

    emit RelayerFeeCapUpdated(_relayerFeeCap, msg.sender);
  }

  function setGasTokenOracle(address _gasTokenOracle) external onlyOwner {
    gasTokenOracle = _gasTokenOracle;

    emit GasTokenOracleUpdated(_gasTokenOracle, msg.sender);
  }

  function setTokenExchange(address _token, address payable _tokenExchange) external onlyOwner {
    if (_token == address(0)) revert SponsorVault__setTokenExchange_invalidAdopted();
    tokenExchanges[_token] = _tokenExchange;

    emit TokenExchangeUpdated(_token, _tokenExchange, msg.sender);
  }

  // ============ External functions ============

  receive() external payable {}

  function reimburseLiquidityFees(address _token, uint256 _amount) external override onlyConnext returns (uint256) {
    // do not sponsor liquidity fee when there is no token exchange nor liquidity for the diven token
    if (tokenExchanges[_token] == address(0) && IERC20(_token).balanceOf(msg.sender) < _amount) return 0;

    if (tokenExchanges[_token] != address(0)) {
      ITokenExchange tokenExchange = ITokenExchange(tokenExchanges[_token]);
      uint256 amountIn =tokenExchange.getInGivenExactOut(_token, _amount);

      if (address(this).balance < amountIn) return 0;

      tokenExchange.swapExactOut{value: amountIn}(_token, _amount, msg.sender);
    }

    if (IERC20(_token).balanceOf(msg.sender) >= _amount) {
      IERC20(_token).safeTransfer(msg.sender, _amount);
    }

    return _amount;
  }

  function reimburseRelayerFees(uint32 _originDomain, address payable _to, uint256 _originRelayerFee) external override {
    uint256 relayerFee;
    if (gasTokenOracle == address(0)) {
      (uint256 num, uint256 den) = IGasTokenOracle(gasTokenOracle).getRate(_originDomain);
      relayerFee = _originRelayerFee * den / num;
    } else if (rates[_originDomain].den != 0) {
      relayerFee = _originRelayerFee * rates[_originDomain].den / rates[_originDomain].num;
    }

    relayerFee = relayerFee > relayerFeeCap ? relayerFeeCap : relayerFee;

    // TODO - what if 0 < balance < relayerFee ?
    if (relayerFee > 0 && address(this).balance >= relayerFee) {
        Address.sendValue(_to, relayerFee);
    }
  }

  // ============ Internal functions ============

  function _setConnext(address _connext) internal {
    if (_connext == address(0)) revert SponsorVault__setConnext_invalidConnext();

    connext = _connext;

    emit ConnextUpdated(_connext, msg.sender);
  }

}
