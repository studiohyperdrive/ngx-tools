import { IbanPipe } from './iban.pipe';

describe('IbanPipe', () => {
	const pipe = new IbanPipe();
	const reference = 'BE62 5100 0754 7061';

	it('should format in groups of 4 characters', () => {
		const formattedIBAN = pipe.transform('BE62510007547061');
		const formattedIBANGroups = formattedIBAN.split(' ');

		expect(formattedIBANGroups[0].length).toBe(4);
		expect(formattedIBANGroups[1].length).toBe(4);
		expect(formattedIBANGroups[2].length).toBe(4);
		expect(formattedIBANGroups[3].length).toBe(4);
	});

	it('should have spaces after every group of 4 characters', () => {
		const formattedIBAN = pipe.transform('BE62510007547061');

		expect(formattedIBAN[4]).toBe(' ');
		expect(formattedIBAN[9]).toBe(' ');
		expect(formattedIBAN[14]).toBe(' ');
	});

	it('should remove unnecessary whitespace', () => {
		const formattedIBAN = pipe.transform('B E625  10 0  0 7 5         4 7 0     6        1');

		expect(formattedIBAN).toBe(reference);
	});
});
