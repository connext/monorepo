import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

import { makePoller } from "./pollers";

makePoller();
