Docker directories named according to Connext packages.

Config.json located in the root of each project's docker ie (repo-root)/docker/<project name> controlls how the packages will be configured. for examples see (repo-root)/packages/examples.config.json

- router (pretty much just runs the router as configured).

- integration

Building:
(from the repo root directory):
ex.
`[sudo] bash docker/router/build-router.sh`

Running:
ex.
`<ENV variables> [sudo] docker run -d --name router router`
