#!/bin/zsh

export PATH=/Users/preetham/.nvm/versions/node/v18.3.0/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/preetham/.foundry/bin:$PATH

cd /Users/preetham/connext/repo/ld_test/monorepo/

LOCKFILE=/Users/preetham/connext/load_test/lock/cron_optimism.lock

if [ -e ${LOCKFILE} ] && kill -n 0 `cat ${LOCKFILE}`
then
    echo "already running"
    exit
fi

trap "rm -f ${LOCKFILE}; exit" INT TERM EXIT
echo $$ > ${LOCKFILE}


echo "START"
/Users/preetham/.nvm/versions/node/v18.3.0/bin/yarn workspace @connext/smart-contracts hardhat xcall --asset "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF" --amount "10000000000000000000"  --destination "1735353714" --network "optimism-goerli" --env "production" --runs 1  --accounts 20 --relayer--fee-in-transacting 44000000000000000000  --show-args true
/Users/preetham/.nvm/versions/node/v18.3.0/bin/yarn workspace @connext/smart-contracts hardhat xcall --asset "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF" --amount "10000000000000000000"  --destination "9991" --network "optimism-goerli" --env "production" --runs 1  --accounts 20 --relayer--fee-in-transacting 44000000000000000000  --show-args true 
/Users/preetham/.nvm/versions/node/v18.3.0/bin/yarn workspace @connext/smart-contracts hardhat xcall --asset "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF" --amount "10000000000000000000"  --destination "1734439522" --network "optimism-goerli" --env "production" --runs 1  --accounts 20 --relayer--fee-in-transacting 44000000000000000000  --show-args true 

#sleep 1
echo "END"

rm -f ${LOCKFILE}
