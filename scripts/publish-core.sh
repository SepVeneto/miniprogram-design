#!/bin/bash

set -e

pnpm i --frozen-lockfile --registry=https://registry.npmmirror.com

cd packages/core

pnpm build

pnpm publish --no-git-checks --access public

echo "✅ Publish completed"
