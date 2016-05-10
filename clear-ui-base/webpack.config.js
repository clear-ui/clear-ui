var path = require('path')
var config = require('clear-ui-webpack-config')

var DIST = path.join(__dirname, 'dist')

config.entry.push('./src/index.js')

config.module.loaders[0].exclude = []
config.module.loaders[0].include = [
	path.resolve(__dirname, 'external'),
	path.resolve(__dirname, 'src')
]

// for enzyme
config.externals = {
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
}

config.output = {
	path: DIST,
	filename: 'clear-ui.js'
}
config.devServer = {
	contentBase: DIST
}

module.exports = config
