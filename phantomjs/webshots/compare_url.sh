#!/usr/bin/env bash

URL_ONE=$1
URL_TWO=$2
echo $URL_ONE "jämförs med" $URL_TWO
phantomjs screenshot.js "$URL_ONE" compare first
phantomjs screenshot.js "$URL_TWO" compare second

cd compare
compare ./first.png ./second.png ./result.png
