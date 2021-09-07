module.exports = {
	'env': {
		'node': true,
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'indent': [2, 'tab'],
		'no-mixed-spaces-and-tabs': 1,
		'react/prop-types': 0,
		'no-async-promise-executor': 0,
		'quotes': [2, 'single', {'avoidEscape': true}],
		'object-curly-spacing': [2, 'never'],
		'array-bracket-spacing': [2, 'never'],
		'react/jsx-curly-brace-presence': ['error', {'props': 'always', 'children': 'always'}],
		'semi': 'error',
	}
};
