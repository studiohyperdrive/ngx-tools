import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';
import { CoursesStore, actions, selectors } from '../store/courses.store';
import { StoreService, dispatchDataToStore } from '@ngx/store';

@Injectable()
export class CoursesService extends StoreService<CoursesStore> {
	constructor(protected readonly store: Store) {
		super(store, selectors);
	}

	setCompleted() {
		this.store.dispatch(actions.completed.set({ payload: true }));
	}

	dispatchCourses(): Observable<number> {
		return dispatchDataToStore(
			actions.courses,
			selectors.courses,
			of(['hello', 'world']),
			this.store
		).pipe(
			switchMap((courses) => {
				return dispatchDataToStore(
					actions.amount,
					undefined,
					of(courses.length),
					this.store
				);
			})
		);
	}
}
