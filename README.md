# expand-swagger-refs
Automatically expand `$ref` values in your Swagger schema.

With the release of Swagger 2.0 there are still some issues with expanding `$ref` values in various places (notably, with Swagger UI - https://github.com/swagger-api/swagger-ui/issues/621).

This tool will output a copy of a given schema, recursively expanding an otpional set of `$ref` values.

### Installation
As the issue will hopefully be resolved soon, installation is simply via a clone of this repo:

`git clone https://github.com/duncanhall/expand-swagger-refs`

### Usage
To automatically expand all references, simply point it at the Swagger schema you want to expand:

`node expand.js ./swagger.json`

This runs the tool against a schema named `swagger.json` that is in the same directry. It will output a file named `swagger-expanded.json` in the same directory.

It can also be run with absolute paths:

`node expand.js "C:\path\to\project\swagger.json"`

Will output the expanded file to `C:\path\to\project\swagger-expanded.json`

### Options
By default the tool will look for **all** occurences of `$ref` and expand it to the relevant value. This is not always desirable given the currently unpredicactable behaviour of swagger-js/swagger-ui.

To only expand a certain _type_ of `$ref`, pass the type names as options after the swagger schema path:

`node expand.js ./swagger.json parameters`

The above will _only_ expand `$ref` values starting with `#/parameters/`.

To expand both parameters and responses: 

`node expand.js ./swagger.json parameters responses`
