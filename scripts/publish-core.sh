#!/bin/bash

set -e

pnpm i --frozen-lockfile --registry=https://registry.npmmirror.com

cd packages/core

sed -i "s/\"version\": \"0.2.0\",/\"version\": \"$TAG_VERSION\",/" package.json

pnpm build

pnpm publish --no-git-checks --access public

echo "✅ Publish completed"
