module.exports = {
	presets: [
		require('babel-preset-es2015'),
		require('babel-preset-stage-0'),
		require('babel-preset-react')
	],
	plugins: [
		require('babel-plugin-transform-runtime'),
		'babel-plugin-transform-decorators-legacy',
		'transform-class-properties',
		['transform-es2015-classes', {
			loose: true
		}],
		'transform-proto-to-assign'
	]
}
