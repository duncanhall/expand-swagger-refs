'use strict';

const assert = require('assert');
const testData = require('./data/input');

describe('Expand Swagger Refs', function() {
  
  let expandRefs;
  beforeEach(() => expandRefs = require('../index.js'))
  
  testData.forEach(test => {
    it(test.title, () => {
      const result = expandRefs.expandSchema(test.input);
      assert.deepEqual(result, test.output)
    })
  })
});

