import { StripHtmlPipe } from './strip-html.pipe';

describe('StripHtmlPipe', () => {
	const pipe = new StripHtmlPipe();

	it('strips all html from a string', () => {
		expect(pipe.transform('<p>Test</p>')).toBe('Test');
	});
});
