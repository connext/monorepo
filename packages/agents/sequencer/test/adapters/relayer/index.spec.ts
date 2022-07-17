import { restore, reset } from "sinon";

import { setupRelayer } from "../../../src/adapters";

describe("#Relayer Setup", () => {
  beforeEach(() => {});
  afterEach(() => {
    restore();
    reset();
  });
  it("should pick up the auction rounds which has enough number of bids", async () => {
    setupRelayer();
  });
});
