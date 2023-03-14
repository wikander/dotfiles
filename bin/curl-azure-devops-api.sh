#!/bin/bash


MY_PAT=ihaucb7orw3iuqurudqm3y4krxn64ufmspprqehwxlpg47kipxlq
B64_PAT=$(printf "%s"":$MY_PAT" | base64)

echo $B64_PAT

curl --location --request GET 'https://dev.azure.com/validoo-ts/_apis/projects?api-version=5.0' \
--header 'Authorization: Basic ${B64_PAT}'
