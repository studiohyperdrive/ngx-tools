import { IsNotEmptyPipe } from './is-not-empty.pipe';

describe('IsNotEmptyPipe', () => {
	describe('transform', () => {
		it('should return false when the given value is null', () => {
			const pipe = new IsNotEmptyPipe();

			expect(pipe.transform(null)).toBeFalse();
		});

		it('should return false when the given value is not an object or array', () => {
			const pipe = new IsNotEmptyPipe();

			expect(pipe.transform(1)).toBeFalse();
			expect(pipe.transform(true)).toBeFalse();
			expect(pipe.transform('text')).toBeFalse();
		});

		it('should return false when the given value is an empty array', () => {
			const pipe = new IsNotEmptyPipe();

			expect(pipe.transform([])).toBeFalse();
		});

		it('should return true when the given value is an array with values', () => {
			const pipe = new IsNotEmptyPipe();

			expect(pipe.transform(['value'])).toBeTrue();
		});

		it('should return false when the given value is an empty object', () => {
			const pipe = new IsNotEmptyPipe();

			expect(pipe.transform({})).toBeFalse();
		});

		it('should return true when the given value is an object with properties', () => {
			const pipe = new IsNotEmptyPipe();

			expect(
				pipe.transform({
					hasValue: true,
				})
			).toBeTrue();
		});

		it('should return false when checkProps is provided and the given object is missing values for these props', () => {
			const pipe = new IsNotEmptyPipe();

			expect(
				pipe.transform(
					{
						test1: true,
						test2: false,
					},
					['test1', 'test2', 'test3']
				)
			).toBeFalse();
		});

		it('should return true when checkProps is provided and the given object contains values for all these props', () => {
			const pipe = new IsNotEmptyPipe();

			expect(
				pipe.transform(
					{
						test1: true,
						test2: false,
						test3: 'something',
					},
					['test1', 'test2', 'test3']
				)
			).toBeTrue();
		});
	});
});
