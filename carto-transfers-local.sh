#!/bin/bash

for i in {1..10000}
do
   yarn workspace @connext/cartographer-poller start:transfers
done