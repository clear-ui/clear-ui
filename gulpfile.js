var path = require('path')
var gulp = require('gulp')
var docgen = require('gulp-react-docgen')

var DEST = path.join(__dirname, 'docgen')
var LIBS = {
	//test: './test',
	base: '../clear-ui-base/src',
	material: '../clear-ui-material/src',
	web: '../clear-ui-simple/src'
}
var GLOBS = ['**/*.js', '!**/__test__/*.*', '!**/__test__.js']
var LIBS_SRC = {}
for (var lib in LIBS) {
	var libpath = LIBS[lib]
	LIBS_SRC[lib] = GLOBS.map((function(glob) { return path.join(libpath, glob) }))
}

// Separate tasks to generate docs for each lib
for (var lib in LIBS) {
	(function(lib) {
		gulp.task('docgen-' + lib, function() {
			return gulp.src(LIBS_SRC[lib])
				.pipe(docgen(lib + '.json'))
				.pipe(gulp.dest(DEST))
		})
	})(lib)
}

// Common task to generate doc for all libs
gulp.task('docgen', Object.keys(LIBS).map(function(name) { return 'docgen-' + name }))

// Task to rerun generating of lib doc when file changes
gulp.task('docgen-watch', ['docgen'], function() {
	for (var lib in LIBS_SRC) {
		gulp.watch(LIBS_SRC[lib], ['docgen-' + lib])
	}
})
