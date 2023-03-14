#!/bin/bash
echo "Name of the app?"
read APP_NAME
ng new $APP_NAME --prefix aza --routing true --style scss
