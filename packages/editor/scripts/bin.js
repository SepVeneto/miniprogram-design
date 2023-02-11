#!/usr/bin/env node
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-var-requires */

const fse = require('fs-extra');
const path = require('path');

const rawArgv = process.argv.slice(2);
const args = require('minimist')(rawArgv);
const { _: execute, dir, D } = args;

execute.forEach(item => {
  switch (item) {
    case 'init': init(dir || D); break;
  }
});

function init (dir) {
  let DEST;
  if (path.isAbsolute(dir)) {
    DEST = dir;
  } else {
    DEST = path.resolve(process.env.INIT_CWD, dir, 'editor');
  }
  fse.copySync(path.resolve(__dirname, '../dist'), DEST);
}
