FROM consensys/web3signer:develop

USER root

RUN DEBIAN_FRONTEND=noninteractive \
     apt-get update -y && \
     apt-get install jq -y

ENV KEY_PATH=/opt/web3signer/config
RUN mkdir -p "$KEY_PATH/aws"

COPY aws-config.template.yaml $KEY_PATH
COPY prepare-config.sh ./
COPY docker-entrypoint.sh ./

RUN chmod +x docker-entrypoint.sh prepare-config.sh
RUN ./prepare-config.sh

user web3signer

ENTRYPOINT bash ./docker-entrypoint.sh