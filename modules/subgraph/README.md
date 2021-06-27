# NXTP Subgraph

## Deploying Subgraph

- Change addresses for supported chains in `config/` directory.
- Change `startBlock` in config to match contract deployment.
- If there were any schema changes, run:

```
yarn codegen
```

- Run script for each chain for example:

```
yarn prepare:rinkeby && yarn deploy:rinkeby
```
