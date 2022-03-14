import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";

import { mock } from "./mock";
import * as SequencerFns from "../src/sequencer";

export const mochaHooks = {
  async beforeEach() {
    stub(SequencerFns, "getContext").returns(mock.context());
  },

  afterEach() {
    restore();
    reset();
  },
};
