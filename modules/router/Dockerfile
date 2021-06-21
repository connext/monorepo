FROM node:14.16.0-alpine3.10
WORKDIR /router
COPY ./package.json /router/
RUN npm install
ENV NODE_PATH=/usr/app/node_modules
COPY . /router/
CMD ["npm", "run", "dev"]