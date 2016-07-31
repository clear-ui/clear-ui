// process.env.NODE_ENV = 'production';

var chalk = require('chalk')
var rimrafSync = require('rimraf').sync
var webpack = require('webpack')

var paths = require('../config/paths')
var config = require(paths.webpackConfig)

rimrafSync(paths.build + '/*');

webpack(config).run(function(err, stats) {
	if (err) {
		console.error('Failed to create a production build. Reason:')
		console.error(err.message || err)
		process.exit(1)
	} else {
		console.log(chalk.green('Compiled successfully.'))
	}
})

