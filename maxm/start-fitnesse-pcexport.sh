#!/bin/bash
rm -rf /opt/fitnesse/FitNesseRoot
mkdir /opt/fitnesse/FitNesseRoot
ln -s /Library/Projects/git/pcexport/pcexport-acceptance-test/target /opt/fitnesse/FitNesseRoot/pcexport-lib 
ln -s /Library/Projects/git/pcexport/pcexport-acceptance-test/FitNesseRoot/PcExport /opt/fitnesse/FitNesseRoot/PcExport
java -jar /opt/fitnesse/fitnesse-standalone.jar -p 8888 &
sleep 5
read -p "Press [Enter] key to open fitnesse..."
open http://localhost:8888/PcExport