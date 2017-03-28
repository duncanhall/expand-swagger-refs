'use strict';

/**
 * Return a copy of the input with $ref values expanded.
 *
 * @param   {object} input  A Swagger schema object
 * @returns {object}        A copy of the input with $ref values expanded
 */
function expanded(input) {
  return expand(Object.assign({}, input));
};

/**
 * Expands a schema in-place (mutates the input).
 *
 * @param   {object} input    A Swagger schema object
 * @param   {object} current  The schema property to expand
 * @param   {object} cache    Map of $ref values
 * @returns {object}          The original input, with $ref values expanded
 */
function expand(input, current = null, cache = {}) {
  current = current || input;
  Object.keys(current).forEach(child => {
    if (child === '$ref') {
      Object.assign(current, getReferenceValue(input, current[child], cache));
      delete current.$ref;
    }
    else if (typeof current[child] === 'object') {
      expand(input, current[child], cache);
    }
  });
  return input;
}

/**
 * Memoized lookup of $ref values by name.
 *
 * @param   {object} input  A Swagger schema object
 * @param   {String} name   The reference name to lookup
 * @param   {object} cache  Map of cached $ref values
 * @returns {object}        The value of the named $ref   
 */
function getReferenceValue(input, name, cache) {
  if (cache.hasOwnProperty(name)) {
    return cache[name];
  } else {
    const [ref, ...valuePath] = name.split('/');
    const value = valuePath.reduce((parent, key) => parent[key], input);
    cache[name] = value;
    return value;
  }
}

module.exports = { expand, expanded };

