import { Inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LinkReference, WithRouterLinksConfig } from './with-router-links.types';
import { WITH_ROUTER_LINKS_CONFIG } from './with-router-links.config';

/**
 * An additional pipe to convert anchors to router-links
 */
@Pipe({
	name: 'withRouterLinks',
})
export class WithRouterLinkPipe implements PipeTransform {
	constructor(
		@Inject(WITH_ROUTER_LINKS_CONFIG) private readonly config: WithRouterLinksConfig,
		private readonly sanitizer: DomSanitizer
	) {}

	public transform(value: string, linkReferences: LinkReference[] = []): any {
		if (typeof value !== 'string') {
			return value;
		}

		const parser: DOMParser = new DOMParser();
		const body: Document = parser.parseFromString(value, 'text/html');

		linkReferences.forEach(({ select, linkTo, elSelector, toAttr }: LinkReference) => {
			const selector: string = `a[${this.config.dataLinkIdAttr}="${select}"]`;
			const placeholderLink: HTMLElement = body.querySelector(selector);

			if (!placeholderLink) {
				return;
			}

			const parsedLink: HTMLElement = body.createElement(
				elSelector || this.config.elSelector
			);
			const routerLinkValue: string = Array.isArray(linkTo)
				? ['', ...linkTo].join('/')
				: linkTo;

			parsedLink.setAttribute(toAttr || this.config.linkAttr, routerLinkValue);
			parsedLink.innerText = placeholderLink.innerText;

			placeholderLink.replaceWith(parsedLink);
		});

		return this.sanitizer.bypassSecurityTrustHtml(body.documentElement.innerHTML);
	}
}
