#!/bin/bash
curl https://avanza.se/marketing/sem-orderbook-export |
    awk '\
    BEGIN   { FS="\t"; print "id,name"} \
            { gsub(/[\"]*/, "", $2) } \
            NR>1 { print $1 "," $2} \
    ' > orderbookname.csv
