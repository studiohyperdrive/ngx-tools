module.exports = {
	printWidth: 100,
	singleQuote: true,
	tabWidth: 4,
	trailingComma: 'es5',
	useTabs: true,
	plugins: ['prettier-plugin-organize-attributes'],
	attributeGroups: [
		'$ANGULAR_STRUCTURAL_DIRECTIVE',
		'^class$',
		'^(id|name)$',
		'$DEFAULT',
		'^aria-',
		'$ANGULAR_INPUT',
		'$ANGULAR_TWO_WAY_BINDING',
		'$ANGULAR_OUTPUT'
	],
	overrides: [
		{
			files: ['*.html'],
			options: {
				parser: 'angular'
			}
		}
	]
};