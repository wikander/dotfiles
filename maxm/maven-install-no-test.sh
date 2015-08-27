#!/bin/bash
echo "mvn clean install NO TEST"
mvn clean install -Plocal-server -Dmaven.test.skip=true