import { reset, restore, stub } from "sinon";

import { WatcherContext } from "../src/context";
import * as WatcherFns from "../src/watcher";
import { mock } from "./mock";

export let ctxMock: WatcherContext;

export const mochaHooks = {
  async beforeEach() {
    ctxMock = mock.context();
    stub(WatcherFns, "getContext").returns(ctxMock);
  },

  afterEach() {
    restore();
    reset();
  },
};
