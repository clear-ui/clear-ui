var webpack = require('webpack')
var readline = require('readline')
var chalk = require('chalk')

function formatMessage(message) {
	return message
		// Make some common errors shorter:
		.replace(
			// Babel syntax error
			'Module build failed: SyntaxError:',
			'Syntax error:'
		)
		.replace(
			// Webpack file not found error
			/Module not found: Error: Cannot resolve 'file' or 'directory'/,
			'Module not found:'
		)
		// Internal stacks are generally useless so we strip them
		.replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
}

module.exports = function webpackOutput(compiler, success) {
	compiler.apply(new webpack.ProgressPlugin(function(progress, message) {
		readline.clearLine(process.stdout)
		readline.cursorTo(process.stdout, 0)
		var percents = Math.round(progress * 100) + '%'
		process.stdout.write('Compiling ' + percents	+ '. ' + message) 
	}))

	compiler.plugin('done', function(stats) {
		console.log(' ')

		var hasErrors = stats.hasErrors()
		var hasWarnings = stats.hasWarnings()
		if (!hasErrors && !hasWarnings) {
			console.log(chalk.green('Compiled successfully!'));
			console.log()
			if (success) success()
			return
		}

		var json = stats.toJson()

		if (hasErrors) {
			console.log(chalk.red('Failed to compile.'))
			console.log()
			json.errors.forEach(function(message) {
				console.log(formatMessage(message))
				console.log()
			})
			return
		}

		if (hasWarnings) {
			console.log(chalk.yellow('Compiled with warnings.'))
			console.log()
			json.warnings.forEach(function(message) {
				console.log(message)
				console.log()
			})
			if (success) success()
		}
	})
}
