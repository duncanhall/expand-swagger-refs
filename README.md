# expand-swagger-refs [![Build Status](https://travis-ci.org/duncanhall/expand-swagger-refs.svg)](https://travis-ci.org/duncanhall/expand-swagger-refs) [![Build status](https://ci.appveyor.com/api/projects/status/40f8sb9gu9s8to5v?svg=true)](https://ci.appveyor.com/project/duncanhall/expand-swagger-refs)
Automatically expand `$ref` values in your Swagger schema:

 - From a function
 - From a file
 - From stdin
 - Zero dependencies

## Install
```
npm install expand-swagger-refs
```
_NOTE: If you want to use the file or stdin options, you may want to install globally with `-g`_

### Module functions
Importing the module provides 2 methods for expansion, with or without mutation:  
```javascript
const { expand, expanded } = require('expand-swagger-refs');
const schema = require('./api/swagger.json');

// Create a copy of the schema, with $ref values expanded: 
const expandedSchema = expanded(schema);

// Or expand the schema object in-place (mutates the object):
expand(schema)
```

### stdin > stdout
With the module installed globally, the `swagger-expand` command is available and will accept valid JSON to `stdin`:
```
swagger-expand < swagger.json
```
The expanded result is written to `stdout`:
```
swagger-expand < swagger.json > expanded.json
```
### File input
The `swagger-expand` command also accepts a filepath as an input:
```
swagger-expand ~/lol/swagger.json
```
By default the expanded result will be written adjacent to the input file with `-expanded` added to the basename. Eg, the input above would write the result to `~/lol/swagger-expanded.json`. Absolute and relative paths are supported.

You can tell `swagger-expand` to overwrite the input file with the expanded result using the `-o` option:
```
swagger-expand ~/rofl/swagger.json -o
```


