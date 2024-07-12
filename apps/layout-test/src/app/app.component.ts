import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NgxMediaQueryService } from '@ngx/utils';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [RouterModule],
})
export class AppComponent {
	constructor(private readonly mediaService: NgxMediaQueryService) {
		// Wouter: To see these in action, navigate to '/queries' in the browser
		this.mediaService.registerMediaQueries(
			['small', '(max-width: 500px)'],
			['medium', '(max-width: 600px)'],
			['large', '(max-width: 700px)']
		);
	}
}
