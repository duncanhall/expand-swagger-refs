
var inputFileName = process.argv[2];

if (inputFileName === undefined) {
  console.log('Error: You must specify a swagger file as an input.');
  process.exit(1);
}
else {
  var inputSchema = require(inputFileName);

  if (inputSchema.paths !== undefined) {

    var targetSchema = clone(inputSchema);

    //All the operations we should expand parameters for
    var allowedOperations = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];
    var ops = allowedOperations.length;

    /**
     * Get the top level parameter object by it's $ref
     *
     * @param reference {string} The fully qualified reference path.
     * @returns {object} The parameter object
     */
    function getTopLevelParameter (reference) {
      var localReference = reference.substr('#/parameters/'.length);
      return inputSchema.parameters[localReference];
    }

    /**
     * Sloppy copy of the JSON schema.
     *
     * @param input {object} The object to copy
     * @returns {object} The copied object
     */
    function clone(input) {
      return JSON.parse(JSON.stringify(input));
    }

    //Traverse schema and look for references to expand
    for (var path in inputSchema.paths) {
      if (inputSchema.paths.hasOwnProperty(path)) {

        var operation;
        var pathOperation;

        for (var i = 0; i < ops; i++) {

          //Checking for any operations on this path
          operation = allowedOperations[i];
          pathOperation = inputSchema.paths[path][operation];

          if (pathOperation !== undefined) {

            //Found an operation, check for parameters
            var operationParameters = pathOperation.parameters;
            if (operationParameters !== undefined) {

                //Check parameter list for $refs
                var numParams = operationParameters.length;
                var parameterRef;
                for (var j = 0; j < numParams; j++) {

                  parameterRef = operationParameters[j].$ref;
                  if (parameterRef !== undefined) {

                    //Found a $ref, overwrite it in the target with the expanded param
                    targetSchema.paths[path][operation].parameters[j] = getTopLevelParameter(parameterRef);
                  }
                }
            }
          }
        }
      }
    }

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
}
