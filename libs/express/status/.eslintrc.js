module.exports = {
	env: {
		jest: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: process.cwd(),
	},
	settings: {
		// https://github.com/alexgorbatchev/eslint-import-resolver-typescript
		'import/parsers': {
			'@typescript-eslint/parser': ['.js', '.ts'],
		},
		'import/resolver': {
			// use <root>/tsconfig.json
			typescript: {},
		},
	},

	plugins: ['@typescript-eslint', 'eslint-comments', 'jest', 'promise', 'unicorn', 'import'],

	extends: [
		'airbnb-typescript/base',
		'plugin:@typescript-eslint/recommended',
		// 'plugin:compat/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:jest/recommended',
		'plugin:promise/recommended',
		'plugin:unicorn/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
	],

	rules: {
		'class-methods-use-this': 'off',
		'no-tabs': 'off',
		'max-len': 'off',
		'lines-between-class-members': 'off',

		'import/prefer-default-export': 'off',
		'import/extensions': 'off',

		'unicorn/filename-case': 'off',
		'unicorn/prevent-abbreviations': 'off',

		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/no-empty-interface': 'off', // Allow empty interfaces for clarity in naming.
		'@typescript-eslint/interface-name-prefix': 'off',
		'linebreak-style': 'off', // Windows is allowed to have CRLF line endings, but git by default will commit as LF
	},
};
