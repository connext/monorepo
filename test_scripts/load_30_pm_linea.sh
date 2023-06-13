#!/bin/zsh

export PATH=/Users/preetham/.nvm/versions/node/v18.3.0/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/preetham/.foundry/bin:$PATH

cd /Users/preetham/connext/repo/ld_test/monorepo/

LOCKFILE=/Users/preetham/connext/load_test/lock/cron_linea.lock

if [ -e ${LOCKFILE} ] && kill -n 0 `cat ${LOCKFILE}`
then
    echo "already running"
    exit
fi

trap "rm -f ${LOCKFILE}; exit" INT TERM EXIT
echo $$ > ${LOCKFILE}

echo "START"
/Users/preetham/.nvm/versions/node/v18.3.0/bin/yarn workspace @connext/smart-contracts hardhat xcall --asset "0xB706319D37b945727E71ae0d4353699d19112576" --amount "100"  --destination "1735353714" --network "consensys" --env "production" --runs 1  --accounts 20 --relayer--fee-in-transacting 44000000000000000000  --show-args true
/Users/preetham/.nvm/versions/node/v18.3.0/bin/yarn workspace @connext/smart-contracts hardhat xcall --asset "0xB706319D37b945727E71ae0d4353699d19112576" --amount "100"  --destination "9991" --network "consensys" --env "production" --runs 1  --accounts 20 --relayer--fee-in-transacting 44000000000000000000  --show-args true 
/Users/preetham/.nvm/versions/node/v18.3.0/bin/yarn workspace @connext/smart-contracts hardhat xcall --asset "0xB706319D37b945727E71ae0d4353699d19112576" --amount "100"  --destination "1735356532" --network "consensys" --env "production" --runs 1  --accounts 20  --relayer--fee-in-transacting 44000000000000000000  --show-args true
/Users/preetham/.nvm/versions/node/v18.3.0/bin/yarn workspace @connext/smart-contracts hardhat xcall --asset "0xB706319D37b945727E71ae0d4353699d19112576" --amount "100"  --destination "1734439522" --network "consensys" --env "production" --runs 1  --accounts 20  --relayer--fee-in-transacting 44000000000000000000  --show-args true

#sleep 1
echo "END"

rm -f ${LOCKFILE}
