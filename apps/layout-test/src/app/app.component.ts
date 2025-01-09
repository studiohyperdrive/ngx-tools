import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { NgxMediaQueryService } from '@ngx/utils';
import { NgxModalService } from '@ngx/inform';
import { NgxAccordion, NgxNavigationComponent, NgxNavigationItems } from '@ngx/layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	imports: [RouterModule, NgxAccordion, NgxNavigationComponent],
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

	public testData = [
		{
			title: 'Hello',
			content: 'World',
		},
		{
			title: 'Hello',
			content: 'World',
		},
		{
			title: 'Hello',
			content: 'World',
		},
		{
			title: 'Hello',
			content: 'World',
		},
		{
			title: 'Hello',
			content: 'World',
		},
	];

	public readonly navigationItems: NgxNavigationItems = [
		{
			id: 'a',
			label: 'Link 1'
		}
	]

	public sayHello(): void {
		this.modalService
			.open({
				component: ModalComponent,
				role: 'dialog',
				panelClass: 'modal-panel',
				labelledById: 'test',
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
			.open<{
				type: 'Confirm';
				data: string;
			}>({
				type: 'confirm',
				describedById: 'id',
				labelledById: 'hello',
			})
			.pipe(
				tap((value) => {
					console.log(value);
				})
			)
			.subscribe();
	}
}
