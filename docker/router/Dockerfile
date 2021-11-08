FROM node:14-alpine3.11 as node

# ----------------------------------------
# Builds Docker container for nxtp-router package.
# @dev configuraion located ./config.json (relative to this file)


# ----------------------------------------

FROM node as build

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
COPY yarn.lock /tmp/build/
COPY package.json /tmp/build/
COPY ${TEMP_DEPS_DIR} /tmp/build/

# ----- Install dependencies -----
# Install dependencies exactly as in the yarn.lock file - no updates.
RUN yarn install --immutable

# ----- Copy source and all other files that affect lint, test, build -----
COPY config config/
COPY packages packages/
COPY .eslintignore ./
COPY .eslintrc.js ./

# ----- Lint, test and build -----
# RUN yarn build:all

# ----- Bundle the app for deployment -----
ARG APP_NAME
RUN yarn workspaces focus --production ${APP_NAME}
RUN yarn dlx -p @jtbennett/ts-project-scripts tsp bundle $APP_NAME --out-dir /tmp/bundle


# ----------------------------------------
# Copy files to the deployment image.
# ----------------------------------------

FROM node as runtime

ENV NODE_ENV=production \
    PORT=8001

ARG COMMIT_HASH
ENV COMMIT_HASH ${COMMIT_HASH:-unknown}

# ----- Copy files required at runtime by the app -----
COPY --from=build --chown=node:node /tmp/bundle /home/node
#copy config
COPY docker/router/config.json /home/node/router/config.json

# This user is created in the base image with uid and gid = 1000.
USER node

ARG SHORT_APP_DIR
WORKDIR /home/node/${SHORT_APP_DIR}

EXPOSE 8001


CMD ["node", "--trace-warnings", "dist/index.js"]
