'use strict';

function expanded(input) {
  return expand(Object.assign({}, input));
};

function expand(source, current = null, cache = {}) {
  current = current || source;
  Object.keys(current).forEach(child => {
    if (child === '$ref') {
      Object.assign(current, getReferenceValue(source, current[child], cache));
      delete current.$ref;
    }
    else if (typeof current[child] === 'object') {
      expand(source, current[child], cache);
    }
  });
  return source;
}

function getReferenceValue(source, refName, cache) {
  if (cache.hasOwnProperty(refName)) {
    return cache[refName];
  } else {
    const [ref, ...valuePath] = refName.split('/');
    const value = valuePath.reduce((parent, key) => parent[key], source);
    cache[refName] = value;
    return value;
  }
}

module.exports = { expand, expanded };

