var gulp = require('gulp')
var babel = require('gulp-babel')
var chalk = require('chalk')

var preset = require('../config/babel.js')

gulp.task('copy', function() {
	return gulp.src('src/**/!(*.js)')
		.pipe(gulp.dest('lib'))
})

gulp.task('babel', function() {
	return gulp.src('src/**/*.js')
		.pipe(babel({
			presets: [preset]
		}))
		.pipe(gulp.dest('lib'))
})

gulp.start(['babel', 'copy'], function() {
	console.log(chalk.green('Compiled successfully.'))
})
