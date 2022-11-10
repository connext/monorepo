import { reset, restore } from "sinon";

export const mochaHooks = {
  async beforeEach() {},

  afterEach() {
    restore();
    reset();
  },
};
