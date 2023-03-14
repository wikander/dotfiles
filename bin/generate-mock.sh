#!/bin/zsh
cd ~/Projects/mock-data/scripts/generate
PATH=../../"$1".blueprint.json
echo $PATH
/usr/local/bin/deno run --allow-read --allow-write index.ts $PATH
