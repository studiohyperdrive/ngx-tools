import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RootI18nService {
	private readonly currentLanguageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
		undefined
	);

	public readonly currentLanguage$: Observable<string> =
		this.currentLanguageSubject.asObservable();

	public get currentLanguage(): string {
		return this.currentLanguageSubject.getValue();
	}

	public setCurrentLanguage(language: string) {
		this.currentLanguageSubject.next(language);
	}
}
