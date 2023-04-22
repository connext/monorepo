# Sequencer

The sequencer collects bids from all routers and randomly selects one or more among them to fulfill. Any number of routers can fulfill a single transaction, which is especially useful for large transfers. The sequencer will post batches of these bids to a relayer network to submit them to chain.

## Local Development

### Running the Sequencer

Run all commands from the root directory.

- Create a `config.json` file in sequencer directory and paste the content of `config.json.example`.
  If you are in macOS or Linux, You can use `cp packages/agents/sequencer/config.json.example packages/agents/sequencer/config.json`


- Run the sequencer using following command.

```sh
yarn workspace @connext/nxtp-sequencer start:all
```