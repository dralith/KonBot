#!/bin/bash
running=1;
cd /home/steve/KonBot/
while [ $running -gt 0 ]
do
    node ./main.js dralith penguintat
done
