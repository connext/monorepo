#!/bin/bash

rm -f "${KEY_PATH}/local-config.yaml" "${KEY_PATH}/temp.yml"
( echo "cat <<EOF >${KEY_PATH}/local/local-config.yaml";
  cat "${KEY_PATH}/local-config.template.yaml";
  echo "EOF";
) >"${KEY_PATH}/temp.yml"
. "${KEY_PATH}/temp.yml"

