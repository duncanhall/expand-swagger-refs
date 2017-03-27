#!/usr/bin/env node
'use strict';

const fs = require('fs');
const { expanded } = require('../index.js')
const args = process.argv.splice(2);
const inputFile = args[0];

if (inputFile === undefined) {
  console.error('You must specify an input file');
  return process.exit(1);
}

fs.access(inputFile, fs.constants.R_OK, (error) => {
  if (error) {
    console.error(`Could not read file '${error.path}'. If the file exists, check you have permission to read it.`);
    return process.exit(2);
  } else {
    console.log('File is fine');
  }
});

function expandFile() {

}

