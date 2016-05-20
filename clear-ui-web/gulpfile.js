var gulp = require('gulp')
var babel = require('gulp-babel')

gulp.task('build-lib-copy', function() {
	return gulp.src('src/**/!(*.js)')
		.pipe(gulp.dest('lib'))
})


gulp.task('build-lib-babel', function() {
	return gulp.src('src/**/*.js')
		.pipe(babel({
			presets: ['babel-preset-clear-ui']
		}))
		.pipe(gulp.dest('lib'))
})

gulp.task('build-lib', ['build-lib-babel', 'build-lib-copy'])
