var gulp = require('gulp')
var babel = require('gulp-babel')

gulp.task('build-copy', function() {
	return gulp.src('src/**/!(*.js)')
		.pipe(gulp.dest('lib'))
})


gulp.task('build-babel', function() {
	return gulp.src('src/**/*.js')
		.pipe(babel({
			presets: ['babel-preset-clear-ui']
		}))
		.pipe(gulp.dest('lib'))
})

gulp.task('build-npm', ['build-babel', 'build-copy'])
