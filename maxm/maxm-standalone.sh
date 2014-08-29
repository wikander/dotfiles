#!/bin/bash
## Lägg denna fil i /export/jboss7_installations/default-node/bin /Siomon
echo =========================================================================
echo Redploying all war/rar files in deploment directory
echo =========================================================================
cd /export/jboss7_installations/default-node/bin
./force_redeploy_all.sh
echo =========================================================================
echo 
echo Starting JBoss application server with Maxm settings
echo 
echo =========================================================================
echo
./standalone.sh -c standalone-maxm.xml -Dlinda_cluster_name=local-$USER-cluster $@