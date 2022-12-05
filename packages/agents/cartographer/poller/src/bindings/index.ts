import { AppContext } from "../shared";

import { bindTransfers } from "./transfers";
import { bindRouters } from "./routers";
import { bindMessages } from "./messages";
import { bindRoots } from "./roots";

export const bind = async (context: AppContext) => {
  switch (context.config.service) {
    case "transfers":
      await bindTransfers(context);
      break;
    case "routers":
      await bindRouters(context);
      break;
    case "messages":
      await bindMessages(context);
      break;
    case "roots":
      await bindRoots(context);
      break;
  }
};
