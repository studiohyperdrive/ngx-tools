import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CoursesStore, actions, selectors } from '../store/courses.store';
import { StoreService } from 'projects/store/src/public-api';
import { dispatchDataToStore } from 'store';

@Injectable()
export class CoursesService extends StoreService<CoursesStore> {
	constructor(protected readonly store: Store) {
		super(store, selectors);
	}

	setCompleted() {
		this.store.dispatch(actions.completed.set({ payload: true }));
	}

	dispatchCourses() {
		return dispatchDataToStore(actions.courses, of(['hello', 'world']), this.store);
	}
}
