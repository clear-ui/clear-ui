process.env.NODE_ENV = 'production';

var chalk = require('chalk')
var rimrafSync = require('rimraf').sync
var webpack = require('webpack')

var paths = require('../config/paths')
var webpackOutput = require('./utils/webpackOutput.js')
var config = require(paths.webpackConfig)

rimrafSync(paths.build + '/*');

var compiler = webpack(config)
webpackOutput(compiler)

console.log('Creating an optimized production build...')
compiler.run(function(){})

