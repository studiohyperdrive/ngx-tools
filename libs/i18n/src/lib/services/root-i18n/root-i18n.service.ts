import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NgxI18nConfiguration } from '../../i18n.types';
import { NgxI18nConfigurationToken } from '../../tokens';

//TODO: Iben: Once we have a shared lib we should replace the storage and the browser approaches with their corresponding implementations
@Injectable({ providedIn: 'root' })
export class NgxI18nRootService {
	/**
	 * A subject to hold the current language
	 */
	private readonly currentLanguageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
		undefined
	);

	constructor(
		@Inject(PLATFORM_ID) private readonly platformId: string,
		@Inject(NgxI18nConfigurationToken)
		private readonly configuration: NgxI18nConfiguration
	) {}

	/**
	 * The current language of the application, as an Observable
	 */
	public readonly currentLanguage$: Observable<string> =
		this.currentLanguageSubject.asObservable();

	/**
	 * The current language of the application
	 */
	public get currentLanguage(): string {
		return this.currentLanguageSubject.getValue();
	}

	/**
	 * Sets the current language of the application and saves it to the local storage. Returns true if the language was set
	 *
	 * @param language - The provided language
	 */
	public setCurrentLanguage(language: string): void {
		// Iben: If a language is set that's not part of the available languages, we return a warn
		if (!this.configuration.availableLanguages.includes(language)) {
			console.warn(
				`NgxI18n: A language, ${language}, was attempted to be set that was not part of the available languages (${this.configuration.availableLanguages.join(
					', '
				)})`
			);

			// Iben: Early exit
			return;
		}

		// Iben: Save the current language to the localStorage when we're in the browser
		if (isPlatformBrowser(this.platformId)) {
			localStorage.setItem('ngx-language', language);
		}

		// Iben: Update the subject
		this.currentLanguageSubject.next(language);
	}
}
