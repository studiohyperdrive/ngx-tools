import { earlyReturnEmptyArrayValue } from './early-return-empty-array-value';

describe('earlyReturnEmptyArrayValue', () => {
	it('should provide a set of tests that check if a provided function results in an empty array on a falsy value', () => {
		const testFunction = (value: unknown[]) => {
			if (!value) {
				return [];
			}

			return value;
		};

		earlyReturnEmptyArrayValue(testFunction);
	});
});
