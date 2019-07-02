#!/bin/bash

find ./docs/ -type f ! -name '*.md' -delete
cd ./examples/
yarn build --no-source-maps -d ../docs/

exit 0;