import { openFile } from './open-file.util';

describe('openFile', () => {
	const originalCreateObjectURL = URL.createObjectURL;

	beforeEach(() => {
		URL.createObjectURL = originalCreateObjectURL;
	});

	test('should create an anchor element', () => {
		jest.spyOn(document, 'createElement');
		URL.createObjectURL = jest.fn();
		jest.spyOn(URL, 'createObjectURL').mockImplementation(jest.fn());

		openFile(new Blob([]), 'test');

		expect(document.createElement).toHaveBeenCalledTimes(1);
		expect(document.createElement).toHaveBeenCalledWith('a');
		expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
		expect(URL.createObjectURL).toHaveBeenCalledWith(new Blob([]));
	});

	test('should throw an error if something fails', () => {
		expect(() => {
			openFile(new Blob([]), 'test');
		}).toThrow('Failed to transform blob to file');
	});
});
