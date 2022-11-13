import tracer from "dd-trace";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

import { makePoller } from "./pollers";

tracer.init({ profiling: true, runtimeMetrics: true });

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  makePoller();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello world",
    }),
  };
};
