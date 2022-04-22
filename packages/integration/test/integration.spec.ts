import { makeSequencer } from "@connext/nxtp-sequencer";
import { makeRouter } from "@connext/nxtp-router";

import { ROUTER_CONFIG, SEQUENCER_CONFIG } from "./constants";

// TODO: Put this in env:
const ROUTER_MNEMONIC = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

describe("Integration", () => {
  it("should import", async () => {
    console.log("Executing makeRouter");
    const routerConfig = await ROUTER_CONFIG;

    await makeRouter({
      ...routerConfig,
      mnemonic: ROUTER_MNEMONIC,
    });

    console.log("Executing makeSequencer");
    const sequencerConfig = await SEQUENCER_CONFIG;

    await makeSequencer({
      ...sequencerConfig,
    });
  });
});
