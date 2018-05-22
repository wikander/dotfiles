#!/bin/bash

if [ $# -ne 1 ]; then
  echo $0: usage: myscript name
  exit 1
else
  echo $@
fi
