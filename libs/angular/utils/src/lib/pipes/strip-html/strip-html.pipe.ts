import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'stripHtml',
	standalone: true,
})
export class StripHtmlPipe implements PipeTransform {
	public transform(value: string, replaceWith: string = ''): string {
		return value
			? String(value)
					.replace(/(<[^>]+>)+/gm, replaceWith)
					.replace(/(&nbsp;)+/gm, replaceWith)
					.replace(/(\r\n|\n|\r)+/gm, replaceWith)
			: '';
	}
}
