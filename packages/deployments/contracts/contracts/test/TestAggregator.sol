// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

/*
 * This aggregator is ONLY useful for testing
 */
contract TestAggregator {
  uint8 public decimals = 18;

  string public description = "Chainlink Test Aggregator";

  uint256 public version = 1;

  uint80 _mockRoundId = 1;

  int256 _mockAnswer = 1;

  uint256 _mockUpdateAt;

  uint80 _mockAnsweredInRound = 1;

  bool stopped;
  // This error is used for only testing
  error TestAggregator_Stopped();

  constructor(uint8 _decimals) {
    decimals = _decimals;
    _mockUpdateAt = block.timestamp;
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
    return (_roundId, _mockAnswer * int256(10**decimals), 0, _mockUpdateAt, _mockAnsweredInRound);
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
    return (_mockRoundId, _mockAnswer * int256(10**decimals), 0, _mockUpdateAt, _mockAnsweredInRound);
  }

  function updateMockAnswer(int256 _answer) external {
    _mockAnswer = _answer;
  }

  function updateMockData(
    uint80 _roundId,
    int256 _answer,
    uint256 _updateAt,
    uint80 _answeredInRound
  ) external {
    _mockRoundId = _roundId;
    _mockAnswer = _answer;
    _mockUpdateAt = _updateAt;
    _mockAnsweredInRound = _answeredInRound;
  }

  function stop() external {
    stopped = true;
  }
}
