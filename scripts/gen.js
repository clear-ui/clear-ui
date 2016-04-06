var path = require('path')
var fs = require('fs')
var mkdirp = require('mkdirp')
var generatePropTypes = require('./generatePropTypes.js')

var DEST = path.join(__dirname, '../propTypes')

var LIBS = {
	base: '../clear-ui-base/src',
	material: '../clear-ui-material/src',
	web: '../clear-ui-simple/src'
}

mkdirp.sync(DEST)

for (var libname in LIBS) {
	var libpath = LIBS[libname]
	;(function(libpath, libname) {
		generatePropTypes(libpath)
			.then(function(result) {
				var filepath = path.join(DEST, libname + '.json')
				fs.writeFileSync(filepath, JSON.stringify(result))
			})
	})(libpath, libname)
}
