#!/usr/bin/env bash

set -e

SERVICE="$SERVICE$1"
ROUTER_PUBLISHER="router-publisher"
ROUTER_SUBSCRIBER="router-subscriber"
SEQUENCER_SERVER="sequencer-server"
SEQUENCER_PUBLISHER="sequencer-publisher"
SEQUENCER_SUBSCRIBER="sequencer-subscriber"


if [[ "${SERVICE}" == "${ROUTER_PUBLISHER}" ]]
then
  PORT=8880
elif [[ "${SERVICE}" == "${ROUTER_SUBSCRIBER}" ]]
then
  PORT=8881
elif [[ "${SERVICE}" == "${SEQUENCER_SERVER}" ]]
then
  PORT=8882
elif [[ "${SERVICE}" == "${SEQUENCER_PUBLISHER}" ]]
then
  PORT=8883
elif [[ "${SERVICE}" == "${SEQUENCER_SUBSCRIBER}" ]]
then
  PORT=8884
else
  echo "Wrong service name"
  exit 1
fi

echo "Testing for connectivity for service ${SERVICE} at port ${PORT}"

function wait_for_service() {
    local attempt=1

    until curl -f --max-time 1 "http://localhost:${PORT}/ping" &>/dev/null; do
        echo "${attempt}/60: Service not up, sleeping ${attempt} seconds..."
        sleep ${attempt}
        attempt=$((attempt + 1))
        if [[ ${attempt} == 60 ]]
        then
            echo -e "\033[31mERROR\033[m: Waited too long for ${SERVICE} to become available!"
            exit 1
        fi
    done
}

wait_for_service