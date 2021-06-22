# TxService

TxService is a transaction relayer that should work with any chain and ensure that a tx gets submitted.

### Key differences with Vector
1. Impossible to double-collateralize: because of how the contracts are written, we do not have to ensure that a tx gets submitted to chain with only one nonce. Submitting multiple times will just result in a revert that can easily be handled.
2. No offchain DB -- the txService should be fully stateless. The router (responsible for calling txService) whould be responsible for calling txService on init if there are pending transfers that need to be completed.
3. Should be as generalized as possible. Params should take in arbitrary calldata. That way, we can iterate on biz logic mostly inside the router and keep txService untouched.

All in all, this means the txService should be as "dumb" as possible. It should simply relay transactions to chain with gas bump + retries return a success EITHER when it notices an onchain event was emitted OR when the txs revert onchain bc they were already submitted. 

It should also natively support multiple providers, rotating through them if it fails to receive success responses.

### Dependencies
Services:
- Subgraph
- Signer
- Config (contains multiple providers and block confirmation requirements per chain)

Params:
- ChainId to send to
- Tx data (min tx)

### Test Vectors
The **fundamental design principle** of the txService is that it should *only* handle chain-submission-related issues and *nothing else*. This will make it much easier to test.

We need to make sure that the txService is resilient to all sorts of possible chain-related failures:
1. Reorgs
2. Providers unresponsive
3. Providers returning errors
4. Providers out of sync with the chain
5. Txs underpriced
6. Txs stuck in mempool
7. Txs overpriced (max gas price)
8. Nonce already used

Bc the txService is fairly generalized, we should be able to easily unit test handling all of the above cases by writing a mock provider. We can pull logs from vector to understand more about what kinds of errors providers will return that we should be accounting for.