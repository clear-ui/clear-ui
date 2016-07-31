var fs = require('fs')
var path = require('path')

function resolve(relativePath) {
	return path.resolve(__dirname, relativePath)
}

var paths = {
	root: resolve('../../..'),
	src: resolve('../../../src'),
	build: resolve('../../../build'),
	lib: resolve('../../../lib')
}

var rootWebpackConfig = resolve('../../../webpack.config.js')
var localWebpackConfig = resolve('../config/webpack.js')
paths.webpackConfig = fs.existsSync(rootWebpackConfig) ? rootWebpackConfig : localWebpackConfig

module.exports = paths
