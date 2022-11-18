// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {IPriceOracle} from "../interfaces/IPriceOracle.sol";

import {Constants} from "../libraries/Constants.sol";

import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";
import {PriceOracle} from "./PriceOracle.sol";

interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function description() external view returns (string memory);

  function version() external view returns (uint256);

  function latestRoundData()
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );
}

/**
 * @title ConnextPriceOracle
 * @notice Simple interface for querying a variety of price feeds
 *
 * @dev If ownership is renounced, the direct price, aggregators, and price oracles
 * can no longer be updated
 */
contract ConnextPriceOracle is PriceOracle, ProposedOwnable {
  address public wrapped;
  address public v1PriceOracle;

  /// @notice Price sources
  enum PriceSource {
    NA,
    DIRECT,
    CHAINLINK,
    V1_ORACLE
  }

  /// @notice Chainlink Aggregators
  mapping(address => AggregatorV3Interface) public aggregators;

  struct Price {
    uint256 updatedAt;
    uint256 price;
  }

  mapping(address => Price) public assetPrices;

  event DirectPriceUpdated(address token, uint256 oldPrice, uint256 newPrice);
  event AggregatorUpdated(address tokenAddress, address source);
  event V1PriceOracleUpdated(address oldAddress, address newAddress);

  constructor(address _wrapped) {
    require(_wrapped != address(0), "zero wrapped address!");

    wrapped = _wrapped;
    _setOwner(msg.sender);
  }

  function getTokenPrice(address _tokenAddress) public view override returns (uint256, uint256) {
    address tokenAddress = _tokenAddress;

    // For native tokens, get price of the wrapped token
    if (_tokenAddress == address(0)) {
      tokenAddress = wrapped;
    }

    // First check the direct price which stored in contract. Only owner can set direct price.
    uint256 tokenPrice = assetPrices[tokenAddress].price;
    // only accept up to and not including Constants.ORACLE_VALID_PERIOD time deviation
    if (tokenPrice != 0 && ((block.timestamp - assetPrices[tokenAddress].updatedAt) < Constants.ORACLE_VALID_PERIOD)) {
      return (tokenPrice, uint256(PriceSource.DIRECT));
    }

    // Second, check ChainLink aggregator, If current token is supported by chainlink, return
    tokenPrice = getPriceFromOracle(tokenAddress);
    if (tokenPrice != 0) {
      return (tokenPrice, uint256(PriceSource.CHAINLINK));
    }

    // Third, If v1 oracle price contract is set, check v1 price
    if (v1PriceOracle != address(0)) {
      tokenPrice = IPriceOracle(v1PriceOracle).getTokenPrice(tokenAddress);
      if (tokenPrice != 0) {
        return (tokenPrice, uint256(PriceSource.V1_ORACLE));
      }
    }

    return (0, uint256(PriceSource.NA));
  }

  function getPriceFromOracle(address _tokenAddress) public view returns (uint256) {
    uint256 chainLinkPrice = getPriceFromChainlink(_tokenAddress);
    return chainLinkPrice;
  }

  function getPriceFromChainlink(address _tokenAddress) public view returns (uint256) {
    AggregatorV3Interface aggregator = aggregators[_tokenAddress];
    if (address(aggregator) != address(0)) {
      try aggregator.latestRoundData() returns (
        uint80 roundId,
        int256 answer,
        uint256,
        uint256 updateAt,
        uint80 answeredInRound
      ) {
        // It's fine for price to be 0. We have more price feeds.
        if (
          answer == 0 ||
          answeredInRound < roundId ||
          updateAt == 0 ||
          block.timestamp > updateAt + Constants.ORACLE_VALID_PERIOD
        ) {
          // answeredInRound > roundId ===> ChainLink Error: Stale price
          // updatedAt = 0 ===> ChainLink Error: Round not complete
          // block.timestamp - updateAt > Constants.ORACLE_VALID_PERIOD ===> too old data
          return 0;
        }

        uint256 retVal = uint256(answer);
        uint256 price;
        // Make the decimals to 1e18.
        uint256 aggregatorDecimals = uint256(aggregator.decimals());
        if (aggregatorDecimals > Constants.DEFAULT_NORMALIZED_DECIMALS) {
          price = retVal / (10**(aggregatorDecimals - Constants.DEFAULT_NORMALIZED_DECIMALS));
        } else {
          price = retVal * (10**(Constants.DEFAULT_NORMALIZED_DECIMALS - aggregatorDecimals));
        }

        return price;
      } catch {
        // return 0 to be able to fetch the price from next oracles
        return 0;
      }
    }

    return 0;
  }

  function setDirectPrice(
    address _token,
    uint256 _price,
    uint256 _timestamp
  ) external onlyOwner {
    require(_price != 0, "bad price");
    if (block.timestamp > _timestamp) {
      // reject stale price
      require(block.timestamp - _timestamp < Constants.ORACLE_VALID_PERIOD, "bad timestamp");
    } else {
      // reject future timestamp (<3s is allowed)
      require(_timestamp - block.timestamp < Constants.FUTURE_TIME_BUFFER, "in future");
      _timestamp = block.timestamp;
    }

    emit DirectPriceUpdated(_token, assetPrices[_token].price, _price);

    assetPrices[_token].price = _price;
    assetPrices[_token].updatedAt = _timestamp;
  }

  function setV1PriceOracle(address _v1PriceOracle) external onlyOwner {
    emit V1PriceOracleUpdated(v1PriceOracle, _v1PriceOracle);
    v1PriceOracle = _v1PriceOracle;
  }

  function setAggregators(address[] calldata tokenAddresses, address[] calldata sources) external onlyOwner {
    uint256 numTokens = tokenAddresses.length;
    for (uint256 i; i < numTokens; ) {
      aggregators[tokenAddresses[i]] = AggregatorV3Interface(sources[i]);
      emit AggregatorUpdated(tokenAddresses[i], sources[i]);

      unchecked {
        ++i;
      }
    }
  }
}
