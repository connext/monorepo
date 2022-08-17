import { reset, restore, stub } from "sinon";

import * as PubFns from "../src/tasks/publisher/publisher";
import * as SubFns from "../src/tasks/subscriber/subscriber";
import { mock } from "./mock";
import { AppContext as PublisherAppContext } from "../src/tasks/publisher/context";
import { AppContext as SubscriberAppContext } from "../src/tasks/subscriber/context";

export let mockPubContext: PublisherAppContext;
export let mockSubContext: SubscriberAppContext;

export const mochaHooks = {
  async beforeEach() {
    mockPubContext = mock.publisherContext();
    mockSubContext = mock.subscriberContext();
    stub(PubFns, "getContext").returns(mockPubContext);
    stub(SubFns, "getContext").returns(mockSubContext);
  },

  afterEach() {
    restore();
    reset();
  },
};
