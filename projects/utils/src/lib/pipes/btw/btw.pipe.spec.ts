import { BtwPipe } from './btw.pipe';

describe('BtwPipe', () => {
	const pipe = new BtwPipe();

	it("Prepends '0' if it's not in the number", () => {
		expect(pipe.transform('474603875')).toBe('0474.603.875');
	});

	it("Prepends only '0' if the format is otherwise correct", () => {
		expect(pipe.transform('474.603.875')).toBe('0474.603.875');
	});

	it("Adds '.' in the correct places", () => {
		expect(pipe.transform('0474603875')).toBe('0474.603.875');
	});
});
