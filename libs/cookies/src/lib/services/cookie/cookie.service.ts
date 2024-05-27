import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as CookieConsent from 'vanilla-cookieconsent';

import { BehaviorSubject, Observable, Subject, combineLatest, map, startWith } from 'rxjs';
import {
	NgxCookieCategories,
	NgxCookieChangedEvent,
	NgxCookieConfiguration,
	NgxCookieEvent,
	NgxCookieLanguageConfiguration,
} from '../../types';

/**
 * A service that implements the CookieConsent from https://cookieconsent.orestbida.com and provides the necessary Observables to handle this setup.
 */
@Injectable({ providedIn: 'root' })
export class NgxCookieService {
	/**
	 * Subject to hold the onFirstConsent event
	 */
	private readonly firstCookiesConsentedSubject: Subject<NgxCookieEvent> = new Subject();

	/**
	 * Subject to hold the onConsent event
	 */
	private readonly cookiesConsentedSubject: Subject<NgxCookieEvent> = new Subject();

	/**
	 * Subject to hold the consentChanged event
	 */
	private readonly cookiesConsentChangedSubject: Subject<NgxCookieChangedEvent> = new Subject();

	/**
	 * Subject to hold the modalVisible event
	 */
	private readonly modalVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	/**
	 * An event triggered only the very first time that the user expresses their choice of consent
	 */
	public readonly firstCookiesConsented$: Observable<NgxCookieEvent> =
		this.firstCookiesConsentedSubject.asObservable();

	/**
	 * An event triggering the choice of consent on every page load.
	 */
	public readonly cookiesConsented$: Observable<NgxCookieEvent> =
		this.cookiesConsentedSubject.asObservable();

	/**
	 * An event triggered when the user modifies their preferences and only if consent has already been provided.
	 */
	public readonly cookiesConsentChanged$: Observable<NgxCookieChangedEvent> =
		this.cookiesConsentChangedSubject.asObservable();

	/**
	 * Whether the cookies modal is currently visible
	 */
	public readonly modalVisible$: Observable<boolean> = this.modalVisibleSubject.asObservable();

	constructor(@Inject(PLATFORM_ID) private platformId: string) {}

	/**
	 * Sets up the CookieConsent.
	 *
	 * For more information of on this configuration, check the documentation
	 * https://cookieconsent.orestbida.com/essential/getting-started.html
	 *
	 * @param categories - The categories of cookies
	 * @param language - The language settings of the cookies
	 * @param configuration - An optional set configuration settings
	 */
	public setupCookiesHandler(
		categories: NgxCookieCategories,
		language: NgxCookieLanguageConfiguration,
		configuration?: NgxCookieConfiguration
	): void {
		// Iben: If we're not in the browser, we early exit, so server-side rendering can be enabled
		if (!isPlatformBrowser(this.platformId)) {
			return;
		}

		// Iben: If no categories were provided, we early exit and throw an error, as the cookie preference cannot be shown without.
		if (!categories || Object.keys(categories).length === 0) {
			console.error(
				'NgxCookies: No categories were provided for the cookie handler. At least one category is required.'
			);

			return;
		}

		// Iben: Setup the onFirstConsent listener
		const onFirstConsent = (event) => {
			this.firstCookiesConsentedSubject.next(event);
		};
		onFirstConsent.bind(this);

		// Iben: Setup the onConsent listener
		const onConsent = (event) => {
			this.cookiesConsentedSubject.next(event);
		};
		onConsent.bind(this);

		// Iben: Setup the onChange listener
		const onChange = (event) => {
			this.cookiesConsentChangedSubject.next(event);
		};
		onChange.bind(this);

		// Iben: Setup the onModalShow listener
		const onModalShow = () => {
			this.modalVisibleSubject.next(true);
		};
		onModalShow.bind(this);

		// Iben: Setup the onModalHide listener
		const onModalHide = () => {
			this.modalVisibleSubject.next(false);
		};
		onModalHide.bind(this);

		// Iben: Run the CookieConsent handler
		CookieConsent.run({
			...(configuration || {}),
			onFirstConsent,
			onConsent,
			onChange,
			onModalHide,
			onModalShow,
			categories,
			language,
		});
	}

	/**
	 * Whether a certain category of cookies was accepted
	 *
	 * @param name - The name of the category
	 */
	public hasAcceptedCategory(name: string): Observable<boolean> {
		// Iben: Return every time the cookie consent has changed
		return combineLatest([
			this.cookiesConsented$.pipe(startWith(undefined)),
			this.cookiesConsentChanged$.pipe(startWith(undefined)),
		]).pipe(
			map(() => {
				// Iben: Check if the category was accepted
				return CookieConsent.acceptedCategory(name);
			})
		);
	}

	/**
	 * Accept a category of cookies
	 *
	 * @param name - The name of the categories
	 */
	public acceptCategory(name: string): void {
		CookieConsent.acceptCategory(name);
	}

	/**
	 * Whether a certain service within a category was accepted
	 *
	 * @param category - The name of the category
	 * @param name - The name of the service
	 */
	public hasAcceptedService(category: string, name: string): Observable<boolean> {
		// Iben: Return every time the cookie consent has changed
		return combineLatest([
			this.cookiesConsented$.pipe(startWith(undefined)),
			this.cookiesConsentChanged$.pipe(startWith(undefined)),
		]).pipe(
			map(() => {
				// Iben: Check if the service within the provided category was accepted
				return CookieConsent.acceptedService(name, category);
			})
		);
	}

	/**
	 * Accept a category of cookies
	 *
	 * @param category - The name of the category
	 * @param name - The name of the service
	 */
	public acceptService(category: string, name: string): void {
		CookieConsent.acceptService(name, category);
	}

	/**
	 * Show the cookie modal
	 */
	public showModal(): void {
		CookieConsent.show(true);
	}

	/**
	 * Removes a (set of) cookie(s)
	 *
	 * @param cookies - A (set of) cookie(s)
	 * @param path - The path to the cookie(s)
	 * @param domain - The domain of the cookie(s)
	 */
	public removeCookies(
		cookies: string | RegExp | (string | RegExp)[],
		path?: string,
		domain?: string
	): void {
		return CookieConsent.eraseCookies(cookies, path, domain);
	}

	/**
	 * Get a cookie
	 *
	 * @param cookie - Name of the cookie
	 */
	public getCookie(cookie?: keyof CookieConsent.CookieValue): CookieConsent.CookieValue {
		return CookieConsent.getCookie(cookie);
	}

	/**
	 * Get a cookie as an observable
	 *
	 * @param cookie - Name of the cookie
	 */
	public getCookieObservable(
		cookie?: keyof CookieConsent.CookieValue
	): Observable<CookieConsent.CookieValue | undefined> {
		// Iben: Return every time the cookie consent has changed
		return combineLatest([
			this.cookiesConsented$.pipe(startWith(undefined)),
			this.cookiesConsentChanged$.pipe(startWith(undefined)),
		]).pipe(
			map(() => {
				return CookieConsent.getCookie(cookie);
			})
		);
	}
}
