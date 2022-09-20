#!/bin/bash

npm run build
cp ./.htaccess ./build/.htaccess
ssh ubuntu@wandhoven.ddns.net "rm -r /media/B/html/RPG/GMTools"
scp -r build ubuntu@wandhoven.ddns.net:/media/B/html/RPG/GMTools

