#!/bin/bash
echo "Running yarn and building all packages..."
yarn
yarn build:all
echo "Build done."

echo "Docker: building sequencer-server, sequencer-publisher and sequencer-subscriber images..."
docker build --tag sequencer-server:latest --file ./docker/sequencer/server/Dockerfile .
docker build --tag sequencer-publisher:latest --file ./docker/sequencer/publisher/Dockerfile .
docker build --tag sequencer-subscriber:latest --file ./docker/sequencer/subscriber/Dockerfile .

echo "Docker: building router-publisher, router-subscriber and router-executor images..."
docker build --tag router-publisher:latest --file ./docker/router/publisher/Dockerfile .
docker build --tag router-subscriber:latest --file ./docker/router/subscriber/Dockerfile .
docker build --tag router-executor:latest --file ./docker/router/executor/Dockerfile .

echo "Docker: building relayer image..."
docker build --tag relayer:latest --file ./docker/relayer/Dockerfile .

echo "Docker: building lighthouse image..."
docker build --tag lighthouse:latest --file ./docker/lighthouse/Dockerfile .

echo "Docker: building cartographer-transfers and cartographer-routers images..."
docker build --tag cartographer-transfers:latest --file ./docker/cartographer/transfers/Dockerfile .
docker build --tag cartographer-routers:latest --file ./docker/cartographer/routers/Dockerfile .

echo "Docker: building db image..."
docker build --tag db:latest --file ./docker/db/Dockerfile .
