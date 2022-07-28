import { NxtpSdkBase } from "@connext/nxtp-sdk";
import { FastifyInstance } from "fastify";
import { XCallArgsSchema, XCallArgs } from "@connext/nxtp-utils";

export const baseRoutes = async (server: FastifyInstance, sdkBaseInstance: NxtpSdkBase): Promise<any> => {
  server.post<{ Body: XCallArgs }>(
    "/xcall",
    {
      schema: {
        body: XCallArgsSchema,
      },
    },
    async (req, res) => {
      const txReq = await sdkBaseInstance.xcall(req.body);
      res.status(200).send(txReq);
    },
  );
};
