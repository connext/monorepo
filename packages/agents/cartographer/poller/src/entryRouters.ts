import tracer from "dd-trace";

import { makeRoutersPoller } from "./routersPoller";

tracer.init();
makeRoutersPoller();
