#!/bin/bash
source ~/.nvm/nvm.sh;
npm run build
pushd dist/component-library
npm link
popd
npm run start-public

