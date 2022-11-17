// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ProposedOwnable} from "../shared/ProposedOwnable.sol";
import {ISpokeConnector} from "./interfaces/ISpokeConnector.sol";

contract SpokeConnectorSendWrapper is ProposedOwnable {
  // ============ Events ============

  event FundsReceived(uint256 amount, uint256 balance);

  event FundsDeducted(uint256 amount, uint256 balance);

  event SpokeConnectorChanged(address spokeConnector, address oldSpokeConnector);

  // ============ Properties ============

  ISpokeConnector public spokeConnector;

  // ============ Constructor ============

  /**
   * @notice Creates a new SpokeConnectorSendWrapper instance.
   * @param _spokeConnector The address of the SpokeConnector on this domain.
   */
  constructor(address _spokeConnector) ProposedOwnable() {
    _setOwner(msg.sender);

    require(_spokeConnector != address(0), "!zero spoke connector");
    spokeConnector = ISpokeConnector(_spokeConnector);
    emit SpokeConnectorChanged(_spokeConnector, address(0));
  }

  // ============ Admin Functions ============

  function setSpokeConnector(address _spokeConnector) external onlyOwner {
    require(_spokeConnector != address(0), "!zero spoke connector");
    address oldSpokeConnector = address(spokeConnector);
    spokeConnector = ISpokeConnector(_spokeConnector);
    emit SpokeConnectorChanged(_spokeConnector, oldSpokeConnector);
  }

  function withdraw() external onlyOwner {
    uint256 balance = address(this).balance;
    payable(msg.sender).transfer(balance);
    emit FundsDeducted(balance, address(this).balance);
  }

  // ============ External Functions ============

  function send(bytes memory _encodedData, uint256 _fee) external {
    spokeConnector.send{value: _fee}(_encodedData);
    emit FundsDeducted(_fee, address(this).balance);
  }

  receive() external payable {
    emit FundsReceived(msg.value, address(this).balance);
  }
}
