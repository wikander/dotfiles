#!/bin/bash
echo "mvn ACC-TEST PCEXPORT"
mvn -f pcexport-acceptance-test/pom.xml verify -Pacc-test -Dassemble=true