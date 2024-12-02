import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { scan, map, shareReplay } from 'rxjs/operators';

import { TranslationLoaderActionEntity } from './i18n-loading.types';

@Injectable({
	providedIn: 'root',
})
export class NgxI18nLoadingService {
	// Iben: Keep a subject to store all the translation loading actions
	private readonly translationLoaderActionsSubject$ =
		new Subject<TranslationLoaderActionEntity>();

	/**
	 * A subject to store all the currently loaded translation files in
	 */
	private readonly translationsSubject$ = new BehaviorSubject<Record<string, unknown>>({});

	private readonly translationsFailedSubject$ = new BehaviorSubject<boolean>(false);

	private translationsLoading: Record<string, Observable<any>> = {};

	// Iben: Check if all translations actions have completed
	public readonly translationsLoaded$ = this.translationLoaderActionsSubject$.pipe(
		// Iben: Hold a list of all actions and only add those that have a loading state
		// If the action is not loading, remove it from the actions array
		scan((actions: string[], action: TranslationLoaderActionEntity) => {
			return action.state === 'LOADING'
				? actions.concat(action.id)
				: actions.filter((actionFromResult) => actionFromResult !== action.id);
		}, []),
		// Iben: If no more actions are loading, we return true
		map((result) => result.length === 0)
	);

	public readonly translationsFailed$: Observable<boolean> =
		this.translationsFailedSubject$.asObservable();

	/**
	 * Dispatch the loading state of a set of translations
	 *
	 * @param action - The loading state of a set of translations
	 */
	public dispatchTranslationLoaderAction(action: TranslationLoaderActionEntity) {
		this.translationLoaderActionsSubject$.next(action);
	}

	/**
	 * Add loaded translations to the loaded translations record
	 *
	 * @param translations - The newly loaded translations
	 */
	public addLoadedTranslations(translations: Record<string, unknown>) {
		this.translationsSubject$.next({
			...this.translationsSubject$.getValue(),
			...translations,
		});
	}

	/**
	 * Fetches all the currently loaded translations
	 */
	public getTranslations(): Record<string, unknown> {
		return this.translationsSubject$.getValue();
	}

	/**
	 * Groups all the requests for a series of paths and ensures we only have a single observable to subscribe to
	 *
	 * @param paths - The paths of we're loading translations for
	 * @param observable - The translations loading observable
	 */
	public loadTranslations(paths: string, observable: Observable<unknown>) {
		// Iben: If loading of the translations has not been added to the array yet, we set it so we return a single observable
		if (!this.translationsLoading[paths]) {
			// Iben: Add shareReplay so the result is passed over each subscription
			this.translationsLoading[paths] = observable.pipe(shareReplay());
		}

		// Iben: Return the observable
		return this.translationsLoading[paths];
	}

	/**
	 * Mark the loading of the translations as failed
	 */
	public markTranslationsLoadedAsFailed() {
		console.error('Something went wrong whilst fetching the translations.');

		this.translationsFailedSubject$.next(false);
	}
}
