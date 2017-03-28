#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { expanded } = require('../index.js')

function expandFile(args) {
  const inputFile = args[0];
  const overwrite = args.includes('-o');
  
  let permissions = fs.constants.R_OK;
  if (overwrite) permissions |= fs.constants.W_OK;
  
  fs.access(inputFile, permissions, (error) => {
    if (error) {
      console.error(`Could not open file '${error.path}'. If the file exists, check you have the required permissions.`);
      return process.exit(2);
    } else {

      if (overwrite) {
        expand(inputFile, inputFile)
      } else {
        const ext = path.extname(inputFile);
        const basename = path.basename(inputFile, ext);
        const outputFile = path.join(path.dirname(inputFile), `${basename}-expanded${ext}`);
        expand(inputFile, outputFile)
      }
    }
  });
}

function expand(inputFile, outputFile) {
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

module.exports = { expandFile };
