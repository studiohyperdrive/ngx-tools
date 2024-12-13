import { earlyReturnOnFalsyValue } from './early-return-on-falsy-value';

describe('earlyReturnOnFalsyValue', () => {
	it('should provide a set of tests that check if a provided function results in an undefined on a falsy value', () => {
		const testFunction = (value: unknown[]) => {
			if (!value) {
				return;
			}

			return value;
		};

		earlyReturnOnFalsyValue(testFunction);
	});

	it('should provide a set of tests that check if a provided function results in given value on a falsy value', () => {
		const testFunction = (value: unknown[]) => {
			if (!value) {
				return false;
			}

			return value;
		};

		earlyReturnOnFalsyValue(testFunction, false);
	});
});
