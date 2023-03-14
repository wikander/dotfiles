#!/bin/bash
cd ~/Projects/mock-data/scripts
deno run --unstable --allow-net --allow-read --allow-run mockserver.ts
