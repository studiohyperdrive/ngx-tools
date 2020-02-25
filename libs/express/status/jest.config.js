/* eslint-disable @typescript-eslint/no-var-requires */
const { defaults } = require('jest-config');
const jestModuleNameMapper = require('jest-module-name-mapper')('./tsconfig.paths.json');
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
	...defaults,
	displayName: 'Express Status',
	roots: [
		'<rootDir>/src',
	],
	testMatch: [
		'**/__tests__/**/*.+(ts|tsx|js)',
		'**/?(*.)+(spec|test).+(ts|tsx|js)',
	],
	transform: {
		...defaults.transform,
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	moduleNameMapper: jestModuleNameMapper,
	setupFilesAfterEnv: ['jest-extended'],
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
	],
	coverageDirectory: './coverage',
	coverageReporters: [
		'lcov',
		'text',
	],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'.types.ts',
		'.spec.ts',
		'.d.ts',
		'index.ts',
	],
};
