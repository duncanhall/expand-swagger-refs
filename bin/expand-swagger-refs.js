#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
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
    const ext = path.extname(inputFile);
    const basename = path.basename(inputFile, ext);
    const outputFile = path.join(path.dirname(inputFile), `${basename}-expanded${ext}`);
    expandFile(inputFile, outputFile)
  }
});

function expandFile(inputFile, outputFile) {
  fs.readFile(inputFile, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      const contents = JSON.parse(data);
      writeFile(outputFile, contents)
    }
  })
}

function writeFile(outputFile, contents) {
  fs.writeFile(outputFile, JSON.stringify(contents), (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Expanded file written to ${outputFile}`);
    }
  })
}

