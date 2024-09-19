import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { NgxMediaQueryService } from '@ngx/utils';
import { NgxModalService } from '@ngx/inform';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [RouterModule],
})
export class AppComponent {
	constructor(
		private readonly mediaService: NgxMediaQueryService,
		private readonly modalService: NgxModalService
	) {
		// Wouter: To see these in action, navigate to '/queries' in the browser
		this.mediaService.registerMediaQueries(
			['small', '(max-width: 500px)'],
			['medium', '(max-width: 600px)'],
			['large', '(max-width: 700px)']
		);
	}

	public sayHello(): void {
		this.modalService
			.open({
				component: ModalComponent,
				label: 'Modal',
				role: 'dialog',
			})
			.pipe(
				tap((action) => {
					if (action === 'Test') {
						console.log('Hello!');
					}
				})
			)
			.subscribe();
	}

	confirm(): void {
		this.modalService
			.open({
				type: 'confirm',
				describedById: 'id',
				labelledById: 'hello',
			})
			.subscribe();
	}
}
