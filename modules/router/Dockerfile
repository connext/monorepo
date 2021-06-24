FROM node:14.17.1-alpine3.13 as base
LABEL website="Secure Docker Images https://secureimages.dev"
LABEL description="We secure your business from scratch"
LABEL maintainer="support@secureimages.dev"

ARG CI=true

RUN apk add --no-cache bash git ca-certificates build-base python3 &&\
    rm -rf /var/cache/apk/* /tmp/*

WORKDIR /app

COPY package*.json ./

RUN npm audit --audit-level=critical

RUN npm install --no-fund

RUN npm outdated || true

COPY . .
RUN npm run build

# CMD ["sleep", "3d"]
################################################################################

FROM node:14.17.1-alpine3.13 as runtime
LABEL website="Secure Docker Images https://secureimages.dev"
LABEL description="We secure your business from scratch"
LABEL maintainer="support@secureimages.dev"

ENV NODE_ENV=production \
    PATH="/app/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

WORKDIR /app

COPY --from=base --chown=node:node /app .

USER node

CMD ["npm", "run", "prod"]