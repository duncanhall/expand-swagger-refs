'use strict';

const assert = require('assert');

describe('Expand Swagger Refs', function() {
  
  let expandRefs;
  beforeEach(() => expandRefs = require('../index.js'))
  
  const TESTS = [
    { title: 'simple expansion', input:'simple_input.json', expanded:'simple_output.json'},
    { title: 'multiple references', input:'multi_references_input.json', expanded:'multi_references_output.json'},
    { title: 'complex expansion', input:'complex_input.json', expanded:'complex_output.json'},
  ]

  TESTS.forEach(test => {
    it(test.title, () => {
      const input = require(`./data/${test.input}`);
      const expected = require(`./data/${test.expanded}`);
      const result = expandRefs.expanded(input);
      assert.deepEqual(result, expected)
    })
  })
});

