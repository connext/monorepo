# NXTP [Name is a WIP]

Nxtp is a lightweight protocol for generalized xchain transactions.

The protocol is made up of a simple contract that uses a locking pattern to `prepare` and `fulfill` transactions, a network of offchain routers that participate in pricing auctions and pass calldata between chains, and a user-side sdk that finds routes and prompts onchain transctions.

[Diagram needed]

### Transaction Lifecycle

Transactions go through three phases:
1. Route Auction: User broadcasts to the network signalling their desired route. Routers respond with sealed bids containing commitments to fulfilling the transaction within a certain time and price range.
2. Prepare: User submits a transaction to `TransactionManager` contract on sender-side chain containing router's signed bid along with their funds. Upon detecting an event containing their signed bid from the chain, router submits the same transaction to `TransactionManager` on the receiver-side chain.
3. Fulfill: Upon detecting an event from the prepare step on the receiver-side chain, user signs a message and sends it to the router. Router submits that message to the `TransactionManager` alongside the user's calldata to complete their transaction on receiver-side chain. Router then submits the same signed message and completes transaction on sender-side.

If a transaction is not fulfilled within a fixed timeout, it reverts and can be reclaimed by the party that called `prepare` on each chain (initiator). Additionally, transactions can be cancelled unilaterally by the counterparty (responder).

### Architecture

[Diagram needed]

This monorepo contains the following pieces:
- Contracts - hold funds for all network participants, and lock/unlock based on data submitted by users and routers
- Subgraph - enables scalable querying/responding by caching onchain data and events.
- TxService - resiliently attempts to send transactions to chain (with retries, etc.)
- Messaging - prepares, sends, and listens for message data over [nats](https://nats.io)
- Router - listens for events from messaging service and subgraph, and then dispatches transactions to txService
- SDK - creates auctions, listens for events and creates transactions on the user side.

### Internal Design Principles
These are **important** and everyone must adhere to them:

0. Keep it simple, stupid.

1. Follow the Unix philosophy for every file and function. For instance, a `listeners.ts` file should *only* handle setting up listeners and then route to a corresponding `handler`. This keeps all business logic consolidated, making it easy to test and read.

2. Every file and function should be unit tested. The scope of this codebase is very very small, so it shouldn't be difficult to do this.

3. Build for future hires and contributors. Every function should have a top-level comment that describes what it does, and internal comments breaking down each step. Files should have comments delineating their reponsibilities. Remember: Good code is **never surprising**.
