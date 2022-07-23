#!/bin/bash

npm run build
scp -r build/* ubuntu@wandhoven.ddns.net:/media/B/html/RPG/GMTools/
#serve -s -d build
