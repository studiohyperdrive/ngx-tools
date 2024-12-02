import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
	const pipe = new HighlightPipe();

	it("highlights 'te' in 'Test' inside a '<mark>' element", () => {
		expect(pipe.transform('Test', 'te')).toBe('<mark>Te</mark>st');
	});

	it("highlights 'te' in 'Test' inside a '<b>' element", () => {
		expect(pipe.transform('Test', 'te', 'b')).toBe('<b>Te</b>st');
	});
});
