import { reset, restore, stub } from "sinon";

import * as PubFns from "../src/tasks/publisher/publisher";
import * as SubFns from "../src/tasks/subscriber/subscriber";
import * as ExecutorFns from "../src/tasks/executor/executor";
import { mock } from "./mock";
import { AppContext as PublisherAppContext } from "../src/tasks/publisher/context";
import { AppContext as SubscriberAppContext } from "../src/tasks/subscriber/context";
import { AppContext as ExecutorAppContext } from "../src/tasks/executor/context";

export let mockPubContext: PublisherAppContext;
export let mockSubContext: SubscriberAppContext;
export let mockExecutorContext: ExecutorAppContext;

export const mochaHooks = {
  async beforeEach() {
    mockPubContext = mock.publisherContext();
    mockSubContext = mock.subscriberContext();
    mockExecutorContext = mock.executorContext();
    stub(PubFns, "getContext").returns(mockPubContext);
    stub(SubFns, "getContext").returns(mockSubContext);
    stub(ExecutorFns, "getContext").returns(mockExecutorContext);
  },

  afterEach() {
    restore();
    reset();
  },
};
