'use strict';

let output;
let refs; 

function inline(input) {
  refs = {};
  output = Object.assign({}, input);
  expandReferences(output);
  return output;
};

function expandReferences(parent, currentPath) {
  currentPath = currentPath || '';

  for (var child in parent) {
    if (parent.hasOwnProperty(child)) {
      if (child === '$ref') {
        //We found a $reference
        expand(currentPath, parent[child]);
      }
      else if (typeof parent[child] === 'object') {
        //Check the child object for $refs. Go deep man.
        expandReferences(parent[child], currentPath + '.' + child);
      }
    }
  }
}

/**
 * Sets the value of srcPath to the value of refName
 */
function expand(srcPath, refName) {
  const value = getReferenceValue(refName);
  const [head, ...targetPath] = srcPath.split('.');
  targetPath.reduce((parent, key, i) => {
    if (i === targetPath.length - 1) {
      parent[key] = value;
    } else {
      return parent[key];
    }
  }, output)
}

/**
 * Memoized lookup for retrieving ref values by name
 */
function getReferenceValue(refName) {
  if (refs.hasOwnProperty(refName)) {
    return refs[refName];
  } else {
    const [ref, ...valuePath] = refName.split('/');
    const value = valuePath.reduce((parent, key) => parent[key], output);
    refs[refName] = value;
    return value;
  }
}

module.exports = { inline };

