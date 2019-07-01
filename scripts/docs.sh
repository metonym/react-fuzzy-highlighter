#!/bin/bash

rm -rf docs/
cd examples/
yarn build -d ../docs

exit 0;