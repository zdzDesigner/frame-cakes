#!/bin/bash
echo "Source Building"

# config version
sed -i '.bak' 's/"version": .*,/"version": "'$PRODUCT_TAG'",/'  $(pwd)/package.json

# build
node build/product.js
