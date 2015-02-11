
var inputFileName = process.argv[2];
var inputSchema;
var targetSchema;

if (inputFileName === undefined) {
  console.log('Error: You must specify a swagger file as an input.');
  process.exit(1);
}
else {

  inputSchema = require(inputFileName);
  targetSchema = cloneSchema(inputSchema);

  expandReferences(targetSchema, '');
  writeSchemaToFile(targetSchema);
}

/**
 * Traverses the entire target schema looking for $refs, expanded them as it goes.
 *
 * @param parent {object} The object in which to look for $refs
 * @param loc {string} The current dot-notation location is relation to the parent.
 */
function expandReferences(parent, loc) {
  for (var child in parent) {

    if (parent.hasOwnProperty(child)) {
      if (child === '$ref') {

        //We found a $reference
        expand(loc, parent[child]);
      }
      else if (typeof parent[child] === 'object') {

        //Check the child object for $refs. Go deep man.
        expandReferences(parent[child], loc + '.' + child);
      }
    }
  }
}

/**
 * Sets the value at a given path to the real value of its reference.
 *
 * @param target
 * @param valueReference
 */
function expand(target, valueReference) {

  var targetPath = target.substr(1);
  var value = getReferenceValue(valueReference);

  setValueAtPath(targetSchema, value, targetPath);
}


/**
 * Set the value of a nested property given it's dot-notation path
 *
 * @param obj
 * @param value
 * @param path
 */
function setValueAtPath(obj, value, path) {

  path = path.split('.');
  for (i = 0; i < path.length - 1; i++) obj = obj[path[i]];
  obj[path[i]] = value;
}


/**
 * Sloppy copy of the JSON schema.
 *
 * @param input {object} The object to copy
 * @returns {object} The copied object
 */
function cloneSchema(input) {
  return JSON.parse(JSON.stringify(input));
}


/**
 * Get the top level reference value
 *
 */
function getReferenceValue (reference) {

  var components = reference.split('/');
  var type = components[1];
  var localName = components[components.length - 1];

  return targetSchema[type][localName];
}


/**
 * Saves a schema object to a JSON file
 *
 * @param targetSchema
 */
function writeSchemaToFile (targetSchema) {

  var fs = require('fs');
  var fileName = inputFileName.substr(0, inputFileName.indexOf('json') - 1);
  var outputFileName = fileName + '-expanded.json';

  fs.writeFile(outputFileName, JSON.stringify(targetSchema, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFileName);
    }
  });
}
