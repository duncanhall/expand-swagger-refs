#!/usr/bin/env node
'use strict';

const { expanded } = require('../index');

function expandstdin() {
  const stdin = process.stdin;
  const stdout = process.stdout;
  const data = [];
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', data.push.bind(data));
  stdin.on('end', function () {
    const parsedData = JSON.parse(data.join(''));
    const expandedData = expanded(parsedData);
    const output = JSON.stringify(expandedData, null);
    stdout.write(output);
    stdout.write('\n');
  });
}

module.exports = { expandstdin };

