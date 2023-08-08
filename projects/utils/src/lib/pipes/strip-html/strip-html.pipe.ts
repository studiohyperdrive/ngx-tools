import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'stripHtml',
})
export class StripHtmlPipe implements PipeTransform {
	public transform(value: string): string {
		return value
			? String(value)
					.replace(/<[^>]+>/gm, '')
					.replace('&nbsp;', '')
					.replace(/(\r\n|\n|\r)/gm, '')
			: '';
	}
}
