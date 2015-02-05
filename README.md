# expand-swagger-refs
Convert swagger parameter $refs to expanded parameters

With the release of Swagger 2.0 there are still some issues with expanding `$ref` values in operation parameters (notably, with Swagger UI - https://github.com/swagger-api/swagger-ui/issues/621).

This tool provides a simple (read quick and dirty) method for automatically expanding those parameters in your Swagger schema, until the problem is fixed.

### Installation
As the issue will hopefully be resolved soon, installation is simply via a clone of this repo:

`git clone https://github.com/duncanhall/expand-swagger-refs`

### Usage
Simply point it at the Swagger schema you want to expand:

`node expand.js ./swagger.json`

This runs the tool against a schema named `swagger.json` that is in the same directry. It will output a file named `swagger-expanded.json` in the same directory.

It can also be run with absolute paths:

`node expand.js "C:\path\to\project\swagger.json"`

Will output the expanded file to `C:\path\to\project\swagger-expanded.json`
