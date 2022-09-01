## Bridge UI reference implementation

A reference implementation of a bridge UI. This is a React/TS app that exposes minimal bridging operations used in this monorepo to test SDK functionality.

## First time setup

First of all, make sure you are on the latest yarn version:

- `yarn set version berry`

You must install the dependencies of the connext workspace.
To do so, from the root of the repo, run:

- `yarn`

If you have issues, try deleting `node_modules` and `yarn.lock`. After deleting `yarn.lock` run `touch yarn.lock` since it does not like if there is no lock file.

We must now build all packages:

- `yarn build:all`

If you have issues, try running `yarn clean:all`

## Run with testnet config

From the root of this monorepo, run:

```
yarn workspace @connext/bridge-reference build:testnet
yarn workspace @connext/bridge-reference start:testnet
```

A browser will open with the bridging UI.
