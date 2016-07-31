var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var chalk = require('chalk')

var paths = require('../config/paths.js')
var config = require(paths.webpackConfig)
var webpackOutput = require('./utils/webpackOutput.js')

function clearConsole() {
	process.stdout.write('\x1bc')
}

var port = 3000
var compiler = webpack(config)
webpackOutput(compiler, function() {
  console.log('The app is running at http://localhost:' + port + '/');
  console.log();
})

console.log('Starting the development server...')

var server = new WebpackDevServer(compiler, {
	contentBase: paths.build,
	quiet: true
})
server.listen(port)
