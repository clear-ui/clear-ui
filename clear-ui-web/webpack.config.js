var path = require('path')
var config = require('clear-ui-scripts/config/webpack.js')

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

config.output.filename = 'clear-ui-web.js'
config.output.libraryTarget = 'umd'
config.output.library = 'ClearUIWeb'

module.exports = config
