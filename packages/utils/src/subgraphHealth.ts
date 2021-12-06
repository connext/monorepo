import axios from "axios";

const SUBGRAPH_HEALTH_URL = "https://api.thegraph.com/index-node/graphql";

/**
 *
 * @param subgraphName - name of the subgraph, e.g. "nxtp-bsc-v1-runtime"
 *
 * @returns
 */
export const getSubgraphHealth = async (subgraphName: string): Promise<string> => {
  const query = `{
    indexingStatusForCurrentVersion(subgraphName: "connext/${subgraphName}") {
      health
      synced
      fatalError {
        message
        block {
          hash
          number
        }
        handler
      }
      chains {
        network
        chainHeadBlock {
          hash
          number
        }
        earliestBlock {
          hash
          number
        }
        latestBlock {
          hash
          number
        }
        lastHealthyBlock {
          hash
          number
        }
      }
    }
  }`;
  const data = JSON.stringify({ query });
  const res = await axios.post(SUBGRAPH_HEALTH_URL, {
    data,
    headers: { Accept: "application/json; charset=utf-8", "Content-Type": "application/json; chatset=utf-8" },
  });
  /**
   * Example res:
   * {'data': {'indexingStatusForCurrentVersion': {'chains': [{'chainHeadBlock': {'hash':
   * '4c25ac086cda2d1b42085d6155c401ea3ad10ee8529012cd7023804cd405f3d4', 'number': '12956365'}, 'earliestBlock': {'hash':
   * '2c6f7087b90916a10b6791fd7c177150eeb8089f8b00cf952d5ba376c70e88d9', 'number': '11481190'}, 'lastHealthyBlock': None,
   * 'latestBlock': {'hash': '55ef6848b4dd98c6323f2bb1707ed56458c50ed07dab83a836d956425e3776d0', 'number': '12956202'},
   * 'network': 'bsc'}], 'fatalError': None, 'health': 'healthy', 'synced': True}}}
   */
  return res.data;
};
