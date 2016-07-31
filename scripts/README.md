# Clear UI scripts

`clear-ui-scripts` is a set of common scripts for working with react code.
It can be used with both apps that need to be deployed to a server, 
and libraries that need to be published to npm.

## Scripts

### build

Builds production bundle with webpack in the 'dist' directory.
For apps it creates bundle to deploy to a server,
for libraries it creates precompiled files for quick usage without any building process.

### compile

Compiles source files with babel separately and puts results to the `lib` directory.
It prepares library to publish to the npm.

### start

Starts webpack-dev-server.

### test

Runs tests in browser using karma.
It loads `src/tests_index.js` as index file.

## Webpack config

Default config is located at 'clear-ui-scripts/config/webpack.js',
it is used when there is no 'webpack.config.js' in the project's directory.

Also, project's config can extend default config, for example, like this:

```
// webpack.config.js
config = require('clear-ui-scripts/config/webpack.js')

var HtmlWebpackPlugin = require('html-webpack-plugin')

config.plugins.push(new HtmlWebpackPlugin({
	title: 'Clear UI',
	template: 'src/index.html',
	inject: true
})

module.exports = config
```
