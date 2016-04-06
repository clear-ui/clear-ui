var reactDocs = require('react-docgen')
var through = require('through2')

modules.exports = function reactDocgen() {
	return through.obj(function(file, enc, cb) {
		if (file.isNull()) return cb(null, file)
		if (file.isBuffer()) {
			var source = file.contents.toString('utf-8')
			var doc = reactDocs.parse(source)
			file.contents = docs
		}
		cb(null, file)
	})
}
