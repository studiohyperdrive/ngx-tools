import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'stripHtml',
})
export class StripHtmlPipe implements PipeTransform {
	public transform(value: string, replaceWith: string = ''): string {
		return value
			? String(value)
					.replace(/<[^>]+>/gm, replaceWith)
					.replace('&nbsp;', replaceWith)
					.replace(/(\r\n|\n|\r)/gm, replaceWith)
			: '';
	}
}
