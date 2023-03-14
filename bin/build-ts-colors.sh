#!/bin/bash
cd ~/projects/component-library/scripts/generate-colors
npm run generate-ts
cd ~/projects/component-library
npm run buildonly

