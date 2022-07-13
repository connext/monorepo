FROM node:16.15.1-alpine

RUN apk update

COPY .yarn .yarn/
COPY .yarnrc.yml /tmp/build/
COPY docker/chain/package.json .
COPY docker/chain/hardhat.config.js .
RUN yarn add hardhat
RUN touch yarn.lock

RUN yarn install

CMD ["npx", "hardhat", "node"]
