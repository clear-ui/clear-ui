var webpackConfig = require('./webpack.config.js')
webpackConfig.devtool = 'inline-source-map'

module.exports = function(config) {
	config.set({
		frameworks: ['mocha'],


		files: [
			'test_index.js'
		],

		preprocessors: {
			'test_index.js': ['webpack', 'sourcemap']
		},

		webpack: webpackConfig,

		webpackMiddleware: {
			// webpack-dev-middleware configuration
			// i. e.
			noInfo: true
		},

		plugins: [
			'karma-mocha',
			'karma-webpack',
			'karma-sourcemap-loader'
		]

	})
}
