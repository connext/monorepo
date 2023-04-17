# Watcher

## Background

The watcher is designed to pause the contracts and alert the operator if certain invariants are violated. Currently, the following invariants are enforced:

1. _Appropriate Supply_: The amount of locked collateral is equal to the amount of minted assets.

The watcher may use any of the following alert channels:

- Telegram
- Discord
- Twilio
- Betteruptime
- PagerDuty

**NOTE:** Running the watcher is currently a high-touch process. If assets or chains are misconfigured, the network could be paused erroneously. If you are running a watcher, you _MUST_ stay in close contact with the Connext team.

## Development

### Prerequisites

- yarn

### Contributing

To build this package locally, run the following at the root of this repository:

```sh
monorepo$ yarn && yarn build:all
```

Once the package is built, you can make changes. To test these changes, run the following at the root of this repository:

```sh
monorepo$ yarn workspace @connext/nxtp-watcher test
```

**NOTE:** If you want to run this agent locally, it is recommended to remove any alerting configurations and using an unfunded account before starting up the agent using:

```sh
monorepo$ yarn workspace @connext/nxtp-watcher start
```

## Running a Watcher

### Prerequisites

To run a watcher, you will need the following resources:

- A funded account on all deployed chains.
- A minimum of 3 providers for all deployed chains.
- (optional) A configured alert system. The configuration parameters needed depend on the platform used for alerting.

Additionally, the watcher account must be whitelisted by the Connext admins to allow pausing.

### Hosting the Watcher

1. Setup configuration (see below).
2. Find the latest docker image [here](https://github.com/connext/monorepo/pkgs/container/watcher).
3. Export the config:
   ```
   # Export example WATCHER_CONFIG
   export WATCHER_CONFIG={\"server\":{\"adminToken\":\"a\",\"port\":8080},\"logLevel\":\"debug\",\"hubDomain\":\"1337\",\"interval\":15000,\"chains\":{\"133712\":{\"providers\":[\"http://chain-1337:8545\",\"http://chain-1337:8546\",\"http://chain-1337:8547\"],\"assets\":[{\"name\":\"TEST\",\"address\":\"0x8065F4c7b8c2bf53561af92D9DA2Ea022A0b28Ca\"}]},\"133812\":{\"providers\":[\"http://chain-1338:8545\",\"http://chain-1338:8546\",\"http://chain-1338:8547\"],\"assets\":[{\"name\":\"TEST\",\"address\":\"0x2467636BEa0F3c2441227eeDBfFaC59f11D54a80\"}]}},\"web3SignerUrl\":\"http://signer-watcher:9000\",\"environment\":\"production\"}
   ```
4. `docker run` the latest image with the exported config.
   ```
   # Run the latest image (example: watcher:sha-c91d05e) on WATCHER_CONFIG in background with auto-restart enabled
   docker run -e WATCHER_CONFIG --restart=always -d --name watcher ghcr.io/connext/watcher:sha-c91d05e
   ```

### Configuration

There are three options for setting up the configuration for your watcher (listed in the order in which conflicting values are prioritized):

1. _Environment variables._ Specify a config via a single `WATCHER_CONFIG` json-formatted environment variable, or via several fields (seen below).
2. _Config file._ Specify the filename via `WATCHER_CONFIG_FILE` environment variable.
3. _Config json._ Specify configuration values in a `config.json` in the root of the watcher.

A minimum sample production configuration file can be found in `example.production.config`. Please note that the mnemonic used is unsafe, and the providers are duplicated. Documentation of the various configuration options can be found at the end of this section.

### Configuration Reference

Watcher has the following configuration fields:

- **mnemonic** (optional): The mnemonic for the funded account. Referenced from env as `WATCHER_MNEMONIC`.
- **web3SignerUrl** (optional): The url for the funded account if using web3signer. Referenced from env as `WATCHER_WEB3_SIGNER_URL`.
- **chains**: The information for supported chains. MUST include all Connext-deployed chains to prevent erroneous pauses. Referenced from env as `WATCHER_CHAIN_CONFIG`. Is a json-object with the following fields:

  ```json
  {
    "chains": {
      "6648936": {
        // keyed on domain identifiers
        "providers": [""], // required. array of your provider urls
        "quorum": 2 // optional, default = 2. number of providers which must return a valid response, must be at least 2.
      }
    }
  }
  ```

- **logLevel** (optional, default = "info"): The log level used. Referenced from env as `WATCHER_LOG_LEVEL`.
- **environment** (optional, default = "production"): The contract environment the watcher is pointing to. Referenced from env as `WATCHER_ENVIRONMENT`.
- **server**: The server configuration for the watcher. Is represented either by environment variables or as a json-object in the config file with the following fields:

  ```json
  {
    "server": {
      "adminToken": "foo", // required. admin token for the server. referenced from env as WATCHER_ADMIN_TOKEN
      "port": 8000, // optional, default = 8000. referenced from env as WATCHER_PORT
      "host": "0.0.0.0" // optional, default = "". referenced from env as WATCHER_HOST
    }
  }
  ```

- **interval** (optional, default = 15000): How often (in ms) the watcher will check the invariants. Referenced from env as `WATCHER_INTERVAL`.
- **discordHookUrl** (optional): The webhook used for discord alerts. Referenced from env as `DISCORD_HOOK_URL`.
- **pagerDutyRoutingKey** (optional): The routing key for pager duty alerts. Referenced from env as `PAGERDUTY_ROUTING_KEY`.
- **twilioNumber** (optional): The number used for twilio alerts. Referenced from env as `TWILIO_NUMBER`.
- **twilioAccountSid** (optional): The account id for twilio alerts. Referenced from env as `TWILIO_ACCOUNT_SID`.
- **twilioAuthToken** (optional): The auth token for twilio alerts. Referenced from env as `TWILIO_AUTH_TOKEN`.
- **twilioToPhoneNumbers** (optional): The phone numbers to alert via twilio. Referenced from env as `TWILIO_TO_PHONE_NUMBERS`.
- **telegramApiKey** (optional): The api key used for telegram alerts. Referenced from env as `TELEGRAM_API_KEY`.
- **telegramChatId** (optional): The chat to post to for telegram alerts. Referenced from env as `TELEGRAM_CHAT_ID`.
- **betterUptimeApiKey** (optional): The api key for betteruptime alerts. Referenced from env as `BETTER_UPTIME_API_KEY`.
- **betterUptimeRequesterEmail** (optional): The requester email for betteruptime alerts. Referenced from env as `BETTER_UPTIME_REQUESTER_EMAIL`.
