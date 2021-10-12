// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "./Types.sol";

interface ITransactionManager {
  // Structs

  /**
    * Arguments for calling prepare()
    * @param invariantData The data for a crosschain transaction that will
    *                      not change between sending and receiving chains.
    *                      The hash of this data is used as the key to store 
    *                      the inforamtion that does change between chains 
    *                      (amount,expiry,preparedBlock) for verification
    * @param amount The amount of the transaction on this chain
    * @param expiry The block.timestamp when the transaction will no longer be
    *               fulfillable and is freely cancellable on this chain
    * @param encryptedCallData The calldata to be executed when the tx is
    *                          fulfilled. Used in the function to allow the user
    *                          to reconstruct the tx from events. Hash is stored
    *                          onchain to prevent shenanigans.
    * @param encodedBid The encoded bid that was accepted by the user for this
    *                   crosschain transfer. It is supplied as a param to the
    *                   function but is only used in event emission
    * @param bidSignature The signature of the bidder on the encoded bid for
    *                     this transaction. Only used within the function for
    *                     event emission. The validity of the bid and
    *                     bidSignature are enforced offchain
    * @param encodedMeta The meta for the function
    */
  struct PrepareArgs {
    InvariantTransactionData invariantData;
    uint256 amount;
    uint256 expiry;
    bytes encryptedCallData;
    bytes encodedBid;
    bytes bidSignature;
    bytes encodedMeta;
  }

  /**
    * @param txData All of the data (invariant and variant) for a crosschain
    *               transaction. The variant data provided is checked against
    *               what was stored when the `prepare` function was called.
    * @param relayerFee The fee that should go to the relayer when they are
    *                   calling the function on the receiving chain for the user
    * @param unlockData TODO
    * @param callData The calldata to be sent to and executed by the 
    *                 `FulfillHelper`
    * @param encodedMeta The meta for the function
    */
  struct FulfillArgs {
    TransactionData txData;
    uint256 relayerFee;
    bytes unlockData;
    bytes callData;
    bytes encodedMeta;
  }

  /**
    * Arguments for calling cancel()
    * @param txData All of the data (invariant and variant) for a crosschain
    *               transaction. The variant data provided is checked against
    *               what was stored when the `prepare` function was called.
    * @param unlockData TODO
    * @param encodedMeta The meta for the function
    */
  struct CancelArgs {
    TransactionData txData;
    bytes unlockData;
    bytes encodedMeta;
  }

  // Adding/removing asset events
  event RouterAdded(address indexed addedRouter, address indexed caller);

  event RouterRemoved(address indexed removedRouter, address indexed caller);

  // Adding/removing router events
  event AssetAdded(address indexed addedAssetId, address indexed caller);

  event AssetRemoved(address indexed removedAssetId, address indexed caller);

  // Adding/removing conditions
  event ConditionAdded(address indexed condition, address indexed caller);

  event ConditionRemoved(address indexed condition, address indexed caller);

  // Liquidity events
  event LiquidityAdded(address indexed router, address indexed assetId, uint256 amount, address caller);

  event LiquidityRemoved(address indexed router, address indexed assetId, uint256 amount, address recipient);

  // Transaction events
  event TransactionPrepared(
    address indexed user,
    address indexed router,
    bytes32 indexed transactionId,
    TransactionData txData,
    address caller,
    PrepareArgs args
  );

  event TransactionFulfilled(
    address indexed user,
    address indexed router,
    bytes32 indexed transactionId,
    FulfillArgs args,
    bool success,
    bool isContract,
    bytes returnData,
    address caller
  );

  event TransactionCancelled(
    address indexed user,
    address indexed router,
    bytes32 indexed transactionId,
    CancelArgs args,
    address caller
  );

  // Getters
  function getChainId() external view returns (uint256);

  function getStoredChainId() external view returns (uint256);

  // Owner only methods
  function addRouter(address router) external;

  function removeRouter(address router) external;

  function addAssetId(address assetId) external;

  function removeAssetId(address assetId) external;

  function addCondition(address condition) external;

  function removeCondition(address condition) external;

  // Router only methods
  function addLiquidityFor(uint256 amount, address assetId, address router) external payable;

  function addLiquidity(uint256 amount, address assetId) external payable;

  function removeLiquidity(
    uint256 amount,
    address assetId,
    address payable recipient
  ) external;

  // Methods for crosschain transfers
  // called in the following order (in happy case)
  // 1. prepare by user on sending chain
  // 2. prepare by router on receiving chain
  // 3. fulfill by user on receiving chain
  // 4. fulfill by router on sending chain
  function prepare(
    PrepareArgs calldata args
  ) external payable returns (TransactionData memory);

  function fulfill(
    FulfillArgs calldata args
  ) external returns (TransactionData memory);

  function cancel(CancelArgs calldata args) external returns (TransactionData memory);
}
