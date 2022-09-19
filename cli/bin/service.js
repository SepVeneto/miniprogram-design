#!/usr/bin/env node

const server = require('../scripts/server')
const rawArgv = process.argv.slice(2)

const args = require('minimist')(rawArgv)

server()
