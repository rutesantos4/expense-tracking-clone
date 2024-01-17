#!/usr/bin/env bash

keyout=./server.key
certout=./server.crt
config=./certdef.cnf
duration=365

openssl req -newkey rsa:2048 -x509 -nodes -keyout $keyout -new -out $certout -config $config -sha256 -days $duration