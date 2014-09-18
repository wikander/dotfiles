#!/bin/bash
kill -9 `ps -ef | grep fitnesse/fitnesse-standalone.jar | grep -v grep | awk '{print $2}'`