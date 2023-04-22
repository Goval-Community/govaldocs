#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

rm -rf out/
mkdir out
node render.js
cp -r public/* out
rm out/script.js
cp views/404.html out/404.html