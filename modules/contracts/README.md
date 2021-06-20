# Nxtp Contracts

### Flow
There are two key functions in the contract, `prepare` and `fulfill`.
0. Lets assume that by this point the user has already run the auction.
1. User calls `prepare` passing in all of the relevant data about the transfer on the sender side chain along with their funds for the transfer. The contract stores the funds and the hash of the data in its state.
2. The `prepare` call above emits an event with the same calldata. Router hears this event (which includes its address) and calls the `prepare` function with the same calldata on the receiving chain (with decremented fees and timeout).
3. User hears `prepare` event on receiver side. User validates the event data and signs the data, then broadcasts it to the network.
4. Any router can then submit `fulfill` on the receiver side using the user's commitment + event data. If they do so, they get a small fee (in addition to gas).
5. Original router, upon seeing the `fulfill` event on receiver side, submits `fulfill` to sender side.
6. Note that in both sender and receiver side cases, `fulfill` must be called before the timeout expires. This acts as a failsafe against funds getting locked indefinitely if the counterparty is malicious. However, this also means expiry must be far enough away (w/ enough gap between both sides) to *make sure* the tx will go through.

There is also a `cancel` function. This can be called at any time by the receiver of a tx (router on sender side, user on receiver side) OR by the sender after `expiry`.

### Key Principles
- `TransactionManager` *is* our data store. As such, we should design in a way that removes any need for us to store offchain data. This includes for things like user pending transactions.
- `TransactionManager` is also how we pass messages most of the time -- the events are used as a mechanism for broadcasting data to the counterparty. This removes the need for messaging overhead.
- Router keeps their funds on the contract itself. This should slightly reduce costs, make analytics much easier, and will separate gas funds from operating funds (e.g. xDai side running out of gas bc all our $XDAI was drained).