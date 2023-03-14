#!/bin/bash
cd ~/projects/pwa/devserver/mocks
if [ "$1" != "" ]; then
    URL="https://www.avanza.se/${1}"
    echo "Creating mock from " $URL
    mkdir -p -- "$1"
    cd -P -- "$1"
    curl --request GET \
        --url $URL \
        --header 'Content-Type: application/json' \
        --output GET.json
else
    echo "Please give me a path not starting with /"
fi
