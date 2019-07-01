#!/bin/bash

find ./docs -type f ! -name '*.md' -delete
cd examples/
yarn build -d ../docs

exit 0;