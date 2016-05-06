var path = require('path')
var config = require('clear-ui-webpack')

var DIST = path.join(__dirname, 'dist')

config.entry.push('./src/index.js')

config.module.loaders[0].exclude = []
config.module.loaders[0].include = [
	path.resolve(__dirname, 'external'),
	path.resolve(__dirname, 'src')
]

config.output = {
	path: DIST,
	filename: 'clear-ui.js'
}
config.devServer = {
	contentBase: DIST
}

// no need to resolve babel-runtime
config.resolve.alias = {}

module.exports = config
