#!/bin/bash
MAXCUST_PATH="/Users/simonw/projects/git/maxcust"
SCHEMA_PATH="$MAXCUST_PATH/schema"
pushd $SCHEMA_PATH 
 psql -c "drop database kund"
psql -f database_mac.sql
psql kund -f schema.sql
psql kund -f tables.sql
psql kund -f base_data.sql
psql kund -f example_data.sql
popd

