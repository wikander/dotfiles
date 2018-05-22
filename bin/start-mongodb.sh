#!/bin/bash
echo "Starting Mongo Db"
cd /Users/simonwikander/projects/kth/mongo
mongod --bind_ip 127.0.0.1 --sslMode requireSSL --sslPEMKeyFile mongo.cert
