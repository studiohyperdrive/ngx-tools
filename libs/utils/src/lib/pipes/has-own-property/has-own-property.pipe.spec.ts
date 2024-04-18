import { HasOwnProperty } from './has-own-property.pipe';

describe('HasOwnPropertyPipe', () => {
	describe('transform', () => {
		it('Object and property exist', () => {
			const pipe = new HasOwnProperty();
			const object = { prop: 'value' };
			const prop = 'prop';

			expect(pipe.transform(object, prop)).toBe(true);
		});

		it('Object is null, property does not matter', () => {
			const pipe = new HasOwnProperty();
			const object = null;
			const prop = 'prop';

			expect(pipe.transform(object, prop)).toBe(false);
		});

		it('Object is undefined, property does not matter', () => {
			const pipe = new HasOwnProperty();
			const object = undefined;
			const prop = 'prop';

			expect(pipe.transform(object, prop)).toBe(false);
		});

		it('Object is defined, Property does not exist in the object', () => {
			const pipe = new HasOwnProperty();
			const object = { anotherProp: 'value' };
			const prop = 'prop';

			expect(pipe.transform(object, prop)).toBe(false);
		});

		it('Empty object, property does not matter', () => {
			const pipe = new HasOwnProperty();
			const object = {};
			const prop = 'prop';

			expect(pipe.transform(object, prop)).toBe(false);
		});

		it('Object is an array, property does not matter', () => {
			const pipe = new HasOwnProperty();
			const object = [1, 2, 3];
			const prop = 'prop';

			expect(pipe.transform(object, prop)).toBe(false);
		});
	});
});
