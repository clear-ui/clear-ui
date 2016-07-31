var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var config = require('clear-ui-scripts/config/webpack.js')

var DEBUG = process.env.NODE_ENV !== 'production'

config.plugins.push(new HtmlWebpackPlugin({
	title: 'Clear UI',
	template: 'src/index.html',
	inject: true,
	debug: DEBUG
}))

config.plugins.push(new ExtractTextPlugin('styles.css'))

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
	loader: ExtractTextPlugin.extract('style-loader',
		'css-loader?' + JSON.stringify(cssLoaderOptions) + '!' +
		'autoprefixer-loader?' + JSON.stringify(autoprefixerLoaderOptions)
	)
})

config.module.loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract('style-loader',
		'css-loader?' + JSON.stringify(cssLoaderOptions) + '!' +
		'autoprefixer-loader?' + JSON.stringify(autoprefixerLoaderOptions) + '!' +
		'sass-loader'
	)
})

// Prevent multiple instances of clear-ui peerDependencies on page
config.resolve.alias.react = path.join(__dirname, 'node_modules', 'react')
config.resolve.alias['react-dom'] = path.join(__dirname, 'node_modules', 'react-dom')
config.resolve.alias.jquery = path.join(__dirname, 'node_modules', 'jquery')

// Spent 4 hours fixing it
// https://github.com/webpack/webpack/issues/2740 
config.resolveLoader.root = path.join(__dirname, "node_modules")

module.exports = config
