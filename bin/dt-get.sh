#!/bin/bash

JQEXP=".productRules | .[] | select(.id == $1) | $2"
curl --location -s --request GET 'https://validoo-test2.in-volv.com/order.api/portal/v1/decision-tree/default?d=true' | jq "$JQEXP"

