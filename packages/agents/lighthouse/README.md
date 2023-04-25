# Lighthouse

Lighthouse is a system that facilitates the communication between hub and spoke contracts by managing the flow of messages. This system is designed to read the current state of messages, with each xcall representing a message, and execute the necessary steps to complete the transfer. In essence, Lighthouse acts as a coordinator, ensuring that messages are transmitted between contracts in an efficient and timely manner. Its primary function is to ensure that transactions are executed correctly and that there are no inconsistencies in the data being transmitted. 

## Local Development

### Running the Lighthouse

Run all commands from the root directory.

- Create a `config.json` file in lighthouse directory and paste the content of `config.json.example`.
  If you are in macOS or Linux, You can use `cp packages/agents/lighthouse/config.json.example packages/agents/lighthouse/config.json`

- Run the Lighthouse Prover using following command.

```sh
yarn workspace @connext/lighthouse start:prover
```
