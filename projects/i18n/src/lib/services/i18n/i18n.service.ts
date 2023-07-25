import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AbstractI18nService } from '../../abstracts';

@Injectable()
export class I18nService implements AbstractI18nService {
	constructor(private translateService: TranslateService) {}

	public get currentLanguage(): string {
		return this.translateService.currentLang;
	}

	public get availableLanguages(): string[] {
		return this.translateService.langs;
	}

	public get defaultLanguage(): string {
		return this.translateService.getDefaultLang();
	}

	public initI18n(language: string): Observable<unknown> {
		this.translateService.use(language);

		return this.translateService.reloadLang(language);
	}

	public setLanguage = (language: string): void => {
		this.translateService.use(language);
	};

	public getTranslation(key: string, params?: any): string {
		return this.translateService.instant(key, params);
	}

	// Denis: Set the default to string but allow for others.
	public getTranslationObservable<GItemType = string>(
		key: string,
		params?: any
	): Observable<GItemType> {
		return this.translateService.get(key, params);
	}

	public get translations() {
		return this.translateService.translations;
	}
}
