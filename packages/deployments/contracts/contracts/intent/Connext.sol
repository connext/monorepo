// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IConnext} from "./interfaces/IConnext.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {ExcessivelySafeCall} from "../../../shared/libraries/ExcessivelySafeCall.sol";


contract Connext is IConnext {

    function xcall(
        uint32 _destination,
        address _to,
        address _asset,
        uint256 _amount,
        bytes calldata _callData
    ) external payable nonXCallReentrant returns (bytes32) {
        // TODO param validation

        // Transfer asset to contract
        IERC20Metadata asset = IERC20Metadata(_asset);
        asset.safeTransferFrom(msg.sender, address(this), _amount);

        // Look up settlement strategy
        bytes32 tickerHash = assetIdToTickerHash[_asset];
        address settlementStrategy = settlementStrategies[tickerHash][getPath(this.domain, _destination)];

        // Generate param data for settlement strategy
        // TODO should generate transferID here too

        // Delegatecall settlement strategy
        bytes memory data = abi.encodeWithSignature("handleXCallSettlement()"); // TODO params
        (bool success, bytes memory result) = settlementStrategy.delegatecall(data);

        if (success) {
            // Decode message returned by settlement strategy
            // TODO Do we want to allow settlement strategy to override destinationDomain? What about connextion?

            (_destinationDomain, _connextion, _messageBody) = abi.decode(result, (uint32, address, bytes));
            // Send message to destination chain bridge router.
            // return message hash and unhashed body
            (bytes32 messageHash, bytes memory messageBody) = IOutbox(s.xAppConnectionManager.home()).dispatch(
                _destinationDomain,
                _connextion,
                _messageBody
            );
        }

        // emit event
        emit XCalled(_transferId, _params.nonce, messageHash, _params, _asset, _amount, _local, messageBody);
    }

    function execute(
        TransferInfo _params,
        address[] _routers,
        bytes[] _routerSignatures,
        address _sequencer,
        bytes _sequencerSignature,
        uint32 _reconcileDomain,
        bytes _strategyMetadata
    ) external returns (bytes32) {
        // TODO param validation

        // Look up settlement strategy
        address settlementStrategy = settlementStrategies[_params.tickerHash][getPath(_params.originDomain, _params.destinationDomain)];

        // If using dedicated strategy, then _reconcileDomain must be this domain
        if (settlementStrategy != DEFAULT_STRATEGY) {
            require(_reconcileDomain == _params.destinationDomain, "TODO");
        }

        // Look up fees for token
        FeeConfig _feeConfig = feeConfig[_params.tickerHash];

        // TODO deduct from router balance if fast path (less fees)

        // Delegatecall settlement strategy
        bytes memory data = abi.encodeWithSignature("handleExecuteSettlement()"); // TODO params
        (bool success, bytes memory result) = settlementStrategy.delegatecall(data);

        if(success) {
            // TODO handle legacy protocol versions

            // Send tokens
            IERC20Metadata asset = IERC20Metadata(tickerHashToAssetId[_params.tickerHash]);
            asset.safeTransferFrom(msg.sender, address(this), _amount);

            // Execute the transaction
            if (keccak256(_params.callData) != Constants.EMPTY_HASH) {
                (bool success, bytes memory returnData) = ExcessivelySafeCall.excessivelySafeCall(
                _params.to,
                gasleft() - Constants.EXECUTE_CALLDATA_RESERVE_GAS,
                0, // native asset value (always 0)
                Constants.DEFAULT_COPY_BYTES, // only copy 256 bytes back as calldata
                abi.encodeWithSelector(
                    IXReceiver.xReceive.selector,
                    _transferId,
                    _amount,
                    _asset,
                    _reconciled ? _params.originSender : address(0), // use passed in value iff authenticated
                    _params.originDomain,
                    _params.callData
                )
                );
            }
        }

        // Emit event.
        // TODO get these params
        emit Executed(transferId, _args.params.to, asset, _args, local, amount, msg.sender);

        return transferId;
    }

    function reconcile() external returns (bytes32) {}

    function getPath(uint32 origin, uint32 destination) internal pure returns (bytes memory) {
        bytes4 b1 = bytes4(origin); // Convert uint32 to bytes4
        bytes4 b2 = bytes4(destination); // Convert uint32 to bytes4

        bytes memory concatenated = new bytes(8); // 4 bytes (origin) + 4 bytes (destination)

        for (uint256 i = 0; i < 4; i++) {
            concatenated[i] = b1[i]; // Copy bytes from origin
            concatenated[i + 4] = b2[i]; // Copy bytes from destination
        }

        return concatenated;
    }

}