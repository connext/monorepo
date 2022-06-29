// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

/*
 * This aggregator is ONLY useful for testing
 */
contract TestAggregator {
  uint8 public decimals = 18;

  string public description = "Chainlink Test Aggregator";

  uint256 public version = 1;

  int256 public mockAnswer = 1;

  bool stopped;
  // This error is used for only testing
  error TestAggregator_Stopped();

  constructor(uint8 _decimals) {
    decimals = _decimals;
  }

  // getRoundData and latestRoundData should both raise "No data present"
  // if they do not have data to report, instead of returning unset values
  // which could be misinterpreted as actual reported values.
  function getRoundData(uint80 _roundId)
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    )
  {
    if (stopped) {
      revert TestAggregator_Stopped();
    }
    return (_roundId, mockAnswer * int256(10**decimals), 0, block.timestamp, 1e18);
  }

  function latestRoundData()
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    )
  {
    if (stopped) {
      revert TestAggregator_Stopped();
    }
    return (1, mockAnswer * int256(10**decimals), 0, block.timestamp, 1e18);
  }

  function updateMockAnswer(int256 _answer) external {
    mockAnswer = _answer;
  }

  function stop() external {
    stopped = true;
  }
}
