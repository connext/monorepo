#!/usr/bin/env bash

set -e

SERVICE="$SERVICE$1"
<<<<<<< HEAD
SEQUENCER_PUBLISHER="sequencer-publisher"
=======
SEQUENCER="sequencer"
>>>>>>> feat/rmq-fargate-deployment
ROUTER_PUBLISHER="router-publisher"
ROUTER_SUBSCRIBER="router-subscriber"


if [[ "${SERVICE}" == "${ROUTER_PUBLISHER}" ]]
then
  PORT=8080
elif [[ "${SERVICE}" == "${ROUTER_SUBSCRIBER}" ]]
then
  PORT=8090
<<<<<<< HEAD
elif [[ "${SERVICE}" == "${SEQUENCER_PUBLISHER}" ]]
=======
elif [[ "${SERVICE}" == "${SEQUENCER}" ]]
>>>>>>> feat/rmq-fargate-deployment
then
  PORT=8081
else
  echo "Wrong service name"
  exit 1
fi

echo "Testing for connectivity for service ${SERVICE} at port ${PORT}"

function wait_for_service() {
    local attempt=1

    until curl -f --max-time 1 "http://localhost:${PORT}/ping" &>/dev/null; do
        echo "${attempt}/12: Service not up, sleeping ${attempt} seconds..."
        sleep ${attempt}
        attempt=$((attempt + 1))
        if [[ ${attempt} == 12 ]]
        then
            echo -e "\033[31mERROR\033[m: Waited too long for ${SERVICE} to become available!"
            exit 1
        fi
    done
}

wait_for_service