import Docker from "dockerode";

export class ContainerManager {
  public readonly dn: Docker;
  public readonly containers: [];


  constructor(dockerSock?: string) {
    //setup docker agent
    if (dockerSock) this.dn = new Docker({ socketPath: dockerSock });
    this.dn = new Docker({ socketPath: "/var/run/docker.sock" });
  }

  runRouterContainer(routerMnemonic: string, port:number, routerIndex: number) {
    
    this.dn.createContainer(
      {
        Image: "nxtp-router",
        name: `router-${routerIndex}`,
        HostConfig: {
          NetworkMode: "ops_nxtp-test",
          PortBindings: { "8080/tcp": [{ HostPort: `${port.toString()}` }] },
          AutoRemove: true,
        },
        ExposedPorts: {
          "8080/tcp": {},
        },
        Tty: true,
        Env: [`NXTP_MNEMONIC=${routerMnemonic}`, "TAGS=nxtp-load"],
      },
      (err, container) => {
        if (!err) {
          container?.start((e) => {
            if (!e) {
              console.log(`image created router${routerIndex}`);
            }
          });
        }
      },
    ),
      //cleanup
      port++;
  }

  async removeAllRouters(num_routers:number){
    for (let i = 0; i < num_routers; i++) {
      const routerContainer = this.dn.getContainer(`router-${i}`);
      await routerContainer?.remove({
        force: true,
      });
    }

  }
}
