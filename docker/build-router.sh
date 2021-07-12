#!/bin/bash
set -eo pipefail
IFS=$'\n\t'

# This script is called from the GitHub action defined in build-docker-image.yml.
# It expects the working directory to be the repo root and
# uses the following environment variables:
# DOCKER_REPO - if not present, the image will be built, but not pushed.
# COMMIT_HASH - defaults to 'unknown' Image will have this value as an env var.

# Set defaults.

COMMIT_HASH=${COMMIT_HASH:-unknown}

# Set variable values.

APP_FULL_NAME=@connext/nxtp-router
APP_NAME=nxtp-router # remove scope like "@my-org/", if any.
APP_DIR=packages/router
SHORT_APP_DIR=router # i.e. packages/router to /router

if [ -z "$DOCKER_REPO" ]; then
  echo "DOCKER_REPO environment variable not set. Images will not be pulled or pushed."
  APP_IMAGE="$APP_NAME"
else
  APP_IMAGE="$DOCKER_REPO/connext/$APP_NAME"
fi

BUILD_IMAGE=$APP_IMAGE-build
export TEMP_DEPS_DIR="./_tmp/deps"

# Copy ./packages/*/package.json files to TEMP_DEPS_DIR,
# while maintaining directory structure.
# We do this so we can take advantage of Docker caching.
rm -rf ${TEMP_DEPS_DIR}
find "./packages" -maxdepth 2 -name "package.json" | \
  sed "s|/package.json||g" | \
  xargs -I % bash -c "mkdir -p ${TEMP_DEPS_DIR}/% && cp %/package.json ${TEMP_DEPS_DIR}/%/"

# Pull the latest build stage image, if it exists.
echo "====="
echo "= Pull the latest build stage image"
echo "====="
if [ -n "$DOCKER_REPO" ]; then
  docker pull "${BUILD_IMAGE}":latest || \
    echo "No existing image found for ${BUILD_IMAGE}:latest"
fi

# Build the build stage image.
echo "====="
echo "= Build the build stage image and push to registry"
echo "====="
docker build \
  --target build \
  --cache-from "${BUILD_IMAGE}":latest \
  --tag "${BUILD_IMAGE}":latest \
  --build-arg TEMP_DEPS_DIR=${TEMP_DEPS_DIR} \
  --build-arg APP_NAME="${APP_FULL_NAME}" \
  --build-arg APP_DIR="${APP_DIR}" \
  --build-arg COMMIT_HASH="${COMMIT_HASH}" \
  --build-arg SHORT_APP_DIR="${SHORT_APP_DIR}" \
  --file ./docker/Dockerfile \
  .

# Push the build stage image to the working repo.
echo "====="
echo "= Push the build stage image"
echo "====="
if [ -n "$DOCKER_REPO" ]; then
  docker push "${BUILD_IMAGE}":latest
fi

echo "====="
echo "= Check images list"
echo "====="
docker image ls

# Pull the latest app image, if it exists.
echo "====="
echo "= Pull the latest app image"
echo "====="
if [ -n "$DOCKER_REPO" ]; then
  docker pull "${APP_IMAGE}":latest || \
    echo "No existing image found for ${APP_IMAGE}:latest"
fi

# Get tag if available
FULL_TAG=$(git tag --contains $COMMIT_HASH | tail -n1)
echo "Full tag: $FULL_TAG"

# Build the app image.
echo "====="
echo "= Build the app image and push to registry"
echo "====="

if [ -n "$FULL_TAG" ]; then
  docker build \
    --cache-from "${APP_IMAGE}":latest \
    --cache-from "${BUILD_IMAGE}":latest \
    --tag "${APP_IMAGE}":latest \
    --tag "${APP_IMAGE}":"${COMMIT_HASH}" \
    --tag "${APP_IMAGE}":"${FULL_TAG}" \
    --build-arg TEMP_DEPS_DIR=${TEMP_DEPS_DIR} \
    --build-arg APP_NAME="${APP_FULL_NAME}" \
    --build-arg APP_DIR="${APP_DIR}" \
    --build-arg COMMIT_HASH="${COMMIT_HASH}" \
    --build-arg SHORT_APP_DIR="${SHORT_APP_DIR}" \
    --file ./docker/Dockerfile \
    .
else
  docker build \
    --cache-from "${APP_IMAGE}":latest \
    --cache-from "${BUILD_IMAGE}":latest \
    --tag "${APP_IMAGE}":latest \
    --tag "${APP_IMAGE}":"${COMMIT_HASH}" \
    --build-arg TEMP_DEPS_DIR=${TEMP_DEPS_DIR} \
    --build-arg APP_NAME="${APP_FULL_NAME}" \
    --build-arg APP_DIR="${APP_DIR}" \
    --build-arg COMMIT_HASH="${COMMIT_HASH}" \
    --build-arg SHORT_APP_DIR="${SHORT_APP_DIR}" \
    --file ./docker/Dockerfile \
    .
fi

echo "====="
echo "= Check images list"
echo "====="
docker image ls

# Push the app image to the working repo.
echo "====="
echo "= Push the app image"
echo "====="
if [ -n "$DOCKER_REPO" ]; then
  if [ -n "$FULL_TAG" ]; then
    docker push "${APP_IMAGE}":latest
    docker push "${APP_IMAGE}":"${COMMIT_HASH}"
    docker push "${APP_IMAGE}":"${FULL_TAG}"
  else
    docker push "${APP_IMAGE}":latest
    docker push "${APP_IMAGE}":"${COMMIT_HASH}"
  fi

fi
