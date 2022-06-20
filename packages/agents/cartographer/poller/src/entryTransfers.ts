import tracer from "dd-trace";

import { makeTransfersPoller } from "./transfersPoller";

tracer.init();
makeTransfersPoller();
