# Relayer

Relayers are a decentralized network of infrastructure operators that can execute smart contract transactions on behalf of a user in exchange for a small fee. Because the last leg of a cross-chain transaction requires execution on the destination domain, relayers play an important role in completing the full flow. Additionally, relayers are used in all off-chain use-cases where we need to "write" to a contract

## Local Development

### Running the Relayer

Run all commands from the root directory.

- Create a `config.json` file in relayer directory and paste the content of `config.json.example`.
  If you are in macOS or Linux, You can use `cp packages/agents/relayer/config.json.example packages/agents/relayer/config.json`

- Run the relayer using following command.

```sh
yarn workspace @connext/nxtp-relayer start
```
