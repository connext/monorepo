/*
    Handler.ts

    The goal of this file is to handle all inbound events and dispatch messages
    or new onchain txs as needed.

    Each handler method should do the following:
    1. Log what it's doing
    2. Validate the event data (in some cases not necessary if onchain validation)
    3. Prepare parameters for next action
    4. Dispatch a new message or tx to chain
    5. Update metrics
*/

// TODO should this be a class? Would be much easier to test, and remove the need
// to pass in dependencies into every single function from the listener.

export class Handler implements IHandler{
    private messagingService: MesssagingService;
    private subgraph: Subgraph;
    private txService: TxService;
    private signer: Signer;
    private logger: BaseLogger;
    

    // HandleNewAuction
    // Purpose: Respond to auction with bid if router has sufficient funds for transfer
    // NOTE: This does not need to be implemented as part of MVP
    public async handleNewAuction(data): Promise<void> {
        // First, log
        // TODO

        // Next, validate that assets/chains are supported and there is enough liquidity
        // and gas on both sender and receiver side. 
        // (TODO in what other scenarios would auction fail here? We should make sure
        // that router does not bid unless it is *sure* it's doing ok)

        // If you can support the transfer:

        // Next, prepare bid
        // - Get price from AMM (TODO)
        // - Get fee rate
        // - Sign bid data
        // - Create bid object

        // Next, dispatch bid to messaging service with the user address

        // Last, update metrics
        // TODO (also need to discuss what data is most needed here)
    }

    // HandleMetatxRequest
    // Purpose: If a user sends a FULFILL payload, submit it to chain on their behalf
    // NOTE: One consideration here is that it's technically possible for router to
    // just directly fulfill the sender side and leave the user hanging.
    // How can we protect against this case? Maybe broadcast to all routers?
    public async handleMetaTxRequest(): Promise<void> {
        // First log
        // TODO

        // Validate that metatx request matches with known data about fulfill
        // Is this needed? Can we just submit to chain without validating?
        // Technically this is ok, but perhaps we want to validate only for our own
        // logging purposes.

        // Would also be bad if router had no gas here

        // Next, prepare the tx object
        // - Get chainId from data
        // - Get fulfill fee from data and validate it covers gas
        // - etc.

        // Send to txService

        // Update metrics
        // TODO
    }

    // HandleSenderPrepare
    // Purpose: On sender PREPARE, router should mirror the data to receiver chain
    public async handleSenderPrepare(): Promise<void> {
        // First log

        // Validate the prepare data
        // TODO what needs to be validated here? Is this necessary? Assumption
        // that user is only sending stuff that makes sense is possibly ok since otherwise
        // they're losing gas costs

        // Next, prepare the tx object

        // Send to txService

        // If success, update metrics

        // If fail, collaboratively cancel the sender prepare
        // TODO we'll need another fn for this?
    }

    // HandleReceiverPrepare
    // Purpose: On this method, no action is needed from the router except to update
    // metrics
    public async handleReceiverPrepare(): Promise<void> {
        // First log

        // Update metrics
    }

    // HandleSenderFulfill
    // Purpose: No action is needed here from router except to update metrics
    public async handleSenderFulfill(): Promise<void> {
        // First log

        // Update metrics
    }

    // HandleReceiverFulfill
    // Purpose: Router should mirror the receiver fulfill data back to sender side
    public async handleReceiverFulfill(): Promise<void> {
        // First log

        // Prepare tx packet

        // Send to tx service

        // If success, update metrics

        // If fail -- something has gone really wrong here!! We need to figure out what ASAP.
        // TODO discuss the above case!!
    }
} 

