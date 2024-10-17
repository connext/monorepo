Docker directories named according to NXTP packages.

Config.json located in the root of each project's docker ie (repo-root)/docker/<nxtp project name> controls how the packages will be configured. For examples see (repo-root)/packages/examples.config.json

- router (pretty much just runs the router as configured).

- integration

Run everything from the root directory.

Build:

```
docker build -f docker/sdk-server/Dockerfile -t sdk-server .
```

> NOTE: If you are using an M1/M2 mac, you must provide the flag "`--platform linux/amd64`"! Also if you are using Docker Desktop, make sure you turn ON the "Use Virtualization framework" option in Settings > General and turn OFF the "Use Rosetta for x86/amd64 emulation on Apple Silicon" option in Settings > Features in development.

Run:

```
docker run -it sdk-server
```
