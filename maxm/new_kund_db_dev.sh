#!/bin/bash
MAXCUST_PATH="/Users/simonw/projects/git/maxcust"
SCHEMA_PATH="$MAXCUST_PATH/schema"
pushd $SCHEMA_PATH 
psql -h postgres-test.maxm.se -p 5432 -U postgres -c "drop schema kund cascade" kund_dev
psql -h postgres-test.maxm.se -p 5432 -U postgres kund_dev -f schema.sql
psql -h postgres-test.maxm.se -p 5432 -U postgres kund_dev -f tables.sql
psql -h postgres-test.maxm.se -p 5432 -U postgres kund_dev -f base_data.sql
psql -h postgres-test.maxm.se -p 5432 -U postgres kund_dev -f example_data.sql
popd

