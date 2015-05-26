#!/bin/bash
echo =========================================================================
echo Redploying all war/rar files in deploment directory
echo =========================================================================
cd /export/wildfly_installations/local/bin
./force_redeploy_all.sh
echo =========================================================================
echo 
echo Starting JBoss application server with Maxm Development settings
echo 
echo =========================================================================
echo
./standalone.sh --debug 8787 -c standalone-maxm.xml -P=maxm.properties -Dlinda_cluster_name=local-$USER-cluster $@