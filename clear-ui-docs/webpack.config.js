var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('clear-ui-webpack-config')

var DIST = path.join(__dirname, 'dist')

var DEBUG = process.env.NODE_ENV !== 'production'

config.entry.push('./src/index.js')

config.output = {
	path: DIST,
	filename: 'main.js'
}

config.devServer = {
	contentBase: DIST
}

config.watchOptions = {
    aggregateTimeout: 250,
    poll: 50
}

config.plugins.push(new HtmlWebpackPlugin({
	title: 'Clear UI',
	template: 'src/index.html',
	inject: true,
	debug: process.env.NODE_ENV !== 'production'
}))

// Use source code of clear-ui
config.resolve.alias = {
	'clear-ui-base/lib': path.join(__dirname, '../clear-ui-base/src'),
	'clear-ui-material/lib': path.join(__dirname, '../clear-ui-material/src'),
	'clear-ui-web/lib': path.join(__dirname, '../clear-ui-web/src'),
	'clear-ui-ios/lib': path.join(__dirname, '../clear-ui-ios/src')
}

// Enable preprocessing of clear-ui source with babel
config.module.loaders[0].exclude = []
config.module.loaders[0].include = [
	path.resolve(__dirname, 'src'),
	path.resolve(__dirname, '..', 'clear-ui-base', 'external'),
	path.resolve(__dirname, '..', 'clear-ui-base', 'src'),
	path.resolve(__dirname, '..', 'clear-ui-material', 'src'),
	path.resolve(__dirname, '..', 'clear-ui-web', 'src'),
	path.resolve(__dirname, '..', 'clear-ui-ios', 'src')
]

// add style loaders
var cssLoaderOptions = {
	modules: true,
	sourceMap: true,
	localIdentName: DEBUG && '[local]__[hash:base64:5]'
}

var autoprefixerLoaderOptions = {
	browsers: ['last 2 versions', 'ios >= 7']
}

config.module.loaders.push({
	test: /\.css$/,
	loader:
		'style-loader!' +
		'css-loader?' + JSON.stringify(cssLoaderOptions) + '!' +
		'autoprefixer-loader?' + JSON.stringify(autoprefixerLoaderOptions)
})

config.module.loaders.push({
	test: /\.scss$/,
	loader:
		'style-loader!' +
		'css-loader?' + JSON.stringify(cssLoaderOptions) + '!' +
		'autoprefixer-loader?' + JSON.stringify(autoprefixerLoaderOptions) + '!' +
		'sass-loader'
})

// Prevent multiple instances of clear-ui peerDependencies on page
// when it is installed with 'npm link'
config.resolve.alias.react = path.join(__dirname, 'node_modules', 'react')
config.resolve.alias['react-dom'] = path.join(__dirname, 'node_modules', 'react-dom')
config.resolve.alias.jquery = path.join(__dirname, 'node_modules', 'jquery')

module.exports = config
