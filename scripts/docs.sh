#!/bin/bash

rm -rf docs/
cd examples/
yarn build -d ../docs --no-source-maps

exit 0;