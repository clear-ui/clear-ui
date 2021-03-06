module.exports = {
	extends: 'airbnb',
	parser: 'babel-eslint',
	env: {
		'es6': true,
		'browser': true,
		'node': true,
		'mocha': true
	},
	globals: {
		'DEBUG': false
	},
	ecmaFeatures: {
		'experimentalObjectRestSpread': true
	},
	plugins: ['react'],
	rules: {
		'prefer-const': [0],

		'object-curly-spacing': [2, 'never'],
		'indent': [2, 'tab'],
		'comma-dangle': [2, 'never'],
		'semi': [0],
		'arrow-body-style': [0],
		'consistent-return': [0],
		'no-else-return': [0],
		'no-restricted-syntax': [
			2,
			'DebuggerStatement',
			'WithStatement',
		],
		'space-before-function-paren': [0],
		'prefer-arrow-callback': [0],
		'func-names': [0],
		'prefer-template': [0],
		'guard-for-in': [0],
		'one-var-declaration-per-line': [2, 'initializations'],
		'one-var': [0],
		'no-nested-ternary': [0],
		'default-case': [0],

		'jsx-quotes': [2, 'prefer-single'],
		'react/jsx-boolean-value': [2, 'always'],
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-no-bind': [0],
		'react/jsx-space-before-closing': [2, 'never'],
		'react/sort-comp': [2, {
			'order': [
				'static-methods',
				'lifecycle',
				'render',
				'everything-else'
			]
		}],
		'react/prop-types': [2, {
			'ignore': ['children']
		}]
	}
}
