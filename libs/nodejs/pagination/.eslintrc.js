module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'sort-imports': [
			'error',
			{
				ignoreCase: false,
				ignoreDeclarationSort: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
				allowSeparatedGroups: true,
			},
		],
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
	},
};
