import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { GlobalFooterClient, NavigationLink } from '@govflanders/vl-widget-global-footer-types';
import { ApplicationMenuLink, GlobalHeaderClient, ProfileConfig } from '@govflanders/vl-widget-global-header-types';
import { first, from, fromEvent, Observable, of, retry, switchMap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxWindowService } from "@studiohyperdrive/ngx-core";

@Injectable({
	providedIn: 'root'
})
export class InjectAcmComponentsService {
	private rendererFactory: RendererFactory2 = inject(RendererFactory2);
	private renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);
	private windowService: NgxWindowService = inject(NgxWindowService);

	/**
	 * initHeader
	 *
	 * This method initializes the VO Global Header widget and sets optional applicationMenuLinks.
	 *
	 * @param selector{string} - The selector of the element where the header widget should be mounted.
	 * @param config{object} - The configuration object
	 * @param config.url{string} - The URL of the widget (e.g. 'https://<environment>.widgets.burgerprofiel.vlaanderen.be/')
	 * @param config.id{string} - The ID of the widget (e.g. '7502b557-5d49-4ab3-9995-168718b81be5')
	 * @param config.profile{ProfileConfig} - The profile configuration object
	 * @param links{ApplicationMenuLink[]} - Optional application menu links
	 *
	 * @returns Observable<GlobalHeaderClient> - The GlobalHeaderClient object will be returned to allow for custom implementations that are not supported out of the box, see: https://test.widgets.burgerprofiel.dev-vlaanderen.be/docs/global-header/ for more information.
	 */
	public initHeader({
						  selector,
						  config,
						  links
					  }: {
		selector: string;
		config: { url: string; id: string; profile: ProfileConfig };
		links?: ApplicationMenuLink[];
	}): Observable<GlobalHeaderClient> {
		// Denis: The following code should only run in the browser.
		if (!this.windowService.isBrowser()) {
			return of(null);
		}

		const browserWindow = this.windowService.window;
		const browserDocument = this.windowService.document;

		// Denis: Create a new script tag
		const script = this.renderer.createElement('script');

		// Denis: Set up the script to load the header widget
		script.src = config.url + 'api/v2/widget/' + config.id + '/entry';
		script.type = 'text/javascript';

		// Denis: Append the script to the DOM to load it.
		this.renderer.appendChild(browserDocument.head, script);

		return fromEvent(script, 'load').pipe(
			first(),
			switchMap(() => {
				// Denis: Mount the header widget
				const headerEl: HTMLElement = browserDocument.querySelector(selector);

				if (typeof headerEl === 'undefined' || headerEl === null) {
					return throwError('Global Header: targetElement not found');
				}

				return of(headerEl);
			}),
			retry({
				count: 5,
				delay: 100
			}),
			switchMap((headerEl: HTMLElement) => {
				// Denis: Get the GlobalHeaderClient object
				const headerClient: GlobalHeaderClient = browserWindow.globalHeaderClient;

				return from(headerClient.mount(headerEl));
			}),
			switchMap(() => {
				// Denis: If there are no links, fallback to the default links
				if (!Array.isArray(links) || !links.length) {
					return of(null);
				}

				// Denis: Get the GlobalHeaderClient object
				const headerClient: GlobalHeaderClient = browserWindow.globalHeaderClient;

				// Denis: Set the optional application menu links
				return from(headerClient.accessMenu.setApplicationMenuLinks(links));
			}),
			switchMap(() => {
				// Denis: Get the GlobalHeaderClient object
				const headerClient: GlobalHeaderClient = browserWindow.globalHeaderClient;

				// Denis: Set the provided ProfileConfig
				return headerClient.accessMenu.setProfile(config.profile);
			}),
			map(() => browserWindow.globalHeaderClient)
		);
	}

	/**
	 * initFooter
	 *
	 * This method initializes the VO Global Footer widget and sets optional navigation links.
	 *
	 * @param selector{string} - The selector of the element where the footer widget should be mounted.
	 * @param config{object} - The configuration object
	 * @param config.url{string} - The URL of the widget (e.g. 'https://<environment>.widgets.burgerprofiel.vlaanderen.be/')
	 * @param config.id{string} - The ID of the widget (e.g. '7502b557-5d49-4ab3-9995-168718b81be5')
	 * @param links{NavigationLink[]} - Optional navigation links
	 *
	 * @returns Observable<GlobalFooterClient> - The GlobalFooterClient object will be returned to allow for custom implementations that are not supported out of the box, see: https://test.widgets.burgerprofiel.dev-vlaanderen.be/docs/global-footer/ for more information.
	 */
	public initFooter({
						  selector,
						  config,
						  links
					  }: {
		selector: string;
		config: { url: string; id: string };
		links: NavigationLink[];
	}): Observable<GlobalFooterClient> {
		// Denis: The following code should only run in the browser.
		if (!this.windowService.isBrowser()) {
			return of(null);
		}

		const browserWindow = this.windowService.window;
		const browserDocument = this.windowService.document;

		// Denis: Create a new script tag
		const script = this.renderer.createElement('script');

		// Denis: Set up the script to load the header widget
		script.src = config.url + 'api/v2/widget/' + config.id + '/entry';
		script.type = 'text/javascript';

		// Denis: Append the script to the DOM to load it.
		this.renderer.appendChild(browserDocument.head, script);

		return fromEvent(script, 'load').pipe(
			first(),
			switchMap(() => {
				// Denis: Mount the header widget
				const footerEl: HTMLElement = browserDocument.querySelector(selector);

				if (typeof footerEl === 'undefined' || footerEl === null) {
					return throwError('Global Footer: targetElement not found');
				}

				return of(footerEl);
			}),
			retry({
				count: 5,
				delay: 100
			}),
			switchMap((footerEl: HTMLElement) => {
				// Denis: When the script is loaded, get the GlobalHeaderClient object
				const footerClient: GlobalFooterClient = browserWindow.globalFooterClient;

				return from(footerClient.mount(footerEl));
			}),
			switchMap(() => {
				// Denis: If there are no links, fallback to the default links
				if (!Array.isArray(links) || !links.length) {
					return of(null);
				}

				// Denis: Get the GlobalHeaderClient object
				const footerClient: GlobalFooterClient = browserWindow.globalFooterClient;

				// Denis: Set the provided navigation links
				return from(footerClient.setNavigationLinks(links));
			}),
			map(() => browserWindow.globalFooterClient)
		);
	}
}
