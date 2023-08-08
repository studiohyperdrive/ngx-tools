import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'truncateText',
})
export class TruncateTextPipe implements PipeTransform {
	public transform(value: string, limit = 75): string {
		return value.length > limit ? value.substring(0, limit) + '...' : value;
	}
}
