#!/bin/bash

rm -rf docs/
cd examples/
yarn build --public-url . -d ../docs --no-source-maps

exit 0;