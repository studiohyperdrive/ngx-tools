import { Pipe, PipeTransform } from '@angular/core';
import { uniqBy } from 'lodash';

@Pipe({
	name: 'uniqBy',
	standalone: true,
})
export class UniqByPipe implements PipeTransform {
	public transform(value: { [key: string]: any }[], key: string): any {
		if (!Array.isArray(value) || value.length === 0) {
			return [];
		}

		return uniqBy(value, key);
	}
}
