FROM ubuntu:20.04

SHELL ["/bin/bash", "-c"]

RUN apt update
RUN apt install -y curl git

# install foundry
RUN curl -L https://foundry.paradigm.xyz | bash

RUN /root/.foundry/bin/foundryup

# need to set the directory so `forge script` can do relative imports
WORKDIR /root


# Command to start the anvil service

ENV PORT=8545
ENV CHAIN_ID=31337
ENV MNEMONIC="candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

# anvil service start
CMD "/root/.foundry/bin/anvil" --chain-id=${CHAIN_ID} --host=0.0.0.0 --port=$PORT --mnemonic="$MNEMONIC"
