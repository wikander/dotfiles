#!/bin/bash
echo "mvn clean install NO TEST"
mvn clean install -Dmaven.test.skip=true
