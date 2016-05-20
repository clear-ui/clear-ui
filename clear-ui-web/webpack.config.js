var path = require('path')
var config = require('clear-ui-webpack-config')

var DIST = path.join(__dirname, 'dist')

config.entry.push('./src/index.js')

config.externals = {
	jquery: 'jQuery',
	react: 'React',
	'react-dom': 'ReactDOM'
}

config.resolve.alias = {
	'clear-ui-base/lib': path.join(__dirname, '../clear-ui-base/src'),
}

config.module.loaders[0].exclude = []
config.module.loaders[0].include = [
	path.join(__dirname, '../clear-ui-base/src'),
	path.join(__dirname, 'src')
]

config.output = {
	path: DIST,
	filename: 'clear-ui-web.js',
	libraryTarget: 'umd',
	library: 'ClearUIWeb'
}

module.exports = config
