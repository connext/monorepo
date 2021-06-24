# nxtp-sdk

## High level Overview

1. Setup

- connects to Messaging server
- run check active transfer
- if `active transfer`, then returns the data for the respective digest

2. Auction
- get best quote offered by router

3. Cross Chain Transfer
- Bob prepares on chainA
- router receives the `prepare` event by bob
- router prepares on chainB
- bob receives and validate the `prepare` event by router
- bob broadcast the signature 
- router `fulfill` on chainA
- router `fulfill` on chainB

## FAQ

1. Messaging Server:  Used to communicate run Auction & communicate with Router.