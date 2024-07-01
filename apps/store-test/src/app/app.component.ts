import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
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

		this.store.select(selectors.admins.selectAll).subscribe((result) => {
			console.log('Admins: ', result);
		});

		this.courseService.state.completed$.subscribe((result) => {
			console.log('Completed ', result);
		});

		this.courseService.state.coursesLoading$.subscribe((result) => {
			console.log('Loading ', result);
		});

		this.courseService.state.courses$.subscribe((result) => {
			console.log('Courses ', result);
		});

		this.courseService.state.amount$.subscribe((result) => {
			console.log('Amount ', result);
		});

		setTimeout(() => {
			this.courseService.setCompleted();
			this.courseService.dispatchCourses().subscribe((courses) => {
				// Wouter: should be undefined because no selector was provided in the switchmap
				console.log('Amount of courses after delay: ', courses);
			});
		}, 1200);
	}
}
