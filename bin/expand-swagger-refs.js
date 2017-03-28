#!/usr/bin/env node
'use strict';

const { expandFile } = require('./from-file');
const { expandstdin } = require('./from-stdin');
const args = process.argv.splice(2);

if (args.length > 0) {
  expandFile(args);
} else {
  expandstdin();
}

