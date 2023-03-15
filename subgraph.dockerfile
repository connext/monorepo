FROM node:18-alpine
WORKDIR /app
COPY . .
COPY setup_subgraph.sh /usr/local/bin/setup_subgraph.sh
RUN apk add --no-cache --upgrade bash
CMD ["sh", "/usr/local/bin/setup_subgraph.sh"]