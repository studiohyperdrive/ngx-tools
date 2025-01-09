export const openFile = (result: Blob, fileName: string): void => {
	try {
		const url = URL.createObjectURL(result);
		const anchor = document.createElement('a');
		anchor.download = fileName;
		anchor.href = url;
		anchor.click();
	} catch (error: unknown) {
		throw new Error('Failed to transform blob to file');
	}
};
