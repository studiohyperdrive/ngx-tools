import { TruncateTextPipe } from './truncate-text.pipe';

describe('TruncateTextPipe', () => {
	const pipe = new TruncateTextPipe();

	it('truncates text to 5 characters', () => {
		expect(pipe.transform("Hello, I'm a test!", 5)).toBe('Hello...');
	});
});
