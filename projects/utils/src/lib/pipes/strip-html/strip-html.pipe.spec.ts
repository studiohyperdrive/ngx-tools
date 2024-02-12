import { StripHtmlPipe } from './strip-html.pipe';

describe('StripHtmlPipe', () => {
	const pipe = new StripHtmlPipe();

	it('strips all html from a string', () => {
		expect(pipe.transform('This is a <p>test</p> to see if the pipe works.')).toBe(
			'This is a test to see if the pipe works.'
		);
	});

	it('strips all html from a string with a request space', () => {
		expect(pipe.transform('This is a <p>test</p> to see if the pipe works.', ' ')).toBe(
			'This is a  test  to see if the pipe works.'
		);
	});
});
