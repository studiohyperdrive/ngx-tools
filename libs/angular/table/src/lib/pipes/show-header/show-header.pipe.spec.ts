import { NgxTableShowHeaderPipe } from './show-header.pipe';

describe('NgxTableShowHeaderPipe', () => {
	const pipe = new NgxTableShowHeaderPipe();

	it('should return an true if the value is not an object', () => {
		expect(pipe.transform(null, 'never')).toEqual(true);
		expect(pipe.transform(undefined, 'never')).toEqual(true);
		expect(pipe.transform(3 as any, ['when-empty'])).toEqual(true);
		expect(pipe.transform('test' as any, ['when-empty', 'when-loading'])).toEqual(true);
		expect(pipe.transform([3] as any, ['when-empty'])).toEqual(true);
	});

	it('should return the true if the config is set to never', () => {
		expect(pipe.transform({ isEmpty: false, isLoading: true }, 'never')).toEqual(true);
		expect(pipe.transform({ isEmpty: true, isLoading: true }, 'never')).toEqual(true);
		expect(pipe.transform({ isEmpty: true, isLoading: false }, 'never')).toEqual(true);
		expect(pipe.transform({ isEmpty: false, isLoading: false }, 'never')).toEqual(true);
	});

	it('should return the correct value when the config is set to when-empty', () => {
		expect(pipe.transform({ isEmpty: false, isLoading: true }, ['when-empty'])).toEqual(true);
		expect(pipe.transform({ isEmpty: true, isLoading: true }, ['when-empty'])).toEqual(false);
		expect(pipe.transform({ isEmpty: true, isLoading: false }, ['when-empty'])).toEqual(false);
		expect(pipe.transform({ isEmpty: false, isLoading: false }, ['when-empty'])).toEqual(true);
	});

	it('should return the correct value when the config is set to when-loading', () => {
		expect(pipe.transform({ isEmpty: false, isLoading: true }, ['when-loading'])).toEqual(
			false
		);
		expect(pipe.transform({ isEmpty: true, isLoading: true }, ['when-loading'])).toEqual(false);
		expect(pipe.transform({ isEmpty: true, isLoading: false }, ['when-loading'])).toEqual(true);
		expect(pipe.transform({ isEmpty: false, isLoading: false }, ['when-loading'])).toEqual(
			true
		);
	});

	it('should return the correct value when the config is set to when-empty', () => {
		expect(
			pipe.transform({ isEmpty: false, isLoading: true }, ['when-empty', 'when-loading'])
		).toEqual(false);
		expect(
			pipe.transform({ isEmpty: true, isLoading: true }, ['when-empty', 'when-loading'])
		).toEqual(false);
		expect(
			pipe.transform({ isEmpty: true, isLoading: false }, ['when-empty', 'when-loading'])
		).toEqual(false);
		expect(
			pipe.transform({ isEmpty: false, isLoading: false }, ['when-empty', 'when-loading'])
		).toEqual(true);
	});
});
