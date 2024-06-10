// Iben: This implementation is from https://github.com/nglrx/pipes/blob/master/packages/pipes/src/lib/array/join/join.pipe.ts
// The package is no longer supported and is not compatible with more recent versions of Angular

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'join',
	standalone: true,
})
export class JoinPipe implements PipeTransform {
	/**
	 * Transforms an array to a joined string
	 *
	 * @param values - An array of values
	 * @param separator - A separator we wish to use
	 */
	public transform(values: Array<string>, separator?: string): string {
		return values && values.join(separator);
	}
}
