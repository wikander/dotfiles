#!/bin/bash
cd ~/projects/component-library/scripts/generate-colors/
./node_modules/.bin/webpack-dev-server --host 0.0.0.0 --https=true --config devserver/webpack.devserver.js
