import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class StoreService {
	constructor(protected readonly store: Store) {}

	/**
	 * Select the data of a store slice
	 *
	 * @template StoreItem - The interface of the selected item/items
	 * @param selector - The selector object
	 */
	public selectFromStore<StoreItem>(selector: any): Observable<StoreItem> {
		return this.store.pipe(select(selector.select || selector.selectAll));
	}

	/**
	 * Select the loading state of a store slice
	 *
	 * @param selector - The selector object
	 */
	public selectLoadingFromStore(selector: any): Observable<boolean> {
		return this.store.pipe(select(selector.loading || selector.selectLoading));
	}

	/**
	 * Select the error state of a store slice
	 *
	 * @param selector - The selector object
	 */
	public selectErrorFromStore(selector: any): Observable<boolean> {
		return this.store.pipe(select(selector.error || selector.selectError));
	}

	/**
	 * Select the error message state of a store slice
	 *
	 * @param selector - The selector object
	 */
	public selectErrorMessageFromStore<ErrorMessage>(selector: any): Observable<ErrorMessage> {
		return this.store.pipe(select(selector.errorMessage || selector.selectErrorMessage));
	}
}
