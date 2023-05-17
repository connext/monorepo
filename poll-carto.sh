#!/bin/bash

# Get the value of ITERATIONS or set it to 10 if not provided
ITERATIONS=${ITERATIONS:-10}

# Loop through the iterations
for ((i=1; i<=ITERATIONS; i++))
do
  yarn workspace @connext/cartographer-poller start:transfers

  # Check the exit status of the test command
  if [ $? -ne 0 ]; then
    echo "Test failed. Exiting iterations."
    break
  fi
done