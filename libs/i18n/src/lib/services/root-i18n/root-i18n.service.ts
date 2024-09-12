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
		// Iben: get the new language
		const newLanguage = this.getNewLanguage(language);

		// Iben: Save the current language to the localStorage when we're in the browser
		if (isPlatformBrowser(this.platformId)) {
			localStorage.setItem('ngx-i18n-language', newLanguage);
		}

		// Iben: Update the subject
		this.currentLanguageSubject.next(newLanguage);
	}

	/**
	 * Sets the initial language of the application when no language is set yet.
	 *
	 * If a previous language was set in the local storage, said language is used. If not, the default language gets used.
	 */
	public initializeLanguage(): void {
		// Iben: If the current language already exists, we early exit
		if (this.currentLanguage) {
			return;
		}

		// Iben: If the current language does not exist, we check if it exists in the local storage, if not, we use the default config
		let language = this.configuration.defaultLanguage;

		if (isPlatformBrowser(this.platformId)) {
			language =
				localStorage.getItem('ngx-i18n-language') || this.configuration.defaultLanguage;
		}

		// Iben: We set the new language
		this.setCurrentLanguage(language);
	}

	/**
	 * Checks if the newly proposed language can be set, if not we return either the current language or the default language
	 *
	 * @param {string} language - The newly proposed language
	 */
	private getNewLanguage(language: string): string {
		// Iben: Save the currently being set language
		let newLanguage = language;

		// Iben: Check if the new language is part of the available languages
		if (!this.configuration.availableLanguages.includes(language)) {
			// Iben: If a language is set that's not part of the available languages, we return a warn
			console.warn(
				`NgxI18n: A language, ${language}, was attempted to be set that was not part of the available languages (${this.configuration.availableLanguages.join(
					', '
				)})`
			);

			// Iben: If there is already a language set, we early exit and keep the remaining language
			if (this.currentLanguage) {
				return this.currentLanguage;
			}

			// Iben: If no language exists, we use the default language
			newLanguage = this.configuration.defaultLanguage;
		}

		return newLanguage;
	}
}
