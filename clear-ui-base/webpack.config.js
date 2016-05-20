var path = require('path')
var config = require('clear-ui-webpack-config')

config.module.loaders[0].exclude = []
config.module.loaders[0].include = [
	path.resolve(__dirname, 'src')
]

// for enzyme
config.externals = {
	'react/addons': true,
	'react/lib/ExecutionEnvironment': true,
	'react/lib/ReactContext': true
}

module.exports = config
