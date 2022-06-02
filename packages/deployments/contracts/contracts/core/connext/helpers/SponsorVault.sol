// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20, Address} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {ISponsorVault} from "../interfaces/ISponsorVault.sol";
import {ITokenExchange} from "../interfaces/ITokenExchange.sol";
import {IGasTokenOracle} from "../interfaces/IGasTokenOracle.sol";

/**
 * @title SponsorVault
 * @author Connext Labs
 * @notice Contains logic for sponsoring liquidity and relayer fees
 */
contract SponsorVault is ISponsorVault, Ownable {
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
   * @notice The origin domain to this domain native token rates
   * @dev Used when no oracle is available
   */
  mapping(uint32 => Rate) public rates;

  /**
   * @notice The maximum amount this domain native token to be sponsored for relayer fee
   */
  uint256 public relayerFeeCap;

  /**
   * @notice The origin domain to this domain native token oracle
   * @dev Used to calculate sponsored relayer fee
   */
  IGasTokenOracle public gasTokenOracle;

  /**
   * @notice The this domain native token to token exchange
   * @dev Used to exchange this domain native token to the token used to pay liquidity fees
   */
  mapping(address => ITokenExchange) public tokenExchanges;

  // ============ Errors ============

  error SponsorVault__setConnext_invalidConnext();
  error SponsorVault__setRate_invalidOriginDomain();
  error SponsorVault__setGasTokenOracle_invalidOriginDomain();
  error SponsorVault__setTokenExchange_invalidAdopted();
  error SponsorVault__onlyConnext();
  error SponsorVault__withdraw_invalidAmount();

  // ============ Events ============

  /**
   * @notice Emitted when a new connext is set
   */
  event ConnextUpdated(address oldConnext, address newConnext, address caller);

  /**
   * @notice Emitted when a new rate is set
   */
  event RateUpdated(uint32 originDomain, Rate oldRate, Rate newRate, address caller);

  /**
   * @notice Emitted when a new relayerFeeCap is set
   */
  event RelayerFeeCapUpdated(uint256 oldRelayerFeeCap, uint256 newRelayerFeeCap, address caller);

  /**
   * @notice Emitted when a new native token oracle is set
   */
  event GasTokenOracleUpdated(address oldOracle, address newOracle, address caller);

  /**
   * @notice Emitted when a new token exchange is set
   */
  event TokenExchangeUpdated(address token, address oldTokenExchange, address newTokenExchange, address caller);

  /**
   * @notice Emitted when a liquidity fee is reimbursed
   */
  event ReimburseLiquidityFees(address token, uint256 amount, address receiver);

  /**
   * @notice Emitted when a relayer fee is reimbursed
   */
  event ReimburseRelayerFees(uint256 amount, address receiver);

  /**
   * @notice Emitted when liquidity is added
   */
  event Deposit(address token, uint256 amount, address caller);

  /**
   * @notice Emitted when liquidity is removed
   */
  event Withdraw(address token, address receiver, uint256 amount, address caller);

  // ============ Modifiers ============

  /**
   * @notice Restricts the caller to connext
   */
  modifier onlyConnext() {
    if (msg.sender != connext) revert SponsorVault__onlyConnext();
    _;
  }

  // ============ Constructor ============

  constructor(address _connext) Ownable() {
    _setConnext(_connext);
  }

  // ============ Owner Functions ============

  /**
   * @notice Sets the Connext.
   * @dev Connext and sponsor vault store references to each other
   * @param _connext The address of the Connext implementation
   */
  function setConnext(address _connext) external onlyOwner {
    _setConnext(_connext);
  }

  /**
   * @notice Sets default origin domain native token to this domain native token rate.
   * @param _originDomain The origin domain
   * @param _rate The default rate
   */
  function setRate(uint32 _originDomain, Rate calldata _rate) external onlyOwner {
    if (_originDomain == 0) revert SponsorVault__setRate_invalidOriginDomain();

    emit RateUpdated(_originDomain, rates[_originDomain], _rate, msg.sender);

    rates[_originDomain] = _rate;
  }

  /**
   * @notice Sets the maximum sponsored relayer fee amount.
   * @param _relayerFeeCap The new relayerFeeCap
   */
  function setRelayerFeeCap(uint256 _relayerFeeCap) external onlyOwner {
    emit RelayerFeeCapUpdated(relayerFeeCap, _relayerFeeCap, msg.sender);
    relayerFeeCap = _relayerFeeCap;
  }

  /**
   * @notice Sets of an oracle that provides origin domain native token to this domain native token rates.
   * @param _gasTokenOracle The oracle address
   */
  function setGasTokenOracle(address _gasTokenOracle) external onlyOwner {
    emit GasTokenOracleUpdated(address(gasTokenOracle), _gasTokenOracle, msg.sender);
    gasTokenOracle = IGasTokenOracle(_gasTokenOracle);
  }

  /**
   * @notice Sets the address of an exchange used for swapping this domain native token for a given token.
   * @param _token The address of the token
   * @param _tokenExchange The oracle of the exchange
   */
  function setTokenExchange(address _token, address payable _tokenExchange) external onlyOwner {
    if (_token == address(0)) revert SponsorVault__setTokenExchange_invalidAdopted();

    emit TokenExchangeUpdated(_token, address(tokenExchanges[_token]), _tokenExchange, msg.sender);
    tokenExchanges[_token] = ITokenExchange(_tokenExchange);
  }

  // ============ External functions ============

  /**
   * @notice Performs liquidity fee reimbursement.
   * @dev Uses the token exchange or liquidity deposited in this contract.
   *      The `_receiver` address is only used for emitting in the event.
   * @param _token The address of the token
   * @param _liquidityFee The liquidity fee amount
   * @param _receiver The address of the receiver
   * @return Sponsored liquidity fee amount
   */
  function reimburseLiquidityFees(
    address _token,
    uint256 _liquidityFee,
    address _receiver
  ) external override onlyConnext returns (uint256) {
    uint256 sponsoredFee;

    if (address(tokenExchanges[_token]) != address(0)) {
      uint256 currentBalance = address(this).balance;
      ITokenExchange tokenExchange = tokenExchanges[_token];

      uint256 amountIn = tokenExchange.getInGivenExpectedOut(_token, _liquidityFee);
      amountIn = currentBalance >= amountIn ? amountIn : currentBalance;

      // sponsored fee may end being less than _liquidityFee due to slippage
      sponsoredFee = tokenExchange.swapExactIn{value: amountIn}(_token, msg.sender);
    } else {
      uint256 balance = IERC20(_token).balanceOf(address(this));
      sponsoredFee = balance < _liquidityFee ? balance : _liquidityFee;

      // some ERC20 do not allow to transfer 0 amount
      if (sponsoredFee > 0) {
        IERC20(_token).safeTransfer(msg.sender, sponsoredFee);
      }
    }

    emit ReimburseLiquidityFees(_token, sponsoredFee, _receiver);

    return sponsoredFee;
  }

  /**
   * @notice Performs relayer fee reimbursement sending the corresponding amount of this domain native token to `_to`.
   * @dev Uses the configured oracle or default rate otherwise.
   * @param _originDomain The origin domain id
   * @param _to The fee recipient
   * @param _originRelayerFee The relayer fee amount in origin domain native token
   */
  function reimburseRelayerFees(
    uint32 _originDomain,
    address payable _to,
    uint256 _originRelayerFee
  ) external override onlyConnext {
    uint256 sponsoredFee;
    uint256 num;
    uint256 den;

    if (address(gasTokenOracle) != address(0)) {
      (num, den) = gasTokenOracle.getRate(_originDomain);

      sponsoredFee = (_originRelayerFee * num) / den;
    } else {
      num = rates[_originDomain].num;
      den = rates[_originDomain].den;
    }

    if (den != 0) {
      sponsoredFee = (_originRelayerFee * num) / den;

      // calculated or max
      sponsoredFee = sponsoredFee > relayerFeeCap ? relayerFeeCap : sponsoredFee;
      // calculated or leftover
      sponsoredFee = sponsoredFee > address(this).balance ? address(this).balance : sponsoredFee;

      Address.sendValue(_to, sponsoredFee);
    }
    emit ReimburseRelayerFees(sponsoredFee, _to);
  }

  /**
   * @notice Adds liquidity to the sponsor vault, native token or ERC20.
   * @dev Anyone can add liquidity.
   * @param _token The ERC20 token address or address zero for native token
   * @param _amount The amount of ERC20 to deposit or zero for native token since the amount is sent in msg.value
   */
  function deposit(address _token, uint256 _amount) external payable {
    if (_token != address(0)) {
      IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);
    }

    emit Deposit(_token, _token != address(0) ? _amount : msg.value, msg.sender);
  }

  /**
   * @notice Removes liquidity from the sponsor vault, native token or ERC20.
   * @dev Only the owner can remove liquidity.
   * @param _token The ERC20 token address or address zero for native token
   * @param _receiver The receiver of the tokens
   * @param _amount The amount to remove
   */
  function withdraw(
    address _token,
    address _receiver,
    uint256 _amount
  ) external onlyOwner {
    if (_token == address(0)) {
      if (address(this).balance < _amount) revert SponsorVault__withdraw_invalidAmount();
      payable(_receiver).call{value: _amount}("");
    } else {
      if (IERC20(_token).balanceOf(address(this)) < _amount) revert SponsorVault__withdraw_invalidAmount();
      IERC20(_token).safeTransfer(_receiver, _amount);
    }

    emit Withdraw(_token, _receiver, _amount, msg.sender);
  }

  // ============ Internal functions ============

  function _setConnext(address _connext) internal {
    if (_connext == address(0)) revert SponsorVault__setConnext_invalidConnext();

    emit ConnextUpdated(connext, _connext, msg.sender);

    connext = _connext;
  }
}
