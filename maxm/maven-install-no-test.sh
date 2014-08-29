#!/bin/bash
echo "mvn clean install NO TEST"
mvn clean install -P MaxM-local -Dmaven.test.skip=true