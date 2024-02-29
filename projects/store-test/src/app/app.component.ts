import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { actions, selectors } from '../store/user.store';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'store-test';

	constructor(private readonly store: Store) {}

	ngOnInit() {
		this.store.dispatch(actions.users.effects.set());
		this.store.dispatch(actions.users.effects.add({ payload: 'serguey' }));
		this.store.dispatch(actions.paging.effects.set());

		this.store.select(selectors.admins.selectAll).pipe(tap(console.log)).subscribe();
	}
}
