#!/bin/bash
echo "Package pcexport acceptance test for fitnesse."
cd /Library/Projects/git/pcexport/pcexport-acceptance-test 
mvn package -Pacc-test