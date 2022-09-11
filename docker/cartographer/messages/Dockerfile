FROM node:16-alpine as node

# ----------------------------------------
# Builds Docker container for nxtp-poller package.
# @dev configuraion located ./config.json (relative to this file)

# ----------------------------------------

FROM node as build
RUN apk update
RUN apk add git curl

RUN curl -fsSL -o /usr/local/bin/dbmate https://github.com/amacneil/dbmate/releases/latest/download/dbmate-linux-amd64 && \
        chmod +x /usr/local/bin/dbmate

ENV HOME=/tmp/build \
    PATH=/tmp/build/node_modules/.bin:./node_modules/.bin:${PATH}

WORKDIR /tmp/build

ARG TEMP_DEPS_DIR

# ----- Copy only the files that affect yarn install -----
# Allows docker to use cache and skip install if dependencies are unchanged.
# Assumes that ./packages/*/package.json files have been copied to TEMP_DEPS_DIR
# with that same directory structure. build.sh does this.
COPY .yarn /tmp/build/.yarn/
COPY .yarnrc.yml /tmp/build/
COPY package.json /tmp/build/
COPY packages/agents/cartographer/poller/package.json /tmp/build/packages/agents/cartographer/poller/
COPY packages/adapters/subgraph/package.json /tmp/build/packages/adapters/subgraph/
COPY packages/utils/package.json /tmp/build/packages/utils/
COPY yarn.lock /tmp/build/

# ----- Install dependencies -----
# Install dependencies exactly as in the yarn.lock file - no updates.
RUN yarn install

# ----- Copy source and all other files that affect lint, test, build -----
COPY config config/
COPY packages/agents/cartographer/poller /tmp/build/packages/agents/cartographer/poller
COPY packages/adapters/subgraph /tmp/build/packages/adapters/subgraph
COPY packages/utils /tmp/build/packages/utils
COPY .eslintignore /tmp/build/
COPY .eslintrc.js /tmp/build/

# ----- Lint, test and build -----
RUN yarn build

# ----------------------------------------
# Copy files to the deployment image.
# ----------------------------------------

FROM node as runtime

ENV NODE_ENV=production

ARG COMMIT_HASH
ENV COMMIT_HASH ${COMMIT_HASH:-unknown}

# ----- Copy files required at runtime by the app -----
COPY --from=build --chown=node:node /tmp/build /home/node
COPY --from=build --chown=node:node /usr/local/bin/dbmate /usr/local/bin/dbmate

COPY docker/cartographer/messages/docker-entrypoint.sh /home/node/packages/agents/cartographer/poller
RUN chmod +x /home/node/packages/agents/cartographer/poller/docker-entrypoint.sh

# This user is created in the base image with uid and gid = 1000.
USER node

WORKDIR /home/node/packages/agents/cartographer/poller

CMD ./docker-entrypoint.sh
