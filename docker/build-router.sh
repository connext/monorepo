#!/bin/bash
set -eo pipefail
IFS=$'\n\t'

# This script is called from the GitHub action defined in build-docker-image.yml.
# It expects the working directory to be the repo root and
# uses the following environment variables:
# DOCKER_REPO - if not present, the image will be built, but not pushed.
# COMMIT_HASH - defaults to 'unknown' Image will have this value as an env var.

# Set variable values.

# @dev run from root nxtp directory w/
# [sudo] bash docker/router/build-router.sh

app_full_name=@connext/nxtp-router
app_name=nxtp-router # remove scope like "@my-org/", if any.
short_app_dir=router # i.e. packages/router to /router

if [ -z "$DOCKER_REPO" ]; then
  echo "DOCKER_REPO environment variable not set. Images will not be pulled or pushed."
  app_image="$app_name"
else
  app_image="$DOCKER_REPO/connext/$app_name"
fi

echo "COMMIT_HASH: ${COMMIT_HASH}"
echo "DOCKER_REPO: ${DOCKER_REPO}"

BUILD_IMAGE=$app_image-build
export TEMP_DEPS_DIR="./_tmp/deps"

# Copy ./packages/*/package.json files to TEMP_DEPS_DIR,
# while maintaining directory structure.
# We do this so we can take advantage of Docker caching.
rm -rf ${TEMP_DEPS_DIR}
find "./packages" -maxdepth 2 -name "package.json" | \
  sed "s|/package.json||g" | \
  xargs -I % bash -c "mkdir -p ${TEMP_DEPS_DIR}/% && cp %/package.json ${TEMP_DEPS_DIR}/%/"

if [ -n "$DOCKER_REPO" ]; then
  # Pull the latest build stage image, if it exists.
  echo "====="
  echo "= Pull the latest build stage image"
  echo "====="
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
  --build-arg APP_NAME="${app_full_name}" \
  --file ./docker/router/Dockerfile \
  .

if [ -n "$DOCKER_REPO" ]; then
  # Push the build stage image to the working repo.
  echo "====="
  echo "= Push the build stage image"
  echo "====="
  docker push "${BUILD_IMAGE}":latest
fi

echo "====="
echo "= Check images list"
echo "====="
docker image ls

if [ -n "$DOCKER_REPO" ]; then
  # Pull the latest app image, if it exists.
  echo "====="
  echo "= Pull the latest app image"
  echo "====="
  docker pull "${app_image}":latest || \
    echo "No existing image found for ${app_image}:latest"
fi

# Get tag if available
if [ -n "$COMMIT_HASH" ]; then
  FULL_TAG=$(git tag --contains "$COMMIT_HASH" | tail -n1)
  echo "Full tag: $FULL_TAG"
fi

# Build the app image.
echo "====="
echo "= Build the app image and push to registry"
echo "====="

docker build \
    --cache-from "${app_image}":latest \
    --cache-from "${BUILD_IMAGE}":latest \
    --tag "${app_image}":latest \
    --build-arg TEMP_DEPS_DIR=${TEMP_DEPS_DIR} \
    --build-arg APP_NAME="${app_full_name}" \
    --build-arg SHORT_APP_DIR="${short_app_dir}" \
    --file ./docker/router/Dockerfile \
    .

# tag images
docker tag "${app_image}":latest "${app_name}":latest
if [ -n "$FULL_TAG" ]; then
  docker tag "${app_image}":latest "${app_image}":"${FULL_TAG}"
fi

if [ -n "$COMMIT_HASH" ]; then
  docker tag "${app_image}":latest "${app_image}":"${COMMIT_HASH}"
fi

echo "====="
echo "= Check images list"
echo "====="
docker image ls

if [ -n "$DOCKER_REPO" ]; then
  # Push the app image to the working repo.
  echo "====="
  echo "= Push the app image"
  echo "====="
  docker push "${app_image}":latest

  if [ -n "$FULL_TAG" ]; then
    docker push "${app_image}":"${FULL_TAG}"
  fi

  if [ -n "$COMMIT_HASH" ]; then
    docker push "${app_image}":"${COMMIT_HASH}"
  fi
else
  echo "DOCKER_REPO not configured, will not push"
fi
