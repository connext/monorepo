FROM consensys/web3signer:develop

USER root

RUN DEBIAN_FRONTEND=noninteractive \
     apt-get update -y && \
     apt-get install jq -y

ENV KEY_PATH=/opt/web3signer/config
RUN mkdir -p "$KEY_PATH/local"

COPY --chown=web3signer:web3signer local-config.template.yaml $KEY_PATH
COPY --chown=web3signer:web3signer prepare-config.sh ./
COPY --chown=web3signer:web3signer docker-entrypoint.sh ./

RUN chown -R web3signer:web3signer /opt/web3signer && \
    chmod 744 docker-entrypoint.sh prepare-config.sh

user web3signer

ENTRYPOINT bash ./docker-entrypoint.sh