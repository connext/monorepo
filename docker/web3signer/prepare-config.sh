#!/bin/bash


rm -f "${KEY_PATH}/aws-config.yaml" "${KEY_PATH}/temp.yml"
( echo "cat <<EOF >${KEY_PATH}/aws/aws-config.yaml";
  cat "${KEY_PATH}/aws-config.template.yaml";
  echo "EOF";
) >"${KEY_PATH}/temp.yml"
. "${KEY_PATH}/temp.yml"
cat "${KEY_PATH}/aws/aws-config.yaml"
