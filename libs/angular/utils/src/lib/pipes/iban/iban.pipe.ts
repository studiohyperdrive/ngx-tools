import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'IBAN',
	standalone: true,
})
export class IbanPipe implements PipeTransform {
	public transform(value = ''): string {
		value = value.replace(/\s/g, ''); // replace all spaces

		let reformat = value.replace(/(.{4})/g, function (match) {
			return match + ' '; // reformat into groups of 4 succeeded with a space
		});

		reformat = reformat.trim(); // remove trailing space

		return reformat;
	}
}
