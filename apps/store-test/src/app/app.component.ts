import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { actions, selectors } from '../store/user.store';
import { CoursesService } from '../services/courses.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
})
export class AppComponent {
	title = 'store-test';

	constructor(private readonly store: Store, private readonly courseService: CoursesService) {}

	ngOnInit() {
		this.store.dispatch(actions.users.effects.set());
		this.store.dispatch(actions.users.effects.add({ payload: 'serguey' }));
		this.store.dispatch(actions.paging.effects.set());

		this.store.select(selectors.admins.selectAll).pipe(tap(console.log)).subscribe();

		this.courseService.state.completed$.subscribe(console.log);
		this.courseService.state.coursesLoading$.subscribe((result) =>
			console.log('Loading ', result)
		);
		this.courseService.state.courses$.subscribe((result) => console.log('Courses ', result));
		this.courseService.state.amount$.subscribe((result) => {
			console.log('Amount ', result);
		});

		setTimeout(() => {
			this.courseService.setCompleted();
			this.courseService.dispatchCourses().subscribe();
		}, 5000);
	}
}
