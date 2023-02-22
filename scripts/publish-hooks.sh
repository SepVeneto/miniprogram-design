#!/bin/bash

set -e

pnpm i --frozen-lockfile --registry=https://registry.npmmirror.com

cd packages/hooks

pnpm build

pnpm publish --no-git-checks --access public

echo "✅ Publish completed"
