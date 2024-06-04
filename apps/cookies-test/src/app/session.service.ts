import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
	private readonly sessionEventSubject = new Subject<StorageEvent>();

	public readonly sessionEvents$: Observable<StorageEvent> =
		this.sessionEventSubject.asObservable();

	constructor() {
		window.onstorage = (event: StorageEvent) => {
			this.sessionEventSubject.next(event);
		};

		console.log(window.localStorage);
		console.log(localStorage);
	}
}
