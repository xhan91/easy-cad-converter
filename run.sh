#!/bin/sh

cd /opt
# logs are at /root/log
npm run start >> /root/log/script.log 2>&1 &

while true
do
    sleep 3600
done