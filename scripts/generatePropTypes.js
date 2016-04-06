var path = require('path')
var fs = require('fs')

var dirmatch = require('dirmatch')
var reactDocgen = require('react-docgen')
var Q = require('q')
var _ = require('underscore')

var GLOB = [
	'**/*.js',
	'!**/__test__/*.*',
	'!**/__test__.js'
]

module.exports = function generatePropTypes(dir, output) {
	var files = dirmatch(dir, GLOB)
	var tasks = files.map(function(filename) {
		var filepath = path.join(dir, filename)
		return Q.nfcall(fs.readFile, filepath, 'utf-8')
			.then(function(source) {
				var doc
				try {
					doc = reactDocgen.parse(source)
				} catch(err) {
					return
				}

				return {filename: filename, props: doc.props}
			})
	})
	return Q.all(tasks).then(function(results) {
		var obj = {}
		results.forEach(function(result) {
			if (result) obj[result.filename] = result.props
		})
		return obj
	})
}
